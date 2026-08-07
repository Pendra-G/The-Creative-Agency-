import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mailtoHref } from "../config.js";
import { PillButton } from "./ui.jsx";
gsap.registerPlugin(ScrollTrigger);

// Line illustrations rather than photographs: each one states the idea the
// panel is arguing. Swap any of these for a real image by replacing the
// component in ILLUSTRATIONS below with an <img>.

function EyeMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M12 100c30-46 58-69 88-69s58 23 88 69c-30 46-58 69-88 69s-58-23-88-69Z"
        stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="34" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="14" fill="currentColor" />
      <circle cx="112" cy="88" r="5" fill="#0A0A0A" />
      <path d="M100 31V12M40 55 28 38M160 55l12-17M100 169v19M40 145l-12 17M160 145l12 17"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".45" />
    </svg>
  );
}

function RouteMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M24 168h46v-52h60V64h46" stroke="currentColor" strokeWidth="3" />
      <rect x="16" y="160" width="16" height="16" fill="currentColor" />
      <rect x="62" y="108" width="16" height="16" fill="currentColor" opacity=".55" />
      <rect x="122" y="56" width="16" height="16" fill="currentColor" opacity=".55" />
      <path d="M150 40l26 24-26 24" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M24 190h152" stroke="currentColor" strokeWidth="3" opacity=".25" />
    </svg>
  );
}

function SummitMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M8 164 78 44l44 74 22-32 48 78H8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter" />
      <path d="M78 44 56 84h44L78 44Z" fill="currentColor" />
      <path d="M78 44V12M78 12h34l-10 12 10 12H78" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter" />
      <path d="M8 186h184" stroke="currentColor" strokeWidth="3" opacity=".25" />
    </svg>
  );
}

const PANELS = [
  {
    key: "attention",
    label: "Attention",
    Mark: EyeMark,
    title: "People decide in seconds.",
    body: "You get about three before someone chooses whether to stay. Movement buys you the rest of the page — which is where your actual offer lives.",
  },
  {
    key: "direction",
    label: "Direction",
    Mark: RouteMark,
    title: "It tells them where to look.",
    body: "Motion sets the reading order. People arrive at your enquiry form instead of stalling halfway down and drifting off.",
  },
  {
    key: "standing",
    label: "Standing",
    Mark: SummitMark,
    title: "It makes you look serious.",
    body: "A page that moves well reads as a business worth dealing with. It's the clearest thing separating you from a template anyone could buy.",
  },
];

export default function Showcase() {
  const ref = useRef(null);

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
      gsap.from(".sc-panel", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sc-grid", start: "top 85%", once: true },
      });
      gsap.from(".sc-mark", {
        scale: 0.88,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
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
      className="bg-ink py-16 text-paper xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="sc-head max-w-3xl border-b border-paper/10 pb-8 xs:pb-10">
          <h2
            id="showcase-heading"
            className="font-display text-[clamp(2rem,8.5vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-tightest"
          >
            Motion that sells.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/70 xs:text-base sm:text-lg">
            A still page gets skimmed. A page that moves gets read — and someone who reads your page
            is someone who might actually enquire. That's the whole business case for an animated
            one-pager, in three parts.
          </p>
        </div>

        <div className="sc-grid mt-10 grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-3 xs:mt-12">
          {PANELS.map(({ key, label, Mark, title, body }) => (
            <div key={key} className="sc-panel flex flex-col bg-ink p-6 xs:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-from">
                {label}
              </p>
              <div className="sc-mark mx-auto my-8 h-32 w-32 text-paper xs:h-40 xs:w-40">
                <Mark />
              </div>
              <h3 className="font-display text-xl font-semibold leading-[1.05] tracking-tightest xs:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 xs:mt-12 xs:flex-row xs:items-center xs:gap-6">
          <p className="max-w-lg text-sm leading-relaxed text-paper/60 xs:text-base">
            Want a page that works this hard for your business? Tell us what it needs to do and we'll
            tell you honestly where motion helps — and where stillness would serve you better.
          </p>
          <PillButton
            as="a"
            href={mailtoHref("Animated one-page website enquiry")}
            variant="light"
            withArrow
            className="shrink-0"
          >
            Talk it through
          </PillButton>
        </div>
      </div>
    </section>
  );
}
