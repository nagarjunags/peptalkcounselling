import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ServiceObjectType = "rank" | "branch" | "option" | "rounds";

export default function Service3DObject({ type }: { type: ServiceObjectType }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 84;
    const height = 84;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Scientific Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0xf0f9ff, 3.0);
    key.position.set(4, 6, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rim.position.set(-4, -4, -3);
    scene.add(rim);

    // Materials: Space Titanium, Anodized Azure Alloy, Cyan Emissive
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const celestialCyanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.15,
    });

    let animCallback: (t: number) => void;

    if (type === "rank") {
      // 1. Quantum Energy Matrix Monolith & Orbital Ring
      const monolithGeo = new THREE.BoxGeometry(0.8, 1.6, 0.4);
      const monolith = new THREE.Mesh(monolithGeo, titaniumMat);
      group.add(monolith);

      const orbitGeo = new THREE.TorusGeometry(1.2, 0.035, 16, 64);
      const orbit = new THREE.Mesh(orbitGeo, celestialCyanMat);
      orbit.rotation.x = Math.PI / 3;
      group.add(orbit);

      animCallback = (t) => {
        monolith.rotation.y = t * 0.8;
        orbit.rotation.z = t * 1.2;
      };
    } else if (type === "branch") {
      // 2. Dual Gravitational Gyroscope / Astrolabe Gimbal
      const ring1Geo = new THREE.TorusGeometry(1.15, 0.04, 16, 64);
      const ring1 = new THREE.Mesh(ring1Geo, titaniumMat);
      group.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(0.85, 0.035, 16, 64);
      const ring2 = new THREE.Mesh(ring2Geo, celestialCyanMat);
      group.add(ring2);

      const coreGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const core = new THREE.Mesh(coreGeo, celestialCyanMat);
      group.add(core);

      animCallback = (t) => {
        ring1.rotation.x = t * 0.9;
        ring1.rotation.y = t * 0.5;
        ring2.rotation.y = -t * 1.1;
        ring2.rotation.z = t * 0.7;
      };
    } else if (type === "option") {
      // 3. Optical Spectrometer / Refractive Dispersion Prism
      const prismGeo = new THREE.ConeGeometry(1.0, 1.4, 3);
      const prismMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
        metalness: 0.9,
        roughness: 0.1,
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.rotation.x = 0.3;
      group.add(prism);

      // Celestial spectral ring around prism
      const haloGeo = new THREE.TorusGeometry(1.2, 0.025, 16, 64);
      const halo = new THREE.Mesh(haloGeo, celestialCyanMat);
      halo.rotation.x = Math.PI / 2;
      group.add(halo);

      animCallback = (t) => {
        prism.rotation.y = t * 0.7;
        halo.rotation.z = -t * 0.9;
        halo.position.y = Math.sin(t * 2) * 0.1;
      };
    } else {
      // 4. Relativistic Spacetime Möbius / Quantum Orbital Loop
      const knotGeo = new THREE.TorusKnotGeometry(0.8, 0.16, 80, 16, 2, 3);
      const knot = new THREE.Mesh(knotGeo, titaniumMat);
      group.add(knot);

      animCallback = (t) => {
        knot.rotation.x = t * 0.6;
        knot.rotation.y = t * 0.8;
      };
    }

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (animCallback) animCallback(elapsed);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0"
      aria-hidden="true"
    />
  );
}
