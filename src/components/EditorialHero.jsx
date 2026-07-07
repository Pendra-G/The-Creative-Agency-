import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { split } from "../utils/anim.js";
import BullScene from "../three/BullScene.jsx";
gsap.registerPlugin(ScrollTrigger);

export default function EditorialHero(){
  const sectionRef = useRef(null);
  const h1 = useRef(null);
  const pRef = useRef(null);

  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const chars = split(h1.current);
      gsap.set(chars,{yPercent:100,opacity:0});
      gsap.to(chars,{yPercent:0,opacity:1,stagger:.018,duration:1,ease:"power3.out",
        scrollTrigger:{trigger:h1.current,start:"top 85%",toggleActions:"play none none none",once:true}});

      gsap.from(pRef.current,{opacity:0,y:30,duration:1,delay:0.15,ease:"power3.out",
        scrollTrigger:{trigger:pRef.current,start:"top 85%",toggleActions:"play none none none",once:true}});
    }, sectionRef);

    return () => ctx.revert();
  },[]);

  return (
    <section ref={sectionRef} className="relative bg-ink text-bone py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <h1 ref={h1} className="font-display font-bold uppercase leading-[0.9] tracking-tightest text-bone text-[clamp(2.6rem,9vw,8rem)]">
          Fijian Creative Agency. 
        </h1>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-md">
            <p ref={pRef} className="text-bone/80 text-base sm:text-lg leading-relaxed">We partner with the most ambitious brands on the planet to develop original content that their audiences know and love.</p>
          </div>
          <div className="relative h-[420px] sm:h-[520px] lg:h-[640px] -mt-2 lg:-mt-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <video className="w-full h-full object-contain" src="/admilk-milkball.webm" autoPlay muted loop playsInline aria-hidden="true" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
