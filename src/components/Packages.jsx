import { useEffect, useState } from "react";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { Button, Badge, Check } from "./ui.jsx";
import { PACKAGES, OFFER_ENDS, telHref } from "../config.js";

/**
 * The difference between the old and new price, formatted like them.
 *
 * Computed rather than written down: the card claims a specific saving next to
 * both figures, so hardcoding it would let the claim drift the first time a
 * price changes in config. Returns null if either price has no digits to read.
 */
function saving(was, now) {
  const a = Number(String(was).replace(/[^\d]/g, ""));
  const b = Number(String(now).replace(/[^\d]/g, ""));
  if (!a || !b || a <= b) return null;
  const prefix = String(was).match(/^[^\d]*/)?.[0] ?? "";
  return `${prefix}${a - b}`;
}

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
    /* White, not ink — this only ever renders on the accent-filled card. */
    return <p className="text-caption text-white/70">Limited spots each month.</p>;
  }

  const cells = [
    [t.days, "Days"],
    [t.hours, "Hours"],
    [t.minutes, "Mins"],
    [t.seconds, "Secs"],
  ];

  /* The plate is a deep violet-black recess cut into the card. Red only reads
     as urgency over something dark — laid over the purple directly it
     composites to dusty pink, which is why this sits on its own floor. */
  return (
    <div className="rounded-lg bg-[#12071F]/80 p-4 ring-1 ring-inset ring-white/10">
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-semantic-down" />
        <p className="text-caption-strong uppercase tracking-[0.12em] text-semantic-down">
          Offer closes in
        </p>
      </div>
      <div className="flex justify-between gap-2">
        {cells.map(([v, label]) => (
          <div key={label} className="flex-1 text-center">
            <div className="rounded-md bg-semantic-down/10 py-2.5 ring-1 ring-inset ring-semantic-down/25">
              <span className="numeric block text-2xl font-bold leading-none text-[#FCA5A5]">
                {String(v).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#FCA5A5]/80">
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
                /* The featured tier is filled with the accent across a real
                   three-stop range, so light appears to fall across it. It
                   starts AT the accent rather than above it: #7C3AED is the
                   lightest tone that still carries white body text (5.7:1), and
                   every stop below it is safer. Depth comes from a hairline and
                   a neutral offset shadow — no coloured halo. */
                className={`pk-card flex flex-col rounded-xl p-6 sm:p-8 ${
                  featured
                    ? "bg-gradient-to-br from-accent via-accent-active to-[#3C1478] text-white shadow-float ring-1 ring-inset ring-white/15 lg:-mt-8 lg:pb-10"
                    : "border border-hairline bg-elevated text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={featured ? "text-title-lg text-white" : "text-title-md text-white"}>
                    {p.name}
                  </h3>
                  {featured && <Badge tone="promo">{p.badge}</Badge>}
                </div>

                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span className="numeric text-number-lg text-white">{p.price}</span>
                  {p.was && (
                    <>
                      {/* Subordinated by size and the strike, not by a low
                          opacity — at 18px it is normal-size text and owes the
                          full 4.5:1, and it is part of the price claim rather
                          than decoration. */}
                      <span className="numeric text-title-md text-white/90 line-through">
                        {p.was}
                      </span>
                      {/* Solid, opaque, and derived from the two prices — a
                          translucent tint over the gradient would read pink. */}
                      <span className="rounded-pill bg-semantic-down px-2.5 py-1 text-caption-strong uppercase tracking-[0.06em] text-[#3F0A0A]">
                        Save {saving(p.was, p.price)}
                      </span>
                    </>
                  )}
                </p>

                <p className={`mt-4 text-body-md ${featured ? "text-white/90" : "text-body"}`}>
                  {p.line}
                </p>

                {featured && (
                  <div className="mt-7 border-t border-white/15 pt-6">
                    <Countdown iso={OFFER_ENDS} />
                    {p.was && (
                      /* States plainly what lapsing costs. The number comes from
                         the same config field as the struck-through price, so it
                         can never drift out of sync with it. */
                      <p className="mt-3 text-caption text-white/90">
                        Then it goes back to <span className="numeric">{p.was}</span>.
                      </p>
                    )}
                  </div>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-3 text-body-sm">
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
                  variant={featured ? "on-accent" : "secondary"}
                  size={featured ? "lg" : "md"}
                  className="mt-9 w-full"
                >
                  {featured ? "Claim this price" : "Call now"}
                </Button>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
