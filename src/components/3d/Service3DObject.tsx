import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Service3DObjectProps {
  type: "rank" | "branch" | "option" | "rounds";
}

export default function Service3DObject({ type }: Service3DObjectProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 80;
    let height = container.clientHeight || 80;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Studio Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(5, 7, 6);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Apple Style Metallic & Frosted Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.15,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5d061,
      metalness: 0.95,
      roughness: 0.2,
    });

    const darkGlassMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.7,
      roughness: 0.2,
    });

    if (type === "rank") {
      // 3D Precision Data Monoliths
      const bars = [
        { h: 2.2, x: -1.8, mat: darkGlassMat },
        { h: 3.6, x: 0, mat: titaniumMat },
        { h: 5.2, x: 1.8, mat: goldMat },
      ];
      bars.forEach(({ h, x, mat }) => {
        const geo = new THREE.BoxGeometry(1.0, h, 1.0);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, h / 2 - 2.4, 0);
        group.add(mesh);
      });

      // Thin halo ring above peak
      const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 8, 32);
      const ring = new THREE.Mesh(ringGeo, goldMat);
      ring.position.set(1.8, 1.8, 0);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    } else if (type === "branch") {
      // Minimalist Dual Orbital Gyroscope
      const ring1Geo = new THREE.TorusGeometry(2.8, 0.08, 12, 48);
      const ring1 = new THREE.Mesh(ring1Geo, titaniumMat);
      group.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(2.1, 0.07, 12, 40);
      const ring2 = new THREE.Mesh(ring2Geo, goldMat);
      ring2.rotation.y = Math.PI / 2.8;
      group.add(ring2);

      const coreGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const core = new THREE.Mesh(coreGeo, darkGlassMat);
      group.add(core);
    } else if (type === "option") {
      // Precision Hierarchy Slabs
      const levels = [
        { size: 3.2, y: -1.6, mat: darkGlassMat },
        { size: 2.3, y: -0.1, mat: titaniumMat },
        { size: 1.4, y: 1.3, mat: goldMat },
      ];
      levels.forEach(({ size, y, mat }) => {
        const geo = new THREE.BoxGeometry(size, 0.6, size);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = y;
        group.add(mesh);
      });
    } else {
      // Precision Möbius Loop (Round Support)
      const knotGeo = new THREE.TorusKnotGeometry(2.0, 0.45, 64, 16, 2, 3);
      const knot = new THREE.Mesh(knotGeo, titaniumMat);
      group.add(knot);
    }

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.7;
      group.rotation.x = Math.sin(elapsed * 0.5) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      titaniumMat.dispose();
      goldMat.dispose();
      darkGlassMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      className="w-16 h-16 flex-shrink-0 relative overflow-hidden"
      aria-hidden="true"
    />
  );
}
