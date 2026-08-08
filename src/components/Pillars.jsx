import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Index } from "./ui.jsx";
import { SITE } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    n: 1,
    title: "One page",
    body: "Everything that earns the enquiry, in a single scroll. Nothing to navigate, nothing to get lost in. It loads once and it's done.",
  },
  {
    n: 2,
    title: "Fully animated",
    body: "Motion built in, not bolted on. It paces the story, holds attention past the first three seconds and tells the eye where to go next.",
  },
  {
    n: 3,
    title: "Launched fast",
    body: "About two weeks from the first call to a live site. Copy, design, build, launch — one page, one sprint, no drift.",
  },
  {
    n: 4,
    title: "Yours to keep",
    body: "You own the site, the domain and the files. No lock-in, no monthly fee just to keep it online, and no one to ask for permission.",
  },
];

export default function Pillars() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia(root);

    mm.add("(min-width: 1024px)", () => {
      gsap.from(".pl-head", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      // Pin the section and drive the row sideways for exactly its overflow.
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 96);
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    // Mobile keeps it a native swipe with snap — pinned horizontal scroll on a
    // phone fights the browser's own gesture handling.
    mm.add("(max-width: 1023px)", () => {
      gsap.from(".pl-head", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="what" ref={root} className="relative overflow-hidden bg-ink py-20 sm:py-28 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="pl-head mx-auto w-full max-w-shell px-4 sm:px-6">
        <h2 className="display text-cream text-[clamp(2.4rem,10vw,8rem)]">
          What you
          <br />
          actually get
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg">
          One service, done to a standard. No tiers to compare, no upsell path, nothing to decode.
        </p>
      </div>

      <div className="mt-10 lg:mt-14">
        <div
          ref={track}
          className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory
            sm:px-6 lg:w-max lg:overflow-visible lg:pb-0 lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => (
            <article
              key={c.n}
              className="flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-card bg-cream p-6 text-ink
                xs:w-[70vw] sm:w-[52vw] sm:p-8 lg:h-[26rem] lg:w-[26rem]"
            >
              <div className="flex items-start justify-between">
                <span className="micro text-ink/40">{String(c.n).padStart(3, "0")}</span>
              </div>
              <div className="mt-16 lg:mt-0">
                <h3 className="display text-[clamp(1.8rem,5.5vw,2.75rem)] text-ink">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
