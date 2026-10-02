# Briggs Digital Solutions — Landing Page Implementation Specification

**Target file:** `instructions.md`  
**Project:** `briggsdigitalsolutions.com`  
**Framework:** Next.js  
**Primary goal:** Build a high-conversion, premium landing page that closely matches the supplied desktop and mobile mockups while remaining responsive, accessible, fast, maintainable, and realistic in actual browser viewports.

---

# 0. Read this first

This document is the source of truth for the initial Briggs Digital Solutions landing page implementation.

The supplied mockups are **visual references**, not flattened assets to be inserted into the page. Recreate the layouts with HTML, CSS and React. Use the supplied production assets only where this document explicitly tells you to use them.

The finished page should look extremely close to the references, but do **not** reproduce accidental AI artefacts, incorrect labels, impossible device geometry, broken perspective, fake buttons, fake links or obsolete navigation items from earlier design iterations.

## Non-negotiable design principles

1. **Conversion first.**
   - The visitor must understand what BDS does within seconds.
   - The primary CTA is always **Start a Project**.
   - The page should feel confident and concise rather than overloaded.

2. **Brutal/editorial typography with restraint.**
   - Very large, heavy display headlines.
   - Tight line-height.
   - Uppercase section labels with generous tracking.
   - Clean body typography.
   - Thin technical/industrial rules, crosshairs and micro-labels.

3. **Colour discipline.**
   - Soft warm off-white sections.
   - Neutral near-black sections.
   - One vivid electric blue accent.
   - Do not use the generic blue/navy “AI SaaS” background colour.
   - Do not add gradients to entire sections.

4. **No fake imagery.**
   - Use only the production images already supplied in `/public`.
   - Do not invent additional portfolio projects, mockups, stock photography or screenshots.
   - The generated Northridge visuals already supplied are design assets for the “What We Build” section. Do not create replacements.

5. **Motion should add polish, not become the product.**
   - Normal vertical browser scrolling.
   - No scroll-jacking.
   - No forced horizontal scrolling.
   - No full-page scroll snapping.
   - No giant page loader.
   - No custom cursor.
   - No floating decorative objects for the sake of it.

6. **Desktop and mobile are both first-class.**
   - Do not build desktop and merely shrink it.
   - Mobile uses the same visual language but different composition.
   - Several sections intentionally unfold over multiple normal mobile viewport-height scenes.

7. **Keep the site practical.**
   - This launch version intentionally does **not** include a dedicated musicians section on the homepage.
   - It intentionally does **not** include an About section on the homepage.
   - Do not reproduce obsolete `Musicians` and `About` navbar links from the early hero reference.
   - Do not create service subpages purely to satisfy decorative arrows.

---

# 1. Exact source assets

Do not rename these files unless absolutely required by the existing project structure.

## Production assets in `/public`

Use these exact paths:

```text
/public/bdslogo.png
/public/dbm_desktop_admin.png
/public/dbm_desktop_hero.png
/public/dbm_mobile_hero.png
/public/footer.png
/public/hero.png
/public/whatwedo_mockup_1.png
/public/whatwedo_mockup_2.png
/public/whatwedo_mockup_3.png
```

Ignore the default Next.js SVGs for this page unless needed elsewhere in the project.

### Production asset roles

| Asset | Use |
|---|---|
| `/bdslogo.png` | White Briggs Digital Solutions logo in hero/navigation |
| `/hero.png` | Belfast/H&W hero background |
| `/dbm_desktop_hero.png` | Real DBM public website desktop screenshot |
| `/dbm_mobile_hero.png` | Real DBM public website mobile screenshot |
| `/dbm_desktop_admin.png` | Real DBM artist/admin management system screenshot |
| `/whatwedo_mockup_1.png` | Website example for “Websites” |
| `/whatwedo_mockup_2.png` | CMS/admin example for “Management Systems” |
| `/whatwedo_mockup_3.png` | Integrations/automation diagram for “Digital Systems” |
| `/footer.png` | Monochrome Belfast docklands image used as the photographic fill inside the large `BRIGGS` footer wordmark |

## Visual references in `/references`

Use these exact reference files:

```text
/references/hero_desktop_ref.png
/references/hero_mobile_ref.png

/references/proof_desktop_ref.png
/references/proof_mobile_ref.png

/references/whatwedo_desktop_ref.png
/references/whatwedo_mobile_ref.png

/references/howwework_desktop_ref.png
/references/howework_mobile_ref.png

/references/footer_both_ref.png
```

**Important:** the mobile process reference filename is intentionally spelled:

```text
howework_mobile_ref.png
```

Do not assume it is `howwework_mobile_ref.png`.

## Reference priority

If this specification conflicts with an old piece of text visible in a mockup:

1. Follow this document for **copy, navigation, links and behaviour**.
2. Follow the mockup for **composition, proportion, spacing and visual treatment**.
3. Follow the production asset files for **actual imagery**.
4. Never copy an obvious AI artefact just because it exists in a reference.

---

# 2. Recommended dependencies

First inspect `package.json` and the existing styling setup.

Do not replace an established project stack unnecessarily.

Recommended additions if they are not already installed:

```bash
npm install motion lucide-react
```

Use:

- `motion/react` for restrained entrance and scroll-linked animations.
- `lucide-react` for simple outline icons.
- Next.js `<Image>` for all raster assets.
- Next.js `<Link>` for internal navigation.

Do **not** install:

- a component library,
- a carousel library,
- GSAP,
- a large animation framework,
- a UI theme,
- Bootstrap,
- a second CSS framework.

The page can be recreated with standard React/CSS and `motion`.

---

# 3. Suggested project structure

Adapt this to the existing project if equivalent files already exist.

```text
app/
  page.tsx
  globals.css

components/
  landing/
    LandingHeader.tsx
    MobileMenu.tsx
    HeroSection.tsx
    SelectedWorkSection.tsx
    WhatWeBuildSection.tsx
    HowWeWorkSection.tsx
    SiteFooter.tsx
    DeviceFrame.tsx
    SectionLabel.tsx

lib/
  landing-content.ts

public/
  ...existing supplied assets...

references/
  ...existing supplied references...
```

If the project already uses CSS Modules, a good structure is:

```text
components/landing/LandingPage.module.css
```

A single carefully organised module is preferable to scattering pixel-critical styling over many files.

---

# 4. Global design tokens

Create CSS variables so the page remains consistent.

