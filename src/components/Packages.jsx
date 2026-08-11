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
    <div className="rounded-lg bg-purple-600/10 border border-purple-500/30 p-4">
      <p className="text-body-sm font-bold text-purple-700 mb-3">⏱ Offer closes in</p>
      <div className="flex gap-3 justify-between">
        {cells.map(([v, label]) => (
          <div key={label} className="flex-1 text-center">
            <div className="rounded-md bg-purple-700/20 border border-purple-600/40 py-3 px-2">
              <span className="numeric block text-display-sm font-bold leading-none text-purple-700">
                {String(v).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 block text-[12px] font-medium tracking-tight text-purple-700/70">
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
                /* The featured tier inverts to light. On a dark canvas that
                   reads as "this is the one" without a coloured ribbon. */
                className={`pk-card flex flex-col rounded-xl p-6 sm:p-8 ${
                  featured
                    ? "bg-white text-ink shadow-float lg:-mt-6 lg:pb-10"
                    : "border border-hairline bg-elevated text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-title-md ${featured ? "text-ink" : "text-white"}`}>
                    {p.name}
                  </h3>
                  {featured && <Badge tone="promo">{p.badge}</Badge>}
                </div>

                <p className="mt-6 flex items-baseline gap-3">
                  <span
                    className={`numeric text-number-lg ${featured ? "text-ink" : "text-white"}`}
                  >
                    {p.price}
                  </span>
                  {p.was && (
                    <span className="numeric text-title-md text-ink-body line-through">
                      {p.was}
                    </span>
                  )}
                </p>

                <p
                  className={`mt-4 text-body-md ${featured ? "text-ink-body" : "text-body"}`}
                >
                  {p.line}
                </p>

                {featured && (
                  <div className="mt-7 border-t border-ink/10 pt-6">
                    <Countdown iso={OFFER_ENDS} />
                  </div>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-3 text-body-sm">
                      {/* The featured card stays purely white and ink — no
                          accent hue on it at all. */}
                      <Check
                        className={`mt-[0.3em] shrink-0 ${
                          featured ? "text-ink" : "text-accent-text"
                        }`}
                      />
                      <span className={featured ? "text-ink-body" : "text-body"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  as="a"
                  href={telHref()}
                  variant={featured ? "invert" : "secondary"}
                  className="mt-9 w-full"
                >
                  Call now
                </Button>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
