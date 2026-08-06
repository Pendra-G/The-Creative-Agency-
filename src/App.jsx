import { useEffect, useState } from "react";
import Cursor from "./components/Cursor.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Offer from "./components/Offer.jsx";
import Process from "./components/Process.jsx";
import Packages from "./components/Packages.jsx";
import Services from "./components/Services.jsx";
import FeaturedWork from "./components/FeaturedWork.jsx";
import WorkWithUs from "./components/WorkWithUs.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <SmoothScroll>
      <Cursor />
      <TopBar />
      <main className={`app ${ready ? "ready" : ""}`}>
        {/* What → why → how → how much → what else → proof → contact */}
        <Hero />
        <Marquee />
        <Offer />
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
