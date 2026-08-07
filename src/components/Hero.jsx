import { useEffect, useRef } from "react";
import gsap from "gsap";
import { split } from "../utils/anim.js";
import { mailtoHref } from "../config.js";
import { PillButton, Eyebrow } from "./ui.jsx";
import HeroVideo from "../assets/Developer_coding_creative_agency…_202607071835.mp4";

const HEADLINE = "One page. Fully animated.";

export default function Hero({ ready = false }) {
  const root = useRef(null);
  const h1 = useRef(null);

  // Every hero reveal waits for the intro loader to leave.
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const chars = split(h1.current);
      gsap.set(chars, { yPercent: 100, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.018,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate w-full min-h-[65vh] overflow-hidden bg-ink pt-[68px] text-paper sm:min-h-screen"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <video
          className="relative h-[65vh] max-h-[80vh] w-full max-w-[1200px] object-cover opacity-80 sm:h-[70vh]"
          src={HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-ink/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      <div className="relative z-10 mx-auto flex min-h-[calc(65vh-68px)] max-w-shell flex-col items-center justify-center gap-7 px-5 text-center sm:min-h-[calc(100vh-68px)] sm:px-8">
        <div className="hero-reveal">
          <Eyebrow tone="light">Independent studio · Viti Levu</Eyebrow>
        </div>

        <div className="w-full max-w-full">
          {/* split() rebuilds this heading as per-character spans, so the
              accessible name is carried by aria-label rather than the DOM text. */}
          <h1
            ref={h1}
            aria-label={HEADLINE}
            className="mx-auto max-w-[20ch] text-center font-display text-[clamp(2.3rem,10.5vw,5.5rem)] font-semibold uppercase leading-[1.02] tracking-tightest text-paper xs:max-w-[17ch] sm:text-[clamp(3rem,7.5vw,6.5rem)] sm:leading-[0.95]"
          >
            {HEADLINE}
          </h1>
        </div>

        <p className="hero-reveal max-w-[44ch] px-2 text-sm leading-relaxed text-paper/75 sm:px-0 sm:text-base">
          Beautifully designed one-page websites with real motion. Built in Fiji, live in about two
          weeks.
        </p>

        <div className="hero-reveal flex w-full max-w-[28rem] flex-col items-center justify-center gap-3 px-2 sm:max-w-none sm:flex-row sm:px-0">
          <PillButton as="a" href="#packages" variant="light" withArrow>
            See pricing
          </PillButton>
          <PillButton
            as="a"
            href={mailtoHref("Website enquiry — one page")}
            variant="outline"
            className="border-paper/40 text-paper hover:bg-paper hover:text-ink"
          >
            Start a project
          </PillButton>
        </div>
      </div>

      <div className="hero-reveal relative z-10 mx-auto flex max-w-shell items-center justify-between gap-3 border-t border-paper/10 px-5 py-5 text-xs font-medium uppercase tracking-[0.05em] text-paper/60 sm:px-8">
        <span>Independent studio</span>
        <span className="hidden sm:inline">One page, done properly</span>
        <span className="inline-flex items-center gap-2">
          Scroll to explore <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
