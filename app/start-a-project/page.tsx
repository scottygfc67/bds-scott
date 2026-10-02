import type { Metadata } from "next";
import { StartProjectPage } from "@/components/project-enquiry/StartProjectPage";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const metadata: Metadata = {
  title: "Start a Project | Briggs Digital Solutions",
  description: "Tell Briggs Digital Solutions what you’re looking to build. Start a website, management system, integration or custom digital project with our Belfast-based team.",
};

export default function Page() {
  return <><StartProjectPage /><SiteFooter /></>;
}
