// Shared visual primitives: the pill button, eyebrow label and icon set that
// the whole page is built from. Hover springs are CSS transforms with a snappy
// curve rather than a JS spring — same feel, no extra runtime.

export function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
    </svg>
  );
}

export function CircleDot({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GridIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={`h-[1em] w-[1em] ${className}`} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

const VARIANTS = {
  dark: "bg-ink text-paper",
  light: "bg-surface text-foreground",
  outline: "border border-line bg-transparent text-foreground hover:bg-surface",
  accent: "bg-gradient-to-br from-accent-from to-accent-to text-paper",
};

const BADGE = {
  dark: "bg-paper text-ink",
  light: "bg-ink text-paper",
  outline: "bg-ink text-paper",
  accent: "bg-paper text-accent",
};

/**
 * The primary control. `withArrow` swaps to the tighter padding plus a circular
 * arrow badge that shifts on hover.
 */
export function PillButton({
  as: Tag = "a",
  variant = "dark",
  withArrow = false,
  arrow = "right",
  className = "",
  children,
  ...rest
}) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Tag
      {...rest}
      data-cursor
      className={`group inline-flex items-center gap-3 rounded-pill font-medium text-sm leading-none
        transition-transform duration-300 ease-snap hover:scale-[1.04] min-h-[44px]
        ${VARIANTS[variant]} ${withArrow ? "py-1.5 pl-6 pr-1.5" : "px-7 py-3.5"} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-pill text-base ${BADGE[variant]}`}>
          <Arrow
            className={`transition-transform duration-300 ease-snap ${
              arrow === "up-right"
                ? "group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                : "group-hover:translate-x-[3px]"
            }`}
          />
        </span>
      )}
    </Tag>
  );
}

export function Eyebrow({ tone = "dark", className = "", children }) {
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${light ? "text-paper/70" : "text-foreground/70"} ${className}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-pill ${light ? "bg-paper/60" : "bg-foreground/50"}`} />
      {children}
    </span>
  );
}

export function TagChip({ tone = "dark", children }) {
  const light = tone === "light";
  return (
    <span className={`inline-flex rounded-pill border px-4 py-2 text-sm ${light ? "border-paper/25 text-paper" : "border-line text-foreground"}`}>
      {children}
    </span>
  );
}
