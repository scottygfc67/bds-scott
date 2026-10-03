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
const headerControlPattern = /[\r\n\0]/;

export function isValidEmailAddress(value: string) {
  return value.length <= 254 && !headerControlPattern.test(value) && emailPattern.test(value);
}

export function validateProjectEnquiry(value: unknown): {
  valid: boolean;
  errors: Partial<Record<keyof ProjectEnquiry, string>>;
  data?: ProjectEnquiry;
} {
  const errors: Partial<Record<keyof ProjectEnquiry, string>> = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { valid: false, errors: { name: "Invalid enquiry data." } };
  }

  const input = value as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const business = typeof input.business === "string" ? input.business.trim() : "";
  const website = typeof input.website === "string" ? input.website.trim() : "";
  const projectDescription = typeof input.projectDescription === "string" ? input.projectDescription.trim() : "";
  const budget = typeof input.budget === "string" ? input.budget.trim() : "";
  const timeline = typeof input.timeline === "string" ? input.timeline.trim() : "";
  const submittedProjectTypes = input.projectTypes;

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 120 || headerControlPattern.test(name)) errors.name = "Please enter a shorter valid name.";

  if (!isValidEmailAddress(email)) errors.email = "Please enter a valid email address.";
  if (business.length > 160 || headerControlPattern.test(business)) errors.business = "Please enter a shorter valid business name.";
  if (website.length > 500 || headerControlPattern.test(website) || (website && !websitePattern.test(website))) errors.website = "Please enter a valid website address.";

  if (
    !Array.isArray(submittedProjectTypes) ||
    submittedProjectTypes.length === 0 ||
    submittedProjectTypes.length > projectTypes.length ||
    submittedProjectTypes.some((item) => typeof item !== "string" || !projectTypes.includes(item as (typeof projectTypes)[number])) ||
    new Set(submittedProjectTypes).size !== submittedProjectTypes.length
  ) {
    errors.projectTypes = "Please choose at least one option.";
  }

  if (projectDescription.length < 20) {
    errors.projectDescription = "Please add a little more detail (at least 20 characters).";
  } else if (projectDescription.length > 5000 || projectDescription.includes("\0")) {
    errors.projectDescription = "Please keep the project description under 5,000 characters.";
  }

  if (budget && !budgetOptions.includes(budget as (typeof budgetOptions)[number])) errors.budget = "Invalid budget option.";
  if (timeline && !timelineOptions.includes(timeline as (typeof timelineOptions)[number])) errors.timeline = "Invalid timeline option.";

  if (Object.keys(errors).length > 0) return { valid: false, errors };

  return {
    valid: true,
    errors,
    data: {
      name,
      email,
      business,
      website,
      projectTypes: submittedProjectTypes as string[],
      projectDescription,
      budget,
      timeline,
    },
  };
}
