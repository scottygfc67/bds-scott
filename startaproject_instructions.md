# Briggs Digital Solutions — Start a Project Page Implementation Specification

**Target route:** `/start-a-project`  
**Reference image:** `/references/startaproject_both_ref.png`  
**Framework:** Existing Next.js project  
**Goal:** Recreate the supplied “Start a Project” page as closely as possible while preserving the existing Briggs Digital Solutions visual system, responsiveness, accessibility and code quality.

---

# 0. Source of truth

Treat this document and the supplied reference image as the source of truth for this page.

Reference:

```text
/references/startaproject_both_ref.png
```

The reference is a **visual composition target**, not a flattened image to place on the page.

Rebuild the page with real HTML, CSS and React.

Do not insert the reference itself into the live page.

The page should feel like a direct extension of the main Briggs landing page:

- same soft off-white surface,
- same near-black text,
- same electric blue,
- same technical section labels,
- same brutal/editorial display typography,
- same thin industrial lines,
- same button language,
- same direct, simple copy,
- same restrained animation language.

Do not redesign the page into a generic SaaS form.

---

# 1. Existing project rules

Before changing anything:

1. Inspect the existing Next.js structure.
2. Inspect the completed landing page implementation.
3. Reuse its:
   - fonts,
   - CSS variables,
   - logo treatment,
   - button styles,
   - page gutters,
   - section labels,
   - icon library,
   - animation utilities,
   - mobile menu if appropriate.
4. Do not duplicate global design tokens unnecessarily.
5. Do not break or restyle the existing homepage.

The homepage is already approved and should remain visually unchanged.

---

# 2. Route

Create the page at:

```text
/start-a-project
```

For the App Router this will normally be:

```text
app/start-a-project/page.tsx
```

All existing homepage `Start a Project` CTAs should continue to point to:

```text
/start-a-project
```

Do not use a modal for this.

It is a full dedicated route.

---

# 3. Reference asset

Codex should visually compare its implementation to:

```text
/references/startaproject_both_ref.png
```

The reference contains the **desktop design direction** for the full page.

The live page should adapt intelligently to mobile rather than literally reproducing the tall desktop composition.

---

# 4. Existing assets to reuse

Use existing project assets already present in `/public`.

Relevant assets include:

```text
/public/bdslogo.png
/public/hero.png
```

Use:

- `/bdslogo.png` for the top navigation/logo,
- `/hero.png` only if using the dark footer/background treatment at the bottom.

Do not generate or add new stock photography.

Do not add another Belfast image unless explicitly requested later.

---

# 5. Typography

Use the same fonts already implemented on the homepage.

Expected system:

```text
Display: Inter Tight 800 / 900
Body/UI: Inter 400 / 500 / 600 / 700
```

Do not introduce a third font.

## Main page heading

Use the same brutal display treatment as the homepage:

```css
font-family: var(--font-display);
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.055em;
line-height: 0.88;
```

Desktop approximate size:

```css
font-size: clamp(64px, 5.8vw, 104px);
```

Mobile:

```css
font-size: clamp(46px, 13vw, 64px);
```

---

# 6. Colour system

Reuse the existing variables from the homepage.

Expected values are approximately:

```css
--paper: #f4f2ed;
--paper-bright: #faf9f5;

--ink: #111111;
--dark: #121211;
--dark-deep: #0b0d0e;

--blue: #4160fd;
--blue-hover: #3150f5;

--text-muted-light: #66686b;

--line-light: rgba(17, 17, 17, 0.22);
--line-dark: rgba(255, 255, 255, 0.26);
```

Do not create a navy theme.

The entire main form page is primarily soft off-white.

---

# 7. Page structure

Build the route in this order:

```text
Header
Project intro + multi-step enquiry form
What Happens Next
Frequently Asked Questions
Closing footer / contact strip
```

The form area is the dominant section.

Do not add:

- portfolio work,
- testimonials,
- service grids,
- another case study,
- an About section,
- musician-specific content.

The visitor has already clicked the main CTA.

This page exists to convert that intent into a useful enquiry.

---

# 8. Header

Desktop reference:

- logo top-left,
- a restrained nav in the top-right area,
- blue `Start a Project` button on the far right.

