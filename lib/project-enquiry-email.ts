import type { ProjectEnquiry } from "@/lib/project-enquiry";

const NOT_PROVIDED = "Not provided";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value: string) {
  return value || NOT_PROVIDED;
}

function formatSubmissionDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("day")} ${part("month")} ${part("year")}, ${part("hour")}:${part("minute")} ${part("timeZoneName")}`.trim();
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="width:140px;padding:7px 18px 7px 0;color:#6b6d70;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:7px 0;color:#111111;font-size:14px;font-weight:600;line-height:1.45;vertical-align:top;overflow-wrap:anywhere;">${escapeHtml(display(value))}</td>
  </tr>`;
}

export function buildProjectEnquiryEmail(enquiry: ProjectEnquiry, submittedAt = new Date()) {
  const submitted = formatSubmissionDate(submittedAt);
  const subjectIdentity = enquiry.business || enquiry.name;
  const subject = `New project enquiry — ${subjectIdentity}`;
  const projectTypeText = enquiry.projectTypes.map((item) => `• ${item}`).join("\n");
  const projectTypeHtml = enquiry.projectTypes.map((item) => `<li style="margin:0 0 6px;">${escapeHtml(item)}</li>`).join("");
  const descriptionHtml = escapeHtml(enquiry.projectDescription).replaceAll("\n", "<br>");

  const text = [
    "NEW PROJECT ENQUIRY",
    "────────────────────",
    "",
    "CONTACT",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Business: ${display(enquiry.business)}`,
    `Website: ${display(enquiry.website)}`,
    "",
    "PROJECT",
    "Project type:",
    projectTypeText,
    "",
    "Project details:",
    enquiry.projectDescription,
    "",
    "PRACTICALS",
    `Investment: ${display(enquiry.budget)}`,
    `Timeline: ${display(enquiry.timeline)}`,
    "",
    "SUBMITTED",
    submitted,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f2ed;color:#111111;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New project enquiry from ${escapeHtml(enquiry.name)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ed;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#faf9f5;border:1px solid #dedcd6;">
            <tr>
              <td style="padding:28px 32px;background:#0b0d0e;border-bottom:4px solid #4160fd;">
                <div style="color:#4160fd;font-size:11px;font-weight:700;letter-spacing:2px;">BRIGGS DIGITAL SOLUTIONS</div>
                <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;line-height:1.05;letter-spacing:-0.6px;">NEW PROJECT ENQUIRY</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px 8px;">
                <h2 style="margin:0 0 12px;color:#4160fd;font-size:11px;letter-spacing:2px;">CONTACT</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${detailRow("Name", enquiry.name)}
                  ${detailRow("Email", enquiry.email)}
                  ${detailRow("Business", enquiry.business)}
                  ${detailRow("Website", enquiry.website)}
                </table>
              </td>
            </tr>
            <tr><td style="padding:18px 32px 0;"><div style="height:1px;background:#dedcd6;"></div></td></tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <h2 style="margin:0 0 16px;color:#4160fd;font-size:11px;letter-spacing:2px;">PROJECT</h2>
                <div style="margin-bottom:8px;color:#6b6d70;font-size:13px;">Project type</div>
                <ul style="margin:0 0 22px;padding-left:19px;color:#111111;font-size:14px;font-weight:600;line-height:1.45;">${projectTypeHtml}</ul>
                <div style="margin-bottom:8px;color:#6b6d70;font-size:13px;">Project details</div>
                <div style="color:#111111;font-size:14px;line-height:1.6;overflow-wrap:anywhere;">${descriptionHtml}</div>
              </td>
            </tr>
            <tr><td style="padding:18px 32px 0;"><div style="height:1px;background:#dedcd6;"></div></td></tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <h2 style="margin:0 0 12px;color:#4160fd;font-size:11px;letter-spacing:2px;">PRACTICALS</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${detailRow("Investment", enquiry.budget)}
                  ${detailRow("Timeline", enquiry.timeline)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 32px 30px;">
                <div style="padding-top:22px;border-top:1px solid #dedcd6;color:#6b6d70;font-size:12px;letter-spacing:.3px;">
                  <strong style="display:block;margin-bottom:6px;color:#111111;font-size:10px;letter-spacing:1.7px;">SUBMITTED</strong>
                  ${escapeHtml(submitted)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html, submitted };
}
