import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { ArrowUpRight, TextLink } from "./ui.jsx";
import { mailtoHref } from "../config.js";
import PLLFI from "../assets/PLLFI.png";
import TropicXImage from "../assets/TropicX.png";
gsap.registerPlugin(ScrollTrigger);

/**
 * Client work.
 *
 * `result` is optional and deliberately unset. Where a real, verifiable figure
 * exists it gets the boxed treatment; where one doesn't, the block is omitted
 * rather than filled with a placeholder or an invented number. Add
 * `result: { value: "21%", label: "Increase in enquiries" }` once the client
 * has given you the figure — never before.
 */
const PROJECTS = [
  {
    title: "TropicX Design Studio",
    url: "https://www.tropicxdesignstudio.com/",
    img: TropicXImage,
    brief: "A studio with a decade of built work and no single place to show it.",
    line: "We set the brand direction, then built the site around the portfolio so the architecture leads and everything else gets out of the way.",
    tags: ["Brand direction", "Website", "Portfolio structure"],
    sector: "Architecture & design studio",
    place: "Nadi",
    year: "2026",
  },
  {
    title: "Pacific Legacy Leadership Foundation Incorporated",
    url: "https://www.pllfi.org/",
    img: PLLFI,
    brief: "A non-profit running community and environmental programmes across the Pacific.",
    line: "Years of programmes, partners and reporting reorganised into something a first-time visitor or a prospective funder can actually navigate.",
    tags: ["Website", "Content structure", "Programme pages"],
    sector: "Non-profit",
    place: "Suva",
    year: "2025",
  },
];

export default function Work() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".wk-item").forEach((item) => {
        // The authored moment: the frame opens from its own bottom edge as the
        // project arrives, so the screenshot is revealed rather than slid in.
        // Already scrolled past on mount: leave this project fully composed
        // rather than hiding it behind a trigger that has nothing left to fire.
        if (item.getBoundingClientRect().top < 0) return;

        const frame = item.querySelector(".wk-frame");
        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: item, start: "top 82%", once: true },
            }
          );
        }

        gsap.fromTo(
          item.querySelectorAll(".wk-copy > *"),
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: item, start: "top 78%", once: true },
          }
        );

        // Slow drift inside the frame, so a still screenshot still breathes.
        const media = item.querySelector(".wk-media");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* Surface, not canvas: this took the alternating band from "What we build"
     when the two swapped places, so Work and Process don't merge into one
     unbroken tone. */
  return (
    <section id="work" ref={root} className="bg-surface py-section">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading text="Our Projects" className="display text-display-lg text-white" />
          <Reveal selector="p" stagger={0.1}>
            <p className="mt-6 max-w-measure text-body-lg text-body">
              Each project below was built end to end — direction, design, copy and code — and every
              one is still live today. The links go straight to the real thing.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-24 sm:mt-24 sm:gap-32">
          {PROJECTS.map((p) => (
            <article key={p.title} className="wk-item">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`${p.title} — open the live site in a new tab`}
              >
                <div className="wk-frame relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-elevated sm:aspect-[2/1]">
                  {/* All lazy: this section now sits below "What we build", so
                      no screenshot is near the viewport on load. The first one
                      was eager back when it followed the hero directly — left
                      that way it would pull ~1.6MB off-screen and contend with
                      the demo clips above it, which are the ones actually on
                      screen. These are heavy; see the note in README about
                      compressing them. */}
                  <img
                    src={p.img}
                    alt={`The ${p.title} website, shown on desktop`}
                    loading="lazy"
                    decoding="async"
                    className="wk-media absolute inset-0 h-[110%] w-full object-cover object-top transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.02]"
                  />
                </div>

                <div className="wk-copy mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem] lg:gap-16">
                  <div>
                    <MaskHeading
                      as="h3"
                      text={p.title}
                      className="display text-display-md text-white transition-colors duration-300 group-hover:text-accent-text"
                      start="top 88%"
                    />
                    <p className="mt-5 max-w-measure text-body-lg text-white">{p.brief}</p>
                    <p className="mt-4 max-w-measure text-body-md text-body">{p.line}</p>
                  </div>

                  <div className="lg:pt-3">
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-pill border border-hairline px-3 py-1 text-caption text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-6 space-y-2 border-t border-hairline pt-6">
                      {[
                        ["Sector", p.sector],
                        ["Based", p.place],
                        ["Launched", p.year],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-6 text-caption">
                          <dt className="text-muted">{k}</dt>
                          <dd className={k === "Launched" ? "numeric text-white" : "text-white"}>
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-button text-accent-text transition-colors duration-200 group-hover:text-white">
                      Visit live site
                      <ArrowUpRight className="text-[0.85em] transition-transform duration-300 ease-editorial group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-hairline pt-8 sm:mt-24">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-md text-body">
            Want to see how this would work for yours?
            <TextLink as="a" href={mailtoHref("Website enquiry")}>
              Ask us
            </TextLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
