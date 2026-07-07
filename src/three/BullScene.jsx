import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function BullScene(){
  const ref=useRef(null);
  useEffect(()=>{
    const mount=ref.current; if(!mount) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(35, mount.clientWidth/mount.clientHeight, .1, 100);
    cam.position.set(0,0,7);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.2;
    mount.appendChild(renderer.domElement);
    const pmrem=new THREE.PMREMGenerator(renderer);
    scene.environment=pmrem.fromScene(new RoomEnvironment(renderer),.04).texture;
    scene.add(new THREE.AmbientLight(0xffffff,.3));
    const key=new THREE.DirectionalLight(0xffffff,1.5); key.position.set(3,3,3); scene.add(key);
    const fill=new THREE.DirectionalLight(0x6fa8ff,.6); fill.position.set(-3,0,2); scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,1.2); rim.position.set(0,2,-4); scene.add(rim);
    const mat=new THREE.MeshPhysicalMaterial({color:0x0a1a3a, metalness:.55, roughness:.12, clearcoat:1, clearcoatRoughness:.04, envMapIntensity:1.3});
    const group=new THREE.Group();
    const body=new THREE.Mesh(new THREE.SphereGeometry(1.1,128,128), mat); body.scale.set(1.6,.95,1.1); group.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.7,96,96), mat); head.position.set(1.4,.15,0); head.scale.set(1.1,.95,.95); group.add(head);
    const horn1=new THREE.Mesh(new THREE.ConeGeometry(.12,.55,24), mat); horn1.position.set(1.55,.7,.25); horn1.rotation.z=-.4;
    const horn2=horn1.clone(); horn2.position.z=-.25; group.add(horn1, horn2);
    const leg1=new THREE.Mesh(new THREE.CylinderGeometry(.18,1,1.4,16), mat); leg1.position.set(.7,-1, .45); leg1.rotation.z=.1;
    const leg2=leg1.clone(); leg2.position.z=-.45;
    const leg3=leg1.clone(); leg3.position.set(-.7,-1, .45);
    const leg4=leg3.clone(); leg4.position.z=-.45;
    group.add(leg1,leg2,leg3,leg4);
    const tail=new THREE.Mesh(new THREE.CylinderGeometry(.05,.1,1,12), mat); tail.position.set(-1.6,.2,0); tail.rotation.z=.6;
    group.add(tail); scene.add(group);
    const target={x:0,y:0}, smooth={x:0,y:0};
    const mm=(e)=>{ const r=mount.getBoundingClientRect(); target.x=((e.clientX-r.left)/r.width)*2-1; target.y=-((e.clientY-r.top)/r.height)*2+1; };
    window.addEventListener("mousemove",mm,{passive:true});
    const onR=()=>{ cam.aspect=mount.clientWidth/mount.clientHeight; cam.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("resize",onR);
    const clock=new THREE.Clock(); let raf;
    const tick=()=>{ raf=requestAnimationFrame(tick); const t=clock.getElapsedTime();
      smooth.x+=(target.x-smooth.x)*.05; smooth.y+=(target.y-smooth.y)*.05;
      group.rotation.y=smooth.x*.15; group.rotation.x=smooth.y*.08;
      if(!reduced){ group.position.y=Math.sin(t*.55)*.12; group.rotation.z=Math.sin(t*.4)*.02; }
      renderer.render(scene,cam);
    };
    tick();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove",mm); window.removeEventListener("resize",onR); if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); mat.dispose(); };
  },[]);
  return <div ref={ref} className="absolute inset-0" aria-hidden="true"/>;
}