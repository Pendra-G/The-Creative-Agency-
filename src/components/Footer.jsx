import { Link } from "react-router-dom";
import { SITE, PRIMARY_PHONE, telHref, viberHref, mailtoHref } from "../config.js";

// Every entry here is either a route that exists, a section id that exists on
// the home page, or a tel/mailto/viber scheme. Nothing points at a bare hash.
const LINKS = [
  ["Home", "/"],
  ["What we build", "/#build"],
  ["Work", "/#work"],
  ["Pricing", "/#pricing"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const CLS =
  "inline-flex min-h-[44px] items-center micro text-white/60 transition-all duration-300 ease-snap hover:translate-x-1 hover:text-accent";

function FooterLink({ href, children }) {
  // Internal routes go through the router; a plain <a> would trigger a full
  // page reload and throw away the smooth-scroll instance.
  if (href.startsWith("/")) {
    return (
      <Link to={href} data-cursor className={CLS}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} data-cursor className={CLS}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-ink pb-8 pt-16">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-line pb-14 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="micro text-white/45">Call or message</p>
            <a
              href={telHref()}
              data-cursor
              className="mt-3 inline-flex min-h-[44px] items-center font-display text-[clamp(1.3rem,4vw,1.9rem)] font-semibold tracking-tighter text-white transition-colors hover:text-accent"
            >
              {PRIMARY_PHONE}
            </a>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={telHref()}
                data-cursor
                className="inline-flex min-h-[44px] items-center rounded-pill bg-white px-5 micro text-ink transition-colors hover:bg-accent"
              >
                Call now
              </a>
              <a
                href={viberHref()}
                data-cursor
                className="inline-flex min-h-[44px] items-center rounded-pill border border-white/30 px-5 micro text-white transition-colors hover:bg-accent hover:text-ink"
              >
                Viber
              </a>
            </div>
            <p className="mt-5 micro text-white/45">{SITE.location}</p>
          </div>

          <div>
            <p className="mb-2 micro text-white/45">Site</p>
            <ul>
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 micro text-white/45">Email</p>
            <a
              href={mailtoHref()}
              data-cursor
              className="inline-flex min-h-[44px] items-center break-all text-sm text-white/70 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
            <ul className="mt-2">
              {SITE.phones.map((p) => (
                <li key={p}>
                  <FooterLink href={telHref(p)}>{p}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="micro text-white/40">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="micro text-white/40">Designed &amp; built in Fiji</p>
        </div>
      </div>

      {/* Oversized sign-off, kept on one line and clipped by the footer so any
          overhang reads as deliberate. */}
      <p
        aria-hidden="true"
        className="mt-6 select-none whitespace-nowrap text-center display leading-[0.78] text-white/[0.09] text-[clamp(2.4rem,13.5vw,15rem)]"
      >
        Website Portfolio
      </p>
    </footer>
  );
}
