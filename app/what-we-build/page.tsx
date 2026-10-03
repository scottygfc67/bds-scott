import type { Metadata } from "next";
import { LightSiteHeader } from "@/components/landing/LightSiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { WhatWeBuildPage } from "@/components/what-we-build/WhatWeBuildPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "What We Build | Briggs Digital Solutions",
  description: "Custom websites, management systems, integrations and digital tools built around how your business actually works. Briggs Digital Solutions, Belfast.",
};

export default function Page() {
  return <>
    <div className={styles.canvas}>
      <LightSiteHeader active="what-we-build" compact />
      <WhatWeBuildPage />
    </div>
    <SiteFooter />
  </>;
}
