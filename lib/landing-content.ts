export const links = {
  startProject: "/start-a-project",
  work: "#work",
  whatWeBuild: "#what-we-build",
  howWeWork: "#how-we-work",
  dbmCaseStudy: "/work/david-browne-murray",
  dbmWebsite: "https://dbm-website-ebon.vercel.app/",
  email: "mailto:hello@briggsdigitalsolutions.com",
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
  { number: "01", label: "Understand", title: "Talk", body: "Tell us about your goals, current setup and what you’re looking to achieve.", bullets: ["Your goals", "Current setup", "Challenges", "Opportunities"] },
  { number: "02", label: "Define", title: "Plan", body: "We map out the pages, functionality, integrations and technical requirements so you know exactly what’s included.", bullets: ["Site structure", "Key functionality", "Integrations needed", "Clear project scope"] },
  { number: "03", label: "Approve", title: "Design", body: "We create the key screens and mockups first, so you can review and approve the direction before development starts.", bullets: ["Wireframes", "Visual mockups", "Responsive screens", "Your feedback and revisions"] },
  { number: "04", label: "Build", title: "Develop", body: "Once the design is approved, we build the responsive website, set up management tools and integrate the agreed functionality.", bullets: ["Front-end build", "CMS / management tools", "Integrations & automations", "Testing throughout"] },
  { number: "05", label: "Deliver", title: "Launch", body: "We test everything, deploy your website and provide training and ongoing support so you’re set up for success.", bullets: ["Final QA", "Deployment", "Handover & training", "Ongoing support (optional)"] },
] as const;