Use approximately these values as the initial implementation:

```css
:root {
  --paper: #f4f2ed;
  --paper-bright: #faf9f5;

  --ink: #111111;
  --ink-soft: #20201f;

  /* Neutral near-black. Do not replace with navy. */
  --dark: #121211;
  --dark-deep: #0b0d0e;

  --blue: #4160fd;
  --blue-hover: #3150f5;
  --blue-soft: rgba(65, 96, 253, 0.10);

  --text-on-dark: #f7f6f2;
  --text-muted-dark: #b8b8b5;
  --text-muted-light: #66686b;

  --line-light: rgba(17, 17, 17, 0.22);
  --line-dark: rgba(255, 255, 255, 0.26);

  --page-gutter: clamp(22px, 4vw, 72px);
  --content-max: 1680px;

  --radius-card: 16px;
  --radius-button: 2px;

  --shadow-device:
    0 22px 70px rgba(0, 0, 0, 0.18),
    0 5px 20px rgba(0, 0, 0, 0.10);
}
```

## Main colour behaviour

### Light sections

Use:

```css
background: var(--paper);
color: var(--ink);
```

The process section may use `--paper-bright` if it better matches the reference after screenshot comparison.

### Dark sections

Use:

```css
background: var(--dark);
color: var(--text-on-dark);
```

Do not tint this strongly blue.

The dark surface should read as a premium neutral charcoal/black.

### Footer

Use:

```css
background: var(--dark-deep);
```

---

# 5. Typography

The mockups use a heavy neo-grotesk/editorial display style with a clean sans-serif body.

Use:

- **Display/headings:** `Inter Tight`, weights `800` and `900`
- **Body/UI:** `Inter`, weights `400`, `500`, `600`, `700`

Load them through the existing Next.js font strategy. Prefer `next/font/google` if the project already supports it.

Expose font variables:

```css
--font-display
--font-body
```

Example:

```css
body {
  font-family: var(--font-body), Arial, sans-serif;
}

.display {
  font-family: var(--font-display), Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.88;
}
```

## Heading style

The large headings are one of the most important parts of the design.

Desktop section heading baseline:

```css
font-size: clamp(68px, 6vw, 108px);
font-weight: 900;
line-height: 0.88;
letter-spacing: -0.055em;
text-transform: uppercase;
```

Mobile section heading:

```css
font-size: clamp(48px, 13vw, 66px);
line-height: 0.90;
letter-spacing: -0.05em;
```

Do not use a condensed novelty font.

## Body type

Desktop large supporting copy:

```css
font-size: clamp(20px, 1.6vw, 30px);
line-height: 1.25;
letter-spacing: -0.025em;
```

Normal body:

```css
font-size: 16px;
line-height: 1.45;
```

Mobile body:

```css
font-size: 17px;
line-height: 1.45;
```

## Technical labels

Examples:

- `02 / SELECTED WORK`
- `03 / WHAT WE BUILD`
- `PUBLIC-FACING`
- `CUSTOM CMS`
- `APPROVE`

Style:

```css
font-size: 11px;
font-weight: 600;
letter-spacing: 0.20em;
text-transform: uppercase;
```

At desktop, 11–13px is acceptable depending on viewport.

---

# 6. Shared layout language

Every section must feel like the same site.

Use the following recurring language:

- thin 1px rules,
- short crosshair marks,
- small electric-blue squares or dots,
- numbered section labels,
- large bold editorial headings,
- off-white/black contrast,
- generous negative space,
- minimal rounded corners,
- blue only where emphasis is useful.

Do not randomly add industrial photography to non-photo sections.

The “industrial” feel comes from:

- line work,
- typography,
- Belfast imagery where appropriate,
- grid logic,
- precise labels,
- functional composition.

It does **not** come from fake concrete walls, pipes, metal textures or warehouse stock imagery.

---

# 7. Global page structure

Implement the landing page in this order:

```text
01 Hero
02 Selected Work / DBM proof
03 What We Build
04 How We Work
Footer
```

There is intentionally:

- no homepage musician teaser in v1,
- no homepage About section in v1,
- no redundant standalone final CTA section.

The CTA at the end of the process section is the final conversion moment before the footer.

Recommended DOM:

```tsx
<main>
  <HeroSection />
  <SelectedWorkSection />
  <WhatWeBuildSection />
  <HowWeWorkSection />
</main>
<SiteFooter />
```

IDs:

```text
#top
#work
#what-we-build
#how-we-work
```

---

# 8. Navigation decisions

The hero mockup contains old exploratory links such as `Musicians` and `About`.

Do **not** reproduce those dead IA choices in v1.

Use:

```text
Work
What We Build
How We Work
[Start a Project]
```

Desktop:

- logo left,
- three text links centered/right,
- CTA on far right.

Mobile:

- logo left,
- hamburger right,
- no permanent top CTA button in the compact header unless it can fit cleanly at the target width.
- hero itself contains the large Start a Project button.

Recommended targets:

```text
Work           -> #work
What We Build  -> #what-we-build
How We Work    -> #how-we-work
Start a Project -> /start-a-project
```

Do not create the `/start-a-project` destination as part of this landing-page task unless the project already contains it.

## Header styling

The navbar must sit **directly over the hero image**.

Do not add the grey/translucent rectangular navbar background seen in an early rejected version.

Desktop header:

```css
position: absolute;
top: 0;
left: 0;
right: 0;
z-index: 20;
```

Use no background.

Do not make the header sticky in v1.

This avoids white-logo contrast issues over the later light sections and most closely matches the accepted mockup.

---

# 9. Logo

Use:

```text
/public/bdslogo.png
```

Do not recreate the logo with text.

Desktop approximate rendered width:

```css
width: clamp(205px, 15vw, 255px);
height: auto;
```

Mobile:

```css
width: 185px;
height: auto;
```

Adjust slightly after comparison with `hero_mobile_ref.png`.

---

# 10. Section 01 — Hero

References:

```text
/references/hero_desktop_ref.png
/references/hero_mobile_ref.png
```

Production image:

```text
/public/hero.png
```

## Objective

The visitor must understand immediately:

- BDS builds websites.
- BDS can build more than brochure websites.
- The work is custom.
- The company is Belfast based.
- The next action is obvious.

## Copy

Eyebrow:

```text
BELFAST BASED / WORKING WORLDWIDE
```

Hero headline:

```text
WE BUILD
WEBSITES THAT
DO MORE.
```

