import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "../lib/scroll.js";
gsap.registerPlugin(ScrollTrigger);

// Anchored sections must not land underneath the fixed TopBar. Measure it at
// click time rather than hardcoding — the bar's height changes with breakpoint.
const navOffset = () => -((document.querySelector("header")?.offsetHeight ?? 56) + 12);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis;
    let tick;
    let onClick;

    // Mobile browsers resize the viewport when their chrome hides on scroll.
    // Without this, ScrollTrigger recalculates mid-scroll and everything jumps.
    ScrollTrigger.config({ ignoreMobileResize: true });

    try {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Damps trackpad/wheel spikes so scrubbed timelines glide instead of
        // stepping frame to frame.
        wheelMultiplier: 0.9,
        touchMultiplier: 1.6,
      });

      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Lenis owns the scroll position, so a native hash jump moves nothing.
      // Same-page anchors have to be routed through lenis.scrollTo or every
      // nav link, CTA and footer link on the site silently does nothing.
      onClick = (e) => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        const link = e.target.closest?.('a[href^="#"]');
        if (!link) return;

        const hash = link.getAttribute("href");
        if (hash === "#") {
          e.preventDefault();
          lenis.scrollTo(0);
          return;
        }

        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: navOffset() });
        history.pushState(null, "", hash);
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        setLenis(null);
        lenis.destroy();
      };
    } catch (err) {
      // Lenis failed to initialise (possible version/API mismatch).
      // Fall back to native scrolling — anchors work natively in that case.
      // eslint-disable-next-line no-console
      console.warn("Lenis init failed, falling back to native scroll:", err);
      if (tick) gsap.ticker.remove(tick);
      return undefined;
    }
  }, []);

  return <>{children}</>;
}
