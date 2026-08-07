import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton, Eyebrow } from "./ui.jsx";
import { SITE, telHref, mailtoHref } from "../config.js";
import GlobeImg from "../assets/3D Globe.png";
gsap.registerPlugin(ScrollTrigger);

export default function WorkWithUs() {
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".wwu-text", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.to(".wwu-globe", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // No form backend yet, so the enquiry hands off to the visitor's mail client
  // with their address carried through. Swap for a real endpoint when there is one.
  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailtoHref(
      "Website enquiry",
      `My email: ${email}\n\nWhat I'm after:\n\n\nRough budget:\n\n\nWhen I'd like it live:\n`
    );
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-surface py-16 text-foreground xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="wwu-text">
          <Eyebrow>Get in touch</Eyebrow>
        </div>
        <h2
          id="contact-heading"
          className="wwu-text mt-5 font-display text-[clamp(2rem,9vw,9rem)] font-semibold leading-[0.92] tracking-tightest"
        >
          Start a project.
        </h2>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:gap-10 lg:mt-14 lg:grid-cols-2">
          <div className="relative order-2 flex items-center justify-center lg:order-1">
            <div className="wwu-globe w-full max-w-[28rem] px-4 py-4 will-change-transform sm:px-6 sm:py-6">
              <img src={GlobeImg} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-8">
            <h3 className="wwu-text mb-5 font-display text-2xl font-medium leading-[0.98] tracking-tightest xs:text-3xl sm:text-5xl">
              Tell us what it has to do.
            </h3>
            <p className="wwu-text mb-7 max-w-md text-sm leading-relaxed text-foreground/70 xs:text-base sm:text-lg">
              One call, thirty minutes, no charge. You'll get a straight answer on which package
              fits — and if a one-pager isn't right for you, we'll say that on the call rather than
              sell you one.
            </p>

            <form onSubmit={onSubmit} className="wwu-text max-w-md">
              <label htmlFor="workwithus-email" className="sr-only">
                Your email
              </label>
              <div className="flex flex-col gap-3">
                <input
                  id="workwithus-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="h-12 w-full min-w-0 rounded-control border border-line bg-paper/60 px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-foreground/30 focus:bg-paper"
                />
                <PillButton as="button" type="submit" variant="dark" withArrow className="self-start">
                  Send enquiry
                </PillButton>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-foreground/45">
                Opens your mail app with the details filled in.
              </p>
            </form>

            <div className="wwu-text mt-8 flex flex-wrap gap-2">
              {SITE.phones.map((p) => (
                <a
                  key={p}
                  href={telHref(p)}
                  data-cursor
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-pill border border-line bg-paper/50 px-4 text-xs text-foreground/75 transition-colors hover:bg-ink hover:text-paper"
                >
                  {p} <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
