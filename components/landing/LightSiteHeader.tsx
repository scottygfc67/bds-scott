"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./LightSiteHeader.module.css";

const navItems = [
  { label: "Work", href: "/#work", key: "work" },
  { label: "What We Build", href: "/what-we-build", key: "what-we-build" },
  { label: "How We Work", href: "/#how-we-work", key: "how-we-work" },
] as const;

export function LightSiteHeader({ active, compact = false }: { active?: "what-we-build" | "start-a-project"; compact?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  const startHref = active === "start-a-project" ? "#project-form" : "/start-a-project";

  return (
    <header className={`${styles.header} ${compact ? styles.compact : ""} ${open ? styles.headerOpen : ""}`}>
      <Link href="/" aria-label="Briggs Digital Solutions — home" className={styles.logoLink}>
        <Image src="/bdslogo.png" alt="Briggs Digital Solutions" width={740} height={181} className={styles.logo} priority />
      </Link>
      <nav className={styles.desktopNav} aria-label="Primary">
        {navItems.map((item) => <Link href={item.href} key={item.href} aria-current={active === item.key ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <Link href={startHref} className={styles.headerCta} aria-current={active === "start-a-project" ? "page" : undefined}><span>Start a Project</span><ArrowUpRight aria-hidden="true" /></Link>
      <button type="button" className={styles.menuButton} aria-expanded={open} aria-controls="site-mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <div id="site-mobile-menu" className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile primary">
          {[...navItems, { label: "Start a Project", href: startHref, key: "start-a-project" as const }].map((item, index) => (
            <Link href={item.href} key={item.href} aria-current={active === item.key ? "page" : undefined} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}<ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
