# Briggs Digital Solutions — What We Build Page Implementation Specification

**Target route:** `/what-we-build`  
**Primary visual reference:** `/references/whatwedo_fullpage_ref.png`  
**Framework:** Existing Next.js project  
**Goal:** Recreate the approved “What We Build” page as a premium, highly polished extension of the existing Briggs Digital Solutions website.

---

# 0. Read this first

This document is the implementation source of truth for the `/what-we-build` page.

The existing Briggs homepage and `/start-a-project` page are already approved. **Do not redesign or destabilise them.** Reuse the design system, components, typography, colour tokens, header/menu behaviour, footer, buttons, animation language and responsive conventions that already exist.

The supplied mockup:

```text
/references/whatwedo_fullpage_ref.png
```

is a **visual composition reference**, not a single image to render on the page.

Rebuild the page with real React/HTML/CSS and the supplied image assets.

The finished page should feel like the homepage’s `What We Build` section expanded into a full flagship capability page — not like a generic “Services” page.

The commercial idea must remain extremely clear:

```text
PUBLIC-FACING EXPERIENCE
        ↓
MANAGEMENT SYSTEM
        ↓
INTEGRATIONS / AUTOMATION
```

Briggs builds the public website, the useful tools behind it, and the connected systems around it when the business actually needs them.

---

# 1. Final page structure

Implement the page in this exact order:

```text
Header

Hero — Built Around How Your Business Actually Works
The Big Idea — One Business. One Connected System.
01 / Public-Facing — The Part People See.
02 / Behind the Website — The Part Your Business Uses.
03 / Connected Systems — The Parts That Make Everything Work Together.
Example Configurations — Different Businesses. Different Systems.
Final CTA — What Does Your Business Need To Do?

Existing shared SiteFooter
```

## Important omissions

The reference image contains two lower sections that are **intentionally removed from the final page**:

```text
HOW WE DECIDE WHAT TO BUILD / START WITH THE PROBLEM
REAL PROJECT / DAVID BROWNE MURRAY
```

Do **not** implement either of those sections.

After `Different Businesses. Different Systems.` go directly to the final Belfast CTA and then the existing reusable footer.

Do not replace the deleted sections with filler.

---

# 2. Exact existing assets

Use the real files already present in `/public`.

```text
/public/bdslogo.png
/public/connectedsystem.png
/public/hero.png
/public/whatwedo_mockup_1.png
/public/whatwedo_mockup_2.png
/public/whatwedo_mockup_3.png
```

The file visible in the project asset list is:

```text
connectedsystem.png
```

Use the actual repository filename exactly. Do not generate a replacement.

Also reuse the existing footer component, which may itself use:

```text
/public/footer.png
```

Do not duplicate footer implementation just for this page.

## Asset roles

| Asset | Purpose |
|---|---|
| `bdslogo.png` | Header logo |
| `whatwedo_mockup_1.png` | Website/public-facing visual |
| `whatwedo_mockup_2.png` | Management system/CMS visual |
| `whatwedo_mockup_3.png` | Integrations/automation visual |
| `connectedsystem.png` | “One Business. One Connected System.” diagram |
| `hero.png` | Belfast background for the closing CTA |
| existing footer assets | Shared approved footer |

---

# 3. Critical asset decision — reuse the three existing mockups

Do **not** create or expect separate hero-specific images.

The same three assets:

```text
whatwedo_mockup_1.png
whatwedo_mockup_2.png
whatwedo_mockup_3.png
```

are intentionally reused twice:

1. in the page hero as three smaller floating/perspective layers;
2. later in their dedicated sections at full readable size.

This is a feature, not duplication to “fix.”

The hero treatment should be created in CSS with perspective, transforms, shadows and layering.

Do not bake the three layers into one flattened hero image.

That allows:

- staggered entry animation,
- controlled separation,
- responsive repositioning,
- hover/parallax polish,
- full-resolution reuse later.

---

# 4. Existing design system

Inspect the homepage implementation before writing new styles.

Reuse the existing:

```text
--paper
--paper-bright
--ink
--dark
--dark-deep
--blue
--blue-hover
--line-light
--line-dark
--page-gutter
--content-max
```

If these tokens already exist, do not redefine them in a conflicting scope.

Expected visual values are approximately:

```css
--paper: #f4f2ed;
--paper-bright: #faf9f5;
--ink: #111111;
--dark: #121211;
--dark-deep: #0b0d0e;
--blue: #4160fd;
--blue-hover: #3150f5;
```

## Non-negotiable colour rule

Dark sections are neutral near-black.

Do not introduce the rejected blue/navy “AI SaaS” background.

Blue is an accent, not the page background.

---

# 5. Typography

Reuse the fonts already loaded by the existing site.

Expected system:

```text
Display: Inter Tight 800 / 900
Body/UI: Inter 400 / 500 / 600 / 700
```