Mobile line-break variant:

```text
WE BUILD
WEBSITES
THAT DO
MORE.
```

Supporting copy:

```text
Design-led websites, web applications and digital systems built around what your business actually needs.
```

Primary CTA:

```text
Start a Project
```

Secondary CTA:

```text
See Our Work
```

Bottom proof row:

```text
01
Custom Built
NO TEMPLATES

02
Mobile First
BEAUTIFUL EVERYWHERE

03
Design + Development
ALL IN-HOUSE
```

Desktop right-side microcopy:

```text
DESIGN
DEVELOPMENT
SYSTEMS
```

## Hero dimensions

Desktop:

```css
min-height: 100svh;
```

Target the reference at a standard 16:9 desktop viewport.

Mobile:

```css
min-height: 100dvh;
```

Do not hard-lock the section to exactly `100vh` on short devices if content would clip. Use `min-height`, not `height`.

On very short phones, allow the hero to become naturally taller than the viewport.

## Hero image implementation

Use Next `<Image>`:

```tsx
<Image
  src="/hero.png"
  alt=""
  fill
  priority
  sizes="100vw"
  className={styles.heroImage}
/>
```

The image is decorative because the visible content describes the page.

Desktop image:

```css
.heroImage {
  object-fit: cover;
  object-position: center center;
  filter: brightness(0.78) saturate(0.92) contrast(1.05);
}
```

Mobile:

```css
object-position: 72% center;
```

The important visual target is:

- readable dark left/top,
- Belfast waterfront visible,
- H&W crane clearly visible in the lower-right half,
- warm orange city reflections retained,
- no text colliding with the crane.

## Hero overlay

Use CSS, not an edited duplicate of the image.

Desktop starting point:

```css
.heroOverlay {
  background:
    linear-gradient(
      90deg,
      rgba(5, 12, 17, 0.84) 0%,
      rgba(5, 12, 17, 0.68) 38%,
      rgba(5, 12, 17, 0.34) 72%,
      rgba(5, 12, 17, 0.22) 100%
    ),
    linear-gradient(
      180deg,
      rgba(4, 8, 11, 0.12) 0%,
      rgba(4, 8, 11, 0.06) 52%,
      rgba(3, 7, 9, 0.44) 100%
    );
}
```

Mobile should use a slightly stronger dark overlay behind the text.

## Desktop composition

Use page gutters of roughly 5%.

Header top around 36–42px.

Main hero content should begin roughly 18–20% down the viewport.

Headline width around 58–62% of the page.

Supporting copy width around 560px.

Buttons side-by-side.

Proof row pinned visually near the bottom but still in normal flow.

Approximate layout:

```text
LOGO          Work  What We Build  How We Work       CTA

BELFAST BASED / WORKING WORLDWIDE

WE BUILD
WEBSITES THAT
DO MORE. •

Supporting copy

[ Start a Project ↗ ]  [ See Our Work ↓ ]


01                    02                    03
Custom Built          Mobile First          Design + Development
NO TEMPLATES          BEAUTIFUL EVERYWHERE  ALL IN-HOUSE
```

## Mobile composition

Use the mobile reference closely.

Layout order:

```text
Logo                         hamburger

BELFAST BASED / WORKING WORLDWIDE

WE BUILD
WEBSITES
THAT DO
MORE. •

Supporting copy

[ Start a Project ↗ ]
[ See Our Work ↓ ]

Belfast image / crane remains visible

01              02              03
Custom Built    Mobile First    Design + Development
```

The proof row remains 3 columns on mobile but typography must be small enough not to overflow.

Use vertical separators between the three metrics.

## Buttons

Primary:

```css
background: linear-gradient(135deg, #4a62ff 0%, #3453ff 100%);
color: white;
border: 1px solid rgba(255,255,255,.08);
border-radius: 2px;
```

Do not make it a pill.

Desktop button height about 70px.

Mobile about 58–64px.

Secondary:

- transparent dark,
- 1px white/grey border,
- white text.

## Hero industrial line work

Use pseudo-elements and simple divs.

Include:

- small horizontal line after the eyebrow,
- subtle short crosshair accents,
- left perimeter line if it helps match the mockup,
- top-right microcopy on desktop.

**Do not place a long vertical line down through the H&W crane.**
That specific treatment was rejected.

---

# 11. Hero animations

Use restrained motion.

On initial load:

1. background image scale from `1.025` to `1`,
2. navbar fades from `opacity: 0`, `y: -8`,
3. eyebrow fades in,
4. each H1 line reveals upward through a clipped wrapper,
5. body copy fades,
6. CTA row fades,
7. proof metrics fade last.

Suggested timing:

```text
navbar       0.00–0.45s
eyebrow      0.15–0.55s
headline 1   0.22–0.65s
headline 2   0.30–0.73s
headline 3   0.38–0.81s
body         0.48–0.85s
buttons      0.58–0.95s
proof row    0.72–1.10s
```

Use easing similar to:

```ts
[0.22, 1, 0.36, 1]
```

Do not bounce.

---

# 12. Section 02 — Selected Work / DBM proof

References:

```text
/references/proof_desktop_ref.png
/references/proof_mobile_ref.png
```

Assets:

```text
/public/dbm_desktop_hero.png
/public/dbm_desktop_admin.png
/public/dbm_mobile_hero.png
```

Section ID:

```text
#work
```

Background:

```css
background: var(--paper);
```

## Copy

Section label:

```text
02 / SELECTED WORK
```

Headline:

```text
BUILT TO
ACTUALLY
WORK.
```

Blue dot after the final period.

Supporting copy:

```text
Good design gets attention. The right technology turns that attention into something useful.
```

Project metadata:

```text
01
2026
```

Project title:

```text
DAVID BROWNE
MURRAY
```

Subtitle:

```text
MUSICIAN WEBSITE +
DIGITAL PLATFORM
```

Project description:

```text
A custom artist website connected to the tools needed to manage gigs, releases, enquiries and an owned audience.
```

Primary CTA label:

```text
View Project
```

Secondary CTA:

```text
Visit Website
```

The current DBM deployment from the project material is:

```text
https://dbm-website-ebon.vercel.app/
```

If a newer production URL already exists in the repo/config, use that instead.

For the case-study route:

```text
/work/david-browne-murray
```

If that route does not exist yet, keep the destination isolated in a constant so it can be changed later. Do not invent more work-page content during this landing-page task.

