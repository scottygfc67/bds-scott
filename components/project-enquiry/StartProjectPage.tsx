"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  CircleHelp,
  CreditCard,
  Database,
  Mail,
  MapPin,
  Monitor,
  PanelsTopLeft,
  Shapes,
  X,
  Zap,
} from "lucide-react";
import { LightSiteHeader } from "@/components/landing/LightSiteHeader";
import {
  budgetOptions,
  emptyProjectEnquiry,
  projectTypes,
  ProjectEnquiry,
  timelineOptions,
} from "@/lib/project-enquiry";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";
import styles from "./StartProjectPage.module.css";

type Step = 1 | 2 | 3;
type FieldErrors = Partial<Record<keyof ProjectEnquiry, string>>;

const typeIcons = [Monitor, PanelsTopLeft, Database, CreditCard, Zap, Shapes, CircleHelp];

const nextSteps = [
  { number: "01", title: "We review your details", body: "We’ll take a look at what you’ve sent and get a clear understanding of your goals." },
  { number: "02", title: "We get in touch", body: "We’ll reply directly, usually within 1–2 working days, to discuss your project in more detail." },
  { number: "03", title: "You get a clear plan", body: "We’ll recommend the right approach, with a clear next step and no obligation." },
] as const;

const faqs = [
  { question: "Do I need a fully defined brief?", answer: "No. An idea, problem or goal is enough to start. We can work through the structure, functionality and technical requirements with you before anything moves into development." },
  { question: "Can you work with an existing website?", answer: "Yes. Depending on the project, we can redesign an existing site, rebuild it properly, or keep useful parts of the current setup while improving what is not working." },
  { question: "Do you only work with businesses in Northern Ireland?", answer: "No. Briggs Digital Solutions is based in Belfast and works with businesses across the UK and Ireland, with projects handled remotely where needed." },
  { question: "What happens after I submit the form?", answer: "We’ll review the details you send and reply directly to discuss the project, clarify anything we need to understand and recommend the next step." },
] as const;

function BlueDot() {
  return <span className={styles.blueDot} aria-hidden="true">.</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className={styles.sectionLabel}><i aria-hidden="true" /><span>{children}</span><b aria-hidden="true" /></div>;
}

function TextField({ id, label, required, value, placeholder, type = "text", error, onChange }: {
  id: keyof ProjectEnquiry;
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input id={id} name={id} type={type} required={required} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <span className={styles.fieldError} id={`${id}-error`}>{error}</span>}
    </div>
  );
}

function StepHeader({ step, onPrevious, onNext }: { step: Step; onPrevious: () => void; onNext: () => void }) {
  const info = [
    ["YOUR DETAILS", "Let’s start with a few basics."],
    ["THE PROJECT", "Tell us about what you’re looking to build."],
    ["PRACTICALS", "A few final details to help us scope things."],
  ][step - 1];

  return (
    <div className={styles.stepHeader}>
      <div className={styles.stepTopline}>
        <h2 tabIndex={-1} id={`step-${step}-heading`}><span>0{step}</span> / {info[0]}</h2>
        <div className={styles.stepTools}>
          <span>0{step} / 03</span>
          <button type="button" onClick={onPrevious} disabled={step === 1} aria-label="Previous step"><ArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={onNext} disabled={step === 3} aria-label="Next step"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <p>{info[1]}</p>
      <div className={styles.progress} aria-label={`Step ${step} of 3`} role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
        {[1, 2, 3].map((part) => <i key={part} className={part <= step ? styles.progressActive : ""} />)}
      </div>
    </div>
  );
}

function ProjectForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<ProjectEnquiry>(emptyProjectEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ProjectEnquiry>(field: K, value: ProjectEnquiry[K]) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const validate = (currentStep: Step) => {
    const nextErrors: FieldErrors = {};
    if (currentStep === 1) {
      if (!data.name.trim()) nextErrors.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) nextErrors.email = "Please enter a valid email address.";
      if (data.website.trim() && !/^(https?:\/\/)?(www\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z]{2,})(?:[/:?#][^\s]*)?$/i.test(data.website.trim())) nextErrors.website = "Please enter a valid website address.";
    }
    if (currentStep === 2) {
      if (!data.projectTypes.length) nextErrors.projectTypes = "Please choose at least one option.";
      if (data.projectDescription.trim().length < 20) nextErrors.projectDescription = "Please add a little more detail (at least 20 characters).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveTo = (nextStep: Step) => {
    setStep(nextStep);
    setErrors({});
    requestAnimationFrame(() => document.getElementById(`step-${nextStep}-heading`)?.focus());
  };

  const next = () => {
    if (step < 3 && validate(step)) moveTo((step + 1) as Step);
  };

  const toggleProjectType = (option: string) => {
    const unsure = "I’m not sure yet";
    if (option === unsure) return update("projectTypes", data.projectTypes.includes(option) ? [] : [option]);
    const withoutUnsure = data.projectTypes.filter((item) => item !== unsure);
    update("projectTypes", withoutUnsure.includes(option) ? withoutUnsure.filter((item) => item !== option) : [...withoutUnsure, option]);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 3 || status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/project-enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Unable to deliver enquiry");
      setStatus("success");
      requestAnimationFrame(() => panelRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  const preventEnterAdvance = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && step < 3 && event.target instanceof HTMLInputElement) event.preventDefault();
  };

  if (status === "success") {
    return (
      <div className={`${styles.formPanel} ${styles.successPanel}`} ref={panelRef} tabIndex={-1} role="status">
        <span className={styles.successIcon}><Check aria-hidden="true" /></span>
        <h2>PROJECT RECEIVED<BlueDot /></h2>
        <p>Thanks — your project details are through. We’ll review what you’ve sent and get back to you directly.</p>
        <div className={styles.successEmail}>Need to add something?<a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a></div>
        <Link href="/" className={styles.primaryButton}>Back to Briggs <ArrowRight aria-hidden="true" /></Link>
      </div>
    );
  }

  return (
    <div className={styles.formPanel} ref={panelRef}>
      <form onSubmit={submit} onKeyDown={preventEnterAdvance} noValidate>
        <StepHeader step={step} onPrevious={() => step > 1 && moveTo((step - 1) as Step)} onNext={next} />
        <div className={styles.stepPane} key={step}>
          {step === 1 && <div className={styles.detailsGrid}>
            <TextField id="name" label="Your name" required value={data.name} placeholder="John Doe" error={errors.name} onChange={(value) => update("name", value)} />
            <TextField id="email" label="Email address" required type="email" value={data.email} placeholder="you@company.com" error={errors.email} onChange={(value) => update("email", value)} />
            <TextField id="business" label="Business / organisation" value={data.business} placeholder="Your business name (optional)" error={errors.business} onChange={(value) => update("business", value)} />
            <TextField id="website" label="Existing website" value={data.website} placeholder="https:// (optional)" error={errors.website} onChange={(value) => update("website", value)} />
            <button type="button" className={`${styles.primaryButton} ${styles.fullButton}`} onClick={next}>Continue <ArrowRight aria-hidden="true" /></button>
          </div>}

          {step === 2 && <>
            <fieldset className={styles.choiceFieldset} aria-describedby={errors.projectTypes ? "projectTypes-error" : undefined}>
              <legend>What are you looking to build? <span>(select all that apply)</span></legend>
              <div className={styles.projectGrid}>
                {projectTypes.map((option, index) => {
                  const Icon = typeIcons[index] ?? Box;
                  const checked = data.projectTypes.includes(option);
                  return <label className={styles.projectOption} key={option}><input type="checkbox" checked={checked} onChange={() => toggleProjectType(option)} /><Icon aria-hidden="true" /><span>{option}</span><i aria-hidden="true">{checked && <Check />}</i></label>;
                })}
              </div>
              {errors.projectTypes && <span className={styles.fieldError} id="projectTypes-error">{errors.projectTypes}</span>}
            </fieldset>
            <div className={styles.field}>
              <label htmlFor="projectDescription">Tell us about the project.<span aria-hidden="true"> *</span></label>
              <textarea id="projectDescription" name="projectDescription" required minLength={20} value={data.projectDescription} placeholder="What does the business do? What are you trying to improve, replace or make possible?" onChange={(event) => update("projectDescription", event.target.value)} aria-invalid={Boolean(errors.projectDescription)} aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined} />
              {errors.projectDescription && <span className={styles.fieldError} id="projectDescription-error">{errors.projectDescription}</span>}
            </div>
            <div className={styles.formActions}><button type="button" className={styles.backButton} onClick={() => moveTo(1)}><ArrowLeft aria-hidden="true" /> Back</button><button type="button" className={styles.primaryButton} onClick={next}>Continue <ArrowRight aria-hidden="true" /></button></div>
          </>}

          {step === 3 && <>
            <div className={styles.practicalsGrid}>
              <ChoiceGroup name="budget" legend="What level of investment are you considering?" options={budgetOptions} selected={data.budget} onSelect={(value) => update("budget", value)} />
              <ChoiceGroup name="timeline" legend="When would you ideally like to get started?" options={timelineOptions} selected={data.timeline} onSelect={(value) => update("timeline", value)} />
            </div>
            {status === "error" && <div className={styles.submitError} role="alert">Something went wrong sending your project details. Please try again or email <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>.</div>}
            <div className={styles.formActions}><button type="button" className={styles.backButton} onClick={() => moveTo(2)}><ArrowLeft aria-hidden="true" /> Back</button><button type="submit" className={styles.primaryButton} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Project Details"} <ArrowRight aria-hidden="true" /></button></div>
          </>}
        </div>
      </form>
    </div>
  );
}

function ChoiceGroup({ name, legend, options, selected, onSelect }: { name: "budget" | "timeline"; legend: string; options: readonly string[]; selected: string; onSelect: (value: string) => void }) {
  return <fieldset className={styles.choiceGroup}><legend>{legend}</legend><div>{options.map((option) => <label className={styles.compactChoice} key={option}><input type="radio" name={name} value={option} checked={selected === option} onChange={() => onSelect(option)} /><span>{option}</span><i aria-hidden="true">{selected === option && <Check />}</i></label>)}</div></fieldset>;
}

function ProjectIntro() {
  return <aside className={styles.intro}>
    <SectionLabel>START A PROJECT</SectionLabel>
    <h1><span>TELL US</span><span>WHAT</span><span>YOU’RE</span><span>BUILDING<BlueDot /></span></h1>
    <p>You don’t need a technical brief. Tell us what you’re trying to achieve and we’ll work out the right solution for your business.</p>
    <div className={styles.location}><MapPin aria-hidden="true" /><span>BASED IN BELFAST<small>WORKING ACROSS UK / IRELAND</small></span></div>
    <div className={styles.preferEmail}><span>Prefer email?</span><a href={CONTACT_EMAIL_HREF}><Mail aria-hidden="true" />{CONTACT_EMAIL}</a></div>
  </aside>;
}

function WhatHappensNext() {
  return <section className={styles.nextSection}><div className={styles.sectionInner}>
    <div className={styles.nextHeading}><SectionLabel>WHAT HAPPENS NEXT</SectionLabel><h2>A STRAIGHT<br />FORWARD<br />PROCESS<BlueDot /></h2></div>
    <div className={styles.nextGrid}>{nextSteps.map((item) => <article key={item.number}><span>{item.number}</span><i aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
  </div></section>;
}

function ProjectFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className={styles.faqSection}><div className={`${styles.sectionInner} ${styles.faqInner}`}>
    <div><SectionLabel>FREQUENTLY ASKED</SectionLabel><h2>SOME<br />COMMON<br />QUESTIONS<BlueDot /></h2></div>
    <div className={styles.faqList}>{faqs.map((faq, index) => {
      const expanded = open === index;
      return <div className={`${styles.faqItem} ${expanded ? styles.faqOpen : ""}`} key={faq.question}>
        <h3><button type="button" aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(expanded ? null : index)}><span>{faq.question}</span><i aria-hidden="true">{expanded ? <X /> : <span>+</span>}</i></button></h3>
        <div className={styles.faqAnswer} id={`faq-answer-${index}`}><div><p>{faq.answer}</p></div></div>
      </div>;
    })}</div>
  </div></section>;
}

export function StartProjectPage() {
  return <div className={styles.page}>
    <LightSiteHeader active="start-a-project" />
    <main>
      <section id="project-form" className={styles.projectSection}><div className={styles.projectShell}><ProjectIntro /><ProjectForm /></div></section>
      <WhatHappensNext />
      <ProjectFaq />
    </main>
  </div>;
}
