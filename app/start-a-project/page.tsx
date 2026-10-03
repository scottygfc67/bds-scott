import type { Metadata } from "next";
import { StartProjectPage } from "@/components/project-enquiry/StartProjectPage";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Project",
  description: "Tell Briggs Digital Solutions what you’re building and we’ll help define the right website, management system or digital solution.",
  path: "/start-a-project",
});

export default function Page() {
  return <><StartProjectPage /><SiteFooter /></>;
}
