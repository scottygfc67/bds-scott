import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LightSiteHeader } from "@/components/landing/LightSiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";
import styles from "./LegalPage.module.css";

type ContentsItem = {
  id: string;
  label: string;
};

type LegalPageProps = {
  label: string;
  title: string;
  intro: string;
  contents: readonly ContentsItem[];
  relatedHref: "/privacy" | "/terms";
  relatedLabel: string;
  children: React.ReactNode;
};

export const LEGAL_LAST_UPDATED = "3 October 2026";

export function LegalPage({ label, title, intro, contents, relatedHref, relatedLabel, children }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <LightSiteHeader />
      <main>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.sectionLabel}><i aria-hidden="true" /><span>{label}</span><b aria-hidden="true" /></div>
            <h1>{title}<span aria-hidden="true">.</span></h1>
            <div className={styles.heroMeta}>
              <p>{intro}</p>
              <p><strong>LAST UPDATED</strong><time dateTime="2026-10-03">{LEGAL_LAST_UPDATED}</time></p>
            </div>
          </div>
        </header>

        <div className={styles.document}>
          <aside className={styles.contents}>
            <div>
              <strong>ON THIS PAGE</strong>
              <nav aria-label="On this page">
                <ol>
                  {contents.map((item, index) => <li key={item.id}><a href={`#${item.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a></li>)}
                </ol>
              </nav>
              <Link href={relatedHref} className={styles.relatedLink}>{relatedLabel}<ArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>
          <article className={styles.content}>{children}</article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ number, id, title, children }: { number: string; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={styles.legalSection}>
      <div className={styles.sectionHeading}><span>{number}</span><h2>{title}</h2></div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function LegalContact({ label = "Privacy enquiries" }: { label?: string }) {
  return (
    <address className={styles.contact}>
      <strong>{label}</strong>
      <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>
      <span>Belfast, Northern Ireland</span>
    </address>
  );
}