Because this page **is already** the Start a Project page, the top-right CTA can remain visually present if needed to match the reference, but it should not perform a redundant page navigation.

Preferred behaviour:

- Keep the header consistent with the existing site.
- Use the same logo and spacing as the homepage.
- If the existing landing header includes `Start a Project`, render it in its active/current-page state or allow it to scroll/focus the form rather than navigate to the same route.

Recommended nav:

```text
Work
What We Build
How We Work
Start a Project
```

Targets:

```text
Work -> /#work
What We Build -> /#what-we-build
How We Work -> /#how-we-work
Start a Project -> #project-form
```

Do not use obsolete `Musicians`, `About`, `Services`, or `Insights` items simply because they appear in the generated reference.

The actual information architecture from the live homepage takes priority.

## Mobile header

Use the same compact header / hamburger pattern already built on the homepage.

Do not invent a second mobile-menu style.

---

# 9. Main section shell

Page background:

```css
background: var(--paper-bright);
color: var(--ink);
```

Desktop layout should feel close to the reference:

```text
LEFT INTRO COLUMN      RIGHT FORM COLUMN
~32–35%                ~65–68%
```

Suggested wrapper:

```css
display: grid;
grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.55fr);
gap: clamp(48px, 5vw, 92px);
max-width: 1680px;
margin: 0 auto;
padding: 130px var(--page-gutter) 84px;
```

The intro column should become sticky on desktop if it behaves cleanly:

```css
position: sticky;
top: 110px;
align-self: start;
```

Do not use sticky on mobile.

---

# 10. Intro column

Visual target: large editorial message on the left, form stack on the right.

## Section label

Use:

```text
START A PROJECT
```

Use the same section-label component and blue square treatment as the homepage.

Because this is a standalone route, do **not** depend on the homepage section sequence for meaning.

Recommended visual:

```text
■  START A PROJECT  ─────────
```

If matching the supplied reference more literally, a small page marker may be retained, but the label itself must make sense independently.

## Heading

Exact copy:

```text
TELL US
WHAT
YOU’RE
BUILDING.
```

A blue dot follows the final line.

Use the same accent dot treatment as the homepage.

## Supporting copy

Use:

```text
You don’t need a technical brief.
Tell us what you’re trying to achieve
and we’ll work out the right solution
for your business.
```

It can wrap naturally as one paragraph.

Preferred HTML copy:

```text
You don’t need a technical brief. Tell us what you’re trying to achieve and we’ll work out the right solution for your business.
```

## Location block

Use:

```text
BASED IN BELFAST
WORKING ACROSS UK / IRELAND
```

Use a simple diagonal arrow or location-style icon consistent with the reference.

## Prefer email block

Divider above.

Copy:

```text
Prefer email?
info@briggsdigitalsolutions.com
```

Make the email clickable:

```text
mailto:info@briggsdigitalsolutions.com
```

Use the same outline mail icon style already used elsewhere.

---

# 11. Form concept

The form is a **3-step enquiry form**.

Important:

- It is one form.
- It is not three separate pages.
- Form state persists between steps.
- Only the active step should be shown interactively in production.
- The tall reference shows all three steps at once for design communication.
- Do **not** literally display all three active step cards simultaneously on the live page unless specifically asked later.

Recommended UX:

```text
Step 1 -> Your Details
Step 2 -> The Project
Step 3 -> Practicals
```

On desktop the form panel remains in the right column while the step content changes.

On mobile it occupies the full width below the intro.

This keeps the real site shorter and more usable than the design-board reference while preserving the exact styling.

---

# 12. Form state

Recommended type:

```ts
type ProjectEnquiry = {
  name: string;
  email: string;
  business: string;
  website: string;
  projectTypes: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
};
```

Keep the state in a client component dedicated to the form.

Example structure:

```text
components/project-enquiry/
  ProjectEnquiryForm.tsx
  ProjectStepHeader.tsx
  ProjectTypeOption.tsx
  ChoiceOption.tsx
```

Do not over-componentise tiny markup.

---

# 13. Step header

Every form step uses the same header pattern.

Example:

```text
01 / YOUR DETAILS                         01 / 03   ←  →
Let's start with a few basics.

████████████░░░░░░░░░░░░░░░
```

Use:

- blue step number,
- slash,
- bold title,
- small progress indicator,
- circular previous/next navigation controls,
- 3-segment progress bar.

