import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

// three.js lives in its own chunk (see vite.config.js) and is only fetched once
// the visitor scrolls near this section — the rest of the page never pays for it.
const ShowcaseScene = lazy(() => import("../three/ShowcaseScene.jsx"));

const DEMOS = [
  {
    variant: "iridescent",
    chrome: "product-launch.fj",
    title: "Product launch",
    body: "Chrome, light and refraction. The kind of hero that makes a small brand look like it has a budget it doesn't.",
    featured: true,
  },
  {
    variant: "field",
    chrome: "studio-landing.fj",
    title: "Agency landing",
    body: "A grid that answers your cursor. Depth without a single photograph.",
  },
  {
    variant: "orbit",
    chrome: "island-tours.fj",
    title: "Travel & tourism",
    body: "For operators who need to look global from Nadi.",
  },
];

function Poster({ title }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.07] to-white/[0.02]">
      <span className="text-[9px] uppercase tracking-[0.24em] text-bone/35">{title}</span>
    </div>
  );
}

function DemoTile({ demo, armed }) {
  return (
    <div
      className={`sc-tile relative flex flex-col overflow-hidden rounded-xl border border-white/12 bg-ink ${
        demo.featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* browser chrome, matching the idiom used in the services grid */}
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-white/10 bg-white/[0.04] flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="ml-2 text-[9px] uppercase tracking-[0.18em] text-bone/35 truncate">
          {demo.chrome}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] text-bone/45">
          <span className="sc-live h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div
        className={`relative w-full ${
          demo.featured ? "h-[280px] xs:h-[340px] lg:h-[520px]" : "h-[220px] lg:h-[246px]"
        }`}
      >
        {armed ? (
          <Suspense fallback={<Poster title={demo.title} />}>
            <ShowcaseScene variant={demo.variant} />
          </Suspense>
        ) : (
          <Poster title={demo.title} />
        )}
      </div>

      <div className="px-4 py-4 border-t border-white/10">
        <h3 className="font-display font-bold uppercase text-xs xs:text-sm tracking-[0.1em] mb-1.5">
          {demo.title}
        </h3>
        <p className="text-bone/55 text-xs xs:text-sm leading-relaxed">{demo.body}</p>
      </div>
    </div>
  );
}

export default function Showcase() {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion visitors never load the WebGL bundle at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".sc-head", {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".sc-tile", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sc-grid", start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={ref}
      className="bg-carbon text-bone py-16 xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="showcase-heading"
    >
      <style>{`
        @keyframes sc-pulse { 0%,100% { opacity:1 } 50% { opacity:.25 } }
        .sc-live { animation: sc-pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sc-live { animation: none } }
      `}</style>

      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        {/* Deliberately not the dot + kicker + giant-heading pattern used by the
            sections above and below — the page needs a break in its own rhythm. */}
        <div className="sc-head grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-end border-b border-white/10 pb-8 xs:pb-10">
          <div>
            <h2
              id="showcase-heading"
              className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8.5vw,6.5rem)]"
            >
              See it move.
            </h2>
            <p className="mt-5 max-w-xl text-bone/70 text-sm xs:text-base sm:text-lg leading-relaxed">
              These aren't videos or screenshots. They're real 3D scenes rendering in your browser
              right now — drag your cursor across one. This is the kind of thing we put on a
              one-pager.
            </p>
          </div>
          <p className="text-[10px] xs:text-[11px] uppercase tracking-[0.2em] text-bone/40 lg:text-right lg:max-w-[16rem]">
            Loaded only when you scroll here, so the rest of the page stays fast.
          </p>
        </div>

        <div className="sc-grid mt-8 xs:mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 xs:gap-5">
          {DEMOS.map((d) => (
            <DemoTile key={d.variant} demo={d} armed={armed} />
          ))}
        </div>

        <div className="mt-10 xs:mt-12 flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6">
          <p className="text-bone/60 text-sm xs:text-base leading-relaxed max-w-lg">
            Want something like this on yours? Tell us what it's for and we'll say whether 3D
            actually helps — sometimes it doesn't.
          </p>
          <a
            href={mailtoHref("3D website enquiry")}
            data-cursor
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-bone px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink hover:bg-white transition-colors whitespace-nowrap self-start"
          >
            Talk 3D with us <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