Do not install another display font.

## Display headings

Use the same brutal/editorial treatment as the approved homepage:

```css
font-family: var(--font-display);
font-weight: 900;
letter-spacing: -0.055em;
line-height: 0.88;
text-transform: uppercase;
```

Desktop major page headline:

```css
font-size: clamp(64px, 5.8vw, 105px);
```

Major section headlines:

```css
font-size: clamp(52px, 4.7vw, 82px);
```

Mobile:

```css
font-size: clamp(43px, 12vw, 62px);
line-height: 0.90;
```

## Body copy

Desktop:

```css
font-size: clamp(17px, 1.2vw, 22px);
line-height: 1.42;
```

Mobile:

```css
font-size: 16px;
line-height: 1.48;
```

## Technical labels

Use the same small uppercase tracked type used throughout the existing site:

```css
font-size: 11px;
font-weight: 600;
letter-spacing: 0.18em;
text-transform: uppercase;
```

---

# 6. Header

Reuse the same `LandingHeader` / site header already used by the homepage and `/start-a-project`.

Do not create another header component unless the existing architecture makes reuse impossible.

Recommended desktop nav:

```text
Work
What We Build
How We Work
Start a Project
```

Targets:

```text
Work -> /#work
What We Build -> /what-we-build
How We Work -> /#how-we-work
Start a Project -> /start-a-project
```

On this page:

- `What We Build` should appear active/current.
- The CTA remains the normal blue `Start a Project` button.
- The header is on a light background, so use the existing dark-logo/light-header variant if one already exists.
- If the supplied `bdslogo.png` is white-only and unsuitable for the light page, use whatever dark logo treatment the existing project already uses on light surfaces. Do not fabricate a new brand mark.

Mobile:

- reuse the approved mobile menu,
- no new navigation concept,
- preserve the solid hamburger treatment already fixed on the homepage.

---

# 7. Section rhythm

Use the following surface rhythm:

```text
Hero                    LIGHT
The Big Idea            DARK
Public-Facing           LIGHT
Management Systems      DARK
Connected Systems       LIGHT
Example Configurations  DARK
Final CTA               DARK PHOTO
Footer                   EXISTING APPROVED FOOTER
```

Transitions should be clean edge-to-edge.

Do not insert grey spacer bands.

---

# 8. Hero

## Purpose

Explain the full BDS proposition immediately.

This is not a generic services hero.

The visitor should understand:

- BDS builds public websites,
- BDS can build the management tools behind them,
- BDS can connect the systems around them,
- those pieces are chosen around the business rather than sold as a fixed package.

## Background

Use:

```css
background: var(--paper-bright);
color: var(--ink);
```

## Desktop composition

Two-column editorial layout.

Approximate split:

```text
LEFT: 48%
RIGHT: 52%
```

The left contains copy.

The right contains the animated 3-layer system stack.

Use:

```css
min-height: min(900px, calc(100svh - header-height));
```

but do not force exact viewport height if content requires more.

Recommended section padding:

```css
padding:
  clamp(130px, 12vh, 180px)
  var(--page-gutter)
  clamp(80px, 8vh, 120px);
```

---

# 9. Hero copy

Section label:

```text
WHAT WE BUILD
```

Do not prefix this hero with a confusing site-wide number.

The three core capability sections below can use `01`, `02`, `03`.

Headline:

```text
BUILT AROUND
HOW YOUR BUSINESS
ACTUALLY WORKS.
```

Add the existing electric blue dot after the final period.

Body:

```text
Every business is different. We design the public-facing experience, then build the tools, integrations and workflows behind it — so everything works together.
```

Primary CTA:

```text
Start a Project →
```

Target:

```text
/start-a-project
```

Use the site’s normal primary button component.

The button can be near-black here rather than blue if that matches the approved reference and existing button variants.

Do not add a second CTA.

---

# 10. Hero system stack

Use these assets:

```text
/public/whatwedo_mockup_1.png
/public/whatwedo_mockup_2.png
/public/whatwedo_mockup_3.png
```

Build a `HeroSystemStack` component.

Do not merge these assets.

## Conceptual stack

Top:

```text
PUBLIC EXPERIENCE
WEBSITE
The part your customers see.
```

Middle:

```text
MANAGEMENT SYSTEM
The part your business uses.
```

Bottom:

```text
INTEGRATIONS & AUTOMATION
The parts that make everything work together.
```

The labels should be HTML, not part of the image.

Numbers on the far right:

```text
01
02
03
```

---

# 11. Hero stack card treatment

Each visual sits in its own wrapper:

```tsx
<div className={styles.stackLayer}>
  <Image ... />
</div>
```

Suggested shared styling:

```css
.stackLayer {
  position: absolute;
  left: 0;
  width: min(68%, 520px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(17,17,17,.10);
  box-shadow:
    0 22px 45px rgba(0,0,0,.10),
    0 5px 14px rgba(0,0,0,.06);
  transform-origin: center;
  background: var(--paper);
}
```