## Progress bar

Use three equal horizontal tracks.

Inactive:

```css
background: rgba(17, 17, 17, 0.12);
```

Active/completed:

```css
background: var(--blue);
```

Height around:

```css
4px;
```

The progress bar must not be overly rounded.

---

# 14. Form panel visual styling

The form panel should be understated.

Use:

```css
background: rgba(255, 255, 255, 0.22);
border: 1px solid rgba(17, 17, 17, 0.11);
box-shadow: 0 10px 28px rgba(0, 0, 0, 0.035);
border-radius: 4px;
```

Do not make it look like a floating SaaS card.

Desktop padding:

```css
padding: clamp(26px, 2.5vw, 38px);
```

Mobile:

```css
padding: 22px 18px;
```

---

# 15. Step 1 — Your Details

Header:

```text
01 / YOUR DETAILS
```

Subcopy:

```text
Let’s start with a few basics.
```

Fields:

```text
Your name *
Email address *
Business / organisation
Existing website
```

## Placeholders

Name:

```text
John Doe
```

Email:

```text
you@company.com
```

Business:

```text
Your business name (optional)
```

Website:

```text
https:// (optional)
```

## Validation

Required:

```text
name
email
```

Optional:

```text
business
website
```

Email must use sensible validation.

If website is provided, accept:

```text
https://...
http://...
domain.com
www.domain.com
```

Do not force a fully-qualified URL while the user is typing.

## Step 1 button

Full width blue button:

```text
Continue  →
```

Do not advance until required fields are valid.

Show small inline error text rather than alert boxes.

---

# 16. Input styling

Inputs should resemble the reference:

```css
width: 100%;
height: 52px;
border: 1px solid rgba(17,17,17,.22);
background: rgba(255,255,255,.18);
border-radius: 2px;
padding: 0 16px;
font: inherit;
```

Focus:

```css
border-color: var(--blue);
box-shadow: 0 0 0 2px rgba(65,96,253,.10);
outline: none;
```

Labels:

```css
font-size: 13px;
font-weight: 600;
margin-bottom: 7px;
```

Required asterisk may use a restrained warm red.

---

# 17. Step 2 — The Project

Header:

```text
02 / THE PROJECT
```

Subcopy:

```text
Tell us about what you’re looking to build.
```

Prompt:

```text
What are you looking to build? (select all that apply)
```

Use selectable large rectangular options.

Options:

```text
New website
Website redesign
Website + management system
Bookings / payments / online functionality
Integrations / automation
Something more custom
I’m not sure yet
```

Use icons from the existing icon library.

Suggested mappings:

```text
New website -> Monitor
Website redesign -> PanelsTopLeft / MonitorCog
Website + management system -> Database
Bookings / payments / online functionality -> CreditCard or CalendarCheck
Integrations / automation -> Zap
Something more custom -> Box / Shapes
I’m not sure yet -> CircleHelp
```

Do not add extra categories from the later discarded mockup.

The reference’s original choices fit the actual BDS proposition better.

---

# 18. Project type option styling

Desktop grid:

```css
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 10px;
```

Mobile:

```css
grid-template-columns: 1fr;
```

Unselected:

```css
border: 1px solid rgba(17,17,17,.15);
background: transparent;
```

Selected:

```css
border-color: var(--blue);
background: rgba(65,96,253,.055);
box-shadow: inset 0 0 0 1px rgba(65,96,253,.18);
```

Selected state includes:

- blue check circle on the far right,
- blue border,
- light blue tint.

Options are multi-select.

`I’m not sure yet` should work as an exclusive fallback if desired:

Preferred behaviour:

- selecting `I’m not sure yet` clears the other project types,
- selecting any specific type clears `I’m not sure yet`.

---

# 19. Project description field

Label:

```text
Tell us about the project. *
```

Placeholder:

```text
What does the business do? What are you trying to improve, replace or make possible?
```

Use textarea:

```css
min-height: 120px;
resize: vertical;
```

Require a sensible minimum length, e.g. 20 characters.

Do not demand an essay.

## Step 2 navigation

Bottom row:

```text
← Back                                  Continue →
```

Back is text/icon.

Continue is a blue button.

---

# 20. Step 3 — Practicals

