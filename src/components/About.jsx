import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);
  // Drop a photo at public/portrait.jpg and it appears here. Until then the
  // section reads fine without one rather than showing a broken frame.
  const [hasPortrait, setHasPortrait] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ab-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <p className="ab-reveal micro text-cream/45">Who's behind it</p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <h2 className="ab-reveal display text-cream text-[clamp(2rem,6.5vw,4.5rem)]">
              You deal with the person who builds it.
            </h2>
            <p className="ab-reveal mt-6 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg">
              It's a small operation, and that's the point. No account manager, no queue, no handing
              your project to whoever is free. The person you talk to on the first call is the
              person who designs your site, builds it, and hands you the keys.
            </p>
            <p className="ab-reveal mt-4 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg">
              Based on {SITE.location.replace(", Fiji", "")}, working with businesses across Fiji and
              the wider Pacific. Everything is built to load quickly on island mobile networks —
              because that's how most of your visitors will actually see it.
            </p>

            {SITE.owner && (
              <p className="ab-reveal mt-8 display text-[clamp(1.4rem,4vw,2.4rem)] text-gold">
                {SITE.owner}
              </p>
            )}
          </div>

          {hasPortrait && (
            <div className="ab-reveal">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-carbon">
                <img
                  src="/portrait.jpg"
                  alt="Portrait"
                  loading="lazy"
                  onError={() => setHasPortrait(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
