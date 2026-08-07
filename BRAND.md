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

| Token | Value | Role |
|---|---|---|
| `ink` | `#000000` | Primary dark surface |
| `carbon` | `#0C0C0C` | Raised dark surface, cards |
| `bone` | `#F4F1EA` | Warm light surface + text on dark |
| `paper` | `#FFFFFF` | Bright light surface |
| `navy` | `#0A1A3A` | Reserved accent, largely unused |

**Type:** Roboto only — 300/400/500/700/900. Display headings are
`uppercase`, `font-bold`, `tracking-tightest` (-0.045em), `leading-[0.88]`,
sized with `clamp()` so they scale with viewport.

**Section rhythm:** alternate dark and light. Current order runs
carbon → black → ink → bone → ink → white → ink → ink → white. Every section
opens with a dot + uppercase kicker, then an oversized display heading.

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
