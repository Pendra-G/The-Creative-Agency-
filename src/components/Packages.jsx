import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "./Reveal.jsx";
import { PACKAGES, OFFER_ENDS, telHref, viberHref, mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

/**
 * Counts down to a fixed date. Once it passes the timer disappears rather than
 * rolling over — a countdown that silently restarts is a lie, and anyone who
 * visits twice will notice.
 */
function useCountdown(iso) {
  const [left, setLeft] = useState(() => new Date(iso).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(new Date(iso).getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [iso]);

  if (!(left > 0)) return null;
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Countdown({ iso }) {
  const t = useCountdown(iso);
  if (!t) {
    return <p className="micro text-ink/60">Limited spots each month</p>;
  }
  const cells = [
    [t.days, "days"],
    [t.hours, "hrs"],
    [t.minutes, "min"],
    [t.seconds, "sec"],
  ];
  return (
    <div>
      <p className="micro text-ink/60">Offer closes in</p>
      <div className="mt-2 flex gap-2">
        {cells.map(([v, l]) => (
          <div key={l} className="rounded-[6px] bg-ink/10 px-2.5 py-1.5 text-center">
            <span className="block font-display text-lg font-bold leading-none tabular-nums text-ink">
              {String(v).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.12em] text-ink/50">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Packages() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".pk-head p", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".pk-card", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pk-grid", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={root} className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="pk-head max-w-2xl">
          <MaskHeading text="Packages" className="display text-white text-[clamp(2.2rem,8vw,5.5rem)]" />
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Start small and add later. Every package is paid once, not monthly, and the site is
            yours to keep either way.
          </p>
        </div>

        <div className="pk-grid mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3">
          {PACKAGES.map((p) => {
            const featured = p.offer;
            return (
              <article
                key={p.key}
                className={`pk-card relative flex flex-col rounded-card p-6 sm:p-8 ${
                  featured
                    ? "bg-accent-grad text-ink lg:-mt-4 lg:shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)]"
                    : "border border-line bg-carbon text-white"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-pill bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:left-8">
                    Launch offer
                  </span>
                )}

                <h3
                  className={`display text-[clamp(1.4rem,4vw,2rem)] ${
                    featured ? "text-ink" : "text-white"
                  }`}
                >
                  {p.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-3">
                  <span
                    className={`display text-[clamp(2rem,6vw,3rem)] ${
                      featured ? "text-ink" : "text-white"
                    }`}
                  >
                    {p.price}
                  </span>
                  {p.was && (
                    <span className="font-display text-lg font-semibold text-ink/45 line-through">
                      {p.was}
                    </span>
                  )}
                </p>

                <p
                  className={`mt-3 text-sm leading-relaxed sm:text-base ${
                    featured ? "text-ink/75" : "text-white/60"
                  }`}
                >
                  {p.line}
                </p>

                {featured && (
                  <div className="mt-6">
                    <Countdown iso={OFFER_ENDS} />
                  </div>
                )}

                <ul className="mt-7 flex-1 space-y-2.5">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        aria-hidden="true"
                        className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-pill ${
                          featured ? "bg-ink/50" : "bg-accent"
                        }`}
                      />
                      <span className={featured ? "text-ink/80" : "text-white/70"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  <a
                    href={p.key === "custom" ? mailtoHref(`${p.name} enquiry`) : telHref()}
                    data-cursor
                    className={`inline-flex min-h-[48px] items-center rounded-pill px-6 micro transition-transform duration-300 ease-snap hover:scale-[1.04] ${
                      featured ? "bg-ink text-white" : "bg-white text-ink"
                    }`}
                  >
                    {p.key === "custom" ? "Get a quote" : "Call now"}
                  </a>
                  <a
                    href={viberHref()}
                    data-cursor
                    className={`inline-flex min-h-[48px] items-center rounded-pill border px-6 micro transition-colors ${
                      featured
                        ? "border-ink/30 text-ink hover:bg-ink hover:text-white"
                        : "border-white/25 text-white hover:bg-white hover:text-ink"
                    }`}
                  >
                    Viber
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
