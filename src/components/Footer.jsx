import { PillButton, LogoMark } from "./ui.jsx";
import { SITE, telHref, mailtoHref } from "../config.js";

const LINKS = [
  ["What we build", "#offer"],
  ["Motion showcase", "#showcase"],
  ["Process", "#process"],
  ["Pricing", "#packages"],
  ["Work", "#work"],
];

function AnimatedLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      data-cursor
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-[36px] items-center text-sm text-paper/65 transition-all duration-300 ease-snap hover:translate-x-1 hover:text-paper"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  // Empty entries in SITE.socials are hidden rather than rendered as dead links.
  const socials = Object.entries(SITE.socials).filter(([, url]) => Boolean(url));

  return (
    <footer id="footer" className="relative overflow-hidden rounded-t-card bg-ink text-paper">
      <div className="relative z-10 mx-auto max-w-shell px-5 pb-10 pt-20 sm:px-8 lg:pt-24">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-paper/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,7vw,3.75rem)] font-semibold leading-[0.95] tracking-tightest">
            Have a project in mind? Let's get to work.
          </h2>
          <PillButton
            as="a"
            href={mailtoHref("Website enquiry")}
            variant="light"
            withArrow
            arrow="up-right"
            className="shrink-0"
          >
            Start a project
          </PillButton>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="text-xl text-accent-from" />
              {SITE.name}
            </p>
            <p className="mt-4 max-w-[20rem] text-sm leading-relaxed text-paper/55">
              One-page animated websites for Pacific businesses, from FJ$499. Designed and built in
              Fiji.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.05em] text-paper/40">Site</p>
            <ul>
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <AnimatedLink href={href}>{label}</AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.05em] text-paper/40">Contact</p>
            <ul>
              <li>
                <AnimatedLink href="#contact">Start a project</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href={mailtoHref("Website enquiry")}>Email us</AnimatedLink>
              </li>
              {SITE.phones.map((p) => (
                <li key={p}>
                  <AnimatedLink href={telHref(p)}>{p}</AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {socials.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.05em] text-paper/40">Social</p>
              <ul>
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <AnimatedLink href={url} external>
                      {name}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Designed and built in Fiji.</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-2 z-0 select-none text-center font-display text-[clamp(3.5rem,18vw,13rem)] font-bold leading-none text-paper/[0.05] sm:-bottom-6"
      >
        CREATIVE
      </p>
    </footer>
  );
}
