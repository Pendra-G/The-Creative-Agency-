import { useLayoutEffect, useRef, useState } from "react";
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
];

export default function Pillars() {
  const root = useRef(null);
  const track = useRef(null);
  // Until the scroll animation is wired up the row stays a plain swipeable
  // list, so it still works if JS never runs or motion is reduced.
  const [pinned, setPinned] = useState(false);

  // Swap the track to its pinned layout first, in its own pass. Building the
  // triggers in the same effect measured the pre-swap layout, so the row was
  // pinned but never actually moved.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPinned(true);
  }, []);

  useLayoutEffect(() => {
    if (!pinned) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 40);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          // Scrub adds easing to the scroll link so the row glides rather than
          // snapping frame-for-frame with the wheel or the finger.
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track.current, { x: () => -distance(), ease: "none" });

      gsap.utils.toArray(".pl-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 92%",
              end: "left 50%",
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
    }, root);

    // Measure once the swapped layout has settled.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
    };
  }, [pinned]);

  return (
    <section
      id="what"
      ref={root}
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-ink py-16 sm:min-h-screen sm:py-0"
    >
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <MaskHeading
            text="What you actually get"
            className="display text-white text-[clamp(1.9rem,7vw,5rem)]"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/55 sm:text-base">
            One service, done to a standard. No tiers, no upsell path.
          </p>
        </div>

        <div className="mt-7 h-px w-full bg-line">
          <div className="pl-progress h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>

      <div className="mt-8 sm:mt-12">
        <div
          ref={track}
          className={`pl-track flex gap-4 px-4 sm:px-6 ${
            pinned
              ? "w-max overflow-visible"
              : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }`}
        >
          {CARDS.map((c) => (
            <article
              key={c.n}
              className="pl-card flex w-[76vw] shrink-0 snap-start flex-col justify-between rounded-card border border-line bg-carbon p-6 xs:w-[70vw] sm:w-[46vw] sm:p-8 lg:h-[26rem] lg:w-[30rem] lg:will-change-transform"
            >
              <span className="micro text-white/40">{String(c.n).padStart(2, "0")}</span>
              <div className="mt-12 lg:mt-0">
                <h3 className="display text-[clamp(1.5rem,5vw,2.6rem)] text-white">{c.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-base">
                  {c.body}
                </p>
              </div>
            </article>
          ))}

          {/* The row ends on an action rather than a dead stop. */}
          <article className="pl-card relative flex w-[76vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-card bg-accent-grad p-6 text-ink xs:w-[70vw] sm:w-[46vw] sm:p-8 lg:h-[26rem] lg:w-[30rem] lg:will-change-transform">
            <span className="micro text-ink/60">04</span>
            <div className="mt-12 lg:mt-0">
              <h3 className="display text-[clamp(1.5rem,5vw,2.6rem)] text-ink">
                That's the whole offer.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75 sm:mt-4 sm:text-base">
                No tiers, no add-ons, nothing held back. If it suits you, the next step is a call.
              </p>
              <a
                href={telHref()}
                data-cursor
                className="mt-6 inline-flex min-h-[48px] items-center rounded-pill bg-ink px-6 micro text-white transition-transform duration-300 ease-snap hover:scale-[1.04]"
              >
                Call now
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