The cards should look like thin floating panels, not giant hardware devices.

Do not create thick laptop/tablet bezels.

## Desktop positioning

Starting point:

```css
.websiteLayer {
  top: 3%;
  left: 3%;
  transform:
    perspective(1100px)
    rotateX(58deg)
    rotateZ(6deg)
    translateZ(40px);
  z-index: 3;
}

.cmsLayer {
  top: 32%;
  left: 10%;
  transform:
    perspective(1100px)
    rotateX(58deg)
    rotateZ(5deg)
    translateZ(20px);
  z-index: 2;
}

.automationLayer {
  top: 61%;
  left: 17%;
  transform:
    perspective(1100px)
    rotateX(58deg)
    rotateZ(4deg);
  z-index: 1;
}
```

These are starting values, not sacred values.

Visually compare against:

```text
/references/whatwedo_fullpage_ref.png
```

The important effect is:

- three thin separated planes,
- same perspective family,
- top website layer,
- darker CMS middle layer,
- lighter integrations lower layer,
- enough air between them to read as distinct systems.

Do not rotate so severely that screenshots become illegible.

---

# 12. Hero stack labels

Place labels to the right of the layer stack.

Each label:

```text
[small blue connector dot / rule]

PUBLIC EXPERIENCE
WEBSITE
The part your customers see.

01
```

The label line should visually connect to the relevant layer.

Use CSS borders/pseudo-elements.

Do not bake lines into an image.

Keep labels compact.

They are explanation, not another full content column.

---

# 13. Hero stack animation

This is one of the few places on the page where a more bespoke animation is worthwhile.

Initial state:

- three layers begin closer together,
- slight lower opacity,
- labels hidden,
- subtle y-offset.

On hero entrance:

1. website layer moves upward,
2. CMS layer settles to middle,
3. integrations layer moves downward,
4. labels fade/slide in,
5. connecting rules draw.

The effect should feel like the three layers **separating to reveal the architecture**.

Suggested transform delta:

```text
website:     y +28px -> 0
cms:         y 0 -> 0
automation:  y -28px -> 0
```

Or use a small spread of about 26–40px between initial and final positions.

Duration:

```text
650–900ms
```

Ease:

```text
[0.22, 1, 0.36, 1]
```

No bouncing.

## Optional pointer parallax

Desktop only:

A tiny cursor-responsive rotation/translation is acceptable:

```text
max translate: 4px
max rotate: 0.6deg
```

Do not make the layers chase the cursor.

Disable entirely on touch devices and reduced motion.

---

# 14. Hero mobile

Do not try to preserve the desktop side-by-side split.

Use:

```text
Header
Label
Headline
Body
CTA
Compressed three-layer stack
Labels beneath or alongside
```

The stack can remain perspective-based but must become much more compact.

Suggested:

```css
.stackVisual {
  min-height: 430px;
}

.stackLayer {
  width: 78%;
}
```

Keep all three visible.

Do not create horizontal scrolling.

Do not make the user swipe through the layers.

Labels may become three compact rows below the stack:

```text
01  PUBLIC EXPERIENCE        Website
02  MANAGEMENT SYSTEM        Behind the website
03  INTEGRATIONS             Connected systems
```

This is preferable to tiny text floating beside the images.

---

# 15. Section — The Big Idea

Background:

```css
background: var(--dark);
color: var(--text-on-dark);
```

Desktop layout:

```text
LEFT  42%
RIGHT 58%
```

The right side uses:

```text
/public/connectedsystem.png
```

## Label

```text
THE BIG IDEA
```

## Headline

```text
ONE BUSINESS.
ONE CONNECTED
SYSTEM.
```

Blue dot at the end.

## Copy

```text
A website might be the part your customers see. But behind it, your business may need content management, enquiries, bookings, payments, customer data, integrations or automation.
```

Second paragraph:

```text
We build the parts that are actually useful — and leave out the ones that aren’t.
```

Emphasis statement:

```text
ONLY WHAT YOU NEED.
```

Render this in Briggs blue.

This should be large, but smaller than the section headline.

---

# 16. Connected system diagram

Use:

```text
/public/connectedsystem.png
```

Do not recreate it in code in this implementation.

The supplied asset was specifically created for this page.

Use Next `<Image>`.

Desktop:

```css
width: min(100%, 820px);
height: auto;
object-fit: contain;
```

The image has a dark background designed to merge into the section.

Do not place it inside a white card.

If the asset edge is visible because its black differs slightly from the section background, use:

```css
mix-blend-mode: normal;
```

and tune the section background to match the asset rather than applying a blue tint.

Do not crop any labels.

---

# 17. Big Idea animation

When in view:

- left copy fades upward,
- diagram fades from `opacity: 0`, `scale: .985`,
- optional subtle blue glow behind the diagram fades in.

Do not animate individual nodes inside the raster asset.

Because it is a static PNG, avoid fake line-drawing overlays that do not align precisely.

---

# 18. Section 01 — Public-Facing

Light section.

Label:

```text
01 / PUBLIC-FACING
```

Headline:

```text
THE PART
PEOPLE SEE.
```

Blue dot after final period.

Intro copy:

```text
Your website should make the business clear, make the right impression and make the next action obvious.
```

Strong supporting line:

```text
We design from the business outward — not from a template inward.
```

---

# 19. Public-Facing feature list

Use four feature rows.

### Custom design

```text
Built around the brand and audience.
```

### Responsive by default

```text
Designed properly across desktop, tablet and mobile.
```

### Conversion-led structure

```text
Pages and journeys shaped around what visitors actually need to do.
```

### Performance + accessibility

```text
Fast, usable and technically sound.
```

Use existing outline icon library.

Suggested icons:

```text
Custom design -> Shapes
Responsive -> MonitorSmartphone
Conversion -> MousePointerClick or Route
Performance -> Gauge or Accessibility
```

Icons are supportive only.

Do not turn these into four big cards.

---

# 20. Public-Facing visual

Use:

```text
/public/whatwedo_mockup_1.png
```

At full readable scale.

Do not tilt it strongly here.

This section is where the visitor should actually inspect the example.

Recommended wrapper:

```css
border-radius: 12px;
overflow: hidden;
box-shadow: 0 16px 50px rgba(0,0,0,.08);
border: 1px solid rgba(17,17,17,.08);
```

Desktop layout:

```text
LEFT copy/features ~38%
RIGHT visual ~62%
```

The screenshot should dominate the right side.

---

# 21. Public-Facing annotations

The reference uses small blue technical annotations around the screenshot.

Recreate these with HTML/CSS.

Suggested labels:

```text
NAVIGATION
CONTENT HIERARCHY
CONVERSION
RESPONSIVE
```

Use:

- 1px grey rules,
- small blue nodes,
- uppercase micro-labels.

These should sit outside the image wrapper and connect visually to it.

Do not cover important screenshot content.

Mobile:

- remove complex connector lines,
- keep labels as a compact 2x2 micro-grid below the screenshot if desired.

Do not let annotation complexity damage mobile readability.

---

# 22. Section 02 — Management Systems

Dark section.

Label:

```text
02 / BEHIND THE WEBSITE
```

Headline:

```text
THE PART
YOUR BUSINESS
USES.
```

Blue dot after final period.

Body:

```text
If your business needs to update, organise or manage information regularly, we can build the tools behind the website around the way you actually work.
```

Large blue statement:

```text
NOT A DASHBOARD
FULL OF FEATURES
YOU DON’T NEED.
```

Support:

```text
The management system is shaped around the project.
```

---

# 23. Management system visual

Use:

```text
/public/whatwedo_mockup_2.png
```

At full scale.

Do not use the tilted hero treatment in this section.

The image should be large, flat/readable and visually dominant.

Desktop:

- left copy around 38–40%,
- right image around 60–62%.

Use restrained shadow.

Because this section is dark and the screenshot contains a white main panel, the contrast is naturally strong.

Do not add another fake phone mockup.

---

# 24. Example modules grid

Below the management-system image/copy, build the module list in code.

Label:

```text
EXAMPLE MODULES
```

Use a compact bordered grid.

Suggested modules:

```text
Content
Projects
Orders
Customers
Products
Bookings
Users
Enquiries
Events
Documents
Media
Reporting
```

These are examples, not promises that every build includes everything.

Each item:

- outline icon,
- text,
- thin border,
- no rounded “SaaS cards.”

Suggested desktop:

```css
grid-template-columns: repeat(4, minmax(0, 1fr));
```

