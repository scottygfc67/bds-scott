import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { links } from "@/lib/landing-content";
import styles from "./LandingPage.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerSignoff}>Built in Belfast.<br />Made to work anywhere<span className={styles.blueDot} aria-hidden="true">.</span></div>
        <div className={styles.footerContact}>
          <a href={links.email}><Mail aria-hidden="true" /><span>hello@briggsdigitalsolutions.com</span></a>
          <div><MapPin aria-hidden="true" /><p>Belfast, Northern Ireland<span>Working across UK / Ireland</span></p></div>
        </div>
        <div className={styles.footerWordmark} aria-label="Briggs">BRIGGS<span className={styles.footerDot}>.</span></div>
        <div className={styles.footerBottom}>
          <span>© 2026 Briggs Digital Solutions. All rights reserved.</span>
          <nav aria-label="Legal"><Link href={links.privacy}>Privacy</Link><i /><Link href={links.terms}>Terms</Link></nav>
        </div>
      </div>
    </footer>
  );
}
