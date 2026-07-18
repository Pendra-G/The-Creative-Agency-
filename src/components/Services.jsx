import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { label:"Website Development", side:"left",
    body:"Strategy, design, build, and ship. Editorial, fast, and accessible on every network — from Suva to the outer islands." },
  { label:"Digital Marketing", side:"right",
    body:"Performance, social, and content campaigns that turn attention into outcomes for ambitious Pacific brands." },
];

export default function Services(){
  const ref=useRef(null);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx=gsap.context(()=>{
      gsap.from(".svc-title",{y:100,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:ref.current,start:"top 80%"}});
      gsap.from(".svc-row",{y:60,opacity:0,stagger:.1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:".svc-rows",start:"top 80%"}});
    },ref);
    return ()=>ctx.revert();
  },[]);
  return (
    <section id="services" ref={ref} className="bg-white text-ink py-12 xs:py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <h2 className="svc-title font-display font-bold uppercase leading-[0.85] tracking-tightest text-[clamp(2rem,8vw,18rem)]">Services</h2>
        <div className="svc-rows mt-8 xs:mt-10 sm:mt-12 border-t border-black/10">
          {ITEMS.map((s,i)=>(
            <div key={i} className={`svc-row group flex flex-col gap-3 py-6 xs:py-8 sm:py-12 border-b border-black/10 items-start text-left`}>
              <div className="flex items-center gap-3 xs:gap-4">
                <span className="inline-block w-2 xs:w-2.5 h-2 xs:h-2.5 rounded-full bg-black/80 group-hover:bg-black transition-colors flex-shrink-0"/>
                <h3 className="font-display font-bold uppercase text-lg xs:text-2xl sm:text-5xl md:text-7xl tracking-tightest">{s.label}</h3>
              </div>
              <p className="max-w-xl text-ink/70 text-xs xs:text-sm sm:text-lg leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}