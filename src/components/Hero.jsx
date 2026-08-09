import { useEffect, useRef } from "react";
import gsap from "gsap";
import { split } from "../utils/anim.js";
import { CallCtas, TextLink } from "./ui.jsx";
import { SITE } from "../config.js";
// TODO(owner): swap this for a screen recording of finished sites scrolling.
import ReelVideo from "../assets/Developer_coding_creative_agency…_202607071835.mp4";

export default function Hero({ ready = false }) {
  const root = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      [l1.current, l2.current].forEach((el, i) => {
        const chars = split(el);
        gsap.set(chars, { yPercent: 112 });
        gsap.to(chars, {
          yPercent: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.02,
          delay: 0.1 + i * 0.1,
        });
      });

      gsap.from(".hero-fade", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.55,
      });

      gsap.from(".hero-frame", {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.35,
      });

      // Exit parallax: the copy and the frame leave at different rates, so the
      // hero feels like layered depth rather than one flat block sliding away.
      // Desktop only — three scrubbed layers is real per-frame work, and on a
      // phone the hero is off screen in one flick anyway.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const exit = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        };
        gsap.to(".hero-copy", { yPercent: -16, opacity: 0.25, ease: "none", scrollTrigger: exit });
        gsap.to(".hero-frame", { yPercent: 12, ease: "none", scrollTrigger: exit });
        gsap.to(".hero-glow", { yPercent: 24, opacity: 0.2, ease: "none", scrollTrigger: exit });
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate overflow-hidden bg-ink pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Purple wash instead of a full-bleed video behind the type */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -top-1/4 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 bg-accent-glow opacity-70"
      />

      <div className="relative mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="hero-copy">
          <p className="hero-fade micro text-white/45">Websites for small businesses in Fiji</p>

          <h1
            aria-label="Everything you need. Nothing you don't."
            className="mt-6"
          >
            <span className="block overflow-hidden">
              <span ref={l1} className="display block text-white text-[clamp(2.6rem,8.5vw,6.5rem)]">
                Everything you need.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={l2} className="display block text-white/55 text-[clamp(2.6rem,8.5vw,6.5rem)]">
                Nothing you don't.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-7 max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl">
            Two to three page websites, properly designed and animated, from{" "}
            <span className="text-white">{SITE.price}</span>.
          </p>

          {/* Calling is the action; browsing the work is secondary. */}
          <CallCtas className="hero-fade mt-9" />
          <div className="hero-fade mt-6">
            <TextLink as="a" href="#work">See the work</TextLink>
          </div>

          <dl className="hero-fade mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ["2–3", "pages"],
              ["1", "flat price"],
              ["100%", "yours to keep"],
            ].map(([big, small]) => (
              <div key={`${big}-${small}`}>
                <dt className="display text-2xl text-white sm:text-3xl">{big}</dt>
                <dd className="mt-1 micro text-white/45">{small}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The reel, in a browser frame */}
        <div className="hero-frame relative">
          <div className="absolute -inset-6 -z-10 bg-accent-grad opacity-20 blur-3xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-card border border-line bg-carbon shadow-[0_40px_120px_-40px_rgba(139,92,246,0.5)]">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-pill bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-pill bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-pill bg-white/15" />
              <span className="ml-3 micro text-white/30">yourbusiness.com.fj</span>
            </div>
            <video
              className="block aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
              src={ReelVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Preview of a finished website"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
