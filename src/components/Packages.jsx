import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic.jsx";
gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    key: "one-page",
    name: "One Page",
    price: 499,
    featured: true,
    tag: "What we're known for",
    pitch: "The signature build. Everything that earns the enquiry, in a single animated scroll.",
    timeline: "Live in about two weeks",
    features: [
      "One page, animated end to end",
      "3D moments where they earn their place",
      "Mobile-first, fast on 4G",
      "Enquiry form and socials wired up",
    ],
  },
  {
    key: "multi-page",
    name: "Multi-Page",
    price: 800,
    pitch: "For when one scroll isn't enough. Proper structure, plus a booking workflow wired in.",
    timeline: "Live in about three weeks",
    features: [
      "Up to five pages",
      "Booking workflow — enquiry through to confirmation",
      "Clean, fast build with considered motion",
      "Enquiry form and socials wired up",
    ],
    note: "Built conventionally rather than as a motion showcase — the one-pager is where we go all out.",
  },
  {
    key: "complete",
    name: "Complete",
    price: 1500,
    pitch: "The whole thing. Structure, a workflow built to your process, and the brand around it.",
    timeline: "Live in about four weeks",
    features: [
      "Everything in Multi-Page",
      "Custom workflow built to how you actually work",
      "Brand direction — logo, colour, type",
      "Custom domain and hosting, first year included",
    ],
  },
];

function Dot({ light }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[0.5em] h-1 w-1 flex-shrink-0 rounded-full ${light ? "bg-ink/40" : "bg-bone/40"}`}
    />
  );
}

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

      gsap.from(".pk-card", {
        y: 72,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pk-grid", start: "top 82%", once: true },
      });

      // The prices roll up — a pricing table is a fair place to show the work.
      // The tween is built paused so it never renders its zero start state:
      // an untriggered card must read FJ$499, never FJ$0.
      gsap.utils.toArray(".pk-price-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { v: 0 };
        const roll = gsap.to(counter, {
          v: target,
          duration: 1.1,
          ease: "power2.out",
          paused: true,
          onUpdate: () => {
            el.textContent = Math.round(counter.v).toLocaleString("en-US");
          },
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => roll.play(),
        });
      });

      gsap.from(".pk-foot", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pk-foot", start: "top 90%", once: true },
      });
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
              Packages
            </p>
          </div>
          <h2
            id="packages-heading"
            className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8.5vw,7rem)]"
          >
            Three ways to start.
          </h2>
          <p className="mt-6 max-w-xl text-bone/70 text-sm xs:text-base sm:text-lg leading-relaxed">
            Prices in Fijian dollars, one-off — not a retainer. Every package includes thirty days of
            small edits after launch.
          </p>
        </div>

        <div className="pk-grid mt-12 xs:mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 items-start">
          {TIERS.map((t) => {
            const light = t.featured;
            return (
              <div
                key={t.key}
                className={`pk-card relative flex h-full flex-col rounded-2xl p-6 xs:p-7 sm:p-8 ${
                  light
                    ? "bg-bone text-ink md:-mt-4 shadow-[0_30px_70px_-30px_rgba(255,255,255,0.25)]"
                    : "bg-carbon text-bone border border-white/12"
                }`}
              >
                {t.tag && (
                  <span className="absolute -top-3 left-6 xs:left-7 sm:left-8 rounded-full bg-ink text-bone border border-bone/25 px-3 py-1 text-[8px] xs:text-[9px] uppercase tracking-[0.2em] whitespace-nowrap">
                    {t.tag}
                  </span>
                )}

                <h3 className="font-display font-bold uppercase text-lg xs:text-xl sm:text-2xl tracking-tightest">
                  {t.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={`text-xs xs:text-sm font-display font-medium ${
                      light ? "text-ink/50" : "text-bone/50"
                    }`}
                  >
                    FJ$
                  </span>
                  <span
                    className="pk-price-num font-display font-bold text-4xl xs:text-5xl sm:text-6xl tracking-tightest leading-none"
                    data-value={t.price}
                  >
                    {t.price.toLocaleString("en-US")}
                  </span>
                </p>

                <p
                  className={`mt-4 text-sm xs:text-base leading-relaxed ${
                    light ? "text-ink/70" : "text-bone/70"
                  }`}
                >
                  {t.pitch}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-xs xs:text-sm leading-relaxed">
                      <Dot light={light} />
                      <span className={light ? "text-ink/80" : "text-bone/80"}>{f}</span>
                    </li>
                  ))}
                </ul>

                {t.note && (
                  <p className="mt-5 text-[11px] xs:text-xs leading-relaxed text-bone/45 border-t border-white/10 pt-4">
                    {t.note}
                  </p>
                )}

                <p
                  className={`mt-6 text-[9px] xs:text-[10px] uppercase tracking-[0.2em] ${
                    light ? "text-ink/50" : "text-bone/45"
                  }`}
                >
                  {t.timeline}
                </p>

                <Magnetic
                  as="a"
                  href="#contact"
                  data-cursor
                  className={`mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    light
                      ? "bg-ink text-bone hover:bg-carbon"
                      : "border border-bone/35 text-bone hover:bg-bone hover:text-ink"
                  }`}
                >
                  Start this one <span aria-hidden="true">→</span>
                </Magnetic>
              </div>
            );
          })}
        </div>

        <p className="pk-foot mt-10 xs:mt-12 max-w-3xl text-xs xs:text-sm leading-relaxed text-bone/50 border-t border-white/10 pt-6">
          Domain and hosting renew each year after the first — we'll quote the renewal at cost before
          it falls due, never as a surprise. Need an online store, a CMS, or something none of these
          cover? Tell us on the call and we'll quote it properly.
        </p>
      </div>
    </section>
  );
}
