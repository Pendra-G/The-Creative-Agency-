import { useEffect, useRef } from "react";
import gsap from "gsap";
import { split } from "../utils/anim.js";
import { Star, Pill, TextLink } from "./ui.jsx";
import { SITE } from "../config.js";
import HeroVideo from "../assets/Developer_coding_creative_agency…_202607071835.mp4";

const LINES = ["Website", "Portfolio"];

export default function Hero({ ready = false }) {
  const root = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Per-character rise, line by line — the reference's wordmark entrance.
      [l1.current, l2.current].forEach((el, i) => {
        const chars = split(el);
        gsap.set(chars, { yPercent: 115 });
        gsap.to(chars, {
          yPercent: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.026,
          delay: 0.15 + i * 0.12,
        });
      });

      gsap.from(".hero-fade", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.7,
      });

      // The frame settles back as the type arrives.
      gsap.from(".hero-media", { scale: 1.12, duration: 1.8, ease: "power3.out" });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pt-24 pb-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <video
          className="hero-media h-full w-full object-cover opacity-50"
          src={HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-3 sm:px-6">
        <h1
          aria-label={`${SITE.name} — one-page animated websites from ${SITE.price}`}
          className="w-full text-center"
        >
          {/* Two lines, each clipped so the characters rise into view */}
          <span className="block overflow-hidden">
            <span
              ref={l1}
              className="display block text-cream text-[clamp(3.2rem,17vw,15rem)]"
            >
              {LINES[0]}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={l2}
              className="display block text-cream text-[clamp(3.2rem,17vw,15rem)]"
            >
              {LINES[1]}
            </span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-shell px-4 sm:px-6">
        <p className="hero-fade flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center micro text-cream/70">
          <span>One page</span>
          <Star className="text-gold" />
          <span>Fully animated</span>
          <Star className="text-gold" />
          <span>Launched fast</span>
        </p>
        <div className="hero-fade mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Pill as="a" href="#work" variant="cream">
            See the work
          </Pill>
          <TextLink as="a" href="#pricing">
            What it costs
          </TextLink>
        </div>

        <div className="hero-fade mt-10 flex items-center justify-between border-t border-cream/15 pt-4 micro text-cream/55">
          <span>{SITE.location}</span>
          <span className="hidden sm:inline">Built &amp; launched in two weeks</span>
          <span className="inline-flex items-center gap-2">
            Scroll <span aria-hidden="true">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
