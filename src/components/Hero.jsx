import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { split } from "../utils/anim.js";
import HeroVideo from "../assets/Developer_coding_creative_agency…_202607071835.mp4";
gsap.registerPlugin(ScrollTrigger);

export default function Hero(){
  const [email, setEmail] = useState("");
  const h1 = useRef(null);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars=split(h1.current);
    gsap.set(chars,{yPercent:100,opacity:0});
    gsap.to(chars,{yPercent:0,opacity:1,stagger:.018,duration:1,ease:"power3.out",
      scrollTrigger:{trigger:h1.current,start:"top 85%"}});
  },[]);

  return (
    <section className="relative w-full min-h-screen bg-carbon text-bone overflow-hidden pt-[44px]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <video
            className="relative h-[50vh] sm:h-[70vh] max-h-[90vh] w-full max-w-[1200px] object-cover opacity-10"
            src={HeroVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-carbon"/>

        <div className="relative z-10 mx-auto max-w-[1500px] min-h-[calc(100vh-44px)] px-4 xs:px-5 sm:px-8 flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
          <div className="w-full max-w-full">
            <h1
              ref={h1}
              className="font-display font-bold uppercase leading-[0.85] tracking-tightest text-bone text-center text-[clamp(2.5rem,8vw,9rem)]"
              style={{ wordSpacing: '0.0001em' }}
            >
              <span className="block">The Creative Agency.</span>
            </h1>
          </div>
          <p className="max-w-[38ch] text-xs sm:text-base text-bone/80 leading-relaxed px-2">
            Building & Designing digital experiences for the modern brands.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = "#contact"; }} className="flex w-full max-w-[36rem] flex-col items-center gap-3">
            <label htmlFor="hero-email" className="sr-only">Email</label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="w-full max-w-xs sm:max-w-full min-w-0 h-12 rounded-full border border-white/50 bg-transparent px-4 text-sm text-bone placeholder:text-bone/50 outline-none transition focus:border-white focus:ring-2 focus:ring-white/15"
            />
            <button
              type="submit"
              className="inline-flex h-12 min-w-[140px] w-full sm:w-auto items-center justify-center rounded-full bg-white px-6 text-[0.65rem] leading-none font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-slate-100 whitespace-nowrap"
            >
              Contact Us
            </button>
          </form>
        </div>
      
    </section>
  );
}
