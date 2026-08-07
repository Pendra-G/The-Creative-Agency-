import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton, Eyebrow } from "./ui.jsx";
import { mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

const INCLUDED = [
  "One page, animated end to end",
  "3D moments where they earn their place",
  "Mobile-first, fast on 4G",
  "Enquiry form and socials wired up",
  "Thirty days of small edits after launch",
];

export default function Packages() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".pk-head", {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
      gsap.from(".pk-panel", {
        y: 64,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pk-grid", start: "top 82%", once: true },
      });

      // The price rolls up. Built paused so it never renders its zero start
      // state — an untriggered card must read FJ$499, never FJ$0.
      const el = ref.current.querySelector(".pk-price-num");
      const counter = { v: 0 };
      const roll = gsap.to(counter, {
        v: Number(el.dataset.value),
        duration: 1.1,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = Math.round(counter.v).toLocaleString("en-US");
        },
      });
      ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => roll.play() });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="packages"
      ref={ref}
      className="bg-paper text-foreground py-16 xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="pk-head">
          <Eyebrow>Pricing</Eyebrow>
          <h2
            id="packages-heading"
            className="mt-5 font-display text-[clamp(2rem,8vw,6rem)] font-semibold leading-[0.92] tracking-tightest"
          >
            One price. One page.
          </h2>
        </div>

        <div className="pk-grid mt-12 grid grid-cols-1 items-stretch gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* The offer — the ink card */}
          <div className="pk-panel flex flex-col bg-ink p-6 text-paper xs:p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-paper/45">
              The one-pager
            </p>

            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-base font-medium text-paper/50">FJ$</span>
              <span
                className="pk-price-num font-display text-6xl font-semibold leading-none tracking-tightest xs:text-7xl sm:text-8xl"
                data-value={499}
              >
                499
              </span>
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70 xs:text-base sm:text-lg">
              One-off, not a retainer. Everything that earns the enquiry, in a single animated
              scroll — live in about two weeks.
            </p>

            <ul className="mt-7 flex-1 space-y-3">
              {INCLUDED.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed xs:text-base">
                  <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-pill bg-accent-from" />
                  <span className="text-paper/80">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PillButton
                as="a"
                href={mailtoHref("Website enquiry — one page, FJ$499")}
                variant="light"
                withArrow
              >
                Start a one-pager
              </PillButton>
            </div>
          </div>

          {/* Anything larger is quoted, not packaged */}
          <div className="pk-panel flex flex-col border border-line bg-surface p-6 xs:p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground/45">
              Everything else
            </p>

            <h3 className="mt-5 font-display text-2xl font-semibold leading-[0.98] tracking-tightest xs:text-3xl sm:text-4xl">
              Quoted, not packaged.
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-foreground/70 xs:text-base sm:text-lg">
              Extra pages, booking systems, online stores, custom workflows, branding, domain and
              hosting — all real work with real costs, and none of it fits a tidy tier. So we don't
              pretend it does.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground/70 xs:text-base sm:text-lg">
              Tell us what the site has to do and we'll send back a fixed price for exactly that.
              The quote is free and there's nothing to sign.
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-8 xs:flex-row xs:items-center">
              <PillButton as="a" href={mailtoHref("Free custom quote")} variant="dark" withArrow>
                Get a free quote
              </PillButton>
              <a
                href="#services"
                data-cursor
                className="inline-flex min-h-[44px] items-center px-2 text-sm font-medium text-foreground/55 transition-colors hover:text-foreground"
              >
                See what else we build
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
