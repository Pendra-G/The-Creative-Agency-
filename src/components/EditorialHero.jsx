import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { split } from "../utils/anim.js";
import BullScene from "../three/BullScene.jsx";
import framerglass from "../assets/framerglass.png";
import escGlass from "../assets/esc button glass.png";
import pointerGlass from "../assets/pointer glass.png";
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
    <section ref={sectionRef} className="relative bg-black text-white py-12 xs:py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <h1 ref={h1} className="font-display font-bold uppercase leading-[0.9] tracking-tightest text-white text-[clamp(1.75rem,7vw,8rem)]">
          Digital Fijian Artists. 
        </h1>
        <div className="mt-8 xs:mt-10 sm:mt-10 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 items-start">
          <div className="max-w-full lg:max-w-md">
            <p ref={pRef} className="text-white/80 text-sm xs:text-base sm:text-lg leading-relaxed mb-6">We partner with the most ambitious brands on the planet to develop original content that their audiences know and love.</p>
            <img src={pointerGlass} alt="Pointer glass" loading="lazy"
              className="w-16 xs:w-20 sm:w-24 lg:w-40 will-change-transform float-fast" />
          </div>
          <div className="relative h-[240px] xs:h-[280px] sm:h-[360px] lg:h-[640px] -mt-0 lg:-mt-32">
            {/* Floating images placed around the hero — replace video with framerglass */}
            <img src={framerglass} alt="Framer glass" loading="lazy"
              className="absolute right-0 xs:right-3 sm:right-6 top-1/4 w-28 xs:w-32 sm:w-56 lg:w-72 will-change-transform float-slow" />

            {/*<img src={escGlass} alt="Esc key glass" loading="lazy"
              className="absolute left-6 top-6 w-16 sm:w-20 lg:w-24 will-change-transform float" />*/}

            
          </div>
        </div>
      </div>
    </section>
  );
}
