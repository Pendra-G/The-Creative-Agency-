import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic.jsx";
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
      className="bg-ink text-bone py-16 xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <div className="pk-head">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-bone" />
            <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-bone/50">
              Pricing
            </p>
          </div>
          <h2
            id="packages-heading"
            className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8.5vw,7rem)]"
          >
            One price. One page.
          </h2>
        </div>

        <div className="pk-grid mt-12 xs:mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-5 xs:gap-6 items-stretch">
          {/* The offer */}
          <div className="pk-panel flex flex-col rounded-2xl bg-bone text-ink p-6 xs:p-8 sm:p-10">
            <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-ink/50">
              The one-pager
            </p>

            <p className="mt-5 flex items-baseline gap-2">
              <span className="text-sm xs:text-base font-display font-semibold text-ink/50">FJ$</span>
              <span
                className="pk-price-num font-display font-bold text-6xl xs:text-7xl sm:text-8xl tracking-tightest leading-none"
                data-value={499}
              >
                499
              </span>
            </p>

            <p className="mt-4 text-ink/70 text-sm xs:text-base sm:text-lg leading-relaxed max-w-md">
              One-off, not a retainer. Everything that earns the enquiry, in a single animated
              scroll — live in about two weeks.
            </p>

            <ul className="mt-7 space-y-3 flex-1">
              {INCLUDED.map((f) => (
                <li key={f} className="flex gap-3 text-sm xs:text-base leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-ink/40" />
                  <span className="text-ink/80">{f}</span>
                </li>
              ))}
            </ul>

            <Magnetic
              as="a"
              href={mailtoHref("Website enquiry — one page, FJ$499")}
              data-cursor
              className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-ink px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone hover:bg-carbon transition-colors self-start"
            >
              Start a one-pager <span aria-hidden="true">→</span>
            </Magnetic>
          </div>

          {/* Anything larger is quoted, not packaged */}
          <div className="pk-panel flex flex-col rounded-2xl border border-white/12 bg-carbon p-6 xs:p-8 sm:p-10">
            <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-bone/45">
              Everything else
            </p>

            <h3 className="mt-5 font-display font-bold uppercase text-2xl xs:text-3xl sm:text-4xl tracking-tightest leading-[0.95]">
              Quoted, not packaged.
            </h3>

            <p className="mt-5 text-bone/70 text-sm xs:text-base sm:text-lg leading-relaxed">
              Extra pages, booking systems, online stores, custom workflows, branding, domain and
              hosting — all real work with real costs, and none of it fits a tidy tier. So we don't
              pretend it does.
            </p>

            <p className="mt-4 text-bone/70 text-sm xs:text-base sm:text-lg leading-relaxed">
              Tell us what the site has to do and we'll send back a fixed price for exactly that.
              The quote is free and there's nothing to sign.
            </p>

            <div className="mt-auto pt-8 flex flex-col xs:flex-row gap-3">
              <Magnetic
                as="a"
                href={mailtoHref("Free custom quote")}
                data-cursor
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-bone/35 px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone hover:bg-bone hover:text-ink transition-colors whitespace-nowrap"
              >
                Get a free quote <span aria-hidden="true">→</span>
              </Magnetic>
              <a
                href="#services"
                data-cursor
                className="inline-flex min-h-[48px] items-center justify-center px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/55 hover:text-bone transition-colors whitespace-nowrap"
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
