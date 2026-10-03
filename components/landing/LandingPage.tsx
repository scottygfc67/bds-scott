"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  FileText,
  Globe2,
  Mail,
  MessageSquareText,
} from "lucide-react";
import {
  buildAreas,
  links,
  navItems,
  processSteps,
  projectFeatures,
  proofMetrics,
} from "@/lib/landing-content";
import styles from "./LandingPage.module.css";
import { SiteFooter } from "./SiteFooter";

const easing = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ number, children, inverse = false }: { number: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <div className={`${styles.sectionLabel} ${inverse ? styles.sectionLabelInverse : ""}`}>
      <span className={styles.labelSquare} aria-hidden="true" />
      <span className={styles.labelNumber}>{number}</span>
      <span aria-hidden="true">/</span>
      <span>{children}</span>
      <span className={styles.labelRule} aria-hidden="true" />
    </div>
  );
}

function BlueDot() {
  return <span className={styles.blueDot} aria-hidden="true">.</span>;
}

function Reveal({ children, className = "", delay = 0, amount = 0.18 }: { children: React.ReactNode; className?: string; delay?: number; amount?: number }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`${styles.primaryButton} ${className}`}>
      <span>{children}</span><ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

function LandingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header className={styles.header} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: easing }}>
      <Link href="#top" aria-label="Briggs Digital Solutions — home" className={styles.logoLink}>
        <Image src="/bdslogo.png" alt="Briggs Digital Solutions" width={740} height={181} className={styles.logo} />
      </Link>
      <nav aria-label="Primary" className={styles.desktopNav}>
        {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <PrimaryLink href={links.startProject} className={styles.headerCta}>Start a Project</PrimaryLink>
      <button className={styles.menuButton} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
      <div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile primary">
          {[...navItems, { label: "Start a Project", href: links.startProject }].map((item, index) => (
            <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}<ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  const lines = ["WE BUILD", "WEBSITES THAT", "DO MORE."];
  return (
    <section id="top" className={styles.hero}>
      <motion.div className={styles.heroMedia} initial={false} animate={{ scale: 1 }} transition={{ duration: 1.1, ease: easing }}>
        <Image src="/hero.png" alt="" fill priority sizes="100vw" className={styles.heroImage} />
      </motion.div>
      <div className={styles.heroOverlay} aria-hidden="true" />
      <LandingHeader />
      <div className={styles.heroContent}>
        <motion.div className={styles.heroEyebrow} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
          Belfast based <span>/</span> Working worldwide <i aria-hidden="true" />
        </motion.div>
        <h1 className={styles.heroTitle}>
          {lines.map((line, i) => (
            <span className={styles.heroLineClip} key={line}>
              <motion.span initial={false} animate={{ y: 0 }} transition={{ duration: 0.65, delay: 0.22 + i * 0.09, ease: easing }}>
                <span className={styles.desktopHeroLine}>{line}</span>
                <span className={styles.mobileHeroLine}>{["WE BUILD", "WEBSITES", "THAT DO", "MORE."][i] ?? ""}</span>
                {i === lines.length - 1 && <BlueDot />}
              </motion.span>
            </span>
          ))}
          <span className={`${styles.heroLineClip} ${styles.mobileOnlyLastLine}`}>
            <motion.span initial={false} animate={{ y: 0 }} transition={{ duration: 0.65, delay: 0.49, ease: easing }}>MORE.<BlueDot /></motion.span>
          </span>
        </h1>
        <motion.p className={styles.heroCopy} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.48, ease: easing }}>
          Design-led websites, web applications and digital systems built around what your business actually needs.
        </motion.p>
        <motion.div className={styles.heroActions} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.58, ease: easing }}>
          <PrimaryLink href={links.startProject}>Start a Project</PrimaryLink>
          <Link href={links.work} className={styles.secondaryButton}>See Our Work <ArrowDown aria-hidden="true" /></Link>
        </motion.div>
      </div>
      <div className={styles.heroMicrocopy}>Design<br />Development<br />Systems</div>
      <motion.div className={styles.heroProof} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.72, ease: easing }}>
        {proofMetrics.map((metric) => (
          <div key={metric.number} className={styles.proofMetric}>
            <span>{metric.number}</span><strong>{metric.title}</strong><small>{metric.detail}</small>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function DesktopDevice({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`${styles.desktopDevice} ${className}`}>
      <div className={styles.browserBar}><span /><span /><span /></div>
      <Image src={src} alt={alt} width={1522} height={692} sizes="(max-width: 767px) 94vw, 62vw" />
    </div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const props = { size: 28, strokeWidth: 1.6, "aria-hidden": true } as const;
  if (name === "file") return <FileText {...props} />;
  if (name === "calendar") return <CalendarDays {...props} />;
  if (name === "mail") return <Mail {...props} />;
  if (name === "chart") return <BarChart3 {...props} />;
  return <Globe2 {...props} />;
}

function ProjectActions() {
  return (
    <div className={styles.projectActions}>
      <PrimaryLink href={links.dbmCaseStudy}>View Project</PrimaryLink>
      <a href={links.dbmWebsite} target="_blank" rel="noreferrer" className={styles.projectTextLink}>Visit Website <ArrowRight aria-hidden="true" /></a>
    </div>
  );
}

function SelectedWorkSection() {
  return (
    <section id="work" className={styles.selectedWork}>
      <div className={styles.selectedInner}>
        <div className={styles.workCopy}>
          <Reveal><SectionLabel number="02">Selected Work</SectionLabel></Reveal>
          <Reveal delay={0.04}><h2 className={styles.sectionTitle}>Built to<br />Actually<br />Work<BlueDot /></h2></Reveal>
          <Reveal delay={0.08}><p className={styles.sectionIntro}>Good design gets attention. The right technology turns that attention into something useful.</p></Reveal>
          <Reveal className={styles.projectCopy} delay={0.1}>
            <div className={styles.projectMeta}><span>01</span><i /><span>2026</span></div>
            <h3>David Browne<br />Murray</h3>
            <h4>Musician website +<br />Digital platform</h4>
            <p>A custom artist website connected to the tools needed to manage gigs, releases, enquiries and an owned audience.</p>
            <ProjectActions />
          </Reveal>
        </div>
        <div className={styles.workVisuals}>
          <Reveal className={styles.publicVisual} delay={0.08}><span className={styles.visualLabel}>01 / Public Website</span><DesktopDevice src="/dbm_desktop_hero.png" alt="David Browne Murray musician website shown on desktop" /></Reveal>
          <Reveal className={styles.adminVisual} delay={0.16}><span className={styles.visualLabel}>02 / Artist CMS</span><DesktopDevice src="/dbm_desktop_admin.png" alt="David Browne Murray artist management dashboard" /></Reveal>
          <Reveal className={styles.phoneVisual} delay={0.22}>
            <div className={styles.phoneShell}><Image src="/dbm_mobile_mockup.png" alt="David Browne Murray musician website shown on mobile" width={863} height={1822} sizes="(max-width: 767px) 42vw, 15vw" /></div>
            <span className={`${styles.visualLabel} ${styles.phoneLabel}`}>Responsive / Mobile</span>
          </Reveal>
        </div>
        <div className={styles.mobileProjectActions}><ProjectActions /></div>
        <div className={styles.featureStrip}>
          {projectFeatures.map((feature) => (
            <div key={feature.title} className={styles.featureItem}>
              <FeatureIcon name={feature.icon} /><div><strong>{feature.title}</strong><span>{feature.detail}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeBuildSection() {
  return (
    <section id="what-we-build" className={styles.buildSection}>
      <div className={styles.sectionInner}>
        <div className={styles.buildHeader}>
          <Reveal><SectionLabel number="03" inverse>What We Build</SectionLabel></Reveal>
          <Reveal delay={0.04}><h2 className={styles.sectionTitle}>Built Around<br />How Your Business<br />Actually Works<BlueDot /></h2></Reveal>
          <Reveal delay={0.08}><p className={styles.sectionIntro}>Every business is different. We design the public-facing experience, then build the custom tools, integrations and workflows behind it — so everything actually works together.</p></Reveal>
          <div className={styles.buildMicrocopy}>Websites.<br />Management systems.<br />Digital systems.<br />Built for you.</div>
        </div>
        <div className={styles.buildGrid}>
          {buildAreas.map((area, index) => (
            <Reveal className={styles.buildArea} key={area.number} delay={index * 0.06} amount={0.12}>
              <div className={styles.buildAreaMeta}><strong>{area.number}</strong><i /><span>{area.label}</span></div>
              <div className={styles.buildAreaTitleRow}><h3>{area.title}</h3><span className={styles.decorativeArrow} aria-hidden="true"><ArrowRight /></span></div>
              <p>{area.body}</p>
              <div className={styles.buildImage}><Image src={area.image} alt={area.alt} width={1536} height={1024} sizes="(max-width: 767px) 92vw, 31vw" /></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  return (
    <section id="how-we-work" className={styles.processSection}>
      <div className={styles.sectionInner}>
        <div className={styles.processHeader}>
          <Reveal><SectionLabel number="04">How We Work</SectionLabel></Reveal>
          <Reveal delay={0.04}><h2 className={styles.sectionTitle}>Clear Process.<br />No Surprises<BlueDot /></h2></Reveal>
          <Reveal delay={0.08}><p className={styles.sectionIntro}>You’ll know what we’re building, what happens next, and you’ll approve the direction before development moves forward.</p></Reveal>
          <div className={styles.processMicrocopy}>Clear stages.<br />Direct communication.<br />Approved before<br />build.</div>
        </div>
        <div className={styles.timeline}>
          <motion.div className={styles.timelineLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1, ease: easing }} />
          {processSteps.map((step, index) => (
            <Reveal className={styles.timelineStep} key={step.number} delay={index * 0.07} amount={0.2}>
              <header><strong>{step.number}</strong><i /><span>{step.label}</span></header>
              <h3>{step.title}</h3>
              <span className={`${styles.timelineNode} ${index === processSteps.length - 1 ? styles.timelineNodeFinal : ""}`} aria-hidden="true" />
              <p>{step.body}</p>
              <ul>{step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.reassurance} amount={0.1}>
          <div className={styles.reassuranceTitle}>You deal with the people<br />actually building it<BlueDot /></div>
          <p>Direct communication from first conversation to launch. The same people planning the work are the ones designing and building it.</p>
          <div className={styles.approvalCallout}><MessageSquareText aria-hidden="true" /><span>You’ll see mockups and agree the direction before we move into build.</span></div>
          <div className={styles.processActions}><PrimaryLink href={links.startProject}>Start a Project</PrimaryLink><a href={links.email}>Get in touch</a></div>
        </Reveal>
      </div>
    </section>
  );
}

export function LandingPage() {
  return <><main><HeroSection /><SelectedWorkSection /><WhatWeBuildSection /><HowWeWorkSection /></main><SiteFooter /></>;
}