## Feature strip copy

Desktop:

```text
CUSTOM WEBSITE
BESPOKE DESIGN

CONTENT MANAGEMENT
GIGS, RELEASES, MEDIA

ENQUIRIES
BOOKING REQUESTS

FAN MAILING LIST
OWN YOUR AUDIENCE

SCALABLE PLATFORM
BUILT FOR GROWTH
```

Use outline icons from `lucide-react`:

- Globe2
- FileText
- CalendarDays or Inbox
- Mail
- BarChart3

The feature strip copy must be HTML text, not baked into an image.

---

# 13. Selected Work — desktop layout

This should look like a premium editorial case study rather than a generic card.

The section can be around one large desktop viewport but is allowed to extend slightly if required.

Use roughly:

```css
padding:
  clamp(70px, 7vw, 120px)
  var(--page-gutter)
  54px;
```

Layout:

- left column ~39%
- visual composition ~61%

The large website screenshot dominates the composition.

Admin panel sits behind the public site to the upper-right.

Mobile screenshot overlaps in front near the lower-right.

## Device shells

Do not use a device-frame image asset.

Create lightweight shells in CSS.

### Browser/desktop shell

Example:

```tsx
<div className={styles.desktopDevice}>
  <div className={styles.browserBar}>
    <span />
    <span />
    <span />
  </div>
  <Image ... />
</div>
```

Use:

```css
border-radius: 12px;
overflow: hidden;
border: 1px solid rgba(255,255,255,.18);
box-shadow: var(--shadow-device);
background: #111;
```

The screenshot itself must remain crisp.

### Desktop perspective

For the main public website:

```css
transform:
  perspective(1400px)
  rotateY(-4deg)
  rotateX(1deg);
```

Admin panel:

```css
transform:
  perspective(1400px)
  rotateY(-3deg)
  translate(6%, -8%);
```

Do not over-rotate.

It must look like a designed product presentation, not 3D mockup software.

### Phone shell

Use a pure CSS black phone frame.

Keep the frame simple.

No need to recreate every speaker/sensor detail.

Use:

```css
border: 8px solid #101010;
border-radius: 36px;
box-shadow: 0 18px 45px rgba(0,0,0,.24);
overflow: hidden;
```

---

# 14. Selected Work — mobile behaviour

This section intentionally unfolds over **two normal vertically scrolling scenes**.

Do not implement horizontal scroll.

Do not pin the whole section.

Do not use snap scrolling.

## Mobile Scene 1

Approximate content:

```text
02 / SELECTED WORK

BUILT TO
ACTUALLY
WORK. •

Supporting copy

01 ------------------ 2026

DAVID
BROWNE
MURRAY

MUSICIAN WEBSITE +
DIGITAL PLATFORM

[public website visual enters from bottom]
01 / PUBLIC WEBSITE
```

Use:

```css
min-height: 100svh;
```

But allow natural overflow on short phones.

The screenshot can deliberately be partly clipped at the bottom to imply continuation.

## Mobile Scene 2

Continue directly into:

- `02 / ARTIST CMS`
- large admin screenshot,
- mobile screenshot overlapping it,
- small `RESPONSIVE / MOBILE` label,
- the four most important feature blocks,
- project CTAs.

Mobile feature blocks:

```text
CUSTOM WEBSITE
BESPOKE DESIGN

CONTENT MANAGEMENT
GIGS, RELEASES, MEDIA

ENQUIRIES
BOOKING REQUESTS

FAN MAILING LIST
OWN YOUR AUDIENCE
```

The fifth “Scalable Platform” item may be hidden on mobile to keep the scene readable.

This is an intentional mobile simplification.

---

# 15. Selected Work animation

When the section enters:

- label fades,
- headline rises 16px,
- project copy fades,
- public website device rises 22px,
- admin device rises 14px with a slight delay,
- phone rises 26px last.

On desktop only, add a **very small** scroll-linked parallax range:

```text
public site: 0 to -18px
admin:       0 to -28px
phone:       0 to -36px
```

Do not move more than this.

On mobile use normal entrance animations only.

---

# 16. Section 03 — What We Build

References:

```text
/references/whatwedo_desktop_ref.png
/references/whatwedo_mobile_ref.png
```

Assets:

```text
/public/whatwedo_mockup_1.png
/public/whatwedo_mockup_2.png
/public/whatwedo_mockup_3.png
```

Section ID:

```text
#what-we-build
```

Background:

```css
background: var(--dark);
```

This section should be visibly different from the off-white DBM section above it.

Do not use blue/navy as the background.

## Copy

Section label:

```text
03 / WHAT WE BUILD
```

Headline:

```text
BUILT AROUND
HOW YOUR BUSINESS
ACTUALLY WORKS.
```

Blue dot at the end.

Supporting copy:

```text
Every business is different. We design the public-facing experience, then build the custom tools, integrations and workflows behind it — so everything actually works together.
```

Top-right desktop microcopy:

```text
WEBSITES.
MANAGEMENT SYSTEMS.
DIGITAL SYSTEMS.
BUILT FOR YOU.
```

## The three concepts

### 01 — Websites

Label:

```text
PUBLIC-FACING
```

Title:

```text
Websites
```

Body:

```text
High-performance websites designed around your brand, audience and goals.
```

Image:

```text
/public/whatwedo_mockup_1.png
```

### 02 — Management Systems

Label:

```text
CUSTOM CMS
```

Title:

```text
Management Systems
```

Body:

```text
Back-end tools built around the content, pages and updates your business actually needs to manage.
```

Image:

```text
/public/whatwedo_mockup_2.png
```

This is the key point:

BDS does not simply hand over a static website.

Where a client needs it, BDS builds a management system behind the site so the business can manage the information and workflows that matter to it.

### 03 — Digital Systems

Label:

```text
INTEGRATIONS & AUTOMATION
```

Title:

```text
Digital Systems
```

Body:

```text
Connect the forms, bookings, payments and services your business relies on — and automate the parts that slow you down.
```

Image:

```text
/public/whatwedo_mockup_3.png
```

This represents public-facing functionality and connected business systems:

- forms,
- bookings,
- payments,
- CRM,
- email,
- databases,
- APIs,
- automations,
- custom workflows.

---

# 17. What We Build — desktop layout

The accepted desktop design is a 3-column system.

Header area occupies the upper portion.

Three equal columns underneath.

