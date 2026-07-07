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
    <section id="services" ref={ref} className="bg-ink text-bone py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <h2 className="svc-title font-display font-bold uppercase leading-[0.85] tracking-tightest text-[clamp(4.5rem,18vw,18rem)]">Services</h2>
        <div className="svc-rows mt-12 border-t border-bone/15">
          {ITEMS.map((s,i)=>(
            <div key={i} className={`svc-row group flex flex-col gap-3 py-8 sm:py-12 border-b border-bone/15 ${s.side==="left" ? "items-start" : "items-end text-right"}`}>
              <div className="flex items-center gap-4">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-bone/80 group-hover:bg-bone transition-colors"/>
                <h3 className="font-display font-bold uppercase text-3xl sm:text-5xl md:text-7xl tracking-tightest">{s.label}</h3>
              </div>
              <p className="max-w-xl text-bone/70 text-base sm:text-lg leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}