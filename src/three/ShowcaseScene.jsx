import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Each builder returns the objects it created so they can be disposed, plus an
// update(elapsed) hook. Geometry counts are kept deliberately low — these run
// three-up on a phone, so headroom matters more than polygon count.

function buildIridescent() {
  const group = new THREE.Group();
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x9fb4ff,
    metalness: 0.9,
    roughness: 0.08,
    iridescence: 1,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [100, 800],
    envMapIntensity: 1.6,
  });
  const geometry = new THREE.TorusKnotGeometry(1.15, 0.38, 180, 32);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  return {
    group,
    geometries: [geometry],
    materials: [material],
    update: (t) => {
      mesh.rotation.x = t * 0.22;
      mesh.rotation.y = t * 0.3;
    },
  };
}

function buildField() {
  const group = new THREE.Group();
  const COLS = 22;
  const ROWS = 22;
  const count = COLS * ROWS;

  const geometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf4f1ea,
    metalness: 0.65,
    roughness: 0.25,
    envMapIntensity: 1.2,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const dummy = new THREE.Object3D();
  group.add(mesh);
  group.rotation.x = -0.62;

  return {
    group,
    geometries: [geometry],
    materials: [material],
    update: (t) => {
      let i = 0;
      for (let x = 0; x < COLS; x++) {
        for (let z = 0; z < ROWS; z++) {
          const px = (x - COLS / 2) * 0.24;
          const pz = (z - ROWS / 2) * 0.24;
          const d = Math.sqrt(px * px + pz * pz);
          dummy.position.set(px, Math.sin(d * 1.6 - t * 1.5) * 0.32, pz);
          const s = 0.7 + Math.cos(d * 1.6 - t * 1.5) * 0.35;
          dummy.scale.setScalar(Math.max(0.25, s));
          dummy.updateMatrix();
          mesh.setMatrixAt(i++, dummy.matrix);
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

function buildOrbit() {
  const group = new THREE.Group();
  const geometries = [];
  const materials = [];

  const globeGeo = new THREE.IcosahedronGeometry(1.25, 4);
  const globeMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a1a3a,
    metalness: 0.4,
    roughness: 0.32,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.4,
    flatShading: true,
  });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  group.add(globe);
  geometries.push(globeGeo);
  materials.push(globeMat);

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1ea,
    metalness: 0.9,
    roughness: 0.18,
    envMapIntensity: 1.5,
  });
  materials.push(ringMat);

  const rings = [];
  [1.85, 2.25].forEach((r, i) => {
    const ringGeo = new THREE.TorusGeometry(r, 0.012, 12, 140);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (i === 0 ? 0.35 : -0.28);
    ring.rotation.z = i === 0 ? 0.2 : -0.35;
    group.add(ring);
    rings.push(ring);
    geometries.push(ringGeo);
  });

  // A single satellite riding the inner ring.
  const satGeo = new THREE.SphereGeometry(0.075, 24, 24);
  const sat = new THREE.Mesh(satGeo, ringMat);
  group.add(sat);
  geometries.push(satGeo);

  return {
    group,
    geometries,
    materials,
    update: (t) => {
      globe.rotation.y = t * 0.2;
      rings[0].rotation.z = 0.2 + t * 0.12;
      rings[1].rotation.z = -0.35 - t * 0.09;
      sat.position.set(Math.cos(t * 0.9) * 1.85, Math.sin(t * 0.9) * 0.62, Math.sin(t * 0.9) * 1.6);
    },
  };
}

const BUILDERS = { iridescent: buildIridescent, field: buildField, orbit: buildOrbit };

export default function ShowcaseScene({ variant = "iridescent", className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL context available — the poster fallback stays visible.
    }

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.04);
    scene.environment = envRT.texture;

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 3, 4);
    const rim = new THREE.DirectionalLight(0x8fb0ff, 0.7);
    rim.position.set(-4, -1, -3);
    scene.add(ambient, key, rim);

    const built = (BUILDERS[variant] || buildIridescent)();
    scene.add(built.group);

    // Pointer is bound to this element, not the window: three scenes sharing a
    // window listener means every one of them reacts to a mouse anywhere.
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onPointer = (e) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    mount.addEventListener("pointermove", onPointer, { passive: true });
    mount.addEventListener("pointerleave", onLeave, { passive: true });

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = null;
    let visible = false;

    const render = () => {
      const t = clock.getElapsedTime();
      smooth.x += (target.x - smooth.x) * 0.06;
      smooth.y += (target.y - smooth.y) * 0.06;
      built.group.rotation.y = smooth.x * 0.45;
      built.group.rotation.x = smooth.y * 0.28;
      if (!reduced) built.update(t);
      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      render();
    };

    const start = () => {
      if (raf === null) {
        clock.getDelta(); // drop time accumulated while paused
        loop();
      }
    };
    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    // Only burn frames while the canvas is actually on screen and the tab is
    // focused. Three always-on renderers would cook a phone battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && document.visibilityState === "visible") start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Reduced motion still gets one static frame so the panel isn't empty.
    render();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointer);
      mount.removeEventListener("pointerleave", onLeave);
      scene.remove(built.group);
      built.geometries.forEach((g) => g.dispose());
      built.materials.forEach((m) => m.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} aria-hidden="true" />;
}
