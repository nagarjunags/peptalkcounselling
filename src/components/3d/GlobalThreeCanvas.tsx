import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * GlobalThreeCanvas: Immersive Cosmic Space Travel Experience
 *
 * Transports the student & parent into a sublime spaceflight voyage:
 * - 1,200+ stars streaming forward through deep space along the Z-axis (warp cruise).
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

    // Graceful WebGL check
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    })();
    if (!hasWebGL) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.009);

    const camera = new THREE.PerspectiveCamera(56, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // ─── 1. Primary Streaming Warp Starfield (Forward Travel Voyage) ─────────────
    const starCount = 1100;
    const starGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(starGeo);

    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    // Natural astronomical star spectral palette (Warm starlight gold, soft white, celestial sapphire)
    const naturalPalette = [
      new THREE.Color(0xfef3c7), // Warm golden starlight (G-type star, Sun-like)
      new THREE.Color(0xffedd5), // Warm stellar amber
      new THREE.Color(0xf8fafc), // Pure starlight white
      new THREE.Color(0xe0f2fe), // Soft starlight ice
      new THREE.Color(0x93c5fd), // Gentle celestial blue
      new THREE.Color(0x60a5fa), // Distant sapphire
    ];

    const tunnelRadius = 55;
    const zMin = -160;
    const zMax = 28;

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Cylindrical distribution around line of flight
      const radius = 2.5 + Math.random() * tunnelRadius;
      const angle = Math.random() * Math.PI * 2;

      starPositions[idx] = Math.cos(angle) * radius;
      starPositions[idx + 1] = Math.sin(angle) * radius;
      starPositions[idx + 2] = zMin + Math.random() * (zMax - zMin);

      // Random speed bias per star for natural parallax depth
      starSpeeds[i] = 0.85 + Math.random() * 0.4;

      const col = naturalPalette[Math.floor(Math.random() * naturalPalette.length)];
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    materialsToDispose.push(starMat);

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // ─── 2. Distant Deep-Field Stardust (Stationary Background Stars) ─────────────
    const deepStarCount = 500;
    const deepStarGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(deepStarGeo);

    const deepPositions = new Float32Array(deepStarCount * 3);
    const deepColors = new Float32Array(deepStarCount * 3);

    for (let i = 0; i < deepStarCount; i++) {
      const idx = i * 3;
      deepPositions[idx] = (Math.random() - 0.5) * 220;
      deepPositions[idx + 1] = (Math.random() - 0.5) * 220;
      deepPositions[idx + 2] = -120 - Math.random() * 80;

      const col = naturalPalette[Math.floor(Math.random() * naturalPalette.length)];
      deepColors[idx] = col.r * 0.65;
      deepColors[idx + 1] = col.g * 0.65;
      deepColors[idx + 2] = col.b * 0.65;
    }

    deepStarGeo.setAttribute("position", new THREE.BufferAttribute(deepPositions, 3));
    deepStarGeo.setAttribute("color", new THREE.BufferAttribute(deepColors, 3));

    const deepStarMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    materialsToDispose.push(deepStarMat);

    const deepStarPoints = new THREE.Points(deepStarGeo, deepStarMat);
    scene.add(deepStarPoints);

    // ─── 3. Subtle Cosmic Trajectory Waypoint Rings ───────────────────────────────
    // Soft, elegant orbital flight markers that float in deep space as navigation guides
    const flightGroup = new THREE.Group();
    scene.add(flightGroup);

    const wayRingGeo = new THREE.TorusGeometry(8.5, 0.024, 16, 96);
    geometriesToDispose.push(wayRingGeo);

    const wayRingMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.09,
    });
    materialsToDispose.push(wayRingMat);

    const wayRing1 = new THREE.Mesh(wayRingGeo, wayRingMat);
    wayRing1.position.set(-20, 10, -50);
    wayRing1.rotation.x = 1.2;
    wayRing1.rotation.y = 0.4;
    flightGroup.add(wayRing1);

    const wayRing2 = new THREE.Mesh(wayRingGeo, wayRingMat);
    wayRing2.position.set(22, -12, -90);
    wayRing2.rotation.x = -0.9;
    wayRing2.rotation.y = -0.3;
    flightGroup.add(wayRing2);

    // ─── 4. Scroll-Responsive Warp Speed Kinetics ────────────────────────────────
    let baseCruiseSpeed = prefersReducedMotion ? 0.04 : 0.16;
    let currentSpeed = baseCruiseSpeed;
    let targetSpeed = baseCruiseSpeed;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollDecayTimeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Accelerate forward when user scrolls
      scrollVelocity = Math.min(delta * 0.04, 0.65);
      targetSpeed = baseCruiseSpeed + (prefersReducedMotion ? 0 : scrollVelocity);

      if (scrollDecayTimeout) clearTimeout(scrollDecayTimeout);
      scrollDecayTimeout = setTimeout(() => {
        targetSpeed = baseCruiseSpeed;
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ─── 5. Cockpit Parallax Mouse & Touch Interaction ───────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Visibility handling
    let isVisible = document.visibilityState === "visible";
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ─── 6. Fluid Spaceflight Animation Loop ─────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clock.getDelta();
      const motionScale = prefersReducedMotion ? 0.2 : 1.0;

      // Smoothly interpolate warp cruise velocity
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      // Smooth cockpit camera parallax
      targetCamX += (mouseX * 1.8 - targetCamX) * 0.035;
      targetCamY += (-mouseY * 1.4 - targetCamY) * 0.035;
      camera.position.x = targetCamX;
      camera.position.y = targetCamY;

      // Stream stars forward along Z axis
      const positions = starPositions;
      for (let i = 0; i < starCount; i++) {
        const idx = i * 3;
        positions[idx + 2] += currentSpeed * starSpeeds[i] * motionScale;

        // Reset star deep in space once it passes the camera viewpoint
        if (positions[idx + 2] > zMax) {
          positions[idx + 2] = zMin;
          const radius = 2.5 + Math.random() * tunnelRadius;
          const angle = Math.random() * Math.PI * 2;
          positions[idx] = Math.cos(angle) * radius;
          positions[idx + 1] = Math.sin(angle) * radius;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Slow majestic drift for background elements
      deepStarPoints.rotation.z += 0.0003 * motionScale;
      wayRing1.rotation.z += 0.001 * motionScale;
      wayRing2.rotation.z -= 0.0008 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (scrollDecayTimeout) clearTimeout(scrollDecayTimeout);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
