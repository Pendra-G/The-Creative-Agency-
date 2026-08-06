import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { split } from "../utils/anim.js";
import { mailtoHref } from "../config.js";
import HeroVideo from "../assets/Developer_coding_creative_agency…_202607071835.mp4";
gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "One page. Fully animated. FJ$499.";

export default function Hero() {
  const h1 = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const chars = split(h1.current);
      gsap.set(chars, { yPercent: 100, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.018,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });
    }, h1);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[65vh] sm:min-h-screen bg-carbon text-bone overflow-hidden pt-[44px]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <video
          className="relative h-[65vh] sm:h-[70vh] max-h-[80vh] w-full max-w-[1200px] object-cover opacity-80"
          src={HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-carbon" />

      <div className="relative z-10 mx-auto max-w-[1500px] min-h-[calc(65vh-44px)] sm:min-h-[calc(100vh-44px)] px-4 xs:px-5 sm:px-8 flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
        <div className="w-full max-w-full">
          {/* split() rebuilds this heading as per-character spans, so the
              accessible name is carried by aria-label rather than the DOM text. */}
          <h1
            ref={h1}
            aria-label={HEADLINE}
            className="font-display font-bold uppercase break-normal leading-[1.05] sm:leading-[0.95] tracking-tightest text-bone text-center text-[clamp(2.3rem,10.5vw,5.5rem)] sm:text-[clamp(3rem,7.5vw,6.5rem)] max-w-[20ch] xs:max-w-[17ch] mx-auto"
          >
            {HEADLINE}
          </h1>
        </div>

        <p className="max-w-[44ch] text-sm sm:text-base text-bone/80 leading-relaxed px-2 sm:px-0">
          One-page websites with real motion and 3D. Built in Fiji, live in about two weeks.
        </p>

        <div className="flex w-full max-w-[28rem] sm:max-w-none flex-col sm:flex-row items-center justify-center gap-3 px-2 sm:px-0">
          <a
            href="#packages"
            data-cursor
            className="inline-flex h-12 w-full sm:w-auto min-w-[180px] items-center justify-center rounded-full bg-white px-7 text-[0.65rem] leading-none font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-slate-100 whitespace-nowrap"
          >
            See packages
          </a>
          <a
            href={mailtoHref("Website enquiry — one page")}
            data-cursor
            className="inline-flex h-12 w-full sm:w-auto min-w-[180px] items-center justify-center gap-2 rounded-full border border-white/50 px-7 text-[0.65rem] leading-none font-semibold uppercase tracking-[0.22em] text-bone transition hover:bg-bone hover:text-ink whitespace-nowrap"
          >
            Start a project <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
