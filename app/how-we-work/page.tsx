import type { Metadata } from "next";
import { LightSiteHeader } from "@/components/landing/LightSiteHeader";
import { HowWeWorkSection } from "@/components/landing/LandingPage";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "How We Work",
  description: "From discovery call and project agreement through collaborative design, review and launch. Our target is 14 days or less.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <LightSiteHeader active="how-we-work" compact />
      <main><HowWeWorkSection /></main>
      <SiteFooter />
    </>
  );
}