Approximate:

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 18px;
```

Each service column includes:

1. number,
2. thin rule,
3. micro-label,
4. title,
5. body,
6. image.

The image should fill almost the full card width.

Do not place the image in another fake browser-frame composition unless the production asset itself already includes that design.

Use the supplied image as-is.

Example image wrapper:

```css
overflow: hidden;
border-radius: 14px;
border: 1px solid rgba(255,255,255,.14);
background: var(--paper);
```

## Decorative arrows

The current reference includes circular right-arrow icons.

There are no service subpages in v1.

Therefore:

- keep an arrow circle only if needed to match the visual reference,
- render it as a **non-interactive decorative icon**,
- `aria-hidden="true"`,
- `cursor: default`,
- do not wrap it in a link,
- do not create fake destinations.

If the page still reads better without them after implementation, they may be removed.

Do not mislead the user with a fake clickable affordance.

---

# 18. What We Build — mobile structure

Mobile is **three normal vertical scenes**.

The three phones in the reference represent three successive browser viewports, not three side-by-side cards in the live page.

Use:

```text
Viewport / Scene 1:
section intro + Websites

Viewport / Scene 2:
Management Systems

Viewport / Scene 3:
Digital Systems
```

No horizontal scrolling.

No pinned horizontal deck.

No scroll snapping.

## Scene 1

Includes:

- section label,
- headline,
- supporting paragraph,
- Websites title/body,
- `whatwedo_mockup_1.png`.

This scene can be a little taller than one viewport on very short phones.

## Scene 2

Includes:

- `02`,
- `CUSTOM CMS`,
- Management Systems title/body,
- `whatwedo_mockup_2.png`.

Keep enough negative space above and below the image.

## Scene 3

Includes:

- `03`,
- `INTEGRATIONS & AUTOMATION`,
- Digital Systems title/body,
- `whatwedo_mockup_3.png`.

This final diagram should remain large and legible.

Do not crop off the integration labels.

---

# 19. What We Build motion

Use normal vertical entry.

When each scene enters:

```text
number/label: opacity 0 -> 1
title: y 16 -> 0
body: y 10 -> 0
image: y 22 -> 0, scale .99 -> 1
```

No giant transforms.

No sideways swipe.

No interaction is required to understand the content.

---

# 20. Section 04 — How We Work

References:

```text
/references/howwework_desktop_ref.png
/references/howework_mobile_ref.png
```

Section ID:

```text
#how-we-work
```

Background:

```css
background: var(--paper-bright);
```

This returns the page to a light surface after the dark What We Build section.

## Copy

Section label:

```text
04 / HOW WE WORK
```

Headline:

```text
CLEAR PROCESS.
NO SURPRISES.
```

Blue dot at the end.

Supporting copy:

```text
You’ll know what we’re building, what happens next, and you’ll approve the direction before development moves forward.
```

Desktop top-right microcopy:

```text
CLEAR STAGES.
DIRECT COMMUNICATION.
APPROVED BEFORE
BUILD.
```

---

# 21. Process stages

## 01

Micro-label:

```text
UNDERSTAND
```

Title:

```text
TALK
```

Body:

```text
Tell us about your goals, current setup and what you’re looking to achieve.
```

Bullets:

```text
Your goals
Current setup
Challenges
Opportunities
```

## 02

Micro-label:

```text
DEFINE
```

Title:

```text
PLAN
```

Body:

```text
We map out the pages, functionality, integrations and technical requirements so you know exactly what’s included.
```

Bullets:

```text
Site structure
Key functionality
Integrations needed
Clear project scope
```

## 03

Micro-label:

```text
APPROVE
```

Title:

```text
DESIGN
```

Body:

```text
We create the key screens and mockups first, so you can review and approve the direction before development starts.
```

Bullets:

```text
Wireframes
Visual mockups
Responsive screens
Your feedback and revisions
```

The approval point is important.

The page must clearly communicate:

> The client sees and agrees the visual direction before the development phase continues.

## 04

Micro-label:

```text
BUILD
```

Title:

```text
DEVELOP
```

Body:

```text
Once the design is approved, we build the responsive website, set up management tools and integrate the agreed functionality.
```

Bullets:

```text
Front-end build
CMS / management tools
Integrations & automations
Testing throughout
```

## 05

Micro-label:

```text
DELIVER
```

Title:

```text
LAUNCH
```

Body:

```text
We test everything, deploy your website and provide training and ongoing support so you’re set up for success.
```

Bullets:

```text
Final QA
Deployment
Handover & training
Ongoing support (optional)
```

---

# 22. Process reassurance + CTA

Below the desktop timeline:

Main reassurance:

```text
YOU DEAL WITH THE PEOPLE
ACTUALLY BUILDING IT.
```

Blue dot after it.

Body:

```text
Direct communication from first conversation to launch. The same people planning the work are the ones designing and building it.
```

Blue callout:

```text
You’ll see mockups and agree the direction before we move into build.
```

Primary CTA:

```text
Start a Project
```

Secondary text link:

```text
GET IN TOUCH
```

`Start a Project`:

```text
/start-a-project
```

`GET IN TOUCH`:

```text
mailto:hello@briggsdigitalsolutions.com
```

The process section is the final conversion section.

Do not add another large CTA section after it.

---

# 23. How We Work — desktop layout

Match the reference closely.

The headline occupies the upper left.

Timeline runs horizontally through the five stages.

The connecting line passes through five circular nodes.

Stage headings align above/below the line in the same rhythm as the reference.

Each stage uses approximately 18–19% of available width.

Do not turn these into floating cards.

This should read as a single organised process.

Approximate structure:

```tsx
<div className={styles.timeline}>
  <div className={styles.timelineLine} />
  {steps.map(step => (
    <article className={styles.timelineStep}>
      ...
    </article>
  ))}
