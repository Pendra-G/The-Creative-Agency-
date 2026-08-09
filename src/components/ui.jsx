// Shared primitives. The reference leans on two controls only: a small
// underlined text link with an arrow, and a solid pill. Everything else is
// typography doing the work.
import { PRIMARY_PHONE, telHref, viberHref } from "../config.js";

export function ArrowUpRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M12 1.6c.9 5.6 3.2 8 8.9 8.9-5.7.9-8 3.3-8.9 8.9-.9-5.6-3.2-8-8.9-8.9 5.7-.9 8-3.3 8.9-8.9Z" />
    </svg>
  );
}

/** Small uppercase link with a rule under it — the reference's "let's do this". */
export function TextLink({ as: Tag = "a", className = "", children, ...rest }) {
  return (
    <Tag
      {...rest}
      data-cursor
      className={`group inline-flex min-h-[44px] items-end gap-2 border-b border-white/30 pb-1 micro text-white
        transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {children}
      <ArrowUpRight className="text-[0.9em] transition-transform duration-300 ease-snap group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </Tag>
  );
}

const PILL = {
  white: "bg-white text-ink hover:bg-accent",
  accent: "bg-accent text-ink hover:bg-white",
  outline: "border border-white/35 text-white hover:bg-white hover:text-ink",
};

export function Pill({ as: Tag = "a", variant = "white", className = "", children, ...rest }) {
  return (
    <Tag
      {...rest}
      data-cursor
      className={`group inline-flex min-h-[52px] items-center gap-3 rounded-pill px-7 text-sm font-semibold
        uppercase tracking-[0.08em] transition-all duration-300 ease-snap hover:scale-[1.03]
        ${PILL[variant]} ${className}`}
    >
      {children}
      <ArrowRight className="transition-transform duration-300 ease-snap group-hover:translate-x-1" />
    </Tag>
  );
}

/**
 * The site's primary action. Calling is the main path; Viber sits alongside
 * because the deep link does nothing on a desktop without the app installed.
 */
export function CallCtas({ className = "", variant = "white", showNumber = false }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Pill as="a" href={telHref()} variant={variant}>
        Call now
      </Pill>
      <a
        href={viberHref()}
        data-cursor
        className="group inline-flex min-h-[52px] items-center gap-2 rounded-pill border border-accent/70 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 ease-snap hover:scale-[1.03] hover:bg-accent hover:text-ink"
      >
        Message on Viber
      </a>
      {showNumber && (
        <a
          href={telHref()}
          data-cursor
          className="inline-flex min-h-[44px] items-center font-display text-lg font-semibold tracking-tighter text-white/70 transition-colors hover:text-white"
        >
          {PRIMARY_PHONE}
        </a>
      )}
    </div>
  );
}

/** Numbered micro label — 001 / 002 / 003. */
export function Index({ n }) {
  return <span className="micro text-white/40">{String(n).padStart(3, "0")}</span>;
}
