import { MaskHeading, Reveal } from "./Reveal.jsx";
import { Check } from "./ui.jsx";

/**
 * Three steps. Each one names what happens, then what the client actually
 * holds at the end of it — so the process reads as a sequence of things they
 * receive rather than a sequence of things we do.
 */
const STEPS = [
  {
    n: "01",
    title: "We work out what it needs to say",
    body:
      "Half an hour on a call. You tell us what the business does, who you want walking through the door, and what usually stops them. We tell you what belongs on the site — and what doesn't.",
    outcome: "A clear scope and a fixed price, agreed before anything starts.",
  },
  {
    n: "02",
    title: "We design it before we build it",
    body:
      "Words first, then layout. The copy decides the design, not the other way round. You see the whole thing and approve it before a line of production code gets written.",
    outcome: "A design you've signed off. Nothing gets built until you say yes.",
  },
  {
    n: "03",
    title: "We put it live",
    body:
      "Built, animated, tested and launched. Your domain pointed at it, the files handed over, and thirty days of small changes included while you settle in.",
    outcome: "The site, the domain and the files — yours to keep.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-canvas py-section">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="max-w-3xl">
          <MaskHeading text="How a project runs" className="display text-display-lg text-white" />
          <Reveal>
            <p className="mt-6 max-w-measure text-body-lg text-body">
              Three steps. At the end of each one you have something concrete in hand, and you know
              exactly what happens next.
            </p>
          </Reveal>
        </div>

        <Reveal as="ol" selector=".pr-step" className="mt-16 flex flex-col sm:mt-20" stagger={0.12}>
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="pr-step grid grid-cols-1 gap-y-5 border-t border-hairline py-10 last:border-b sm:py-12 lg:grid-cols-[5rem_1fr_20rem] lg:gap-x-12"
            >
              <p className="numeric text-number-md text-accent-text">{s.n}</p>

              <div>
                <h3 className="display text-display-sm text-white">{s.title}</h3>
                <p className="mt-4 max-w-measure text-body-md text-body">{s.body}</p>
              </div>

              <div className="rounded-lg bg-elevated p-5">
                <p className="flex gap-3 text-body-sm text-white">
                  <Check className="mt-[0.3em] shrink-0 text-accent-text" />
                  <span>{s.outcome}</span>
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
