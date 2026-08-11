import { useEffect, useState } from "react";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { Button, Badge, Check } from "./ui.jsx";
import { PACKAGES, OFFER_ENDS, telHref } from "../config.js";

/**
 * Counts down to a fixed date. Once it passes the timer disappears rather than
 * rolling over — a countdown that silently restarts is a lie, and anyone who
 * visits twice will notice.
 */
function useCountdown(iso) {
  const target = new Date(iso).getTime();
  const [left, setLeft] = useState(() => target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

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
    return <p className="text-caption text-ink-body">Limited spots each month.</p>;
  }

  const cells = [
    [t.days, "Days"],
    [t.hours, "Hours"],
    [t.minutes, "Mins"],
    [t.seconds, "Secs"],
  ];

  return (
    <div className="rounded-lg bg-red-600/20 border-2 border-red-400 p-4 shadow-lg shadow-red-600/30">
      <p className="text-body-sm font-bold text-red-300 mb-3">⏱ OFFER CLOSES IN</p>
      <div className="flex gap-2 justify-between">
        {cells.map(([v, label]) => (
          <div key={label} className="flex-1 text-center">
            <div className="rounded-md bg-red-500/30 border-2 border-red-400/60 py-3 px-1">
              <span className="numeric block text-3xl font-black leading-none text-red-200">
                {String(v).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 block text-xs font-bold tracking-wider text-red-300/90">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Packages() {
  return (
    <section id="pricing" className="bg-surface py-section">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading text="Three ways to start" className="display text-display-lg text-white" />
          <Reveal>
            <p className="mt-6 max-w-measure text-body-lg text-body">
              Paid once, never monthly, and the site is yours to keep either way. Start where it
              makes sense and add pages later.
            </p>
          </Reveal>
        </div>

        <Reveal
          selector=".pk-card"
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-3 lg:items-start"
          stagger={0.11}
        >
          {PACKAGES.map((p) => {
            const featured = p.offer;

            return (
              <article
                key={p.key}
                /* The featured tier uses a purple gradient with glow. On a dark canvas that
                   reads as "this is the one" without a coloured ribbon. */
                className={`pk-card flex flex-col rounded-xl p-6 sm:p-8 ${
                  featured
                    ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-2xl shadow-purple-600/50 lg:-mt-8 lg:pb-12"
                    : "border border-hairline bg-elevated text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-display-sm font-bold ${featured ? "text-white" : "text-white"}`}>
                    {p.name}
                  </h3>
                  {featured && <Badge tone="promo" className="text-xs">{p.badge}</Badge>}
                </div>

                <p className="mt-4 flex items-baseline gap-3">
                  <span
                    className={`numeric text-display-lg font-bold ${featured ? "text-white" : "text-white"}`}
                  >
                    {p.price}
                  </span>
                  {p.was && (
                    <>
                      <span className="numeric text-title-md text-white/60 line-through">
                        {p.was}
                      </span>
                      <span className="text-red-300 font-bold text-title-sm">Save 29%</span>
                    </>
                  )}
                </p>

                <p
                  className={`mt-3 text-body-md font-semibold ${featured ? "text-white" : "text-body"}`}
                >
                  {p.line}
                </p>

                {featured && (
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <Countdown iso={OFFER_ENDS} />
                  </div>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-3 text-body-sm">
                      {/* The featured card uses white text on the purple gradient. */}
                      <Check
                        className={`mt-[0.3em] shrink-0 ${
                          featured ? "text-white" : "text-accent-text"
                        }`}
                      />
                      <span className={featured ? "text-white/90" : "text-body"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  as="a"
                  href={telHref()}
                  variant={featured ? "invert" : "secondary"}
                  size="lg"
                  className={`mt-9 w-full font-bold ${featured ? "bg-white/95 hover:bg-white text-purple-700" : ""}`}
                >
                  Lock in this price
                </Button>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
