import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WormholeCTA3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Graceful WebGL check
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      } catch {
        return false;
      }
    })();
    if (!hasWebGL) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.022);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // Relativistic Interstellar Warp Rings (Cyan & Pulsar Violet)
    const ringCount = 20;
    const rings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(8, 0.032, 16, 64);
    const materialsToDispose: THREE.Material[] = [];

    for (let i = 0; i < ringCount; i++) {
      const isViolet = i % 3 === 0;
      const ringMat = new THREE.MeshBasicMaterial({
        color: isViolet ? 0x818cf8 : 0x38bdf8,
        transparent: true,
        opacity: isViolet ? 0.22 : 0.14,
      });
      materialsToDispose.push(ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 4;
      scene.add(ring);
      rings.push(ring);
    }

    // High-Velocity Cosmic Star Streaks (White & Starlight Cyan)
    const starCount = 120;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 28;
      starPos[i + 1] = (Math.random() - 0.5) * 28;
      starPos[i + 2] = -Math.random() * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
    });
    materialsToDispose.push(starMat);
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

    // Intersection Observer to stop loop when scrolled out of view
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.15 : 1.0;
      const speed = 0.16 * motionScale;

      rings.forEach((ring) => {
        ring.position.z += speed;
        if (ring.position.z > 20) {
          ring.position.z = -((ringCount - 1) * 4) + (ring.position.z - 20);
        }
      });

      // Stars velocity
      const posArr = starGeo.attributes.position.array as Float32Array;
      for (let i = 2; i < starCount * 3; i += 3) {
        posArr[i] += speed * 2.0;
        if (posArr[i] > 20) posArr[i] = -80;
      }
      starGeo.attributes.position.needsUpdate = true;

      // Subtle celestial camera drift
      camera.position.x = Math.sin(elapsed * 0.35) * 0.35 * motionScale;
      camera.position.y = Math.cos(elapsed * 0.25) * 0.25 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      materialsToDispose.forEach((m) => m.dispose());
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
