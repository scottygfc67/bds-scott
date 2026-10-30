import { CONTACT_EMAIL_HREF } from "@/lib/site";

export const links = {
  startProject: "/start-a-project",
  work: "#work",
  whatWeBuild: "/what-we-build",
  howWeWork: "/how-we-work",
  dbmWebsite: "https://dbm-website-ebon.vercel.app/",
  email: CONTACT_EMAIL_HREF,
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const navItems = [
  { label: "Work", href: links.work },
  { label: "What We Build", href: links.whatWeBuild },
  { label: "How We Work", href: links.howWeWork },
] as const;

export const proofMetrics = [
  { number: "01", title: "Custom Built", detail: "No templates" },
  { number: "02", title: "Mobile First", detail: "Beautiful everywhere" },
  { number: "03", title: "Design + Development", detail: "All in-house" },
] as const;

export const projectFeatures = [
  { icon: "globe", title: "Custom Website", detail: "Bespoke design" },
  { icon: "file", title: "Content Management", detail: "Gigs, releases, media" },
  { icon: "calendar", title: "Enquiries", detail: "Booking requests" },
  { icon: "mail", title: "Fan Mailing List", detail: "Own your audience" },
  { icon: "chart", title: "Scalable Platform", detail: "Built for growth" },
] as const;

export const buildAreas = [
  { number: "01", label: "Public-facing", title: "Websites", body: "High-performance websites designed around your brand, audience and goals.", image: "/whatwedo_mockup_1.png", alt: "Example custom business website" },
  { number: "02", label: "Custom CMS", title: "Management Systems", body: "Back-end tools built around the content, pages and updates your business actually needs to manage.", image: "/whatwedo_mockup_2.png", alt: "Example custom website management system" },
  { number: "03", label: "Integrations & Automation", title: "Digital Systems", body: "Connect the forms, bookings, payments and services your business relies on — and automate the parts that slow you down.", image: "/whatwedo_mockup_3.png", alt: "Diagram of connected business forms, payments, email, CRM, database and custom workflows" },
] as const;

export const processSteps = [
  { number: "01", label: "Discover", title: "Discovery Call", body: "We get to know your business properly — how it operates today, what you want to achieve, and how you see the website fitting into your day-to-day work.", bullets: ["How your business operates", "Your customers and goals", "How you want to manage things"] },
  { number: "02", label: "Agree", title: "Project Agreement", body: "After our call, we put together a project agreement setting out what we're building, what's included, and the next steps. You'll know exactly what we're working towards.", bullets: ["Clear scope and deliverables", "Agreed functionality", "Timeline and expectations"] },
  { number: "03", label: "Collaborate", title: "Design & Build", body: "We get to work on your custom website, keeping you involved throughout. Your feedback helps shape the design and functionality as the project comes together.", bullets: ["Custom design and development", "Regular progress updates", "Your input throughout"] },
  { number: "04", label: "Refine", title: "Review & Refine", body: "We send you the finished website to explore. You tell us what you like and what you'd change, and we go back and forth until you're happy with the result.", bullets: ["Full website review", "Feedback and refinements", "Your final sign-off"] },
  { number: "05", label: "Go Live", title: "Launch", body: "Once you're happy and everything's been checked, we launch your website and make sure it's ready for your business to use.", bullets: ["Final checks", "Website goes live", "Handover and guidance"] },
] as const;
