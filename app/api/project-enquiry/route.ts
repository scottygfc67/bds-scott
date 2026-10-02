import { validateProjectEnquiry } from "@/lib/project-enquiry";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = validateProjectEnquiry(payload);
  if (!validation.valid) {
    return Response.json({ error: "Please check the form details.", fields: validation.errors }, { status: 422 });
  }

  const endpoint = process.env.PROJECT_ENQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json(
      { error: "No project enquiry transport is configured." },
      { status: 503 },
    );
  }

  try {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (process.env.PROJECT_ENQUIRY_WEBHOOK_SECRET) {
      headers.authorization = `Bearer ${process.env.PROJECT_ENQUIRY_WEBHOOK_SECRET}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...(payload as object), receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Transport returned ${response.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Project enquiry transport failed", error);
    return Response.json({ error: "Project enquiry delivery failed." }, { status: 502 });
  }
}
