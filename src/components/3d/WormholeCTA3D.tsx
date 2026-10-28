import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WormholeCTA3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // Titanium & Frosted Glass Depth Rings
    const ringCount = 20;
    const rings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(8, 0.03, 16, 64);

    for (let i = 0; i < ringCount; i++) {
      const isAccent = i % 4 === 0;
      const ringMat = new THREE.MeshBasicMaterial({
        color: isAccent ? 0xe2b474 : 0x86868b,
        transparent: true,
        opacity: isAccent ? 0.22 : 0.1,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 4;
      scene.add(ring);
      rings.push(ring);
    }

    // Velocity Starlight Streaks (White & Champagne)
    const starCount = 120;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 26;
      starPos[i + 1] = (Math.random() - 0.5) * 26;
      starPos[i + 2] = -Math.random() * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      transparent: true,
      opacity: 0.6,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Resize
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width && height) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    ro.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth forward motion
      const speed = 0.16;
      rings.forEach((ring) => {
        ring.position.z += speed;
        if (ring.position.z > 20) {
          ring.position.z = -((ringCount - 1) * 4) + (ring.position.z - 20);
        }
      });

      // Stars velocity
      const posArr = starGeo.attributes.position.array as Float32Array;
      for (let i = 2; i < starCount * 3; i += 3) {
        posArr[i] += speed * 1.8;
        if (posArr[i] > 20) posArr[i] = -80;
      }
      starGeo.attributes.position.needsUpdate = true;

      // Ultra subtle cinematic camera breath
      camera.position.x = Math.sin(elapsed * 0.4) * 0.4;
      camera.position.y = Math.cos(elapsed * 0.3) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
