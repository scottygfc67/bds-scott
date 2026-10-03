import { isValidEmailAddress, validateProjectEnquiry } from "@/lib/project-enquiry";
import { buildProjectEnquiryEmail } from "@/lib/project-enquiry-email";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 32_000;
const DEFAULT_POSTAL_API_URL = "https://postal.briggsdigitalsolutions.com";

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function postalConfiguration() {
  const apiKey = requiredEnvironmentVariable("POSTAL_API_KEY");
  const apiUrl = process.env.POSTAL_API_URL?.trim() || DEFAULT_POSTAL_API_URL;
  const fromEmail = requiredEnvironmentVariable("POSTAL_FROM_EMAIL");
  const toEmail = requiredEnvironmentVariable("PROJECT_ENQUIRY_TO_EMAIL");

  let endpoint: URL;
  try {
    endpoint = new URL("/api/v1/send/message", apiUrl);
  } catch {
    throw new Error("POSTAL_API_URL is invalid");
  }

  if (endpoint.protocol !== "https:") throw new Error("POSTAL_API_URL must use HTTPS");
  if (!isValidEmailAddress(fromEmail)) throw new Error("POSTAL_FROM_EMAIL is invalid");
  if (!isValidEmailAddress(toEmail)) throw new Error("PROJECT_ENQUIRY_TO_EMAIL is invalid");

  return { apiKey, endpoint: endpoint.toString(), fromEmail, toEmail };
}

class PostalApiError extends Error {
  constructor(message: string, public readonly status?: number, public readonly postalStatus?: string) {
    super(message);
    this.name = "PostalApiError";
  }
}

function safePostalError(error: unknown) {
  if (!(error instanceof Error)) return { message: "Unknown Postal API error" };
  const postalError = error as Error & { status?: number; postalStatus?: string };
  return {
    name: postalError.name,
    message: postalError.message,
    status: postalError.status,
    postalStatus: postalError.postalStatus,
  };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return Response.json({ error: "Content type must be application/json." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request body is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) {
      return Response.json({ error: "Request body is too large." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = validateProjectEnquiry(payload);
  if (!validation.valid || !validation.data) {
    return Response.json({ error: "Please check the form details.", fields: validation.errors }, { status: 422 });
  }

  try {
    const config = postalConfiguration();
    const email = buildProjectEnquiryEmail(validation.data);
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Server-API-Key": config.apiKey,
      },
      body: JSON.stringify({
        to: [config.toEmail],
        from: `${validation.data.name} via Briggs Website <${config.fromEmail}>`,
        reply_to: validation.data.email,
        subject: email.subject,
        plain_body: email.text,
        html_body: email.html,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });

    const result: unknown = await response.json().catch(() => null);
    const postalStatus = result && typeof result === "object" && "status" in result && typeof result.status === "string"
      ? result.status
      : undefined;

    if (!response.ok || postalStatus !== "success") {
      throw new PostalApiError("Postal API did not accept the message", response.status, postalStatus);
    }

    const messageId = result && typeof result === "object" && "data" in result && result.data && typeof result.data === "object" && "message_id" in result.data && typeof result.data.message_id === "string"
      ? result.data.message_id
      : undefined;

    console.info("[project-enquiry] Message accepted", {
      messageId,
      acceptedRecipients: 1,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[project-enquiry] Email delivery failed", safePostalError(error));
    return Response.json({ error: "Project enquiry delivery failed." }, { status: 502 });
  }
}
