import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Checks whether WebGL is truly supported without leaking a WebGL context.
 */
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

/**
 * GlobalThreeCanvas: Immersive Cosmic Space Travel Experience
 *
 * Transports the student & parent into a sublime spaceflight voyage:
 * - Stars streaming forward through deep space along the Z-axis (warp cruise).
 * - Dynamically accelerates forward as the user scrolls down the landing page.
 * - Gentle mouse/touch parallax simulating the panoramic view from a starship bridge.
 * - Natural astronomical stellar colors: warm starlight gold, pure stellar white, and soft sapphire blue.
 * - Zero bright radium or gaudy AI neon.
 */
export default function GlobalThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!checkWebGLSupport()) return;

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 1024;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
      });

      if (!renderer.getContext()) {
        throw new Error("Unable to acquire WebGL context");
      }
    } catch (err) {
      console.warn("GlobalThreeCanvas: WebGL unavailable, continuing without ambient 3D stars", err);
      return;
    }

    renderer.setSize(width, height);
    // Background starlight only needs 1.0 pixel ratio on mobile (saves 70% VRAM)
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
      console.warn("GlobalThreeCanvas: WebGL context lost");
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    dom.addEventListener("webglcontextlost", onContextLost, false);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(dom);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.009);

    const camera = new THREE.PerspectiveCamera(56, width / height, 0.1, 1000);
    camera.position.z = 24;

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // ─── 1. Primary Streaming Warp Starfield (Forward Travel Voyage) ─────────────
    const starCount = isMobile ? 450 : 1000;
    const starGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(starGeo);

    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    const naturalPalette = [
      new THREE.Color(0xfef3c7),
      new THREE.Color(0xffedd5),
      new THREE.Color(0xf8fafc),
      new THREE.Color(0xe0f2fe),
      new THREE.Color(0x93c5fd),
      new THREE.Color(0x60a5fa),
    ];

    const tunnelRadius = 55;
    const zMin = -160;
    const zMax = 28;

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const radius = 2.5 + Math.random() * tunnelRadius;
      const angle = Math.random() * Math.PI * 2;

      starPositions[idx] = Math.cos(angle) * radius;
      starPositions[idx + 1] = Math.sin(angle) * radius;
      starPositions[idx + 2] = zMin + Math.random() * (zMax - zMin);

      starSpeeds[i] = 0.85 + Math.random() * 0.4;

      const starColor = naturalPalette[Math.floor(Math.random() * naturalPalette.length)];
      starColors[idx] = starColor.r;
      starColors[idx + 1] = starColor.g;
      starColors[idx + 2] = starColor.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    materialsToDispose.push(starMaterial);

    const starPoints = new THREE.Points(starGeo, starMaterial);
    scene.add(starPoints);

    // ─── 2. Deep Space Distant Nebular Dust Particles ────────────────────────────
    const deepStarCount = isMobile ? 200 : 450;
    const deepStarGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(deepStarGeo);

    const deepPositions = new Float32Array(deepStarCount * 3);
    const deepColors = new Float32Array(deepStarCount * 3);

    for (let i = 0; i < deepStarCount; i++) {
      const idx = i * 3;
      deepPositions[idx] = (Math.random() - 0.5) * 220;
      deepPositions[idx + 1] = (Math.random() - 0.5) * 220;
      deepPositions[idx + 2] = -120 - Math.random() * 80;

      const starColor = naturalPalette[Math.floor(Math.random() * naturalPalette.length)];
      deepColors[idx] = starColor.r * 0.65;
      deepColors[idx + 1] = starColor.g * 0.65;
      deepColors[idx + 2] = starColor.b * 0.65;
    }

    deepStarGeo.setAttribute("position", new THREE.BufferAttribute(deepPositions, 3));
    deepStarGeo.setAttribute("color", new THREE.BufferAttribute(deepColors, 3));

    const deepMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    materialsToDispose.push(deepMaterial);

    const deepStarPoints = new THREE.Points(deepStarGeo, deepMaterial);
    scene.add(deepStarPoints);

    // ─── 3. Subtle Distant Celestial Waypoint Torus Rings ────────────────────────
    const waypointGroup = new THREE.Group();
    scene.add(waypointGroup);

    const ringGeo = new THREE.TorusGeometry(8.5, 0.024, 12, 64);
    geometriesToDispose.push(ringGeo);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.09,
    });
    materialsToDispose.push(ringMat);

    const wayRing1 = new THREE.Mesh(ringGeo, ringMat);
    wayRing1.position.set(-20, 10, -50);
    wayRing1.rotation.x = 1.2;
    wayRing1.rotation.y = 0.4;
    waypointGroup.add(wayRing1);

    const wayRing2 = new THREE.Mesh(ringGeo, ringMat);
    wayRing2.position.set(22, -12, -90);
    wayRing2.rotation.x = -0.9;
    wayRing2.rotation.y = -0.3;
    waypointGroup.add(wayRing2);

    // ─── 4. Scroll Acceleration Dynamics ──────────────────────────────────────────
    const cruiseSpeedBase = prefersReducedMotion ? 0.04 : 0.16;
    let currentSpeed = cruiseSpeedBase;
    let targetSpeed = cruiseSpeedBase;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollDecayTimeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;

      scrollVelocity = Math.min(deltaY * 0.04, 0.65);
      targetSpeed = cruiseSpeedBase + (prefersReducedMotion ? 0 : scrollVelocity);

      if (scrollDecayTimeout) clearTimeout(scrollDecayTimeout);
      scrollDecayTimeout = setTimeout(() => {
        targetSpeed = cruiseSpeedBase;
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ─── 5. Smooth Cockpit Cockpit Parallax ────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ─── 6. Resize Observer ───────────────────────────────────────────────────────
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // ─── 7. Visibility Change ─────────────────────────────────────────────────────
    let isVisible = document.visibilityState === "visible";
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ─── 8. Warp Drive Render Loop ────────────────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clock.getDelta();
      const motionScale = prefersReducedMotion ? 0.2 : 1.0;

      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      targetCamX += (mouseX * 1.8 - targetCamX) * 0.035;
      targetCamY += (-mouseY * 1.4 - targetCamY) * 0.035;
      camera.position.x = targetCamX;
      camera.position.y = targetCamY;

      const positions = starPositions;
      for (let i = 0; i < starCount; i++) {
        const idx = i * 3;
        positions[idx + 2] += currentSpeed * starSpeeds[i] * motionScale;

        if (positions[idx + 2] > zMax) {
          positions[idx + 2] = zMin;
          const radius = 2.5 + Math.random() * tunnelRadius;
          const angle = Math.random() * Math.PI * 2;
          positions[idx] = Math.cos(angle) * radius;
          positions[idx + 1] = Math.sin(angle) * radius;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      deepStarPoints.rotation.z += 0.0003 * motionScale;
      wayRing1.rotation.z += 0.001 * motionScale;
      wayRing2.rotation.z -= 0.0008 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      dom.removeEventListener("webglcontextlost", onContextLost);
      if (scrollDecayTimeout) clearTimeout(scrollDecayTimeout);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
      aria-hidden="true"
    />
  );
}