</div>
```

The line can be absolute inside the timeline wrapper.

Nodes should be:

```css
width: 22px;
height: 22px;
border-radius: 999px;
border: 2px solid var(--blue);
background: var(--paper-bright);
```

Final node:

```css
background: var(--blue);
box-shadow: 0 0 0 12px rgba(65,96,253,.08);
```

---

# 24. How We Work — mobile structure

The accepted mobile design is shown as **three sequential real mobile viewports**.

These are not three different pages.

They are the approximate scroll journey through one section.

Use a continuous vertical timeline along the left edge.

## Mobile Viewport 1

Contains:

- `04 / HOW WE WORK`
- headline,
- supporting copy,
- Talk,
- Plan.

The vertical blue/grey process line continues downward.

## Mobile Viewport 2

Contains:

- Design,
- Develop.

## Mobile Viewport 3

Contains:

- Launch,
- reassurance block,
- mockup approval callout,
- Start a Project,
- Get in Touch.

Do not force a hard browser snap at these boundaries.

They are composition targets, not scroll-snap points.

---

# 25. Process animation

Desktop:

- headline enters,
- timeline line draws left-to-right,
- nodes scale in sequentially,
- stage contents fade in with a small delay,
- final node receives a subtle blue halo.

Mobile:

- vertical line can reveal downward as the section progresses,
- each node fades/scales in when it approaches the viewport,
- content uses opacity/y only.

Avoid continuously animated pulsing nodes.

---

# 26. Footer

Reference:

```text
/references/footer_both_ref.png
```

Asset:

```text
/public/footer.png
```

The footer is compact.

Do not add:

- logo at the top,
- social icons,
- full site navigation,
- another big CTA button,
- a second contact form.

## Footer copy

Top sign-off:

```text
BUILT IN BELFAST.
MADE TO WORK ANYWHERE.
```

Blue dot after `ANYWHERE.`

Email:

```text
hello@briggsdigitalsolutions.com
```

Location:

```text
Belfast, Northern Ireland
```

Sub-location:

```text
Working across UK / Ireland
```

Copyright:

```text
© 2026 Briggs Digital Solutions. All rights reserved.
```

Legal links:

```text
Privacy
Terms
```

Use routes:

```text
/privacy
/terms
```

If those routes are not yet implemented, keep the hrefs in one central constant so they are easy to add later.

---

# 27. Footer `BRIGGS` cutout effect

Do **not** insert a flattened image containing the word BRIGGS.

The word must be live text.

The supplied `/public/footer.png` is only the Belfast photographic fill.

Example:

```tsx
<div className={styles.footerWordmark} aria-label="Briggs">
  BRIGGS<span className={styles.footerDot}>.</span>
</div>
```

CSS:

```css
.footerWordmark {
  display: inline-block;

  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(150px, 24vw, 390px);
  line-height: 0.72;
  letter-spacing: -0.075em;

  background-image: url('/footer.png');
  background-size: cover;
  background-position: center 58%;

  color: transparent;
  -webkit-text-fill-color: transparent;

  background-clip: text;
  -webkit-background-clip: text;

  user-select: none;
}

.footerDot {
  color: var(--blue);
  -webkit-text-fill-color: var(--blue);
}
```

Important:

The dot is separate and must **not** be photo-filled.

## Mobile wordmark

Use something close to:

```css
font-size: clamp(78px, 25vw, 118px);
letter-spacing: -0.07em;
background-position: 44% 56%;
```

Adjust `background-position` after comparing to the reference so the H&W cranes remain visible through the letters.

## Fallback

Provide a fallback for browsers without text clipping:

```css
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .footerWordmark {
    color: #d8d8d5;
    -webkit-text-fill-color: #d8d8d5;
    background: none;
  }
}
```

---

# 28. Footer layout

Desktop:

```text
BUILT IN BELFAST.
MADE TO WORK ANYWHERE. •

------------------------------------------------

[email icon] hello@...        |       [pin] Belfast, Northern Ireland
                                      Working across UK / Ireland

------------------------------------------------

BRIGGS[photo clipped in letters] •

© 2026...                                   Privacy | Terms
```

Keep the footer shallow relative to the earlier rejected versions.

The giant wordmark is still the visual event, but the entire footer should not feel like another full-page section.

Mobile:

```text
BUILT IN BELFAST.
MADE TO WORK
ANYWHERE. •

--------------------

email

--------------------

Belfast, Northern Ireland
Working across UK / Ireland

--------------------

BRIGGS •

