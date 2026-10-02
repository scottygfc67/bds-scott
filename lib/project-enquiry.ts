export const projectTypes = [
  "New website",
  "Website redesign",
  "Website + management system",
  "Bookings / payments / online functionality",
  "Integrations / automation",
  "Something more custom",
  "I’m not sure yet",
] as const;

export const budgetOptions = [
  "Under £1,500",
  "£1,500 – £3,000",
  "£3,000 – £5,000",
  "£5,000 – £10,000",
  "£10,000+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1–2 months",
  "Within 3 months",
  "Later this year",
  "Just exploring",
] as const;

export type ProjectEnquiry = {
  name: string;
  email: string;
  business: string;
  website: string;
  projectTypes: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
};

export const emptyProjectEnquiry: ProjectEnquiry = {
  name: "",
  email: "",
  business: "",
  website: "",
  projectTypes: [],
  projectDescription: "",
  budget: "",
  timeline: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const websitePattern = /^(https?:\/\/)?(www\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z]{2,})(?:[/:?#][^\s]*)?$/i;

export function validateProjectEnquiry(value: unknown) {
  const errors: Partial<Record<keyof ProjectEnquiry, string>> = {};
  if (!value || typeof value !== "object") {
    return { valid: false, errors: { name: "Invalid enquiry data." } };
  }

  const data = value as Partial<ProjectEnquiry>;
  if (typeof data.name !== "string" || !data.name.trim()) errors.name = "Please enter your name.";
  if (typeof data.email !== "string" || !emailPattern.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (typeof data.business !== "string") errors.business = "Invalid business name.";
  if (typeof data.website !== "string" || (data.website.trim() && !websitePattern.test(data.website.trim()))) errors.website = "Please enter a valid website address.";
  if (!Array.isArray(data.projectTypes) || data.projectTypes.length === 0 || data.projectTypes.some((item) => !projectTypes.includes(item as (typeof projectTypes)[number]))) {
    errors.projectTypes = "Please choose at least one option.";
  }
  if (typeof data.projectDescription !== "string" || data.projectDescription.trim().length < 20) {
    errors.projectDescription = "Please add a little more detail (at least 20 characters).";
  }
  if (typeof data.budget !== "string" || (data.budget && !budgetOptions.includes(data.budget as (typeof budgetOptions)[number]))) errors.budget = "Invalid budget option.";
  if (typeof data.timeline !== "string" || (data.timeline && !timelineOptions.includes(data.timeline as (typeof timelineOptions)[number]))) errors.timeline = "Invalid timeline option.";

  return { valid: Object.keys(errors).length === 0, errors };
}
