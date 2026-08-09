import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextLink } from "./ui.jsx";
import { MaskHeading } from "./Reveal.jsx";
import PLLFI from "../assets/PLLFI.png";
import TropicXImage from "../assets/TropicX.png";
gsap.registerPlugin(ScrollTrigger);

/**
 * Client stories.
 *
 * `result` is deliberately optional. Where a real, verifiable number exists it
 * gets the large treatment; where one doesn't, the block is omitted entirely
 * rather than filled with a placeholder or an invented figure. Add
 * `result: { value: "21%", label: "..." }` to a project when you have it.
 */
const PROJECTS = [
  {
    title: "TropicX",
    url: "https://www.tropicxdesignstudio.com/",
    img: TropicXImage,
    type: "Architecture studio",
    location: "Nadi, Fiji",
    year: "2026",
    line: "A cinematic single scroll that puts a decade of built work centre stage, and stays fast on island mobile networks.",
    scope: ["Brand direction", "Web design", "Build", "Motion"],
  },
  {
    title: "PLLFI",
    url: "https://www.pllfi.org/",
    img: PLLFI,
    type: "Non-profit",
    location: "Suva, Fiji",
    year: "2025",
    line: "Mission, programmes and impact laid out in one calm, readable pass, with typography anyone can read.",
    scope: ["Strategy", "UX/UI", "Build", "CMS"],
  },
];

export default function Work() {
  const root = useRef(null);
  const total = String(PROJECTS.length).padStart(2, "0");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".wk-head p", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      gsap.utils.toArray(".wk-item").forEach((item) => {
        gsap.from(item, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
        const media = item.querySelector(".wk-media img");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="wk-head border-b border-line pb-8">
          <MaskHeading
            text="Success stories"
            className="display text-white text-[clamp(2.4rem,9vw,7rem)]"
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Two businesses in Fiji, each with a site built to do one job properly.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-20 sm:gap-28">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className="wk-item group">
              <div className="flex items-baseline gap-3 pb-5">
                <span className="micro text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="micro text-white/30">/ {total}</span>
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="block"
                aria-label={`${p.title} — open the live site`}
              >
                <div className="wk-media relative aspect-[16/10] overflow-hidden rounded-card bg-carbon sm:aspect-[16/9]">
                  <img
                    src={p.img}
                    alt={`${p.title} website`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-[112%] w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                  <div>
                    <h3 className="display text-white text-[clamp(2rem,6vw,4rem)] transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                      {p.line}
                    </p>
                    <div className="mt-6">
                      <TextLink as="span">Visit live site</TextLink>
                    </div>
                  </div>

                  <div className="lg:pt-2">
                    {/* Large result, only when a real one exists */}
                    {p.result && (
                      <div className="mb-8 border-l-2 border-accent pl-5">
                        <p className="display text-accent text-[clamp(2.4rem,7vw,4rem)]">
                          {p.result.value}
                        </p>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                          {p.result.label}
                        </p>
                      </div>
                    )}

                    <dl className="space-y-3 border-t border-line pt-5">
                      <div className="flex justify-between gap-4">
                        <dt className="micro text-white/40">Sector</dt>
                        <dd className="micro text-white/75">{p.type}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="micro text-white/40">Where</dt>
                        <dd className="micro text-white/75">{p.location}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="micro text-white/40">Year</dt>
                        <dd className="micro text-white/75">{p.year}</dd>
                      </div>
                    </dl>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.scope.map((s) => (
                        <li
                          key={s}
                          className="rounded-pill border border-white/15 px-3 py-1.5 micro text-white/60"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
