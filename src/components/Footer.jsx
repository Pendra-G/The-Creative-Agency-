import { Link } from "react-router-dom";
import { Marquee } from "./Strips.jsx";
import { MaskHeading, Reveal } from "./Reveal.jsx";
import { Button } from "./ui.jsx";
import { SITE, PRIMARY_PHONE, telHref, viberHref, mailtoHref } from "../config.js";

// Every entry is a route that exists or a section id that exists on home.
const LINKS = [
  ["Home", "/"],
  ["What we build", "/#build"],
  ["Work", "/#work"],
  ["Process", "/#process"],
  ["Packages", "/#pricing"],
  ["About", "/about"],
  ["Contact", "/contact"],
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
        <div className="grid grid-cols-1 gap-14 border-b border-hairline py-section lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Phone and email sit together — one place to find both. */}
          <div>
            <MaskHeading
              as="h2"
              text="Get in touch"
              className="display text-display-md text-white"
            />

            <Reveal selector=".ft-line" className="mt-6 flex flex-col gap-4 sm:gap-2" stagger={0.09}>
              <a
                href={telHref()}
                className="ft-line numeric inline-flex min-h-[48px] sm:min-h-[44px] w-fit items-center text-title-lg text-white transition-colors duration-200 hover:text-accent-text"
              >
                {PRIMARY_PHONE}
              </a>
              <a
                href={mailtoHref()}
                className="ft-line inline-flex min-h-[48px] sm:min-h-[44px] w-fit items-center text-title-md sm:text-title-lg text-body transition-colors duration-200 hover:text-white"
              >
                {SITE.email}
              </a>
            </Reveal>

            <Reveal className="mt-8 sm:mt-9">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
                <Button as="a" href={telHref()} variant="primary" className="w-full sm:w-auto justify-center">
                  Call now
                </Button>
                <Button as="a" href={viberHref()} variant="secondary" className="w-full sm:w-auto justify-center">
                  Message on Viber
                </Button>
              </div>
            </Reveal>

            <Reveal className="mt-8">
              <p className="text-caption text-muted">{SITE.location}</p>
            </Reveal>
          </div>

          <Reveal>
            <p className="text-title-sm text-white">Site</p>
            <ul className="mt-3 columns-2 gap-6">
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
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
