/**
 * Shared primitives.
 *
 * Every interactive control is a pill; every container is a 24px card. The
 * accent appears once or twice per band and nowhere else, so a filled purple
 * pill always means "this is the action here".
 */
import { telHref, viberHref } from "../config.js";

export function ArrowUpRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// whitespace-nowrap matters: these are fixed-height pills, so a label that
// wraps overflows the shape instead of growing it.
const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-button transition-colors duration-200 ease-editorial disabled:cursor-not-allowed";

const VARIANTS = {
  /* The one filled accent. White on #7C3AED is 5.7:1. */
  primary: "bg-accent text-white hover:bg-accent-active active:bg-accent-active disabled:bg-accent-disabled disabled:text-white/40",
  /* Soft plate on dark — the secondary path, never competing with primary. */
  secondary: "bg-surface-strong text-white hover:bg-hairline",
  /* Outline for use over imagery, where a plate would fight the frame. */
  outline: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  /* Inverted — sits on the one light surface in the system. */
  invert: "bg-ink text-white hover:bg-ink/85",
  /* For use on an accent-filled surface, where both a filled accent pill and a
     dark pill would sink into the fill. White is the only thing left that lifts. */
  "on-accent": "bg-white text-[#4C1D95] hover:bg-white/90",
};

const SIZES = {
  /* 44px — WCAG AAA. */
  md: "h-11 px-5",
  /* 56px — the prouder hero stance. */
  lg: "h-14 px-8",
};

export function Button({
  as: Tag = "a",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag {...rest} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {children}
    </Tag>
  );
}

/** Inline text link in the accent's readable cut — 7.2:1 on canvas. */
export function TextLink({ as: Tag = "a", className = "", children, ...rest }) {
  return (
    <Tag
      {...rest}
      className={`group inline-flex min-h-[44px] items-center gap-1.5 text-button text-accent-text
        transition-colors duration-200 hover:text-white ${className}`}
    >
      {children}
      <ArrowUpRight className="text-[0.85em] transition-transform duration-300 ease-editorial group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </Tag>
  );
}

/** Small uppercase pill. Metadata and offer marks — never a kicker over a heading. */
export function Badge({ tone = "soft", className = "", children }) {
  const tones = {
    soft: "bg-surface-strong text-white",
    accent: "bg-accent text-white",
    light: "bg-ink/10 text-ink",
    /* Reads on an accent-filled card, where a purple pill would disappear into
       the fill it is sitting on. */
    promo: "bg-white text-[#4C1D95]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1.5 text-caption-strong uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The site's primary action pair. Calling is the main path; Viber sits
 * alongside because the deep link does nothing on a desktop without the app.
 */
export function CallCtas({ className = "", size = "md", secondary = "outline" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Button as="a" href={telHref()} variant="primary" size={size}>
        Call now
      </Button>
      <Button as="a" href={viberHref()} variant={secondary} size={size}>
        Message on Viber
      </Button>
    </div>
  );
}