© 2026...
Privacy | Terms
```

Keep spacing tight and deliberate.

---

# 29. Section transition rhythm

The page should alternate clearly:

```text
Hero           dark/photo
Selected Work  light
What We Build  dark
How We Work    light
Footer         dark
```

Avoid grey strips between sections.

Avoid extra spacer sections.

The transition itself is part of the visual identity.

---

# 30. Mobile menu

Closed state must match the hero mobile reference:

- white logo,
- simple three-line hamburger,
- transparent background.

Open menu can be a full-screen near-black overlay.

Suggested links:

```text
Work
What We Build
How We Work
Start a Project
```

Use large typography.

Do not add social icons unless explicitly requested later.

Accessibility:

```text
aria-expanded
aria-controls
button aria-label
Escape key closes menu
body scroll locked while open
```

---

# 31. Scroll behaviour

Global:

```css
html {
  scroll-behavior: smooth;
}
```

But respect:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

When anchor-scrolling from the hero:

- scroll to the top of the target section,
- do not create a sticky-header offset because the header is not sticky.

No `scroll-snap-type`.

No horizontal body overflow.

Add:

```css
html,
body {
  overflow-x: clip;
}
```

If browser compatibility requires it:

```css
overflow-x: hidden;
```

---

# 32. Motion system

Use a single consistent animation system.

Suggested reusable variants:

```ts
export const fadeUp = {
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

Use `viewport={{ once: true, amount: 0.2 }}` for normal section reveals.

Avoid replaying animations every time the user scrolls up/down.

## Button interaction

Primary CTA:

```text
hover:
  translateY(-1px)
  arrow translateX(4px)
  background blue slightly darkens

active:
  translateY(0)
```

Secondary CTA:

```text
border becomes brighter
arrow/down icon moves 3px
```

Duration ~160–220ms.

## Decorative line animation

Where appropriate:

```css
transform-origin: left center;
```

Animate `scaleX: 0 -> 1`.

Do not animate width directly if avoidable.

---

# 33. Reduced motion

Mandatory.

If:

```css
@media (prefers-reduced-motion: reduce)
```

then:

- remove parallax,
- remove background scale,
- remove line-drawing animation,
- remove staged motion delays,
- preserve content immediately,
- retain only simple hover colour changes.

The site must still look complete with animations disabled.

---

# 34. Breakpoints

Use content-driven breakpoints, approximately:

```css
@media (min-width: 1200px) { ... large desktop ... }

@media (min-width: 768px) and (max-width: 1199px) { ... tablet ... }

@media (max-width: 767px) { ... mobile ... }

@media (max-width: 420px) { ... compact phone ... }
```

Do not write the page only for one iPhone size.

---

# 35. Tablet behaviour

No dedicated tablet mockup exists.

Interpolate logically.

Hero:

- keep image background,
- reduce headline size,
- keep nav if it still fits; otherwise use hamburger.

Selected Work:

- two-column upper content may become stacked,
- device composition may remain overlapping but less rotated.

What We Build:

- stack cards vertically if three columns feel cramped.

How We Work:

- convert horizontal timeline to vertical below about 950px if required.

Footer:

- 2-column contact row can remain until around 760px.

Do not let tablet become a squashed desktop version.

---

# 36. Accessibility

Required.

- One `<h1>` on the page: hero headline.
- Section headlines use `<h2>`.
- Project title can be `<h3>`.
- Service titles can be `<h3>`.
- Process step titles can be `<h3>`.
- Navigation uses `<nav aria-label="Primary">`.
- Footer legal links use `<nav aria-label="Legal">`.
- Buttons that navigate use `<Link>`, not `<button>`.
- Hamburger is a real `<button>`.
- Decorative arrows use `aria-hidden`.
- Decorative hero image uses empty alt.
- Portfolio screenshots get descriptive alt text.
- Keyboard focus states must be clearly visible.
- No interaction is hover-only.
- Text must meet contrast requirements.
- Do not hide meaningful copy inside imagery only.

Suggested alt text:

```text
dbm_desktop_hero.png:
"David Browne Murray musician website shown on desktop"

dbm_mobile_hero.png:
"David Browne Murray musician website shown on mobile"

dbm_desktop_admin.png:
"David Browne Murray artist management dashboard"

whatwedo_mockup_1.png:
"Example custom business website"

whatwedo_mockup_2.png:
"Example custom website management system"

whatwedo_mockup_3.png:
"Diagram of connected business forms, payments, email, CRM, database and custom workflows"
```

---

# 37. Performance

The hero is the only image that should load with `priority`.

All other images should lazy-load normally.

Use `sizes` correctly.

Examples:

Hero:

```tsx
sizes="100vw"
```

Desktop DBM:

```tsx
sizes="(max-width: 767px) 94vw, 62vw"
```

What We Build card:

```tsx
sizes="(max-width: 767px) 92vw, 31vw"
```

Footer image is used as CSS text fill.

Avoid using it anywhere else.

Do not preload all screenshots.

Do not use video.

Do not use canvas.

Do not create enormous shadows that cause expensive paint on scroll.

---

# 38. SEO + metadata

For `app/page.tsx` or root metadata, use an initial title similar to:

```text
Briggs Digital Solutions | Websites That Do More
```

Description:

```text
Belfast-based web design and development for businesses that need more than a template — custom websites, management systems, integrations and digital tools.
```

Use semantic headings.

The page should remain useful with JS disabled except for optional animation/menu behaviour.

---

# 39. Component data model

Do not hard-code every process item separately if a clean data structure is easier.

Example:

```ts
export const processSteps = [
  {
    number: "01",
    label: "UNDERSTAND",
    title: "TALK",
    body:
      "Tell us about your goals, current setup and what you’re looking to achieve.",
    bullets: [
      "Your goals",
      "Current setup",
      "Challenges",
      "Opportunities",
    ],
  },
  // ...
];
```

And:

```ts
export const buildAreas = [
  {
    number: "01",
    label: "PUBLIC-FACING",
    title: "Websites",
    body:
      "High-performance websites designed around your brand, audience and goals.",
    image: "/whatwedo_mockup_1.png",
  },
  // ...
];
```

Keep the display copy easy to edit.

---

# 40. Example `SectionLabel` component

```tsx
type SectionLabelProps = {
  number: string;
  children: React.ReactNode;
  inverse?: boolean;
};

export function SectionLabel({
  number,
  children,
  inverse = false,
}: SectionLabelProps) {
  return (
    <div
      className={[
        styles.sectionLabel,
        inverse ? styles.sectionLabelInverse : "",
      ].join(" ")}
    >
      <span className={styles.sectionLabelSquare} aria-hidden="true" />
      <span className={styles.sectionLabelNumber}>{number}</span>
      <span aria-hidden="true">/</span>
      <span>{children}</span>
      <span className={styles.sectionLabelLine} aria-hidden="true" />
    </div>
  );
}
```

The line can flex to fill available space but should not run across the entire screen.

---

# 41. Example headline reveal

Do not split into individual letters.

Reveal by line.

```tsx
const lines = ["WE BUILD", "WEBSITES THAT", "DO MORE."];

{lines.map((line, i) => (
  <div className={styles.heroLineClip} key={line}>
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.22 + i * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {line}
      {i === lines.length - 1 && (
        <span className={styles.blueDot}>•</span>
      )}
    </motion.span>
  </div>
))}
```

CSS:

```css
.heroLineClip {
  overflow: hidden;
}

.heroLineClip > span {
  display: block;
}
```

---

# 42. Example mobile process timeline

Do not make each mobile viewport a separate route or slider.

Use one continuous timeline.

```tsx
<div className={styles.mobileTimeline}>
  <div className={styles.mobileTimelineRail} aria-hidden="true" />
  {processSteps.map((step) => (
    <article key={step.number} className={styles.mobileTimelineStep}>
      <span className={styles.mobileTimelineNode} aria-hidden="true" />
      <header>
        <span>{step.number}</span>
        <span className={styles.stepRule} />
        <span>{step.label}</span>
      </header>

      <h3>{step.title}</h3>
      <p>{step.body}</p>

      <ul>
        {step.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  ))}
</div>
```

---

# 43. Device mockup implementation notes

Use the real screenshots.

Do not add fake browser text over them.

Do not regenerate them.

Do not distort them excessively.

If using CSS transform:

- preserve screenshot aspect ratio,
- use `transform-style: preserve-3d` only if required,
- do not blur,
- do not crop important site UI.

The goal is the layered product-presentation look from the reference, not perfect photorealistic hardware.

---

# 44. Exact section-specific desktop targets

These are visual targets, not rigid values.

## Hero

At 1440–1680px:

- headline left edge around 5%,
- headline width around 58%,
- crane clearly visible on right,
- main CTA row around lower-middle,
- proof row around bottom 12%.

## Proof

At 1440–1680px:

- text block left around 36–40% width,
- main website device begins near horizontal center,
- admin panel rises behind it to the right,
- phone overlaps lower right,
- five-feature strip across bottom.

## What We Build

At 1440–1680px:

- heading uses upper 35–40%,
- 3 equal concepts occupy lower 55–60%,
- cards remain readable,
- no excessive padding.

## Process

At 1440–1680px:

- heading upper left,
- timeline centered vertically in lower half,
- five stages fit across,
- reassurance/CTA strip anchored along bottom.

## Footer

At 1440–1680px:

- top message and contact row together occupy approximately top 38–42%,
- `BRIGGS` fills most width beneath,
- legal row tightly below.

---

# 45. Mobile viewport philosophy

The references use multiple mockups to show the normal scroll journey.

Do not interpret them as slide carousels.

Target these approximate experiences:

```text
Hero:
~1 tall phone viewport

Selected Work:
~2 phone viewports

What We Build:
~3 phone viewports

How We Work:
~3 phone viewports

Footer:
well under one phone viewport when possible
```

This is a **visual planning target**, not a rule forcing `height: 100vh`.

If content must extend slightly to avoid tiny text or clipping, let it.

Normal scroll quality is more important than artificial viewport maths.

---

# 46. Do not introduce these rejected ideas

Do not add any of the following:

- faded navy background,
- abstract blue SaaS gradients,
- fake concrete wall imagery,
- fake warehouse imagery,
- fake screens not supplied in `/public`,
- a standalone musician homepage section,
- a generic About section,
- a second final CTA section,
- scroll-to-explore text,
- a long vertical line through the hero crane,
- a grey navbar plate,
- social icons in the footer,
- full navigation menu in the footer,
- a giant logo in the footer,
- fake service links,
- carousel dots,
- scroll snapping,
- horizontal mobile scroll deck.

---

# 47. Responsive quality checks

Verify at least:

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
- hero heading never collides with crane,
- logo remains crisp,
- proof devices do not cover project copy,
- text does not become unreadably small,
- management system title wraps cleanly,
- digital systems diagram stays legible,
- process bullets fit without clipping,
- footer BRIGGS word never escapes the viewport,
- footer image crop remains attractive.

---

# 48. Visual QA workflow

After the first implementation, do not immediately consider the task finished.

Perform an explicit visual matching pass.

## Desktop

Compare against:

```text
hero_desktop_ref.png
proof_desktop_ref.png
whatwedo_desktop_ref.png
howwework_desktop_ref.png
footer_both_ref.png
```

Use the same approximate viewport dimensions as the reference where practical.

Review:

- text scale,
- line breaks,
- container widths,
- margins,
- vertical rhythm,
- image sizes,
- overlay darkness,
- device angles,
- blue intensity,
- line density,
- section heights.

## Mobile

Compare against:

```text
hero_mobile_ref.png
proof_mobile_ref.png
whatwedo_mobile_ref.png
howework_mobile_ref.png
footer_both_ref.png
```

Check mobile by scrolling normally, not by trying to fit an entire section into one screenshot.

## Iteration rule

When the implementation feels “close” but not premium, the issue will usually be one of:

- heading too small,
- gutters too wide,
- body copy too narrow,
- too much vertical padding,
- dark surface too blue,
- cards too rounded,
- images too small,
- line work too heavy,
- blue used too frequently.

Fix those before adding new decoration.

---

# 49. Conversion QA

A visitor should understand the following without opening another page:

1. Briggs builds websites.
2. Briggs can build useful management tools behind them.
3. Briggs can connect forms, bookings, payments and other systems.
4. Briggs has built a real custom musician platform.
5. Clients approve the design before development proceeds.
6. Clients deal directly with the people doing the work.
7. The obvious next action is Start a Project.

If any of these becomes unclear, improve hierarchy before adding more copy.

---

# 50. Final implementation checklist

Before marking the landing page complete:

- [ ] Uses `/public/hero.png` as hero background.
- [ ] Uses `/public/bdslogo.png` in hero nav.
- [ ] No grey navbar background.
- [ ] Hero has correct desktop and mobile line breaks.
- [ ] Hero has Start a Project + See Our Work.
- [ ] Hero contains 3 proof metrics.
- [ ] No scroll-to-explore copy.
- [ ] DBM section uses all 3 real DBM screenshots.
- [ ] DBM images are displayed as responsive product mockups, not flattened composition images.
- [ ] DBM desktop feature strip contains 5 items.
- [ ] DBM mobile scene is split naturally across roughly 2 viewport moments.
- [ ] What We Build uses neutral near-black, not navy.
- [ ] What We Build uses the 3 exact `whatwedo_mockup` assets.
- [ ] The category names are Websites / Management Systems / Digital Systems.
- [ ] Service arrows are not fake links.
- [ ] What We Build mobile uses normal vertical scrolling over 3 scenes.
- [ ] Process headline says CLEAR PROCESS. NO SURPRISES.
- [ ] Design stage explicitly communicates mockup approval before build.
- [ ] Process desktop uses horizontal timeline.
- [ ] Process mobile uses vertical timeline.
- [ ] Process mobile naturally unfolds across roughly 3 viewport moments.
- [ ] Final Start a Project CTA lives at the end of the process section.
- [ ] No redundant standalone CTA section.
- [ ] Footer contains no logo.
- [ ] Footer contains no socials.
- [ ] Footer contains no navigation list.
- [ ] Footer contains email + Belfast location.
- [ ] Footer `BRIGGS` is live CSS text with `/footer.png` clipped into it.
- [ ] Blue footer dot is separate from the photograph.
- [ ] Footer contains Privacy + Terms + copyright.
- [ ] All animations respect reduced motion.
- [ ] Page has no horizontal overflow at 320px.
- [ ] Only hero image is priority loaded.
- [ ] All CTA/link targets are centralised and easy to change.
- [ ] No new fake imagery has been introduced.
- [ ] Final desktop and mobile screenshots have been compared to every reference file.

---

# 51. Definition of done

The page is complete when it:

- feels visually consistent with the supplied mockups,
- looks intentional on both desktop and mobile,
- uses the actual supplied assets rather than recreated approximations,
- feels premium while still loading quickly,
- has normal, predictable scrolling,
- communicates BDS’s difference clearly,
- contains no dead-looking or misleading interaction,
- remains easy to extend later with `/start-a-project`, case studies and optional industry-specific pages.

Do not redesign the page while implementing it.

The objective is to **translate the approved visual system into a real website faithfully**.
