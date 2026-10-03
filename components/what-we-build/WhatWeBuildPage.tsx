"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Database,
  FileText,
  Gauge,
  ImageIcon,
  Mail,
  MonitorSmartphone,
  MousePointerClick,
  Package,
  PanelsTopLeft,
  Shapes,
  ShoppingBag,
  Users,
} from "lucide-react";
import styles from "./WhatWeBuildPage.module.css";

const easing = [0.22, 1, 0.36, 1] as const;

const heroLayers = [
  { number: "01", eyebrow: "PUBLIC EXPERIENCE", title: "WEBSITE", description: "The part your customers see.", image: "/whatwedo_mockup_1.png", className: styles.websiteLayer },
  { number: "02", eyebrow: "MANAGEMENT SYSTEM", title: "", description: "The part your business uses.", image: "/whatwedo_mockup_2.png", className: styles.cmsLayer },
  { number: "03", eyebrow: "INTEGRATIONS & AUTOMATION", title: "", description: "The parts that make everything work together.", image: "/whatwedo_mockup_3.png", className: styles.automationLayer },
] as const;

const publicFeatures = [
  { title: "Custom design", body: "Built around the brand and audience.", Icon: Shapes },
  { title: "Responsive by default", body: "Designed properly across desktop, tablet and mobile.", Icon: MonitorSmartphone },
  { title: "Conversion-led structure", body: "Pages and journeys shaped around what visitors actually need to do.", Icon: MousePointerClick },
  { title: "Performance + accessibility", body: "Fast, usable and technically sound.", Icon: Gauge },
] as const;

const managementModules = [
  { title: "Content", Icon: FileText }, { title: "Projects", Icon: PanelsTopLeft }, { title: "Orders", Icon: ShoppingBag }, { title: "Customers", Icon: Users },
  { title: "Products", Icon: Package }, { title: "Bookings", Icon: CalendarDays }, { title: "Users", Icon: Users }, { title: "Enquiries", Icon: Mail },
  { title: "Events", Icon: CalendarDays }, { title: "Documents", Icon: BookOpen }, { title: "Media", Icon: ImageIcon }, { title: "Reporting", Icon: Database },
] as const;

const workflows = [
  { title: "Someone submits an enquiry.", items: ["CRM record created", "Acknowledgement sent", "Team notified"] },
  { title: "Someone makes a booking.", items: ["Payment taken", "Calendar updated", "Confirmation sent"] },
  { title: "Someone updates content.", items: ["Website updates", "Connected data stays in sync", "No manual work needed"] },
] as const;

function BlueDot() {
  return <span className={styles.blueDot} aria-hidden="true">.</span>;
}

function SectionLabel({ children, inverse = false }: { children: React.ReactNode; inverse?: boolean }) {
  return <div className={`${styles.sectionLabel} ${inverse ? styles.sectionLabelInverse : ""}`}><i aria-hidden="true" /><span>{children}</span><b aria-hidden="true" /></div>;
}

function Reveal({ children, className = "", delay = 0, amount = .14 }: { children: React.ReactNode; className?: string; delay?: number; amount?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount }} transition={{ duration: .58, delay, ease: easing }}>{children}</motion.div>;
}

function PrimaryLink({ children }: { children: React.ReactNode }) {
  return <Link href="/start-a-project" className={styles.primaryButton}><span>{children}</span><ArrowRight aria-hidden="true" /></Link>;
}

function HeroSystemStack() {
  return <div className={styles.stackArea} aria-label="The three layers of a connected business system">
    <div className={styles.stackVisual}>
      {heroLayers.map((layer, index) => <div className={`${styles.stackLayer} ${layer.className}`} key={layer.number}>
        <Image src={layer.image} alt="" width={index === 2 ? 1448 : 1536} height={index === 2 ? 1086 : 1024} sizes="(max-width: 767px) 78vw, 34vw" priority={index === 0} />
      </div>)}
    </div>
    <div className={styles.stackLabels}>
      {heroLayers.map((layer) => <div className={styles.stackLabel} key={layer.number}>
        <i aria-hidden="true" /><div><strong>{layer.eyebrow}</strong>{layer.title && <b>{layer.title}</b>}<span>{layer.description}</span></div><em>{layer.number}</em>
      </div>)}
    </div>
  </div>;
}

function WhatWeBuildHero() {
  return <section className={styles.hero}>
    <div className={styles.heroInner}>
      <div className={styles.heroCopy}>
        <SectionLabel>WHAT WE BUILD</SectionLabel>
        <h1><span>BUILT AROUND</span><span>HOW YOUR BUSINESS</span><span>ACTUALLY WORKS<BlueDot /></span></h1>
        <p>Every business is different. We design the public-facing experience, then build the tools, integrations and workflows behind it — so everything works together.</p>
        <PrimaryLink>Start a Project</PrimaryLink>
      </div>
      <HeroSystemStack />
    </div>
  </section>;
}

