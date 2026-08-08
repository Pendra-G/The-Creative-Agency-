import { useEffect, useState } from "react";
import { SITE } from "../config.js";
import { getLenis, startScroll, stopScroll } from "../lib/scroll.js";

const EXIT_MS = 420;

const NAV = [
  ["Home", "#home", null],
  ["What you get", "#what", null],
  ["Work", "#work", 2],
  ["How it works", "#process", null],
  ["Pricing", "#pricing", null],
  ["Contact", "#contact", null],
];

function useFijiClock(active) {
  const [time, setTime] = useState("");
  useEffect(() => {
    if (!active) return;
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Pacific/Fiji",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active]);
  return time;
}

export default function NavPanel({ open, onClose }) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const time = useFijiClock(mounted);
  const socials = Object.entries(SITE.socials).filter(([, url]) => Boolean(url));

  useEffect(() => {
    if (open) {
      setMounted(true);
      stopScroll();
      // next frame, so the panel transitions in rather than appearing open
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), EXIT_MS);
    startScroll();
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close first, then scroll — Lenis is stopped while the panel is open, so
  // letting the global anchor handler fire immediately would go nowhere.
  const go = (e, href) => {
    e.preventDefault();
    onClose();
    const target = document.querySelector(href);
    if (!target) return;
    setTimeout(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: "smooth" });
    }, EXIT_MS - 60);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[115]" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Click-off area, only visible where the panel doesn't cover */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: shown ? 1 : 0 }}
        data-cursor
      />

      <div
        className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-line bg-ink lg:w-[46vw] lg:min-w-[34rem]"
        style={{
          transform: shown ? "translateX(0)" : "translateX(100%)",
          transition: `transform ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Menu */}
          <div className="border-b border-line px-6 pb-10 pt-6 sm:px-10">
            <div className="flex items-start justify-between">
              <p className="micro text-cream/45">Menu</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                data-cursor
                className="-m-3 p-3 text-cream transition-colors hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
                  <path d="M5 5l14 14M19 5 5 19" />
                </svg>
              </button>
            </div>

            <nav aria-label="Primary" className="mt-6">
              <ul>
                {NAV.map(([label, href, count], i) => (
                  <li
                    key={href}
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "translateY(0)" : "translateY(14px)",
                      transition: `opacity 460ms ease-out ${80 + i * 45}ms, transform 460ms ease-out ${
                        80 + i * 45
                      }ms`,
                    }}
                  >
                    <a
                      href={href}
                      onClick={(e) => go(e, href)}
                      data-cursor
                      className="flex items-baseline gap-2 py-1 font-display text-[clamp(1.9rem,5.5vw,2.6rem)] font-medium leading-[1.25] tracking-tighter text-cream/85 transition-colors hover:text-cream"
                    >
                      {label}
                      {count != null && <span className="text-cream/35">[{count}]</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Let's talk */}
          <div className="border-b border-line px-6 py-10 sm:px-10">
            <p className="micro text-cream/45">Let's talk</p>
            <a
              href={`mailto:${SITE.email}`}
              data-cursor
              className="mt-3 inline-flex items-baseline gap-2 border-b border-cream/25 pb-2 font-display text-[clamp(1.2rem,4vw,1.9rem)] font-medium tracking-tighter text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {SITE.email}
              <span aria-hidden="true" className="text-cream/45">+</span>
            </a>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 micro text-cream/55">
              <span>{SITE.location}</span>
              <span className="tabular-nums text-cream/80">{time}</span>
            </p>
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="px-6 py-10 sm:px-10">
              <p className="micro text-cream/45">Socials</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="inline-flex min-h-[44px] items-center rounded-pill border border-cream/20 px-4 micro text-cream/70 transition-colors hover:bg-cream hover:text-ink"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-line px-6 py-5 sm:px-10">
          <p className="micro text-cream/40">
            © {new Date().getFullYear()} {SITE.name} · Built in Fiji
          </p>
        </div>
      </div>
    </div>
  );
}
