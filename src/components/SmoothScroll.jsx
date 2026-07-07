import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function SmoothScroll({children}){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try{
      const lenis=new Lenis({duration:1.15, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true});
      if(lenis && typeof lenis.on === 'function') lenis.on("scroll",ScrollTrigger.update);
      if(lenis && typeof lenis.raf === 'function') gsap.ticker.add(t=>lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
      return ()=>{ if(lenis && typeof lenis.destroy === 'function') lenis.destroy(); };
    }catch(err){
      // Lenis failed to initialize (possible version/API mismatch). Fall back to native scrolling.
      // eslint-disable-next-line no-console
      console.warn('Lenis init failed, falling back to native scroll:', err);
      return undefined;
    }
  },[]);
  return <>{children}</>;
}