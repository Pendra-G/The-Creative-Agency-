import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextLink } from "./ui.jsx";
import PLLFI from "../assets/PLLFI.png";
import TropicXImage from "../assets/TropicX.png";
gsap.registerPlugin(ScrollTrigger);

/**
 * Client stories.
 *
 * `result` is optional. Where a real, verifiable figure exists it gets the
 * boxed treatment beside the description; where one doesn't, the block is
 * omitted rather than filled with a placeholder or an invented number. Add
 * `result: { value: "21%", label: "Increase in enquiries" }` when you have it.
 */
const PROJECTS = [
  {
    title: "TropicX",
    url: "https://www.tropicxdesignstudio.com/",
    img: TropicXImage,
    line: "Brand direction and website for an architecture and design studio with a decade of built work behind it.",
    meta: "Architecture studio · Nadi · 2026",
  },
  {
    title: "PLLFI",
    url: "https://www.pllfi.org/",
    img: PLLFI,
    line: "Website for a non-profit running community and environmental programmes across the Pacific.",
    meta: "Non-profit · Suva · 2025",
  },
];

export default function Work() {
  const root = useRef(null);
  const total = String(PROJECTS.length).padStart(2, "0");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".wk-item").forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
        const media = item.querySelector(".wk-media img");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
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
    <section id="work" ref={root} className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[13rem_1fr] lg:gap-10">
        {/* Label rides alongside the list rather than sitting above it as
            another oversized heading. */}
        <div className="lg:sticky lg:top-32 lg:h-max lg:pt-2">
          <h2 className="flex items-center gap-3 font-display text-lg font-semibold tracking-tighter text-white">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-pill bg-white/35" />
            Success Stories
          </h2>
        </div>

        <div>
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="wk-item group border-b border-line py-10 first:pt-0 last:border-b-0 sm:py-14"
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_20rem] lg:gap-12"
                aria-label={`${p.title} — open the live site`}
              >
                <div className="wk-media relative aspect-[16/10] overflow-hidden rounded-card bg-carbon">
                  <img
                    src={p.img}
                    alt={`${p.title} website`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-[110%] w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="lg:pt-1">
                  {/* SS ←— 01/02 */}
                  <p className="flex items-center gap-2">
                    <span className="micro text-white/40">SS</span>
                    <span aria-hidden="true" className="h-px w-5 bg-white/20" />
                    <span className="rounded-[4px] border border-white/20 px-2 py-[3px] micro text-white/70">
                      {String(i + 1).padStart(2, "0")}/{total}
                    </span>
                  </p>

                  <h3 className="mt-5 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-tight tracking-tighter text-white transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>

                  <p className="mt-3 max-w-md text-base leading-relaxed text-white/60">{p.line}</p>

                  {/* Boxed figure, only when a real one exists */}
                  {p.result && (
                    <div className="mt-8">
                      <span className="inline-block rounded-[6px] bg-white/[0.08] px-3 py-1.5 font-display text-[clamp(1.4rem,3.5vw,1.9rem)] font-bold tracking-tighter text-white">
                        {p.result.value}
                      </span>
                      <p className="mt-3 max-w-xs text-base leading-relaxed text-white/70">
                        {p.result.label}
                      </p>
                    </div>
                  )}

                  <p className="mt-8 micro text-white/35">{p.meta}</p>

                  <div className="mt-5">
                    <TextLink as="span">Visit live site</TextLink>
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