Header:

```text
03 / PRACTICALS
```

Subcopy:

```text
A few final details to help us scope things.
```

Two groups:

```text
What level of investment are you considering?
When would you ideally like to get started?
```

On desktop place them side-by-side.

On mobile stack them.

---

# 21. Budget options

Use the original reference ranges:

```text
Under £500
£500 – £1,000
£1,000 – £1,500
£1,500 – £2,500
£2,500+
Not sure yet
```

Single select.

Do not judge or block users based on their choice.

The purpose is qualification/context.

Do not hide low-budget submissions.

---

# 22. Timeline options

Use:

```text
As soon as possible
Within 1–2 months
Within 3 months
Later this year
Just exploring
```

Single select.

No date picker.

No calendar required.

---

# 23. Practical choice styling

Use compact rectangular buttons matching the reference.

Selected state:

- blue border,
- pale blue fill,
- blue check circle.

No pill-shaped controls.

---

# 24. Final submission button

Label:

```text
Send Project Details  →
```

Large blue button.

Do not use:

```text
Submit
```

The button should clearly describe what happens.

Disable only during active submission.

Loading label:

```text
Sending…
```

Do not replace the whole UI with a spinner.

---

# 25. Form submission architecture

First inspect the project for an existing contact/enquiry backend.

If one already exists, reuse it.

Do not create a second conflicting email system.

If no backend exists, implement a clean server endpoint interface:

```text
POST /api/project-enquiry
```

Recommended file:

```text
app/api/project-enquiry/route.ts
```

Validate all incoming payload server-side.

The API shape should be easy to connect later to:

- Resend,
- Postmark,
- another transactional email provider,
- a CRM,
- a database.

Do not expose secrets to the browser.

## Important temporary behaviour

If a real email/database transport is already configured, send/store the enquiry.

If no transport credentials exist, do **not** pretend the enquiry was delivered.

Return a clear server error and show:

```text
Something went wrong sending your project details. Please email info@briggsdigitalsolutions.com instead.
```

Do not silently drop enquiries.

---

# 26. Success state

On confirmed successful submission, replace the form contents with a success state in the same panel.

Suggested copy:

```text
PROJECT RECEIVED.
```

Body:

```text
Thanks — your project details are through. We’ll review what you’ve sent and get back to you directly.
```

Secondary:

```text
Need to add something?
info@briggsdigitalsolutions.com
```

Optional button:

```text
Back to Briggs →
```

Target:

```text
/
```

Do not redirect immediately.

Do not reset the form before the success message has been seen.

---

# 27. Form accessibility

Mandatory:

- actual `<form>`,
- actual `<label>` elements,
- required fields exposed semantically,
- `aria-invalid` for errors,
- error text connected with `aria-describedby`,
- radio-like single selects keyboard accessible,
- checkbox-like multi selects keyboard accessible,
- focus remains logical when changing steps,
- focus moves to the new step heading after progression,
- Enter should not accidentally skip required information,
- visible focus outlines,
- no colour-only selection feedback.

---

# 28. Form step animation

Use restrained transitions.

On Continue:

Old step:

```text
opacity 1 -> 0
x 0 -> -14px
```

New step:

```text
opacity 0 -> 1
x 14px -> 0
```

Duration:

```text
220–320ms
```

No large slide carousel.

Respect `prefers-reduced-motion`.

Do not animate the panel height aggressively.

If height changes, let layout flow naturally or use a subtle layout animation.

---

# 29. What Happens Next section

Below the form, create a clearly separate section.

Do not visually blend it directly into the FAQ.

Use a top divider and generous vertical spacing.

Section label:

```text
WHAT HAPPENS NEXT
```

Heading:

```text
A STRAIGHT
FORWARD
PROCESS.
```

Blue dot after final line.

Use three simple columns.

## Step 01

Title:

```text
We review your details
```

Body:

```text
We’ll take a look at what you’ve sent and get a clear understanding of your goals.
```

## Step 02

Title:

```text
We get in touch
```

Body:

```text
We’ll reply directly, usually within 1–2 working days, to discuss your project in more detail.
```

## Step 03

Title:

```text
You get a clear plan
```

Body:

```text
We’ll recommend the right approach, with a clear next step and no obligation.
```

## Layout

Desktop:

