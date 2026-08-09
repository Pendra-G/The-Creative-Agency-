import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextLink } from "./ui.jsx";
import { MaskHeading } from "./Reveal.jsx";
import MiniSite from "./MiniSite.jsx";
import { mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

/**
 * Businesses in Fiji that need a small site and can justify FJ$499.
 *
 * Each card shows a live miniature of that industry's site, built in DOM so
 * there is nothing to download and it stays sharp at any size. If a real
 * screen recording is dropped at public/demos/<slug>.webm it fades in over the
 * top; until then the miniature is the preview, not a placeholder.
 */
const DEMOS = [
  {
    slug: "hair-salon",
    name: "Hair salon",
    note: "Cuts, prices, and a booking button that works on a phone.",
    variant: "booking",
    tint: "#C084FC",
    wordmark: "Shear",
  },
  {
    slug: "photography",
    name: "Photography",
    note: "The portfolio first. Everything else gets out of the way.",
    variant: "gallery",
    tint: "#E5E7EB",
    wordmark: "Frame",
  },
  {
    slug: "beauty-salon",
    name: "Beauty salon",
    note: "Treatments, prices, and how to book, in one scroll.",
    variant: "booking",
    tint: "#F472B6",
    wordmark: "Glow",
  },
  {
    slug: "gadgets",
    name: "Gadget seller",
    note: "Stock, prices and a Viber button. No cart to maintain.",
    variant: "catalogue",
    tint: "#38BDF8",
    wordmark: "Volt",
  },
  {
    slug: "cafe",
    name: "Café & takeaway",
    note: "Menu, hours, location. The three things people search for.",
    variant: "catalogue",
    tint: "#FBBF24",
    wordmark: "Kava",
  },
  {
    slug: "trades",
    name: "Trades & services",
    note: "What you do, where you work, and a number to call.",
    variant: "booking",
    tint: "#FB923C",
    wordmark: "Bilo",
  },
];

function DemoCard({ demo, index }) {
  const videoRef = useRef(null);
  const [hasClip, setHasClip] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const play = () => videoRef.current?.play().catch(() => {});
  const pause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <article
      className="dm-card group"
      onMouseEnter={touch ? undefined : play}
      onMouseLeave={touch ? undefined : pause}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-carbon">
        <MiniSite variant={demo.variant} tint={demo.tint} wordmark={demo.wordmark} />

        {/* Browser chrome sits above the miniature */}
        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/5 bg-ink/40 px-3 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="ml-2 micro text-white/30">{demo.slug}.fj</span>
        </div>

        {/* Real recording, if one exists. Only marked available once it can
            actually play, so a missing file never flashes an empty frame. */}
        <video
          ref={videoRef}
          src={`/demos/${demo.slug}.webm`}
          muted
          loop
          playsInline
          preload="none"
          autoPlay={touch}
          onCanPlay={() => setHasClip(true)}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hasClip ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          } ${hasClip && touch ? "opacity-100" : ""}`}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="display text-lg text-white sm:text-xl">{demo.name}</h3>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/55">{demo.note}</p>
        </div>
        <span className="micro shrink-0 text-white/25">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </article>
  );
}

export default function Demos() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".dm-head p", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".dm-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dm-grid", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="build" ref={root} className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="dm-head max-w-2xl">
          <MaskHeading text="What we build" className="display text-white text-[clamp(2rem,7vw,4.5rem)]" />
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Mostly small businesses that need to be found, trusted and contacted. If your customers
            look you up before they walk in, this is for you.
          </p>
        </div>

        <div className="dm-grid mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d, i) => (
            <DemoCard key={d.slug} demo={d} index={i} />
          ))}
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/55">
          Not on the list?
          <TextLink as="a" href={mailtoHref("Website enquiry")}>
            Ask anyway
          </TextLink>
        </p>
      </div>
    </section>
  );
}
