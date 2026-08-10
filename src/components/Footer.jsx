import { Link } from "react-router-dom";
import { Marquee } from "./Strips.jsx";
import { SITE, PRIMARY_PHONE, telHref, viberHref, mailtoHref } from "../config.js";

// Every entry is a route that exists or a section id that exists on home.
const LINKS = [
  ["Home", "/"],
  ["What we build", "/#build"],
  ["Projects", "/#work"],
  ["Process", "/#process"],
  ["Packages", "/#pricing"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

function FooterLink({ href, children }) {
  const cls =
    "group inline-flex min-h-[42px] items-center gap-2 micro text-white/55 transition-colors hover:text-white";
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="h-px w-0 bg-accent transition-all duration-300 ease-snap group-hover:w-4"
      />
      {children}
    </>
  );
  return href.startsWith("/") ? (
    <Link to={href} data-cursor className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} data-cursor className={cls}>
      {inner}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-ink pt-16">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 lg:grid-cols-[1.3fr_1fr]">
          {/* Everything a visitor needs, in one place */}
          <div>
            <p className="micro text-white/45">Get in touch</p>

            <a
              href={telHref()}
              data-cursor
              className="mt-4 block font-display text-[clamp(1.8rem,6vw,3.2rem)] font-semibold leading-tight tracking-tighter text-white transition-colors hover:text-accent"
            >
              {PRIMARY_PHONE}
            </a>

            <a
              href={mailtoHref()}
              data-cursor
              className="mt-2 block break-all font-display text-[clamp(1rem,3.2vw,1.5rem)] font-medium tracking-tight text-white/70 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={telHref()}
                data-cursor
                className="inline-flex min-h-[48px] items-center rounded-pill bg-white px-6 micro text-ink transition-transform duration-300 ease-snap hover:scale-[1.04]"
              >
                Call now
              </a>
              <a
                href={viberHref()}
                data-cursor
                className="inline-flex min-h-[48px] items-center rounded-pill border border-white/30 px-6 micro text-white transition-colors hover:bg-accent hover:text-ink"
              >
                Message on Viber
              </a>
            </div>

            <p className="mt-7 micro text-white/40">{SITE.location}</p>
          </div>

          <div>
            <p className="mb-3 micro text-white/45">Site</p>
            <ul className="columns-2 gap-6">
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
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

      {/* Sign-off runs continuously leftward across the base of the page. */}
      <div className="border-t border-line py-6">
        <Marquee text="Website Portfolio" duration={40} direction="left" />
      </div>
    </footer>
  );
}
