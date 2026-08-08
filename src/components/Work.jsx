import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextLink } from "./ui.jsx";
import PLLFI from "../assets/PLLFI.png";
import TropicXImage from "../assets/TropicX.png";
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    n: 1,
    title: "TropicX",
    url: "https://www.tropicxdesignstudio.com/",
    img: TropicXImage,
    type: "Architecture studio",
    year: "2026",
    location: "Nadi, Fiji",
    line: "A cinematic single scroll that puts the portfolio centre stage — and stays fast on island mobile networks.",
    scope: ["Brand direction", "Design", "Build", "Motion"],
  },
  {
    n: 2,
    title: "PLLFI",
    url: "https://www.pllfi.org/",
    img: PLLFI,
    type: "Non-profit",
    year: "2025",
    location: "Suva, Fiji",
    line: "Mission, programmes and impact laid out in one calm, readable pass with accessible typography throughout.",
    scope: ["Strategy", "UX/UI", "Build", "CMS"],
  },
];

export default function Work() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".wk-head", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.utils.toArray(".wk-item").forEach((item) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
        // Slow parallax drift on the shot as it passes.
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
        <div className="wk-head flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <h2 className="display text-white text-[clamp(2.4rem,10vw,8rem)]">Selected work</h2>
          <p className="micro text-white/50">Two projects · Fiji</p>
        </div>

        <div className="mt-10 flex flex-col gap-16 sm:mt-14 sm:gap-24">
          {PROJECTS.map((p) => (
            <article key={p.title} className="wk-item group">
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

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="micro text-white/40">{String(p.n).padStart(3, "0")}</span>
                      <h3 className="display text-white text-[clamp(2rem,7vw,5rem)] transition-colors group-hover:text-accent">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                      {p.line}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 lg:items-end">
                    <p className="micro text-white/45">
                      {p.type} · {p.year} · {p.location}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {p.scope.map((s) => (
                        <li
                          key={s}
                          className="rounded-pill border border-white/20 px-3 py-1.5 micro text-white/70"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
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
