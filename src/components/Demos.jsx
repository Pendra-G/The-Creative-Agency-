import { useRef, useState } from "react";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { TextLink } from "./ui.jsx";
import MiniSite from "./MiniSite.jsx";
import { mailtoHref } from "../config.js";

/**
 * The kinds of business we build for.
 *
 * Clips live in public/services and are all webm, compressed to well under a
 * megabyte each — so they carry preload="auto" and are ready with the page
 * rather than waiting on a scroll or a hover.
 */
const DEMOS = [
  { slug: "beauty-salon", name: "Beauty & wellness", note: "Treatments, prices, and how to book, in one scroll.", variant: "booking", tint: "#F472B6", wordmark: "Glow" },
  { slug: "photography", name: "Photography", note: "The portfolio first. Everything else gets out of the way.", variant: "gallery", tint: "#E5E7EB", wordmark: "Frame" },
  { slug: "tech-store", name: "Tech Store", note: "Product showcase with live inventory and online ordering.", variant: "catalogue", tint: "#06B6D4", wordmark: "Tech" },
  { slug: "restaurant", name: "Restaurant", note: "Menu, table bookings, and where to find you.", variant: "catalogue", tint: "#FB923C", wordmark: "Vale" },
  { slug: "car-rental", name: "Car rental", note: "Fleet, rates, and an enquiry that reaches you straight away.", variant: "booking", tint: "#38BDF8", wordmark: "Drive" },
];

function DemoCard({ demo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="dm-card group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-elevated">
        {/* The DOM miniature sits underneath until the clip has data, so a card
            is never an empty black rectangle. */}
        <MiniSite variant={demo.variant} tint={demo.tint} wordmark={demo.wordmark} />

        <video
          src={`/services/${demo.slug}.webm`}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Browser chrome, so the clip reads as a website rather than a video */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/5 bg-canvas/50 px-3 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="numeric ml-2 text-[11px] text-white/30">{demo.slug}.com</span>
        </div>
      </div>

      <h3 className="display mt-5 text-title-lg text-white">{demo.name}</h3>
      <p className="mt-2 max-w-sm text-body-sm text-body">{demo.note}</p>
    </article>
  );
}

export default function Demos() {
  /* Canvas, not surface: this now follows the hero directly, and the hero is
     full-bleed media, so a shared tone here reads as the hero settling into
     content. That frees the alternation to resume cleanly from the portfolios
     down. */
  return (
    <section id="build" className="bg-canvas py-section">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading text="Illustrative work" className="display text-display-lg text-white" />
          <Reveal>
            <p className="mt-6 max-w-measure text-body-lg text-body">
              Businesses that need to be found, trusted and contacted. If your customers look you up
              before they walk in or pick up the phone, this is for you.
            </p>
          </Reveal>
        </div>

        <Reveal
          selector=".dm-card"
          className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {DEMOS.map((d) => (
            <DemoCard key={d.slug} demo={d} />
          ))}
        </Reveal>

        <Reveal className="mt-16">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-md text-body">
            Not on the list?
            <TextLink as="a" href={mailtoHref("Website enquiry")}>
              Ask anyway
            </TextLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
