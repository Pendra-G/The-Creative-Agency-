import { Star } from "./ui.jsx";

/**
 * The reference's justified word strip: a single sentence spread edge to edge
 * so it reads as a rule rather than a sentence.
 */
export function WordRule({ words, className = "" }) {
  return (
    <div className={`border-y border-line py-3 ${className}`}>
      <ul className="mx-auto flex max-w-shell items-center justify-between gap-2 px-4 sm:px-6">
        {words.map((w, i) => (
          <li key={`${w}-${i}`} className="micro whitespace-nowrap text-cream/60">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Continuous marquee. The track holds the content twice and translates -50%,
 * so the loop is seamless without measuring anything.
 */
export function Marquee({
  text,
  direction = "left",
  duration = 38,
  className = "",
  tone = "cream",
  repeat = 6,
}) {
  const items = Array.from({ length: repeat }, (_, i) => i);
  const Track = (
    <div
      className={`mq-track ${direction === "left" ? "mq-left" : "mq-right"}`}
      style={{ "--mq-dur": `${duration}s` }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? "true" : undefined}>
          {items.map((i) => (
            <span key={i} className="flex items-center">
              <span className="display px-4 text-[clamp(1.6rem,4.6vw,3.4rem)] whitespace-nowrap">
                {text}
              </span>
              <Star className={tone === "ink" ? "text-ink/50" : "text-gold"} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden ${tone === "ink" ? "text-ink" : "text-cream"} ${className}`}
      role="presentation"
    >
      {Track}
    </div>
  );
}
