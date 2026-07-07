import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function EarthScene(){
  const ref=useRef(null);
  useEffect(()=>{
    const mount=ref.current; if(!mount) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(35, mount.clientWidth/mount.clientHeight, .1, 100);
    cam.position.set(0,0,5);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    mount.appendChild(renderer.domElement);
    const pmrem=new THREE.PMREMGenerator(renderer);
    scene.environment=pmrem.fromScene(new RoomEnvironment(renderer),.04).texture;
    scene.add(new THREE.AmbientLight(0xffffff,.45));
    const sun=new THREE.DirectionalLight(0xffffff,1.6); sun.position.set(5,3,4); scene.add(sun);
    const rim=new THREE.DirectionalLight(0x6fa8ff,.6); rim.position.set(-4,-1,2); scene.add(rim);
    const earth = new THREE.MeshPhysicalMaterial({color:0x1a4a8a,metalness:0.15,roughness:0.55,clearcoat:0.6,clearcoatRoughness:0.25,envMapIntensity:1.2});
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6,128,128), earth);
    scene.add(sphere);
    const landMat = new THREE.MeshStandardMaterial({color:0x2f8f4a,roughness:0.7,metalness:0});
    for (let i=0;i<18;i++){
      const patch = new THREE.Mesh(new THREE.SphereGeometry(1,18,18), landMat);
      const phi=Math.acos(2*Math.random()-1), theta=2*Math.PI*Math.random();
      patch.position.setFromSphericalCoords(1.605, phi, theta);
      patch.scale.set(0.3+Math.random()*0.45, 0.18+Math.random()*0.18, 0.3+Math.random()*0.45);
      sphere.add(patch);
    }
    const glow = new THREE.Mesh(new THREE.SphereGeometry(1.78,64,64), new THREE.MeshBasicMaterial({color:0x6fa8ff,transparent:true,opacity:0.12,side:THREE.BackSide}));
    scene.add(glow);
    const target={x:0,y:0}, smooth={x:0,y:0};
    const mm=(e)=>{ const r=mount.getBoundingClientRect(); target.x=((e.clientX-r.left)/r.width)*2-1; target.y=-((e.clientY-r.top)/r.height)*2+1; };
    window.addEventListener("mousemove",mm,{passive:true});
    const onR=()=>{ cam.aspect=mount.clientWidth/mount.clientHeight; cam.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("resize",onR);
    const clock=new THREE.Clock(); let raf;
    const tick=()=>{ raf=requestAnimationFrame(tick); const t=clock.getElapsedTime();
      smooth.x+=(target.x-smooth.x)*.05; smooth.y+=(target.y-smooth.y)*.05;
      if(!reduced) sphere.rotation.y = t*0.18;
      scene.rotation.y = smooth.x*0.15; scene.rotation.x = smooth.y*0.08;
      renderer.render(scene,cam);
    };
    tick();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove",mm); window.removeEventListener("resize",onR); if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); };
  },[]);
  return <div ref={ref} className="absolute inset-0" aria-hidden="true"/>;
}