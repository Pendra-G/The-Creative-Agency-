import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Height of the fixed TopBar, so anchored sections don't land underneath it.
const NAV_OFFSET = -56;

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis;
    let tick;
    let onClick;

    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

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
        lenis.scrollTo(target, { offset: NAV_OFFSET });
        history.pushState(null, "", hash);
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
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
