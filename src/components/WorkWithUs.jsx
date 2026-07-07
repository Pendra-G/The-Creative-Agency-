import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic.jsx";
import GlobeImg from "../assets/3D Globe.png";
gsap.registerPlugin(ScrollTrigger);

export default function WorkWithUs(){
  const [email, setEmail] = useState("");
  const ref=useRef(null);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx=gsap.context(()=>{
      gsap.from(".wwu-text",{y:80,opacity:0,stagger:.08,duration:1,ease:"power3.out",scrollTrigger:{trigger:ref.current,start:"top 75%"}});
    },ref);
    return ()=>ctx.revert();
  },[]);
  return (
    <section ref={ref} className="relative bg-ink text-bone py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <h2 className="wwu-text font-display font-bold uppercase leading-[0.9] tracking-tightest text-[clamp(3rem,12vw,11rem)]">Work With Us</h2>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1 flex items-center justify-center">
            <div className="w-full max-w-[28rem] px-6 py-6">
              <img
                src={GlobeImg}
                alt="3D globe"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:pl-12">
            <h3 className="wwu-text font-display font-medium text-3xl sm:text-5xl tracking-tightest leading-[0.95] mb-6">Let's build something memorable.</h3>
            <p className="wwu-text text-bone/75 text-base sm:text-lg leading-relaxed max-w-md">Supercharge your brand with Creative Agency. We work with companies at all stages to develop original content that delivers.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                window.location.href = `mailto:hello@creative.agency?subject=Contact%20Request&body=${encodeURIComponent(email)}`;
              }}
              className="mt-8 max-w-md"
            >
              <label htmlFor="workwithus-email" className="sr-only">Email</label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  id="workwithus-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full min-w-0 h-12 rounded-full border border-white/30 bg-transparent px-4 text-sm text-bone placeholder:text-bone/50 outline-none transition focus:border-white focus:ring-2 focus:ring-white/15"
                />
                <Magnetic
                  as="button"
                  type="submit"
                  className="link-btn outline whitespace-nowrap"
                  data-cursor
                >
                  Contact Us <span>→</span>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}