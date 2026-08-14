import { Link } from "react-router-dom";
import { Marquee } from "./Strips.jsx";
import { Reveal } from "./Reveal.jsx";
import { SITE, PRIMARY_PHONE, telHref, mailtoHref } from "../config.js";

/* Grouped rather than one flat list, so the column has a shape instead of a
   run of seven links. Every entry is a route that exists or a section id that
   exists on home. */
const LINK_GROUPS = [
  [
    "Explore",
    [
      ["Home", "/"],
      ["What we build", "/#build"],
      ["Our Projects", "/#work"],
      ["Process", "/#process"],
      ["Packages", "/#pricing"],
    ],
  ],
  [
    "Company",
    [
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  ],
];

function FooterLink({ href, children }) {
  const cls =
    "group inline-flex min-h-[44px] items-center gap-2 text-body-sm text-muted transition-colors duration-200 hover:text-white";
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="h-px w-0 bg-accent-text transition-all duration-300 ease-editorial group-hover:w-4"
      />
      {children}
    </>
  );
  return href.startsWith("/") && !href.includes("#") ? (
    <Link to={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-canvas">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        {/* The closing card carries the full contact block on home, but the
            footer is where people habitually look for it — and on every other
            route it is the only place below the fold that has it. So the
            details repeat here in a quiet single line rather than a heading
            and a stack. */}
        <div className="grid grid-cols-1 gap-12 border-b border-hairline py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-24">
          <Reveal>
            <p className="text-title-sm text-white">{SITE.name}</p>

            <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-8">
              <a
                href={telHref()}
                className="numeric inline-flex min-h-[44px] w-fit items-center text-body-sm text-white transition-colors duration-200 hover:text-accent-text"
              >
                {PRIMARY_PHONE}
              </a>
              <a
                href={mailtoHref()}
                className="inline-flex min-h-[44px] w-fit items-center text-body-sm text-body transition-colors duration-200 hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-10 sm:gap-16">
            {LINK_GROUPS.map(([heading, links]) => (
              <div key={heading}>
                <p className="text-caption-strong uppercase tracking-[0.1em] text-muted">
                  {heading}
                </p>
                <ul className="mt-2">
                  {links.map(([label, href]) => (
                    <li key={href}>
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-7 sm:flex-row sm:items-center">
          <p className="text-caption text-muted">
            © <span className="numeric">{new Date().getFullYear()}</span> {SITE.name}
          </p>
          <p className="text-caption text-muted">Designed &amp; built in Fiji</p>
        </div>
      </div>

      {/* Sign-off drifting leftward across the base of the page. */}
      <div className="border-t border-hairline py-8">
        <Marquee text="Website Portfolio" direction="left" duration={40} />
      </div>
    </footer>
  );
}
