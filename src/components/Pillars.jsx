import { useEffect, useRef } from "react";
import { telHref } from "../config.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "./Reveal.jsx";
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    n: 1,
    title: "Two or three pages",
    body: "Home, about, contact. Enough room to explain yourself properly, few enough to stay quick to build and cheap to run.",
  },
  {
    n: 2,
    title: "Fully animated",
    body: "Motion built in rather than bolted on. It paces the story and tells the eye where to go next, so people read instead of skim.",
  },
  {
    n: 3,
    title: "Built to a scope",
    body: "We agree what the site includes before anything starts, and you get a real timeline with it. No open-ended build, no scope drifting sideways.",
  },
  {
    n: 4,
    title: "Yours to keep",
    body: "You own the site, the domain and the files. No lock-in and no monthly fee just to stay online.",
  },
];

export default function Pillars() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia(root);

    mm.add("(min-width: 1024px)", () => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 120);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          // A higher scrub value adds easing to the scroll link, so the row
          // glides rather than snapping frame-for-frame with the wheel.
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track.current, { x: () => -distance(), ease: "none" });

      // Cards lift and brighten as they reach the middle of the viewport.
      gsap.utils.toArray(".pl-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 88%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
      });

      gsap.to(".pl-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.5,
        },
      });
    });

    // Mobile keeps a native swipe with snap points — pinned horizontal scroll
    // on a phone fights the browser's own gesture handling.
    mm.add("(max-width: 1023px)", () => {
      gsap.from(".pl-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pl-track", start: "top 85%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="what"
      ref={root}
      className="relative overflow-hidden bg-ink py-20 sm:py-28 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <MaskHeading text="What you actually get" className="display text-white text-[clamp(2rem,7vw,5rem)]" />
          <p className="max-w-xs text-sm leading-relaxed text-white/55 sm:text-base">
            One service, done to a standard. No tiers, no upsell path.
          </p>
        </div>

        {/* Progress rule, desktop only — tells you the row has further to go */}
        <div className="mt-8 hidden h-px w-full bg-line lg:block">
          <div className="pl-progress h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <div
          ref={track}
          className="pl-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-[max(1.5rem,calc((100vw-96rem)/2))] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => (
            <article
              key={c.n}
              className="pl-card flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-card border border-line bg-carbon p-6 xs:w-[70vw] sm:w-[52vw] sm:p-8 lg:h-[26rem] lg:w-[30rem] lg:will-change-transform"
            >
              <span className="micro text-accent">{String(c.n).padStart(2, "0")}</span>
              <div className="mt-14 lg:mt-0">
                <h3 className="display text-[clamp(1.6rem,5vw,2.6rem)] text-white">{c.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                  {c.body}
                </p>
              </div>
            </article>
          ))}

          {/* Closing card: gives the row enough width to be worth pinning, and
              puts an action at the end of the sequence instead of a dead stop. */}
          <article className="pl-card relative flex w-[78vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-card bg-accent-grad p-6 text-ink xs:w-[70vw] sm:w-[52vw] sm:p-8 lg:h-[26rem] lg:w-[30rem] lg:will-change-transform">
            <span className="micro text-ink/60">05</span>
            <div className="mt-14 lg:mt-0">
              <h3 className="display text-[clamp(1.6rem,5vw,2.6rem)] text-ink">
                That's the whole offer.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
                No tiers, no add-ons, nothing held back. If it suits you, the next step is a
                half-hour call.
              </p>
              <a href={telHref()} data-cursor className="mt-6 inline-flex min-h-[48px] items-center rounded-pill bg-ink px-6 micro text-white transition-transform duration-300 ease-snap hover:scale-[1.04]">Call now</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
