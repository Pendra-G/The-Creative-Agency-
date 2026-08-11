import { useState } from "react";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { SITE, FOUNDERS } from "../config.js";

/**
 * Founder portrait, falling back to an initials plate.
 *
 * The photo is a plain public-directory URL, so a founder without one on disk
 * simply shows their initials — no broken-image icon, no build failure.
 */
function Avatar({ photo, initials, name }) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={name}
        width="64"
        height="64"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-16 w-16 shrink-0 rounded-full border border-hairline object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="numeric flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-strong text-body-sm text-white"
    >
      {initials}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-canvas py-section">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading
            text="Two freelancers, one team."
            className="display text-display-lg text-white"
          />
          <Reveal selector="p" stagger={0.1}>
            <p className="mt-6 max-w-measure text-body-lg text-body">
              We are two independent freelancers who take on every project together — one on design
              direction and marketing, one on the code and everything after launch. There is no
              agency layer in between, so whoever you speak to can make the decision.
            </p>
            <p className="mt-4 max-w-measure text-body-md text-body">
              That means no account managers, no queue, and nobody handing your job to whoever
              happens to be free. Every site is built to load fast on a phone over mobile data,
              because that is how most of your customers will see it.
            </p>
          </Reveal>
        </div>

        <Reveal
          selector=".ab-founder"
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-2"
          stagger={0.12}
        >
          {FOUNDERS.map((f) => (
            <article
              key={f.initials}
              className="ab-founder rounded-xl border border-hairline bg-elevated p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <Avatar photo={f.photo} initials={f.initials} name={f.name} />
                <div>
                  <h3 className="display text-title-lg text-white">{f.name}</h3>
                  <p className="mt-1 text-caption text-accent-text">{f.role}</p>
                </div>
              </div>

              <p className="mt-6 text-body-md text-body">{f.focus}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="text-caption text-muted">
            Based in {SITE.location} · Working with clients wherever they are
          </p>
        </Reveal>
      </div>
    </section>
  );
}