Tablet:

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
```

Mobile:

```css
grid-template-columns: repeat(2, minmax(0, 1fr));
```

---

# 25. Management-system explanatory note

Use:

```text
Your system might need three of these. It might need ten. The point is that it should reflect the business — not force the business to adapt to the software.
```

Place it near/below the module grid.

Use muted white/grey.

This message is commercially important.

---

# 26. Section 03 — Connected Systems

Light section.

Correct the numbering to:

```text
03 / CONNECTED SYSTEMS
```

Do not reproduce any accidental numbering inconsistency from the generated reference.

Headline:

```text
THE PARTS THAT
MAKE EVERYTHING
WORK TOGETHER.
```

Blue dot after final period.

Lead statement:

```text
A form shouldn’t just send an email.
```

Body:

```text
It could create an enquiry, notify the right person, store the customer, send an acknowledgement and trigger the next step automatically.
```

---

# 27. Connected systems visual

Use:

```text
/public/whatwedo_mockup_3.png
```

Display it large and flat.

Do not redraw it.

Do not add a fake frame around it beyond a subtle 1px border/radius if the asset itself needs containment.

Desktop:

```text
LEFT copy ~37%
RIGHT visual ~63%
```

or a composition close to the reference where the image sits upper-right and examples span beneath.

---

# 28. Real examples

Below the integration visual, create three simple example panels.

Label above:

```text
REAL EXAMPLES
```

These are conceptual workflow examples, not case studies.

## Example 1

Title:

```text
Someone submits an enquiry.
```

Steps:

```text
CRM record created
Acknowledgement sent
Team notified
```

## Example 2

Title:

```text
Someone makes a booking.
```

Steps:

```text
Payment taken
Calendar updated
Confirmation sent
```

## Example 3

Title:

```text
Someone updates content.
```

Steps:

```text
Website updates
Connected data stays in sync
No manual work needed
```

Use thin vertical lines and small blue nodes to echo the system language.

Do not turn them into large rounded cards.

---

# 29. Example Configurations section

Dark section.

Label:

```text
EXAMPLE CONFIGURATIONS
```

Headline:

```text
DIFFERENT BUSINESSES.
DIFFERENT SYSTEMS.
```

Blue dot after final period.

Supporting copy:

```text
The same building blocks can be combined in completely different ways depending on what the business actually needs.
```

Also make clear these are examples, not portfolio claims.

Micro-label:

```text
EXAMPLES / NOT PORTFOLIO PROJECTS
```

This can be subtle.

---

# 30. Example configurations content

Use four editorial columns with thin vertical rules.

No rounded cards.

## 01 / PROPERTY BUSINESS

```text
Website
Property listings
Enquiries
CRM
Admin
```

## 02 / TRAINING BUSINESS

```text
Website
Courses
Bookings
Payments
Automated emails
```

## 03 / PROFESSIONAL SERVICES

```text
Website
Enquiry intake
Client dashboard
Documents
Workflows
```

## 04 / CREATIVE / MUSIC

```text
Website
Events
Content management
Enquiries
Audience email
```

Use simple text.

Do not add fake screenshots for these examples.

Do not imply Briggs has completed these specific projects.

---

# 31. Example configurations interaction

Desktop may use extremely subtle hover behaviour:

- column label shifts 2px,
- rule brightens slightly,
- relevant lines fade from 0.65 to 1.

No cards expanding.

No carousels.

Mobile stacks the four configurations vertically with horizontal rules.

---

# 32. Deleted sections

The following content is **not part of the final page** even if visible inside the reference image:

```text
HOW WE DECIDE WHAT TO BUILD
START WITH THE PROBLEM.

REAL PROJECT / DAVID BROWNE MURRAY
WEBSITE. MANAGEMENT. ONE SYSTEM.
```

Do not implement them.

Do not reuse DBM imagery on this page.

The homepage and eventual case-study route already cover project proof.

The capability page should remain focused.

---

# 33. Final CTA

After Example Configurations, transition directly into a dark Belfast CTA section.

Use:

```text
/public/hero.png
```

as the background.

Do not use the footer `BRIGGS` cutout image here.

## Overlay

Use a strong dark neutral overlay:

```css
background:
  linear-gradient(
    90deg,
    rgba(4,8,11,.90) 0%,
    rgba(4,8,11,.72) 48%,
    rgba(4,8,11,.50) 100%
  );
