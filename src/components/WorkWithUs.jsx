import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic.jsx";
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
      className="relative bg-ink text-bone py-16 xs:py-20 sm:py-28 md:py-36 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <h2
          id="contact-heading"
          className="wwu-text font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,9vw,11rem)]"
        >
          Start a project.
        </h2>

        <div className="mt-10 xs:mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div className="relative order-2 lg:order-1 flex items-center justify-center">
            <div className="wwu-globe w-full max-w-[28rem] px-3 xs:px-4 sm:px-6 py-4 sm:py-6 will-change-transform">
              <img src={GlobeImg} alt="" aria-hidden="true" className="w-full h-auto object-contain" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-8">
            <h3 className="wwu-text font-display font-medium text-2xl xs:text-3xl sm:text-5xl tracking-tightest leading-[0.95] mb-4 xs:mb-6">
              Tell us what it has to do.
            </h3>
            <p className="wwu-text text-bone/75 text-sm xs:text-base sm:text-lg leading-relaxed max-w-md mb-6 xs:mb-8">
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
                  placeholder="Your email"
                  autoComplete="email"
                  className="w-full min-w-0 h-12 rounded-full border border-white/30 bg-transparent px-4 text-sm text-bone placeholder:text-bone/50 outline-none transition focus:border-white focus:ring-2 focus:ring-white/15"
                />
                <Magnetic
                  as="button"
                  type="submit"
                  className="link-btn outline w-full xs:w-auto justify-center xs:justify-start whitespace-nowrap"
                  data-cursor
                >
                  Send enquiry <span aria-hidden="true">→</span>
                </Magnetic>
              </div>
              <p className="mt-3 text-[10px] xs:text-[11px] text-bone/40 leading-relaxed">
                Opens your mail app with the details filled in.
              </p>
            </form>

            <div className="wwu-text mt-8 flex flex-wrap gap-2">
              {SITE.phones.map((p) => (
                <a
                  key={p}
                  href={telHref(p)}
                  data-cursor
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-bone/25 px-4 text-[10px] uppercase tracking-[0.18em] text-bone/80 hover:bg-bone hover:text-ink transition-colors whitespace-nowrap"
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
