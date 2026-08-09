import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SITE, PRIMARY_PHONE, telHref, viberHref } from "../config.js";
import { getLenis, startScroll, stopScroll } from "../lib/scroll.js";

const NAV = [
  ["Home", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

function useFijiClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
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
  }, []);
  return time;
}

export default function NavPanel({ open, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const time = useFijiClock();
  const socials = Object.entries(SITE.socials).filter(([, url]) => Boolean(url));

  const root = useRef(null);
  const backdrop = useRef(null);
  const panel = useRef(null);
  const tl = useRef(null);
  // React owns visibility, GSAP only owns movement. If the timeline ever fails
  // to run, the menu is still shown and usable rather than invisible.
  const [visible, setVisible] = useState(false);

  // One timeline built once and played/reversed. Driving open and close from
  // the same curve is what keeps them feeling like the same movement, rather
  // than two CSS transitions racing each other.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = root.current.querySelectorAll(".np-item");
      const metas = root.current.querySelectorAll(".np-meta");

      tl.current = gsap
        .timeline({ paused: true, onReverseComplete: () => setVisible(false) })
        .fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0)
        .fromTo(
          panel.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.8, ease: "power4.out" },
          0
        )
        .fromTo(
          items,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.07 },
          0.16
        )
        .fromTo(
          metas,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 },
          0.34
        );
    }, root);

    return () => {
      ctx.revert();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    const t = tl.current;
    let hideTimer = null;

    if (open) {
      setVisible(true);
      stopScroll();
      t?.timeScale(1).play();
    } else {
      startScroll();
      if (t) {
        // Close a little faster than it opens; a slow exit reads as lag.
        t.timeScale(1.5).reverse();
        // onReverseComplete hides the panel — but rAF is paused in background
        // tabs, so without this the menu could stay stuck open.
        hideTimer = setTimeout(() => setVisible(false), 900);
      } else {
        setVisible(false);
      }
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close first, then move — Lenis is stopped while the panel is open.
  const go = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      if (pathname === href) {
        getLenis()?.scrollTo(0);
        return;
      }
      navigate(href);
    }, 260);
  };

  return (
    <div
      ref={root}
      className={`fixed inset-0 z-[115] ${visible ? "visible" : "invisible pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={visible ? undefined : "true"}
    >
      <button
        ref={backdrop}
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
        data-cursor
      />

      <div
        ref={panel}
        className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-line bg-ink lg:w-[42vw] lg:min-w-[32rem]"
      >
        <div className="flex items-start justify-between px-6 pt-6 sm:px-10">
          <p className="np-meta micro text-white/45">Menu</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            data-cursor
            className="-m-3 p-3 text-white transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col justify-center px-6 sm:px-10">
          <ul>
            {NAV.map(([label, href]) => (
              <li key={href} className="overflow-hidden py-1">
                <a
                  href={href}
                  onClick={(e) => go(e, href)}
                  data-cursor
                  aria-current={pathname === href ? "page" : undefined}
                  className={`np-item block font-display text-[clamp(2.6rem,9vw,4.5rem)] font-semibold leading-[1.1] tracking-tighter transition-colors ${
                    pathname === href ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-6 py-8 sm:px-10">
          <p className="np-meta micro text-white/45">Call or message</p>

          <a
            href={telHref()}
            data-cursor
            className="np-meta mt-3 inline-flex items-baseline gap-3 font-display text-[clamp(1.5rem,5vw,2.4rem)] font-semibold tracking-tighter text-white transition-colors hover:text-accent"
          >
            {PRIMARY_PHONE}
          </a>

          <div className="np-meta mt-5 flex flex-wrap gap-3">
            <a
              href={telHref()}
              data-cursor
              className="inline-flex min-h-[48px] items-center rounded-pill bg-white px-6 micro text-ink transition-colors hover:bg-accent"
            >
              Call now
            </a>
            <a
              href={viberHref()}
              data-cursor
              className="inline-flex min-h-[48px] items-center rounded-pill border border-white/30 px-6 micro text-white transition-colors hover:bg-accent hover:text-ink"
            >
              Viber
            </a>
          </div>

          <p className="np-meta mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 micro text-white/50">
            <span>{SITE.location}</span>
            <span className="tabular-nums text-white/75">{time}</span>
          </p>

          {socials.length > 0 && (
            <ul className="np-meta mt-5 flex flex-wrap gap-3">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="inline-flex min-h-[44px] items-center micro text-white/50 transition-colors hover:text-white"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
