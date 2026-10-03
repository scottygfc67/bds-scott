import nodemailer from "nodemailer";
import { isValidEmailAddress, validateProjectEnquiry } from "@/lib/project-enquiry";
import { buildProjectEnquiryEmail } from "@/lib/project-enquiry-email";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 32_000;

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function smtpConfiguration() {
  const host = requiredEnvironmentVariable("POSTAL_SMTP_HOST");
  const portValue = requiredEnvironmentVariable("POSTAL_SMTP_PORT");
  const user = requiredEnvironmentVariable("POSTAL_SMTP_USER");
  const password = requiredEnvironmentVariable("POSTAL_SMTP_PASSWORD");
  const fromEmail = requiredEnvironmentVariable("POSTAL_FROM_EMAIL");
  const toEmail = requiredEnvironmentVariable("PROJECT_ENQUIRY_TO_EMAIL");
  const port = Number(portValue);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) throw new Error("POSTAL_SMTP_PORT is invalid");
  if (!isValidEmailAddress(fromEmail)) throw new Error("POSTAL_FROM_EMAIL is invalid");
  if (!isValidEmailAddress(toEmail)) throw new Error("PROJECT_ENQUIRY_TO_EMAIL is invalid");

  return { host, port, user, password, fromEmail, toEmail };
}

function safeSmtpError(error: unknown) {
  if (!(error instanceof Error)) return { message: "Unknown SMTP error" };
  const smtpError = error as Error & { code?: string; command?: string; responseCode?: number };
  return {
    name: smtpError.name,
    message: smtpError.message,
    code: smtpError.code,
    command: smtpError.command,
    responseCode: smtpError.responseCode,
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
    const config = smtpConfiguration();
    const email = buildProjectEnquiryEmail(validation.data);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    const result = await transporter.sendMail({
      from: {
        name: `${validation.data.name} via Briggs Website`,
        address: config.fromEmail,
      },
      to: config.toEmail,
      replyTo: validation.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (!result.accepted?.length) throw new Error("SMTP server did not accept the recipient");

    console.info("[project-enquiry] Message accepted", {
      messageId: result.messageId,
      acceptedRecipients: result.accepted.length,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[project-enquiry] Email delivery failed", safeSmtpError(error));
    return Response.json({ error: "Project enquiry delivery failed." }, { status: 502 });
  }
}
