import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./components/SmoothScroll.jsx";
import PageLoader from "./components/PageLoader.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import { ScrollProgress } from "./components/Reveal.jsx";
import Home from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { getLenis } from "./lib/scroll.js";

/**
 * On navigation: jump to the top, then let ScrollTrigger re-measure. Without
 * the refresh, triggers created on the previous route keep their old
 * positions and every reveal on the new page fires at the wrong moment.
 */
function RouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(target, { offset: -80, immediate: true });
          else target.scrollIntoView();
        });
      }
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <PageLoader onDone={() => setReady(true)} />
      <ScrollProgress />
      <TopBar ready={ready} />
      <RouteChange />
      <main id="main" className={`app ${ready ? "ready" : ""}`}>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
