import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const QA = [
  {
    q: "Do I own the website?",
    a: "Yes. The site, the files and the domain are yours. There's no lock-in and no monthly fee just to keep it online — you can take it elsewhere any time you like.",
  },
  {
    q: "What if I need more than one page?",
    a: "Then a one-pager isn't the right buy, and I'll tell you that on the first call. Extra pages, online shops and booking systems are real work with real costs, so I quote those individually. The quote is free.",
  },
  {
    q: "Who writes the words?",
    a: "We do it together. You know your business; I know what a page needs to say to get an enquiry. I'll draft it from our call and you approve every line before it goes live.",
  },
  {
    q: "What if I don't have photos?",
    a: "That's normal and it isn't a problem. A lot of what I build leans on typography, colour and motion rather than photography. Where we do need images, I'll tell you exactly what to take — a phone camera is usually enough.",
  },
  {
    q: "How long does it actually take?",
    a: "About two weeks from the first call to a live site, assuming you can get me your content and feedback in good time. If something's holding it up, you'll hear from me rather than wonder.",
  },
  {
    q: "How do I pay?",
    a: "Half to start, half when the site goes live. No subscription, no hidden extras. If you need hosting or a domain bought on your behalf, I'll tell you the cost up front, at cost.",
  },
];

export default function Faq() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".fq-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="fq-reveal flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <h2 className="display text-cream text-[clamp(2.4rem,10vw,8rem)]">Questions</h2>
          <p className="micro text-cream/50">The ones people actually ask</p>
        </div>

        {/* Native details/summary: accessible and keyboard-operable with no JS. */}
        <div className="mt-4">
          {QA.map(({ q, a }) => (
            <details key={q} className="fq-reveal group border-b border-line py-6">
              <summary
                data-cursor
                className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden"
              >
                <h3 className="display text-[clamp(1.3rem,4vw,2.4rem)] text-cream transition-colors group-hover:text-gold">
                  {q}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-gold transition-transform duration-300 ease-snap group-open:rotate-45"
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/65 sm:text-lg">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
