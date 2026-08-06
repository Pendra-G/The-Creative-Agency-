# Handover — content rebuild, 7 August 2026

What changed, what still needs a decision from you, and what I deliberately
didn't touch.

---

## Needs your input before launch

**1. The contact email is still a placeholder.**
`src/config.js` holds `hello@creative.agency` — the address that shipped with the
original build. It is not a real inbox. Every CTA on the site now routes to it.
One line to change:

```js
export const SITE = { email: "your-real@address", ... }
```

**2. Instagram and LinkedIn URLs are empty.**
Also in `src/config.js`. Empty entries are *hidden* rather than rendered as dead
`#` links, so the site is correct as-is — but those two social links currently
don't appear. Add the URLs to bring them back.

**3. Timelines are my assumption.**
"About two / three / four weeks" for the three tiers. You never gave me these —
I inferred them to make the packages concrete. Correct them in
`src/components/Packages.jsx` (the `timeline` field) and
`src/components/Process.jsx` (the heading) if they're wrong.

**4. "Up to five pages" on the Multi-Page tier is my assumption.**
You said "multipage" without a number. Change it in `Packages.jsx` if that's not
your intent.

**5. The hosting renewal figure isn't named.**
The Complete tier says renewal will be "quoted at cost before it falls due."
That's honest and safe, but naming an actual annual figure would be stronger. Give
me the number and I'll put it on the card.

---

## Open risk I did not touch (your call)

**The marquee under the hero hotlinks 21 GIFs from `motionsites.ai`.**
You chose to keep it for now, so I left it exactly as it was. Two things to know:

- It is another studio's work, on another studio's CDN, positioned directly under
  your hero where visitors will read it as your portfolio.
- They can hotlink-block or move those files at any time, and your homepage
  breaks with no warning.

When you're ready, the fix is screen recordings of your own builds dropped into
`src/assets/` — `src/components/Marquee.jsx` takes a plain array of image sources,
so it's a small change.

---

## Performance work still outstanding

I audited these but left them alone, since you asked for a content rebuild and
these are asset decisions:

| Item | Size | Note |
|---|---|---|
| `public/admilk-hero.webm` | 5.1 MB | Unused — nothing imports it |
| `public/admilk-milkball.webm` | 5.1 MB | Unused |
| `public/admilk-hero-video.webm` | 3.9 MB | Unused |
| `src/assets/PLLFI.png` | 1.8 MB | Unoptimised PNG of a screenshot; should be JPG/WebP |
| `src/assets/TropicX.png` | 1.6 MB | Same |
| Hero `.mp4` | 2.9 MB | Autoplays with no poster frame |

Deleting the three unused `.webm` files alone removes **14 MB**. On the island
mobile networks your own copy talks about, the hero video plus those two PNGs is
the entire page budget. Say the word and I'll do this pass.

---

## Fixed in this change

- **Both email forms silently discarded the address.** They ran
  `window.location.href = "#contact"` and threw the email away. Every lead you
  captured was lost. Now routes through the visitor's mail client with the address
  and a prompt structure carried through.
- **Every in-page anchor link on the site was dead.** Lenis owns the scroll
  position, so native hash jumps moved nothing — the nav, the CTAs, the footer
  links all did nothing. Now routed through `lenis.scrollTo` in
  `SmoothScroll.jsx`. Also removed the conflicting `scroll-behavior: smooth`.
- **Footer's second phone number displayed +679 8091770 but dialled +679
  2921000.** Both now come from `config.js`.
- **Footer showed a literal `contact@...` as its link text.**
- **three.js (~600 KB) was bundled but never rendered.** `EditorialHero` imported
  `BullScene` and never used it. Removing that dead import tree-shakes three.js
  out entirely — the build now reports it as an empty chunk.
- **Three unused font families** (Inter, Lilita One, Space Grotesk) were being
  downloaded on every visit while `tailwind.config.js` mapped everything to
  Roboto. Now Roboto only.
- **Two `<h1>` elements** on one page. Now one.
- **Fiji time was labelled "EST."** Now "FJT".
- **Nav "About" pointed at `#services`** with no About section on the page.
- Mobile menu didn't close when you tapped a link.
- Headings split into per-character spans for animation had no accessible name;
  the hero now carries an `aria-label`.
- Footer nav links were 13 px tall — under any usable touch-target size.
- Page `<title>` and meta description now describe the offer; added Open Graph tags.

## Content changes

- **Removed:** "Digital Fijian Artists" / "the most ambitious brands on the
  planet." Unsupportable with two case studies, and it fought a FJ$499 position.
- **New `Offer` section** — the value proposition, argued across four scroll-scrubbed
  beats while six pages fan out and collapse into one.
- **New `Process` section** — three steps, plus an honest "what FJ$499 doesn't get
  you."
- **New `Packages` section** — the three tiers.
- **`Services` demoted** to "What else we build," with marketing as a tail note.
- Hero, contact and footer copy rewritten. See `BRAND.md` for the voice rules.

---

## Verification status

Build passes. Structure, anchor routing, price rendering, sticky-panel fit,
mobile overflow and touch targets were all verified in-browser at 1280×800 and
391×847.

**The scroll animations themselves were not visually confirmed.** The preview
pane in this environment doesn't composite frames, so `requestAnimationFrame`
never fires and screenshots time out. I verified the animation *start states* are
correct programmatically, but you should scroll through the Offer section
yourself on a real browser before showing it to a client.
