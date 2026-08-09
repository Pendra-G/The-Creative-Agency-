import { useEffect, useRef } from "react";
import gsap from "gsap";
import { split } from "../utils/anim.js";
import { CallCtas, TextLink } from "./ui.jsx";
import { SITE } from "../config.js";
import ReelWebm from "../assets/Developer_Final_edit1.webm";
import ReelMp4 from "../assets/Developer_coding_creative_agency…_202607071835.mp4";

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
        delay: 0.5,
      });

      // Slow push on the footage so the frame is never completely still.
      gsap.fromTo(".hero-video", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" });

      // Desktop only — scrubbed layers are real per-frame work, and on a phone
      // the hero is gone in one flick.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const exit = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 };
        gsap.to(".hero-copy", { yPercent: -14, opacity: 0.2, ease: "none", scrollTrigger: exit });
        gsap.to(".hero-video", { yPercent: 10, ease: "none", scrollTrigger: exit });
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    // Shorter on portrait screens: a landscape clip inside a tall box gets
    // cropped hard at the sides, and a wider box shows more of the frame.
    <section
      id="home"
      ref={root}
      className="relative isolate flex min-h-[86svh] flex-col justify-center overflow-hidden bg-ink pb-14 pt-32 sm:min-h-[100svh] sm:pb-16"
    >
      <video
        className="hero-video absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        {/* webm first; the mp4 is the fallback for browsers that skip it */}
        <source src={ReelWebm} type="video/webm" />
        <source src={ReelMp4} type="video/mp4" />
      </video>

      {/* Legibility is weighted to where the type actually sits rather than
          flooding the whole frame. A light base keeps the footage visible; the
          horizontal gradient does the real work behind the copy column, and
          the vertical one anchors the top bar and the stats row. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-transparent sm:via-ink/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-transparent to-ink"
      />

      <div className="relative mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="hero-copy max-w-3xl">
          <h1 aria-label="Everything you need. Nothing you don't.">
            <span className="block overflow-hidden">
              <span ref={l1} className="display block text-white text-[clamp(2.6rem,9vw,7rem)]">
                Everything you need.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={l2} className="display block text-white/60 text-[clamp(2.6rem,9vw,7rem)]">
                Nothing you don't.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-7 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl">
            Two to three page websites, properly designed and animated, from{" "}
            <span className="text-white">{SITE.price}</span>.
          </p>

          <CallCtas className="hero-fade mt-9" />

          <div className="hero-fade mt-6">
            <TextLink as="a" href="#work">
              See the work
            </TextLink>
          </div>

          <dl className="hero-fade mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              ["2–3", "pages"],
              ["1", "flat price"],
              ["100%", "yours to keep"],
            ].map(([big, small]) => (
              <div key={`${big}-${small}`}>
                <dt className="display text-2xl text-white sm:text-3xl">{big}</dt>
                <dd className="mt-1 micro text-white/55">{small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