```text
heading ~30%
three process columns ~70%
```

Mobile:

Stack:

```text
heading
01
02
03
```

This section should be visually calmer than the main homepage process section.

Do not reuse the giant timeline.

---

# 30. FAQ section

This is its own section with stronger separation from What Happens Next.

Use additional vertical padding and/or a very slight tone change.

Recommended:

```css
background: #f7f5f0;
```

or keep `--paper-bright` with a clear top rule.

Section label:

```text
FREQUENTLY ASKED
```

Heading:

```text
SOME
COMMON
QUESTIONS.
```

Blue dot at the end.

## Initial FAQ questions

```text
Do I need a fully defined brief?
Can you work with an existing website?
Do you only work with businesses in Northern Ireland?
What happens after I submit the form?
```

Use real accessible accordions.

---

# 31. FAQ answers

Use concise factual copy.

## Do I need a fully defined brief?

```text
No. An idea, problem or goal is enough to start. We can work through the structure, functionality and technical requirements with you before anything moves into development.
```

## Can you work with an existing website?

```text
Yes. Depending on the project, we can redesign an existing site, rebuild it properly, or keep useful parts of the current setup while improving what is not working.
```

## Do you only work with businesses in Northern Ireland?

```text
No. Briggs Digital Solutions is based in Belfast and works with businesses across the UK and Ireland, with projects handled remotely where needed.
```

## What happens after I submit the form?

```text
We’ll review the details you send and reply directly to discuss the project, clarify anything we need to understand and recommend the next step.
```

Do not invent guarantees beyond the copy above.

---

# 32. FAQ interaction

Each FAQ row:

```text
Question                                     +
```

Open:

```text
Question                                     ×
Answer
```

Animation:

- height/opacity,
- around 220ms,
- no bouncing.

Use buttons for accordion triggers.

Support keyboard operation.

---

# 33. Bottom closing area

The design reference includes a dark Belfast closing treatment.

Keep that visual idea, but avoid making it a redundant second conversion funnel.

Preferred implementation:

Use `/public/hero.png` as a dark background strip.

This area should function more like a **brand/contact footer**, not another “Start a Project” CTA to the same page.

Recommended content:

```text
BUILT IN BELFAST.
MADE TO WORK ANYWHERE.
```

or reuse the compact footer language already approved on the homepage.

Include:

```text
info@briggsdigitalsolutions.com
Belfast, Northern Ireland
Working across UK / Ireland
Privacy
Terms
© 2026 Briggs Digital Solutions
```

If the existing homepage footer is already implemented as a reusable component, reuse it.

That is preferred over building a second footer.

Do not duplicate the full homepage navigation.

Do not add social icons unless they already exist in the approved footer.

Do not include a `Start a Project` button that links to the current page.

---

# 34. Desktop page proportions

The visual board is tall.

The live page does not need to match its exact total pixel height.

What must match:

- intro/form split,
- typography,
- form card density,
- progress system,
- option styling,
- spacing,
- process section proportions,
- FAQ treatment,
- dark close.

The actual live form should show **one active step at a time**.

This is a deliberate usability adaptation.

---

# 35. Mobile design

Mobile must be designed, not merely shrunk.

Use the same mobile philosophy established on the homepage.

## Mobile sequence

```text
Header

START A PROJECT
TELL US WHAT YOU’RE BUILDING.
Supporting copy
Location
Prefer email

Form — active step only

What Happens Next

FAQ

Footer
```

## Intro

Full width.

Do not put the intro and form side-by-side.

Use:

```css
padding-inline: 22px;
```

## Form

Full width minus page gutters.

Option grids become single-column where needed.

Budget/timeline choices can remain 2-column only if each option remains comfortably readable.

Otherwise stack.

## Sticky behaviour

Disable sticky intro on mobile.

## Section lengths

Do not force each form step to `100vh`.

Allow content to determine height.

There should be no giant blank gaps.

---

# 36. Mobile heading line breaks

Preferred:

```text
TELL US
WHAT
YOU’RE
BUILDING.
```

If the screen comfortably supports:

```text
TELL US
WHAT YOU’RE
BUILDING.
```

that is acceptable.

Do not reduce the display font to tiny sizes just to force a specific break.

---

# 37. Mobile form controls

Minimum touch height:

