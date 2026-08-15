/**
 * Shared primitives.
 *
 * Every interactive control is a pill; every container is a 24px card. The
 * accent appears once or twice per band and nowhere else, so a filled purple
 * pill always means "this is the action here".
 */
import { telHref } from "../config.js";

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

/* Phone and Mail take their size from the caller rather than defaulting to
   1em like the arrows above. They sit beside title-sized text, where 1em would
   render them at 32px — and overriding a baked-in h-[1em] with a utility class
   resolves by stylesheet order, not class order, which is a coin flip. */
export function Phone({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92" />
    </svg>
  );
}

export function Mail({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7.5 9 5.5 9-5.5" />
    </svg>
  );
}

/**
 * Decorative browser frame — the product drawn faintly, as texture rather than
 * illustration. Purely ornamental: it carries no meaning the copy does not, so
 * it is aria-hidden and inert everywhere it is used.
 */
export function BrowserWireframe({ className = "" }) {
  return (
    <svg viewBox="0 0 320 240" fill="none" aria-hidden="true" focusable="false" className={className}>
      <rect x="8" y="8" width="304" height="224" rx="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 44h304" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="26" r="4" fill="currentColor" />
      <circle cx="46" cy="26" r="4" fill="currentColor" />
      <circle cx="62" cy="26" r="4" fill="currentColor" />
      <rect x="30" y="68" width="132" height="14" rx="7" fill="currentColor" opacity=".55" />
      <rect x="30" y="94" width="92" height="10" rx="5" fill="currentColor" opacity=".35" />
      <rect x="196" y="66" width="94" height="34" rx="17" fill="currentColor" opacity=".28" />
      <rect x="30" y="126" width="124" height="80" rx="12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="166" y="126" width="124" height="80" rx="12" stroke="currentColor" strokeWidth="1.5" />
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
  /* For use on an accent-filled surface. Black plate with the accent's on-dark
     cut for the label — 7.2:1, and the black is what lifts it off the fill. */
  "on-accent": "bg-ink text-accent-text hover:bg-ink/85",
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
       the fill it is sitting on. Black plate, accent-cut label. */
    promo: "bg-ink text-accent-text",
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
 * The site's primary action. This was a pair until Viber was dropped as a
 * contact route; calling is now the single path, so the wrapper exists to keep
 * the spacing and sizing consistent wherever it appears.
 */
export function CallCtas({ className = "", size = "md" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Button as="a" href={telHref()} variant="primary" size={size}>
        Call now
      </Button>
    </div>
  );
}
