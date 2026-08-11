# The Creative Agency — Brand & Voice Guidelines

Derived from the shipped site, the positioning decisions of 7 August 2026, and the
existing visual system in `tailwind.config.js` / `src/index.css`.

> **Note on sources.** These guidelines were built from the codebase and the
> positioning decisions taken directly with the owner. No brand platforms
> (Notion, Gong, Confluence, Box, Figma) were connected, so nothing was
> discovered from prior brand material. If those get connected later, this
> document should be re-checked against whatever they hold.

---

## 1. Positioning

**We build one-page websites with real motion and 3D, from FJ$499.**

The one-pager is the signature product — the thing we are known for and the
thing we go all out on. Multi-page builds and marketing are real services, but
they are secondary, and the site says so.

**Who it's for:** Fijian and Pacific businesses that need to look considered
without an agency retainer — studios, restaurants, rentals, trades, consultants,
small brands launching something.

**Who it isn't for:** anyone needing a storefront, a CMS-managed publication, or
a fifty-page corporate site. We say so on the first call rather than sell them
the wrong thing.

**The wedge:** most agencies won't quote a price publicly. We do. Naming FJ$499
in the headline does the qualifying for us.

---

## 2. Voice

**Direct and plain-spoken.** Short sentences. Real numbers. No agency-speak.
Expensive agencies hide behind abstraction — plainness reads as confidence.

### The five principles

**1. Say the number.**
Price is the differentiator. Never bury it, never soften it into "affordable" or
"competitive."
- ✅ "One page. Fully animated. FJ$499."
- ❌ "Premium digital experiences at accessible price points."

**2. Short sentences carry weight.**
Break the thought. Let it land. Fragments are fine.
- ✅ "So we build one."
- ❌ "That is why our approach centres on the consolidation of content into a singular page."

**3. Claim only what we can show.**
Two case studies is two case studies. No "world-class," no "the most ambitious
brands on the planet," no invented client counts.
- ✅ "Scroll-driven animation and real depth."
- ❌ "Trusted by leading brands worldwide."

**4. Name the limits before the client finds them.**
Volunteering what a price *doesn't* cover buys more trust than any testimonial.
- ✅ "What FJ$499 doesn't get you."
- ✅ "Sometimes one page isn't right for you, and we'll say so."

**5. Talk about their outcome, not our process.**
The client cares whether people enquire — not about our methodology.
- ✅ "Everything that earns the enquiry, in a single scroll."
- ❌ "We leverage a design-thinking framework."

### Register

Confident, never boastful. Warm, never chummy. We are a small Fijian studio that
knows exactly what it is good at — that's the tone. Dry humour is allowed;
jokes are not.

---

## 3. Vocabulary

**Use:** one page · built to move · ships / live · enquiry · scroll · motion ·
depth · from FJ$X · we'll say so · yours to keep · properly · straight answer

**Avoid:** solutions · leverage · synergy · bespoke · cutting-edge ·
state-of-the-art · world-class · passionate · journey · unlock · elevate ·
game-changing · digital experiences (as a noun phrase) · "reach out"

**Spelling:** British/Commonwealth — *organise, colour, centre, programme,
optimise.* Keep it consistent; the site currently uses it throughout.

**Currency:** always `FJ$` with no space — `FJ$499`, `FJ$1,500`. Never a bare
`$`, which overseas readers will read as USD.

---

## 4. Rules for claims and pricing

These are the ones that create real liability if broken.

- **There is exactly one price: FJ$499, one-off, in FJD.** No tiers, no
  packages, no retainer. Everything else is quoted individually.
- **The one-pager includes 30 days of small edits.** Say it once, plainly.
- **Never invent a second price.** If work falls outside the one-pager, the
  answer is "we'll quote it" — never a number guessed on the spot.
- **Quotes are free and carry no obligation.** Say both.
- **Timelines are "about two weeks."** Keep the hedge — it is honest and it
  protects us.
- **The 3D showcase demos are ours, and they are demos.** They prove capability;
  they are not client work and must never be captioned as if they were.
- **Never present other studios' work as ours.** See the open item on the
  marquee in `HANDOVER.md`.

---

## 5. Visual system

Already implemented; documented here so it stays consistent.

The site runs a **light palette with dark anchors** — near-white surfaces
punctuated by deep ink panels, and a single burnt-orange accent.

| Token | Value | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Page background |
| `foreground` | `#111111` | Body text on light |
| `surface` | `#F1F0EE` | Light fill, alternating sections |
| `surface2` | `#E3E2DF` | Raised light fill |
| `line` | `#E6E5E2` | Hairline borders |
| `muted` / `subtle` | `#8D8D8D` / `#B6B6B6` | Secondary text |
| `ink` | `#0A0A0A` | Dark anchors: hero, showcase, work, footer, cards |
| `carbon` | `#111111` | Raised surface on dark |
| `accent` | `#B15F2C` | The only accent. Use sparingly. |
| `accent-from` / `accent-to` | `#CF8047` / `#97501F` | Accent gradient |

**Radii:** pill `9999px`, card `2rem`, card-sm `1.25rem`, control `0.875rem`.
Shell max-width `88rem`.

**Type:** Onest only — 400/500/600/700. Display headings are `uppercase`,
`font-semibold`, `tracking-tightest` (-0.02em), `leading-[0.9]`, sized with
`clamp()` so they scale with viewport. Body copy is Onest 400.

**Section rhythm:** dark → light → dark. Hero and marquee form one ink block
with a rounded bottom; Offer and Packages are white; Marquee, Process and
Contact are `surface`; Showcase, Work and Footer are ink anchors with rounded
corners. Most sections open with an Eyebrow (dot + label), then an oversized
display heading.

**Controls:** every CTA is a `PillButton` from `src/components/ui.jsx` —
variants `dark`, `light`, `outline`, `accent`, optionally `withArrow`. Don't
hand-roll buttons; extend that component.

**Motion:** GSAP + ScrollTrigger, Lenis for smooth scroll. Reveals are
`power3.out`, 0.8–1s, y-offset 40–80px, stagger 0.06–0.15. Scrubbed sequences
use `scrub: 0.5–0.6`. Every animation must have a `prefers-reduced-motion`
escape — this is non-negotiable and already wired into every component.

---

## 6. Reusable copy

**One-liner:** One-page websites with real motion and 3D. Built in Fiji, live in
about two weeks.

**Headline:** One page. Fully animated. FJ$499.

**Sign-off:** One page. Built to move. From FJ$499.

**Boilerplate (short):** The Creative Agency builds one-page animated websites
for Pacific businesses, from FJ$499. Designed and built in Fiji.

**The honest line (use it often):** If a one-pager isn't right for you, we'll
say that on the call rather than sell you one.
