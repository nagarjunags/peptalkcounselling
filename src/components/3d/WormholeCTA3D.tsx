import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined" || !window.WebGLRenderingContext) {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return false;

    const loseContextExt = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context"
    );
    if (loseContextExt) {
      loseContextExt.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

export default function WormholeCTA3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState<boolean>(() => !checkWebGLSupport());

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !checkWebGLSupport()) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });

      if (!renderer.getContext()) {
        throw new Error("Unable to acquire WebGL context");
      }
    } catch (err) {
      console.warn("WormholeCTA3D: WebGL unavailable, using fallback", err);
      setWebglFailed(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5));
    const dom = renderer.domElement;
    dom.style.display = "block";
    dom.style.width = "100%";
    dom.style.height = "100%";
    dom.style.background = "transparent";
    dom.style.touchAction = "pan-y";

    let animId: number | null = null;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("WormholeCTA3D: WebGL context lost");
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      setWebglFailed(true);
    };
    dom.addEventListener("webglcontextlost", onContextLost, false);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(dom);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.022);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    // Celestial Warp Rings
    const ringCount = isMobile ? 12 : 20;
    const rings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(8, 0.03, 12, isMobile ? 48 : 64);
    const materialsToDispose: THREE.Material[] = [];

    for (let i = 0; i < ringCount; i++) {
      const isWarm = i % 4 === 0;
      const ringMat = new THREE.MeshBasicMaterial({
        color: isWarm ? 0xf59e0b : 0x60a5fa,
        transparent: true,
        opacity: isWarm ? 0.16 : 0.1,
      });
      materialsToDispose.push(ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 4;
      scene.add(ring);
      rings.push(ring);
    }

    // High Speed Warp Stars
    const starCount = isMobile ? 120 : 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2.0 + Math.random() * 7.5;
      starPos[i * 3] = Math.cos(theta) * r;
      starPos[i * 3 + 1] = Math.sin(theta) * r;
      starPos[i * 3 + 2] = -Math.random() * ((ringCount - 1) * 4);

      const isGold = Math.random() > 0.65;
      starColors[i * 3] = isGold ? 0.98 : 0.6;
      starColors[i * 3 + 1] = isGold ? 0.85 : 0.78;
      starColors[i * 3 + 2] = isGold ? 0.35 : 0.98;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    materialsToDispose.push(starMat);
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Resize
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    ro.observe(container);

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

      const posArr = starGeo.attributes.position.array as Float32Array;
      for (let i = 2; i < starCount * 3; i += 3) {
        posArr[i] += speed * 2.0;
        if (posArr[i] > 20) posArr[i] = -80;
      }
      starGeo.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(elapsed * 0.35) * 0.35 * motionScale;
      camera.position.y = Math.cos(elapsed * 0.25) * 0.25 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      dom.removeEventListener("webglcontextlost", onContextLost);
      renderer.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      materialsToDispose.forEach((m) => m.dispose());
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none opacity-50 overflow-hidden z-0 bg-transparent ${
        webglFailed ? "hidden" : "block"
      }`}
      aria-hidden="true"
    />
  );
}
