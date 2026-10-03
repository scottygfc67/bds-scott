import type { Metadata } from "next";
import { LightSiteHeader } from "@/components/landing/LightSiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { WhatWeBuildPage } from "@/components/what-we-build/WhatWeBuildPage";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "What We Build",
  description: "Custom websites, management systems, integrations and digital tools built around how your business actually works.",
  path: "/what-we-build",
});

export default function Page() {
  return <>
    <div className={styles.canvas}>
      <LightSiteHeader active="what-we-build" compact />
      <WhatWeBuildPage />
    </div>
    <SiteFooter />
  </>;
}