function BigIdeaSection() {
  return <section className={`${styles.section} ${styles.darkSection} ${styles.bigIdea}`}>
    <div className={`${styles.sectionInner} ${styles.bigIdeaGrid}`}>
      <Reveal className={styles.sectionCopy}>
        <SectionLabel inverse>THE BIG IDEA</SectionLabel>
        <h2>ONE BUSINESS.<br />ONE CONNECTED<br />SYSTEM<BlueDot /></h2>
        <p>A website might be the part your customers see. But behind it, your business may need content management, enquiries, bookings, payments, customer data, integrations or automation.</p>
        <p>We build the parts that are actually useful — and leave out the ones that aren’t.</p>
        <strong className={styles.blueStatement}>ONLY WHAT YOU NEED.</strong>
      </Reveal>
      <Reveal className={styles.connectedSystemVisual} delay={.08}>
        <Image src="/connectedsystem2.png" alt="Connected business system showing customers, website, enquiries, bookings, payments, content, management system, CRM, email and database" width={1448} height={1086} sizes="(max-width: 900px) 94vw, 52vw" />
      </Reveal>
    </div>
  </section>;
}

function PublicFacingSection() {
  return <section className={`${styles.section} ${styles.lightSection}`}>
    <div className={`${styles.sectionInner} ${styles.capabilityGrid}`}>
      <Reveal className={styles.sectionCopy}>
        <SectionLabel>01 / PUBLIC-FACING</SectionLabel>
        <h2>THE PART<br />PEOPLE SEE<BlueDot /></h2>
        <p>Your website should make the business clear, make the right impression and make the next action obvious.</p>
        <strong className={styles.supportingLine}>We design from the business outward — not from a template inward.</strong>
        <div className={styles.featureList}>{publicFeatures.map(({ title, body, Icon }, index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .45, delay: index * .07, ease: easing }}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{body}</p></div></motion.article>)}</div>
      </Reveal>
      <Reveal className={styles.annotatedVisual} delay={.08}>
        <div className={styles.annotationTop}><span>NAVIGATION</span><span>CONTENT HIERARCHY</span></div>
        <div className={styles.sectionMockup}><Image src="/whatwedo_mockup_1.png" alt="Example public-facing business website" width={1536} height={1024} sizes="(max-width: 900px) 92vw, 58vw" /></div>
        <div className={styles.annotationBottom}><span>CONVERSION</span><span>RESPONSIVE</span></div>
      </Reveal>
    </div>
  </section>;
}

function ManagementSection() {
  return <section className={`${styles.section} ${styles.darkSection} ${styles.management}`}>
    <div className={styles.sectionInner}>
      <div className={styles.capabilityGrid}>
        <Reveal className={styles.sectionCopy}>
          <SectionLabel inverse>02 / BEHIND THE WEBSITE</SectionLabel>
          <h2>THE PART<br />YOUR BUSINESS<br />USES<BlueDot /></h2>
          <p>If your business needs to update, organise or manage information regularly, we can build the tools behind the website around the way you actually work.</p>
          <strong className={`${styles.blueStatement} ${styles.managementStatement}`}>NOT A DASHBOARD<br />FULL OF FEATURES<br />YOU DON’T NEED.</strong>
          <p className={styles.smallSupport}>The management system is shaped around the project.</p>
        </Reveal>
        <Reveal className={styles.sectionMockup} delay={.08}><Image src="/whatwedo_mockup_2.png" alt="Example custom website management system showing editable pages" width={1536} height={1024} sizes="(max-width: 900px) 92vw, 58vw" /></Reveal>
      </div>
      <Reveal className={styles.modules}>
        <span className={styles.microLabel}>EXAMPLE MODULES</span>
        <div className={styles.moduleGrid}>{managementModules.map(({ title, Icon }) => <div key={title}><Icon aria-hidden="true" /><span>{title}</span></div>)}</div>
        <p>Your system might need three of these. It might need ten. The point is that it should reflect the business — not force the business to adapt to the software.</p>
      </Reveal>
    </div>
  </section>;
}

function ConnectedSystemsSection() {
  return <section className={`${styles.section} ${styles.lightSection} ${styles.connected}`}>
    <div className={styles.sectionInner}>
      <div className={styles.capabilityGrid}>
        <Reveal className={styles.sectionCopy}>
          <SectionLabel>03 / CONNECTED SYSTEMS</SectionLabel>
          <h2>THE PARTS THAT<br />MAKE EVERYTHING<br />WORK TOGETHER<BlueDot /></h2>
          <strong className={styles.leadStatement}>A form shouldn’t just send an email.</strong>
          <p>It could create an enquiry, notify the right person, store the customer, send an acknowledgement and trigger the next step automatically.</p>
        </Reveal>
        <Reveal className={`${styles.sectionMockup} ${styles.integrationMockup}`} delay={.08}><Image src="/whatwedo_mockup_3(new).png" alt="Example connected digital system linking forms, payments, email, calendar, CRM, database, APIs and workflows" width={1580} height={995} sizes="(max-width: 900px) 92vw, 58vw" /></Reveal>
      </div>
      <Reveal className={styles.realExamples}>
        <span className={styles.microLabel}>REAL EXAMPLES</span>
        <div>{workflows.map((workflow) => <article key={workflow.title}><h3>{workflow.title}</h3><ul>{workflow.items.map((item) => <li key={item}><i aria-hidden="true" />{item}</li>)}</ul></article>)}</div>
      </Reveal>
    </div>
  </section>;
}

export function WhatWeBuildPage() {
  return <main className={styles.page}>
    <WhatWeBuildHero />
    <BigIdeaSection />
    <PublicFacingSection />
    <ManagementSection />
    <ConnectedSystemsSection />
  </main>;
}
