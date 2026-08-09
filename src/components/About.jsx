import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "./Reveal.jsx";
import { SITE, FOUNDERS, telHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ab-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".ab-founder", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-founders", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading
            text="Two of us. That's the whole studio."
            className="display text-white text-[clamp(1.9rem,6vw,4rem)]"
          />
          <p className="ab-reveal mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
            We build small websites for businesses in Fiji. One of us handles the design and the
            marketing side, the other handles the build and everything after launch. You talk to
            both of us, and whoever you speak to can actually make the decision.
          </p>
          <p className="ab-reveal mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            No account managers, no queue, and nobody passing your job to whoever happens to be
            free. Everything is built to load quickly on island mobile networks, because that's how
            most of your customers will see it.
          </p>
        </div>

        <div className="ab-founders mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <article
              key={f.email}
              className="ab-founder flex flex-col rounded-card border border-line bg-carbon p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-pill bg-white/[0.06] font-display text-sm font-bold tracking-tight text-white"
                >
                  {f.initials}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tighter text-white sm:text-xl">
                    {f.name}
                  </h3>
                  <p className="mt-1 micro text-white/45">{f.role}</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/60 sm:text-base">{f.focus}</p>

              <div className="mt-auto flex flex-col gap-1 pt-7">
                <a
                  href={`mailto:${f.email}`}
                  data-cursor
                  className="inline-flex min-h-[44px] items-center break-all text-sm text-white/75 transition-colors hover:text-white"
                >
                  {f.email}
                </a>
                <a
                  href={telHref(f.phone)}
                  data-cursor
                  className="inline-flex min-h-[44px] items-center font-display text-lg font-semibold tracking-tighter text-white transition-colors hover:text-accent"
                >
                  {f.phone}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="ab-reveal mt-10 micro text-white/40">
          {SITE.location} · Working across Fiji and the wider Pacific
        </p>
      </div>
    </section>
  );
}