```

Keep Belfast/H&W visible.

---

# 34. Final CTA copy

Micro-label:

```text
LET’S BUILD SOMETHING
```

Headline:

```text
WHAT DOES YOUR
BUSINESS NEED
TO DO?
```

Blue dot after final period.

Supporting copy:

```text
Tell us how things work now, what isn’t working, and what you’d like to make possible.
```

Button:

```text
Start a Project →
```

Target:

```text
/start-a-project
```

Use existing primary blue CTA style.

Do not add another secondary button.

---

# 35. Footer

Immediately after the CTA, render the **existing approved shared SiteFooter**.

Do not recreate the footer from the reference mockup.

The homepage footer is the source of truth.

It should retain:

- approved Belfast wording,
- email/location treatment,
- BRIGGS photographic text clipping,
- copyright,
- Privacy,
- Terms,
- existing mobile behaviour.

Do not add:

- social icons,
- full navigation,
- another logo block,
- another Start a Project button.

---

# 36. Desktop section spacing

The page should feel dense enough to stay engaging but premium enough to breathe.

Suggested major section padding:

```css
padding-block: clamp(88px, 8vw, 140px);
```

Hero may be larger.

Example Configurations may be slightly tighter:

```css
padding-block: 72px 84px;
```

Do not make every section exactly one viewport.

The approved reference is a design board, not a mandate for forced viewport heights.

---

# 37. Mobile philosophy

The mobile page should use normal vertical scrolling.

No:

- scroll snapping,
- pinned horizontal sections,
- horizontal swiping,
- forced `100vh` scenes,
- artificial black gaps.

Each section should end naturally after its content.

This is especially important because the homepage implementation has already established the correct mobile behaviour.

---

# 38. Mobile hero

Order:

```text
Header
WHAT WE BUILD
Headline
Body
CTA
3-layer system visual
3 compact layer descriptions
```

Headline should retain strong scale.

Do not shrink it to make the whole hero fit in one viewport.

The stack can occupy another ~350–470px beneath the copy.

It is acceptable for the hero to exceed one phone viewport.

---

# 39. Mobile Big Idea

Stack:

```text
Label
Headline
Body
ONLY WHAT YOU NEED.
Connected-system image
```

The connected-system PNG must be large enough to read.

Use:

```css
width: 100%;
height: auto;
```

Do not crop it.

If the diagram labels become too small at 320px, permit horizontal internal scaling via a responsive wrapper, but **do not introduce horizontal page scrolling**.

Prefer simply letting it fill almost the full viewport width.

---

# 40. Mobile Public-Facing

Order:

```text
Label
Headline
Body
Strong supporting line
Feature list
Website screenshot
Optional compact annotation labels
```

Feature items remain simple rows.

Do not use a 2-column feature grid if it makes text cramped.

---

# 41. Mobile Management Systems

Order:

```text
Label
Headline
Body
Blue statement
Support
CMS image
Example modules grid
Explanatory note
```

Use a 2-column module grid if readable.

At 320–360px, allow 1 column if required.

There must be no large empty black space after the image/modules.

---

# 42. Mobile Connected Systems

Order:

```text
Label
Headline
Body
Integration visual
REAL EXAMPLES
Example 1
Example 2
Example 3
```

Examples stack vertically.

No sideways cards.

---

# 43. Mobile Example Configurations

Order:

```text
Label
Headline
Support
Property
Training
Professional Services
Creative / Music
```

Use horizontal separators.

Do not compress four columns side-by-side on mobile.

---

# 44. Mobile final CTA

Use Belfast background with dark overlay.

Stack:

```text
label
headline
support
Start a Project
```

Keep text left-aligned.

CTA may become full-width.

Transition immediately into the existing footer.

---

# 45. Animation system

Reuse the Motion/animation utilities already used on the homepage.

Use a consistent `fadeUp` variant.

Example:

```ts
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
```

Default:

```tsx
viewport={{ once: true, amount: 0.18 }}
```

Do not replay animations continuously.

---

# 46. Section-specific motion

## Hero

Most expressive animation:

- 3 layers spread apart,
- labels fade in,
- lines draw.

## Big Idea

- copy fades,
- diagram scale `.985 -> 1`.

## Public-Facing

- feature rows stagger 60–80ms,
- website mockup rises ~20px,
- annotation rules draw.

## Management Systems

- blue statement reveals line by line,
- CMS visual rises,
- module grid fades/staggers lightly.

## Connected Systems

- image rises,
- three real-example panels appear sequentially.

## Example Configurations

- rules draw,
- columns fade in.

## CTA

- headline fades/reveals,
- button rises.

Do not add constant floating loops to the main content.

---

# 47. Reduced motion

Mandatory.

When:

```css
prefers-reduced-motion: reduce
```

disable:

- hero stack spread animation,
- pointer parallax,
- line drawing,
- stagger delays,
- transform-based section entrances.

All content should display immediately.

Hover colour changes are fine.

---

# 48. Hero stack code sketch

Recommended React structure:

```tsx
const heroLayers = [
  {
    number: "01",
    eyebrow: "PUBLIC EXPERIENCE",
    title: "WEBSITE",
    description: "The part your customers see.",
    image: "/whatwedo_mockup_1.png",
    className: styles.websiteLayer,
  },
  {
    number: "02",
    eyebrow: "MANAGEMENT SYSTEM",
    title: "",
    description: "The part your business uses.",
    image: "/whatwedo_mockup_2.png",
    className: styles.cmsLayer,
  },
  {
    number: "03",
    eyebrow: "INTEGRATIONS & AUTOMATION",
    title: "",
    description: "The parts that make everything work together.",
    image: "/whatwedo_mockup_3.png",
    className: styles.automationLayer,
  },
];
```

Do not literally render labels on top of the screenshots.

Keep labels separate.

---

# 49. Connected-system code sketch

Simple:

```tsx
<div className={styles.connectedSystemVisual}>
  <Image
    src="/connectedsystem.png"
    alt="Diagram showing customers connecting through a website to enquiries, bookings, payments, content, a management system, CRM, email and database"
    width={1536}
    height={1024}
    sizes="(max-width: 900px) 94vw, 52vw"
  />
