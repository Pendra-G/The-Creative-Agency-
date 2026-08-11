import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Button } from "./ui.jsx";
import { SITE, PRIMARY_PHONE, telHref, viberHref, mailtoHref } from "../config.js";
import { getLenis, startScroll, stopScroll } from "../lib/scroll.js";

const NAV = [
  ["Home", "/"],
  ["Work", "/#work"],
  ["Process", "/#process"],
  ["Packages", "/#pricing"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

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

  const root = useRef(null);
  const backdrop = useRef(null);
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const tl = useRef(null);
  // Whatever had focus before the panel opened, so it can be handed back.
  const restoreTo = useRef(null);
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
        .fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: "power4.out" }, 0)
        .fromTo(items, { yPercent: 115 }, { yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.06 }, 0.16)
        .fromTo(metas, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 }, 0.34);
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
      restoreTo.current = document.activeElement;
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
      // Hand focus back to whatever opened the panel.
      restoreTo.current?.focus?.();
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [open]);

  /*
   * Move focus into the panel once it is actually painted.
   *
   * This waits on `visible`, not just `open`: while the panel still carries
   * the `invisible` class it is visibility:hidden, and .focus() on anything
   * inside a hidden container is silently ignored. The rAF gives the class
   * change a frame to land before focus is attempted.
   */
  useEffect(() => {
    if (!open || !visible) return;
    const id = requestAnimationFrame(() => closeBtn.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, visible]);

  /* Escape closes; Tab stays inside the dialog while it is open. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = panel.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

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
        className="absolute inset-0 h-full w-full cursor-default bg-canvas/70 backdrop-blur-sm"
      />

      <div
        ref={panel}
        className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-hairline bg-canvas lg:w-[42vw] lg:min-w-[32rem]"
      >
        <div className="flex h-16 items-center justify-end px-6 sm:px-10">
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-m-3 rounded-full p-3 text-white transition-colors duration-200 hover:text-accent-text"
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
                  aria-current={pathname === href ? "page" : undefined}
                  className={`np-item display block py-2 text-display-md transition-colors duration-200 ${
                    pathname === href ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-hairline px-6 py-8 sm:px-10">
          <a
            href={telHref()}
            className="np-meta numeric inline-flex min-h-[44px] items-center text-title-lg text-white transition-colors duration-200 hover:text-accent-text"
          >
            {PRIMARY_PHONE}
          </a>
          <a
            href={mailtoHref()}
            className="np-meta flex min-h-[44px] w-fit items-center break-all text-body-md text-body transition-colors duration-200 hover:text-white"
          >
            {SITE.email}
          </a>

          <div className="np-meta mt-6 flex flex-wrap gap-3">
            <Button as="a" href={telHref()} variant="primary">
              Call now
            </Button>
            <Button as="a" href={viberHref()} variant="secondary">
              Viber
            </Button>
          </div>

          <p className="np-meta mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-muted">
            <span>{SITE.location}</span>
            <span className="numeric text-white/70">{time}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