```text
48px
```

Recommended buttons:

```text
54–60px
```

Inputs:

```text
52px+
```

Text area:

```text
120px+
```

Do not put tiny circular navigation buttons too close together.

---

# 38. Page animation

Use the existing Motion setup if installed.

Initial page:

- header fades,
- section label fades,
- headline reveals line-by-line,
- supporting copy fades,
- form panel rises slightly.

Do not replay the entire page animation when navigating between form steps.

Lower sections animate once when entering viewport.

---

# 39. Reduced motion

Reuse the homepage reduced-motion strategy.

If reduced motion is enabled:

- no headline slide reveals,
- no step horizontal transition,
- no stagger,
- no animated FAQ height if it causes discomfort,
- content remains immediately available.

---

# 40. Button system

Use the existing homepage primary button component/styles where possible.

Primary:

```text
electric blue
square/slightly squared corners
white type
right arrow
```

Do not use pill buttons.

Hover:

```text
y: -1px
arrow: +4px x
slightly darker blue
```

Active:

```text
y: 0
```

---

# 41. Micro-lines and industrial details

Use the existing line-work sparingly.

Allowed:

- section label horizontal rules,
- progress lines,
- form section dividers,
- short technical accents,
- blue square,
- blue final dot.

Do not cover the form in crosshairs.

The page should feel cleaner than the homepage because it is a working/conversion interface.

---

# 42. Content constants

Keep editable content separate where sensible.

Example:

```ts
export const projectTypes = [
  "New website",
  "Website redesign",
  "Website + management system",
  "Bookings / payments / online functionality",
  "Integrations / automation",
  "Something more custom",
  "I’m not sure yet",
];

export const budgetOptions = [
  "Under £500",
  "£500 – £1,000",
  "£1,000 – £1,500",
  "£1,500 – £2,500",
  "£2,500+",
  "Not sure yet",
];

export const timelineOptions = [
  "As soon as possible",
  "Within 1–2 months",
  "Within 3 months",
  "Later this year",
  "Just exploring",
];
```

Do not bury all content inside deeply nested JSX.

---

# 43. Suggested component tree

```tsx
<StartProjectPage>
  <LandingHeader />

  <main>
    <section id="project-form">
      <ProjectIntro />
      <ProjectEnquiryForm />
    </section>

    <WhatHappensNext />
    <ProjectFaq />
  </main>

  <SiteFooter />
</StartProjectPage>
```

Form:

```tsx
<ProjectEnquiryForm>
  <ProjectStepHeader />
  <StepOneDetails />
  <StepTwoProject />
  <StepThreePracticals />
  <ProjectSuccess />
</ProjectEnquiryForm>
```

Only render the currently active step.

---

# 44. Error states

Errors must be understated.

Input error:

```css
border-color: #c94444;
```

Small helper text underneath.

Submission error panel:

```text
We couldn’t send your project details just now.
Please try again or email info@briggsdigitalsolutions.com.
```

Do not use browser alerts.

Do not clear the entered data after an error.

---

# 45. Browser history

Do not make each step a browser route.

The back button inside the form moves to the previous form step.

Browser Back should return to the previous page as normal.

Do not interfere with history unless there is a strong existing project convention.

---

# 46. Form persistence

For v1:

- keep state while the component is mounted,
- no need for LocalStorage unless already used by the project,
- do not persist personally identifiable data indefinitely in the browser.

If the user refreshes, starting the form again is acceptable for v1.

---

# 47. Privacy

Do not collect unnecessary information.

Required:

```text
name
email
project description
```

Project type should be required unless `I’m not sure yet` is selected.

Budget and timeline may be optional or allow fallback choices.

Do not request:

- date of birth,
- home address,
- phone number,
- payment information,
- passwords,
- account credentials.

If privacy policy exists, optionally include small copy near final submission:

```text
By submitting this form, you agree that we can use these details to respond to your enquiry.
```

Only include this if consistent with the site's privacy policy.

---

# 48. SEO

Suggested metadata:

```text
Title:
Start a Project | Briggs Digital Solutions

Description:
Tell Briggs Digital Solutions what you’re looking to build. Start a website, management system, integration or custom digital project with our Belfast-based team.
```

No need for keyword stuffing.

---

# 49. Performance

