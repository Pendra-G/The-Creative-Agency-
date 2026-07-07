import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function HeroScene(){
  const ref = useRef(null);
  useEffect(()=>{
    const mount=ref.current; if(!mount) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(38, mount.clientWidth/mount.clientHeight, .1, 200);
    cam.position.set(0,0,18);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    mount.appendChild(renderer.domElement);
    const pmrem=new THREE.PMREMGenerator(renderer);
    scene.environment=pmrem.fromScene(new RoomEnvironment(renderer),.04).texture;
    scene.add(new THREE.AmbientLight(0xffffff,.35));
    const key=new THREE.DirectionalLight(0xffffff,1.3); key.position.set(5,6,6); scene.add(key);
    const fill=new THREE.DirectionalLight(0xb0c8ff,.5); fill.position.set(-6,0,4); scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,1.0); rim.position.set(0,4,-6); scene.add(rim);

    const chrome=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:.06,clearcoat:1,clearcoatRoughness:0,envMapIntensity:1.5});
    const accents=[0xff4d6d,0x4cc9f0,0xfdffb6,0xcaffbf,0xbdb2ff,0xffa552,0xffffff];
    const group=new THREE.Group(); scene.add(group);

    new FontLoader().load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",(font)=>{
      const geo1=new TextGeometry("Creative",{font,size:1.5,depth:.45,curveSegments:10,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:6});
      geo1.computeBoundingBox(); geo1.center();
      const m1=new THREE.Mesh(geo1,chrome); m1.position.set(0,1.3,0); group.add(m1);

      const geo2=new TextGeometry("Agency",{font,size:1.5,depth:.45,curveSegments:10,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:6});
      geo2.computeBoundingBox(); geo2.center();
      const m2=new THREE.Mesh(geo2,chrome); m2.position.set(0,-1.3,0); group.add(m2);
    });

    const drop=new THREE.SphereGeometry(1,20,20); const drops=[];
    for(let i=0;i<10;i++){
      const mat=new THREE.MeshPhysicalMaterial({color:accents[i%accents.length],metalness:.15,roughness:.2,clearcoat:.8,envMapIntensity:1.1});
      const m=new THREE.Mesh(drop,mat);
      const s=.05+Math.random()*.09;
      m.scale.set(s,s*.8,s); m.scale.x*=1.15;
      const base=new THREE.Vector3((Math.random()-.5)*11,(Math.random()-.5)*5,(Math.random()-.5)*1.4);
      m.position.copy(base); group.add(m); drops.push({m,base});
    }
    for(let i=0;i<5;i++){
      const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,12), chrome);
      const s=.02+Math.random()*.04; m.scale.setScalar(s);
      const base=new THREE.Vector3((Math.random()-.5)*12,(Math.random()-.5)*5.5,(Math.random()-.5)*1.4);
      m.position.copy(base); group.add(m); drops.push({m,base,chrome:true});
    }

    const target={x:0,y:0}, smooth={x:0,y:0};
    const mm=(e)=>{ const r=mount.getBoundingClientRect(); target.x=((e.clientX-r.left)/r.width)*2-1; target.y=-((e.clientY-r.top)/r.height)*2+1; };
    window.addEventListener("mousemove",mm,{passive:true});
    const onR=()=>{ cam.aspect=mount.clientWidth/mount.clientHeight; cam.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("resize",onR);
    const clock=new THREE.Clock(); let raf;
    const tick=()=>{ raf=requestAnimationFrame(tick); const t=clock.getElapsedTime();
      smooth.x+=(target.x-smooth.x)*.05; smooth.y+=(target.y-smooth.y)*.05;
      group.rotation.y=smooth.x*.10; group.rotation.x=smooth.y*.06;
      if(!reduced) drops.forEach((d,i)=>{ d.m.position.y=d.base.y+Math.sin(t*.8+i)*.08; d.m.position.x=d.base.x+Math.cos(t*.5+i)*.06; if(!d.chrome) d.m.rotation.z=Math.sin(t*.4+i)*.25; });
      renderer.render(scene,cam);
    };
    tick();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove",mm); window.removeEventListener("resize",onR); if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); };
  },[]);
  return <div ref={ref} className="absolute inset-0" aria-hidden="true"/>;
}