</div>
```

Use the image’s real dimensions if different.

Do not stretch it.

---

# 50. Reuse the same images later at full size

Important:

In the hero, all three existing images are transformed visually.

In their dedicated sections, reset transforms completely.

Example:

```css
.sectionMockup {
  transform: none;
}
```

Do not accidentally inherit the hero perspective styles.

The dedicated-section screenshots must remain easy to inspect.

---

# 51. Image performance

The three hero images are above the fold but are also large files.

Use Next Image and proper `sizes`.

Example:

```tsx
sizes="(max-width: 767px) 78vw, 34vw"
```

Use optimized image output.

Do not set all three to massive original dimensions in layout.

The top website layer is likely the main visual/LCP candidate; it may use `priority`.

The other two should still load promptly but do not need excessive preload behaviour unless Lighthouse testing justifies it.

All lower section images lazy-load normally.

`connectedsystem.png` should lazy-load unless it falls close enough to the fold that Next chooses otherwise.

---

# 52. Accessibility

Required:

- one page `<h1>` in the hero,
- each major section heading is `<h2>`,
- feature group names use appropriate `<h3>` where required,
- decorative blue squares/dots are `aria-hidden`,
- screenshots use useful alt text,
- image labels are real text,
- CTA links are real links,
- no click interaction depends on hover,
- no fake service arrows.

Suggested alt text:

```text
whatwedo_mockup_1.png:
"Example public-facing business website"

whatwedo_mockup_2.png:
"Example custom website management system showing editable pages"

whatwedo_mockup_3.png:
"Example connected digital system linking forms, payments, email, calendar, CRM, database, APIs and workflows"

connectedsystem.png:
"Connected business system showing customers, website, enquiries, bookings, payments, content, management system, CRM, email and database"
```

If the hero images are immediately accompanied by identical text and later repeated meaningfully, hero-stack instances may use empty alt to avoid duplicate screen-reader noise; the full-size later instances should use descriptive alt.

---

# 53. SEO metadata

Suggested:

```text
Title:
What We Build | Briggs Digital Solutions

Description:
Custom websites, management systems, integrations and digital tools built around how your business actually works. Briggs Digital Solutions, Belfast.
```

Do not stuff keywords.

---

# 54. Recommended component structure

Adapt to existing architecture.

Possible:

```text
components/what-we-build/
  WhatWeBuildHero.tsx
  HeroSystemStack.tsx
  ConnectedBusinessSection.tsx
  PublicFacingSection.tsx
  ManagementSystemsSection.tsx
  ConnectedSystemsSection.tsx
  ExampleConfigurationsSection.tsx
  WhatWeBuildCta.tsx
```

Page:

```tsx
<>
  <LandingHeader />

  <main>
    <WhatWeBuildHero />
    <ConnectedBusinessSection />
    <PublicFacingSection />
    <ManagementSystemsSection />
    <ConnectedSystemsSection />
    <ExampleConfigurationsSection />
    <WhatWeBuildCta />
  </main>

  <SiteFooter />
</>
```

Reuse existing `SectionLabel`, button and footer components.

Do not create duplicate shared UI.

---

# 55. Content constants

Where appropriate, keep lists in data objects.

Example:

```ts
export const managementModules = [
  "Content",
  "Projects",
  "Orders",
  "Customers",
  "Products",
  "Bookings",
  "Users",
  "Enquiries",
  "Events",
  "Documents",
  "Media",
  "Reporting",
];
```

Example configurations:

```ts
export const exampleConfigurations = [
  {
    number: "01",
    title: "PROPERTY BUSINESS",
    items: ["Website", "Property listings", "Enquiries", "CRM", "Admin"],
  },
  {
    number: "02",
    title: "TRAINING BUSINESS",
    items: ["Website", "Courses", "Bookings", "Payments", "Automated emails"],
  },
  {
    number: "03",
    title: "PROFESSIONAL SERVICES",
    items: ["Website", "Enquiry intake", "Client dashboard", "Documents", "Workflows"],
  },
  {
    number: "04",
    title: "CREATIVE / MUSIC",
    items: ["Website", "Events", "Content management", "Enquiries", "Audience email"],
  },
];
```

---

# 56. Tablet behaviour

No dedicated tablet reference exists.

Interpolate deliberately.

Hero:

- copy and stack may remain 2 columns above ~950px,
- below that, stack vertically.

Big Idea:

- connected diagram can sit below copy around 850–950px.

Public/Management/Connected:

- switch to stacked composition before the visuals become cramped.

Example configurations:

- 2x2 grid around tablet width,
- vertical stack on mobile.

Do not keep 4 tiny columns on a portrait tablet.

---

# 57. Breakpoints

Use the project’s existing breakpoints if already established.

Otherwise approximately:

```css
@media (min-width: 1200px) { ... }
@media (min-width: 900px) and (max-width: 1199px) { ... }
@media (min-width: 768px) and (max-width: 899px) { ... }
@media (max-width: 767px) { ... }
@media (max-width: 420px) { ... }
```

Avoid breakpoint explosion.

---

# 58. Visual QA

After implementation, compare directly against:

```text
/references/whatwedo_fullpage_ref.png
```

The final live page will be shorter because two sections are intentionally deleted and the approved existing footer is used.

That difference is expected.

Check especially:

### Hero
- headline scale,
- whitespace,
- three-layer perspective,
- layer separation,
- label placement,
- CTA position.

### Big Idea
- near-black surface,
- diagram size,
- `ONLY WHAT YOU NEED.` emphasis,
- balance between copy and image.

### Public-Facing
- image large enough,
- feature list not overly card-like,
- annotation density,
- heading scale.

### Management
- dark surface is neutral black,
- blue statement is large and confident,
- screenshot dominates,
- module grid feels technical rather than SaaS.

### Connected Systems
- integration visual readable,
- three examples clearly separate,
- page remains airy.

### Configurations
- columns align,
- thin rules,
- no fake project imagery.

### CTA
- Belfast background dark enough for text,
- H&W/industrial context visible,
- no repeated visual clutter.

---

# 59. Common implementation mistakes to avoid

Do not:

- generate separate hero assets,
- flatten the hero stack into one image,
- create fake phone/laptop devices,
- make the three capability sections look like cards,
- use navy instead of neutral black,
- over-round every container,
- introduce gradients across whole sections,
- create huge blank mobile gaps,
- force section heights to `100vh`,
- add horizontal mobile scrolling,
- add service subpage arrows with no destinations,
- reintroduce the deleted “Start With the Problem” section,
- reintroduce the DBM case-study strip,
- create a new footer,
- add fake portfolio projects,
- add stock imagery.

---

# 60. Responsive QA sizes

Test at minimum:

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
1672 x 941
1920 x 1080
```

