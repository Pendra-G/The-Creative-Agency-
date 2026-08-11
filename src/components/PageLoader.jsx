import { useEffect, useRef, useState } from "react";
import { startScroll, stopScroll } from "../lib/scroll.js";

const FILL_MS = 1100;
const EXIT_MS = 700;

// t<.5 ? 4t³ : 1-((-2t+2)³)/2
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    stopScroll();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = null;
    let exitTimer = null;
    let failsafe = null;
    let startedAt = null;
    let leaving = false;

    const finish = () => {
      setGone(true);
      startScroll();
      doneRef.current?.();
    };

    const leave = () => {
      if (leaving) return;
      leaving = true;
      if (raf) cancelAnimationFrame(raf);
      if (failsafe) clearTimeout(failsafe);
      setProgress(100);
      setExiting(true);
      exitTimer = setTimeout(finish, reduced ? 60 : EXIT_MS);
    };

    if (reduced) {
      leave();
    } else {
      const step = (now) => {
        if (startedAt === null) startedAt = now;
        const t = Math.min((now - startedAt) / FILL_MS, 1);
        setProgress(Math.round(easeInOutCubic(t) * 100));
        if (t < 1) raf = requestAnimationFrame(step);
        else leave();
      };
      raf = requestAnimationFrame(step);

      // rAF is paused in background tabs and throttled in some embedded views.
      // Without this the loader could stall with the page still scroll-locked.
      failsafe = setTimeout(leave, FILL_MS + 2000);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (exitTimer) clearTimeout(exitTimer);
      if (failsafe) clearTimeout(failsafe);
      startScroll();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-12 bg-canvas text-white"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0%)",
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <p
        className="display px-6 text-center text-display-lg text-white"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? "translateY(-12px)" : "translateY(0)",
          transition: "opacity 400ms ease-out, transform 400ms ease-out",
        }}
      >
        Website Portfolio
      </p>

      <div className="flex w-[min(20rem,68vw)] flex-col gap-3">
        <div className="h-px w-full bg-hairline">
          {/* scaleX rather than width: this updates every frame while loading,
              and transforms stay off the layout path. */}
          <div
            className="h-full w-full origin-left bg-accent-text"
            style={{
              transform: `scaleX(${progress / 100})`,
              transition: "transform .1s ease-out",
            }}
          />
        </div>
        <div className="flex items-center justify-between text-caption text-muted">
          <span>Loading</span>
          <span className="numeric text-white">{String(progress).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
