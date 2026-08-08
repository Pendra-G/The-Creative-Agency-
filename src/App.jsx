import { useState } from "react";
import Cursor from "./components/Cursor.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import PageLoader from "./components/PageLoader.jsx";
import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import { WordRule, Marquee } from "./components/Strips.jsx";
import Pillars from "./components/Pillars.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Process from "./components/Process.jsx";
import Pricing from "./components/Pricing.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Cursor />
      <PageLoader onDone={() => setReady(true)} />
      <TopBar ready={ready} />
      <main id="main" className={`app ${ready ? "ready" : ""}`}>
        {/* What is it → what do I get → can they do it → who are they →
            how does it work → what's it cost → what about… → how do I start */}
        <Hero ready={ready} />
        <WordRule words={["One page", "Fully animated", "Live in two weeks", "Built in Fiji"]} />
        <Pillars />
        <Work />
        <div className="border-y border-line py-4">
          <Marquee text="Available for work" duration={34} direction="right" />
        </div>
        <About />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