This page should be extremely light.

Main content is HTML/CSS.

Only background/photo asset:

```text
/public/hero.png
```

if using it in the footer.

Do not load portfolio screenshots on this route.

Do not preload the footer background.

Do not add video.

---

# 50. Responsive test widths

Verify:

```text
320 x 568
375 x 667
390 x 844
393 x 852
412 x 915
430 x 932

768 x 1024
1024 x 768

1280 x 720
1366 x 768
1440 x 900
1536 x 864
1920 x 1080
```

Specific checks:

- display heading never overflows,
- intro/form gap is not excessive,
- form labels remain readable,
- project options do not clip,
- back/continue controls fit,
- budget options remain readable,
- FAQ rows do not overflow,
- no horizontal scrolling,
- no giant blank mobile gaps.

---

# 51. Visual QA against the reference

After implementation, compare the page against:

```text
/references/startaproject_both_ref.png
```

Pay particular attention to:

- heading weight,
- heading line-height,
- left-column width,
- form panel width,
- form panel border colour,
- input heights,
- option density,
- progress bar thickness,
- blue saturation,
- section whitespace,
- process section hierarchy,
- FAQ line spacing.

If it feels too generic, the likely problem is:

- typography too small,
- too many rounded corners,
- panel shadow too strong,
- blue used too much,
- form controls too “app-like,”
- page gutters too narrow or too wide.

Adjust those before adding decoration.

---

# 52. Known design decisions

These are intentional:

- Dedicated `/start-a-project` route.
- Main form uses three steps.
- One active form step is shown at a time on the real page.
- The reference’s stacked cards communicate the visual system, not literal live-page behaviour.
- No phone number field.
- No Calendly booking flow.
- No giant service sales pitch.
- No case study repeat.
- No social proof repeat.
- No page-specific second CTA linking back to itself.
- The visitor may always email directly instead.

---

# 53. Do not introduce

Do not add:

- dark navy form background,
- glassmorphism,
- huge gradients,
- floating 3D blobs,
- fake testimonials,
- pricing tables,
- mandatory phone number,
- calendar booking,
- intrusive popup,
- newsletter signup,
- cookie prompt unless already handled globally,
- unrelated footer navigation,
- a second portfolio section,
- a fake client logo strip,
- a complex multi-page wizard.

---

# 54. Final functional checklist

Before marking complete:

- [ ] Route exists at `/start-a-project`.
- [ ] All existing homepage Start a Project CTAs reach this route.
- [ ] Uses existing BDS logo/header system.
- [ ] Main heading matches the reference.
- [ ] Intro copy matches this document.
- [ ] Email fallback is visible.
- [ ] Form has exactly 3 logical steps.
- [ ] Only active step is shown in the real UI.
- [ ] Step state persists when moving forward/back.
- [ ] Required-field validation works.
- [ ] Project types support multi-select.
- [ ] `I’m not sure yet` behaves sensibly.
- [ ] Description is required.
- [ ] Budget is single-select.
- [ ] Timeline is single-select.
- [ ] Final submit button has loading state.
- [ ] API submission is server validated.
- [ ] Enquiries are never silently dropped.
- [ ] Success state appears only after real success.
- [ ] Failure state preserves form data.
- [ ] What Happens Next is visually separate.
- [ ] FAQ is visually separate.
- [ ] FAQ accordions are accessible.
- [ ] Existing reusable footer is reused where appropriate.
- [ ] No redundant Start a Project footer CTA to the current page.
- [ ] Mobile has no horizontal overflow.
- [ ] No large blank gaps on mobile.
- [ ] Reduced-motion preference is respected.
- [ ] Desktop/mobile visual QA performed against the reference.

---

# 55. Definition of done

The page is done when it feels like the conversion endpoint of the existing Briggs site rather than a generic contact form.

A visitor should:

1. understand immediately that they can start without a technical brief,
2. be able to describe what they need without knowing web terminology,
3. move through the form quickly,
4. understand what will happen after submission,
5. have a direct email fallback,
6. feel the same level of polish as the homepage,
7. see no dead ends or redundant CTAs,
8. encounter no fake success behaviour.

Do not redesign the approved Briggs visual system while implementing this page.

Match the reference closely, reuse the existing site system, and prioritise clarity and conversion.