Check:

- no horizontal overflow,
- hero layers never escape the page,
- hero labels remain readable,
- connected-system diagram is not cropped,
- screenshots remain legible,
- feature copy does not collide with visuals,
- management module grid wraps cleanly,
- example configurations stack correctly,
- CTA text remains readable over Belfast image,
- footer remains identical to approved homepage footer.

---

# 61. Reduced-motion QA

With reduced motion enabled:

- hero stack appears in final separated positions immediately,
- no parallax,
- no drawn connectors,
- no delayed reveal chains,
- all page content remains complete and polished.

---

# 62. Final implementation checklist

Before considering `/what-we-build` finished:

- [ ] Route exists at `/what-we-build`.
- [ ] Header is the existing shared header.
- [ ] `What We Build` is current/active in navigation.
- [ ] Hero uses `whatwedo_mockup_1.png`, `2.png`, and `3.png`.
- [ ] Hero does not use newly generated duplicate assets.
- [ ] Hero layers are separate DOM/Image elements.
- [ ] Hero stack has subtle separation animation.
- [ ] Hero mobile is vertically composed with no horizontal scroll.
- [ ] Big Idea uses `/connectedsystem.png`.
- [ ] Public-Facing uses `/whatwedo_mockup_1.png` at full readable size.
- [ ] Management uses `/whatwedo_mockup_2.png` at full readable size.
- [ ] Connected Systems uses `/whatwedo_mockup_3.png` at full readable size.
- [ ] Public section has four feature rows.
- [ ] Management section contains `NOT A DASHBOARD FULL OF FEATURES YOU DON’T NEED.`
- [ ] Management module grid is built in HTML/CSS.
- [ ] Connected section includes the three real-example workflows.
- [ ] Example Configurations contains four example business types.
- [ ] Example configurations are clearly examples, not portfolio claims.
- [ ] “Start With the Problem” section is NOT implemented.
- [ ] DBM real-project strip is NOT implemented.
- [ ] Final CTA uses `/hero.png`.
- [ ] Final CTA links to `/start-a-project`.
- [ ] Existing approved shared footer is reused unchanged.
- [ ] Dark sections are neutral near-black, not navy.
- [ ] No new fake imagery introduced.
- [ ] Mobile has no artificial blank gaps.
- [ ] Reduced motion works.
- [ ] Visual QA completed against `whatwedo_fullpage_ref.png`.
- [ ] Existing homepage and Start a Project page remain unchanged.

---

# 63. Definition of done

The page is complete when a non-technical business owner can understand, without needing developer vocabulary, that Briggs can build:

1. the part customers see,
2. the tools the business uses behind it,
3. the connections and automations that make the overall system work.

The page should feel like the natural deeper explanation of the homepage’s three-column `What We Build` section.

It should remain visually premium, direct and editorial — never like a generic agency services template.

The page must use the existing approved Briggs system rather than inventing a new visual language.

Match the approved reference closely, omit the two deleted lower sections, reuse the existing footer, and preserve the quality standard already established across the rest of the site.
