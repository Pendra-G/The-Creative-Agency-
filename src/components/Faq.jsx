import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "./Reveal.jsx";
gsap.registerPlugin(ScrollTrigger);

// Answers run to two short paragraphs rather than one line: the questions
// people actually hesitate over deserve a proper answer, and a thin one reads
// as evasive.
const QA = [
  {
    q: "Who actually builds it?",
    a: [
      "I do. The person you speak to on the first call is the person who writes the copy, designs the pages and ships the site.",
      "There's no account manager in the middle and no queue. If something needs deciding, you're talking to the one who'll act on it.",
    ],
  },
  {
    q: "Why only two or three pages?",
    a: [
      "Because it's what most small businesses genuinely need, and it's the reason the price is what it is. Two or three pages is enough to say who you are, show your work, and let people get hold of you.",
      "Past that you're usually paying to build pages nobody visits. If your business really does need more, I'll tell you on the first call rather than quietly sell you less than you need.",
    ],
  },
  {
    q: "How long does it take?",
    a: [
      "It depends on what the site has to do. A straightforward three-pager moves quickly. Anything with a booking flow or a lot of content takes longer.",
      "You'll get a real date once I know the scope, agreed before any work starts. If anything threatens it, you'll hear it from me rather than find out on the deadline.",
    ],
  },
  {
    q: "What do you need from me?",
    a: [
      "Half an hour on a call, and whatever you already have. Photos on your phone, a logo, a rough idea of what you want to say. None of it needs to be tidy.",
      "I'll draft the words from our conversation and you approve every line. Where we need better photos, I'll tell you exactly what to take.",
    ],
  },
  {
    q: "What if I don't like it?",
    a: [
      "You see and approve the full design before any production code is written, so there's no point where a finished build lands as a surprise.",
      "Changes at the design stage cost nothing but a conversation. That's the whole reason the design comes first.",
    ],
  },
  {
    q: "How does payment work?",
    a: [
      "Half to start and half when the site goes live. No subscription and no ongoing fee just to stay online.",
      "If you need a domain or hosting bought on your behalf, I'll tell you the cost up front and charge it at cost.",
    ],
  },
  {
    q: "Do I own the website?",
    a: [
      "Yes. The site, the files and the domain are yours. You can move it elsewhere whenever you like and you don't need my permission to do it.",
      "Nothing is held hostage. That includes the code, which is a fair question to ask anyone building your site.",
    ],
  },
];

export default function Faq() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".fq-head p", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".fq-item", {
        y: 34,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".fq-list", start: "top 88%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="fq-head grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
          <MaskHeading
            text="Before we work together"
            className="display text-white text-[clamp(2.2rem,8vw,6rem)]"
          />
          <p className="max-w-sm text-base leading-relaxed text-white/60 lg:text-right">
            The things worth knowing before you commit to anyone, not just me.
          </p>
        </div>

        {/* Native details/summary: accessible and keyboard-operable with no JS. */}
        <div className="fq-list mt-12 border-t border-line">
          {QA.map(({ q, a }, i) => (
            <details key={q} className="fq-item group border-b border-line">
              <summary
                data-cursor
                className="flex min-h-[72px] cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden"
              >
                <span className="micro w-8 shrink-0 text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-display text-[clamp(1.1rem,3.2vw,1.75rem)] font-semibold leading-snug tracking-tighter text-white transition-colors group-hover:text-accent">
                  {q}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-accent transition-transform duration-300 ease-snap group-open:rotate-45"
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>

              <div className="pb-8 pl-0 pr-4 sm:pl-13 sm:pr-16">
                {a.map((para) => (
                  <p
                    key={para}
                    className="mt-3 max-w-2xl text-base leading-relaxed text-white/60 first:mt-0 sm:text-lg"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
