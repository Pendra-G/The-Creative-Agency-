import { useEffect, useState } from "react";
import Cursor from "./components/Cursor.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import PageLoader from "./components/PageLoader.jsx";
import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Offer from "./components/Offer.jsx";
import Showcase from "./components/Showcase.jsx";
import Process from "./components/Process.jsx";
import Packages from "./components/Packages.jsx";
import Services from "./components/Services.jsx";
import FeaturedWork from "./components/FeaturedWork.jsx";
import WorkWithUs from "./components/WorkWithUs.jsx";
import Footer from "./components/Footer.jsx";

// The layout scales past the design's 1920px base so it keeps growing on large
// displays. Below 1920 the media queries / clamp() sizing already handle it, so
// this only ever scales up — it never shrinks anything that already works.
function useAdaptiveGrid() {
  useEffect(() => {
    const FONT_BASE = 16;
    const baseWidth = 1920;
    const coef = 0.6666;
    const apply = () => {
      const widthReduction = ((baseWidth - window.innerWidth) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = `${size}px`;
      else document.documentElement.style.removeProperty("font-size");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
}

export default function App() {
  const [ready, setReady] = useState(false);
  useAdaptiveGrid();

  return (
    <SmoothScroll>
      <Cursor />
      <PageLoader onDone={() => setReady(true)} />
      <TopBar ready={ready} />
      <main id="main" className={`app ${ready ? "ready" : ""}`}>
        {/* What → proof it's real → how → how much → what else → clients → contact */}
        <Hero ready={ready} />
        <Marquee />
        <Offer />
        <Showcase />
        <Process />
        <Packages />
        <Services />
        <FeaturedWork />
        <WorkWithUs />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
