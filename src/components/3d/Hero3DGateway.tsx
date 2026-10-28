import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { ExamType } from "../../config/siteConfig";

export default function Hero3DGateway({ exam }: { exam: ExamType }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability gracefully
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      } catch {
        return false;
      }
    })();

    if (!hasWebGL) {
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
          <div class="w-24 h-24 rounded-full border border-sky-500/30 bg-sky-950/20 flex items-center justify-center mb-3">
            <span class="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 blur-sm"></span>
          </div>
          <span class="text-xs font-mono text-sky-300 uppercase tracking-widest">Celestial Orbit System</span>
        </div>
      `;
      return;
    }

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 10.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // Main Celestial Assembly Root Group
    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    // Scientific Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Stellar Key Light (pure white starlight)
    const stellarKeyLight = new THREE.DirectionalLight(0xf8fafc, 3.4);
    stellarKeyLight.position.set(7, 10, 8);
    scene.add(stellarKeyLight);

    // Atmospheric Celestial Cyan Rim Light
    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    cyanRimLight.position.set(-8, -4, -6);
    scene.add(cyanRimLight);

    // Pulsar Violet Fill Light
    const pulsarFillLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    pulsarFillLight.position.set(0, -7, 6);
    scene.add(pulsarFillLight);

    // Precision Aerospace & Celestial Materials
    const materialsToDispose: THREE.Material[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    const aerospaceTitanium = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.18,
    });
    materialsToDispose.push(aerospaceTitanium);

    const cosmicBlueAlloy = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15,
    });
    materialsToDispose.push(cosmicBlueAlloy);

    const stellarCyanGlow = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
      metalness: 0.3,
      roughness: 0.25,
    });
    materialsToDispose.push(stellarCyanGlow);

    const warmStarlightBeacon = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.45,
      metalness: 0.4,
      roughness: 0.2,
    });
    materialsToDispose.push(warmStarlightBeacon);

    // ─── 1. Volumetric Central Celestial Body ─────────────────────────────────────
    const centralBodyGroup = new THREE.Group();
    rootAssembly.add(centralBodyGroup);

    // Inner Metallic Obsidian Planetary Core
    const coreGeo = new THREE.SphereGeometry(1.22, 64, 64);
    geometriesToDispose.push(coreGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050c1e,
      emissive: 0x0284c7,
      emissiveIntensity: 0.38,
      metalness: 0.92,
      roughness: 0.12,
    });
    materialsToDispose.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    centralBodyGroup.add(coreMesh);

    // Atmospheric Rayleigh Scattering Glow Halo
    const atmosphereGeo = new THREE.SphereGeometry(1.36, 48, 48);
    geometriesToDispose.push(atmosphereGeo);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    materialsToDispose.push(atmosphereMat);
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    centralBodyGroup.add(atmosphereMesh);

    // Fine Geodesic Astrometry Meridian Wireframe
    const meridianGeo = new THREE.IcosahedronGeometry(1.42, 2);
    geometriesToDispose.push(meridianGeo);
    const meridianMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    materialsToDispose.push(meridianMat);
    const meridianMesh = new THREE.Mesh(meridianGeo, meridianMat);
    centralBodyGroup.add(meridianMesh);

    // ─── 2. Multiple Elliptical Keplerian Orbital Paths ───────────────────────────
    const orbitsGroup = new THREE.Group();
    rootAssembly.add(orbitsGroup);

    // Helper: Build an elliptical curve orbit path
    const createEllipticalOrbit = (
      xRadius: number,
      yRadius: number,
      inclinationX: number,
      inclinationZ: number,
      color: number,
      opacity: number
    ) => {
      const curve = new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      geometriesToDispose.push(orbitGeo);
      const orbitMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
      });
      materialsToDispose.push(orbitMat);
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = inclinationX;
      orbitLine.rotation.z = inclinationZ;
      return { line: orbitLine, curve, inclinationX, inclinationZ };
    };

    // Orbit Path 1: Primary Equatorial Trajectory (cyan)
    const orbit1 = createEllipticalOrbit(2.8, 2.5, Math.PI / 3.2, 0.2, 0x38bdf8, 0.35);
    orbitsGroup.add(orbit1.line);

    // Orbit Path 2: Polar Orbital Meridian (titanium)
    const orbit2 = createEllipticalOrbit(3.3, 3.0, -Math.PI / 2.6, 0.5, 0x94a3b8, 0.28);
    orbitsGroup.add(orbit2.line);

    // Orbit Path 3: Distant Resonance Horizon (pulsar violet)
    const orbit3 = createEllipticalOrbit(3.9, 3.6, Math.PI / 4.5, -0.6, 0x818cf8, 0.22);
    orbitsGroup.add(orbit3.line);

    // ─── 3. Precision Astrolabe Gimbal Rings (Physical Instrument) ────────────────
    const gimbalRing1Geo = new THREE.TorusGeometry(2.35, 0.032, 16, 96);
    geometriesToDispose.push(gimbalRing1Geo);
    const gimbalRing1 = new THREE.Mesh(gimbalRing1Geo, cosmicBlueAlloy);
    rootAssembly.add(gimbalRing1);

    const gimbalRing2Geo = new THREE.TorusGeometry(3.1, 0.038, 16, 120);
    geometriesToDispose.push(gimbalRing2Geo);
    const gimbalRing2 = new THREE.Mesh(gimbalRing2Geo, aerospaceTitanium);
    rootAssembly.add(gimbalRing2);

    // Coordinate telemetry beacons along outer gimbal
    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    geometriesToDispose.push(beaconGeo);
    const beaconCount = 6;
    for (let i = 0; i < beaconCount; i++) {
      const angle = (i * Math.PI * 2) / beaconCount;
      const beacon = new THREE.Mesh(beaconGeo, warmStarlightBeacon);
      beacon.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 3.1, 0);
      gimbalRing2.add(beacon);
    }

    // ─── 4. Orbiting Spacecraft Probes (True 3D Keplerian Occlusion) ──────────────
    // Satellite Probe 1: Follows Orbit 1 with solar wings
    const satGroup1 = new THREE.Group();
    rootAssembly.add(satGroup1);

    const satProbeGeo = new THREE.SphereGeometry(0.16, 24, 24);
    geometriesToDispose.push(satProbeGeo);
    const satProbeMesh = new THREE.Mesh(satProbeGeo, stellarCyanGlow);
    satGroup1.add(satProbeMesh);

    // Micro Solar Array Panels
    const wingGeo = new THREE.BoxGeometry(0.42, 0.02, 0.12);
    geometriesToDispose.push(wingGeo);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2,
    });
    materialsToDispose.push(wingMat);
    const wingMesh = new THREE.Mesh(wingGeo, wingMat);
    satGroup1.add(wingMesh);

    // Satellite Probe 2: Pulsar Node orbiting on Orbit 3
    const satGroup2 = new THREE.Group();
    rootAssembly.add(satGroup2);

    const pulsarNodeGeo = new THREE.SphereGeometry(0.12, 20, 20);
    geometriesToDispose.push(pulsarNodeGeo);
    const pulsarMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.2,
    });
    materialsToDispose.push(pulsarMat);
    const pulsarNodeMesh = new THREE.Mesh(pulsarNodeGeo, pulsarMat);
    satGroup2.add(pulsarNodeMesh);

    // ─── 5. Fine Orbital Celestial Particle Field ─────────────────────────────────
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(particleGeo);
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 2.2;
      const yOffset = (Math.random() - 0.5) * 0.45;

      particlePos[i * 3] = Math.cos(theta) * radius;
      particlePos[i * 3 + 1] = yOffset;
      particlePos[i * 3 + 2] = Math.sin(theta) * radius;

      // Color variation between pure white, cyan, and indigo
      const isCyan = Math.random() > 0.4;
      particleColors[i * 3] = isCyan ? 0.22 : 0.95;
      particleColors[i * 3 + 1] = isCyan ? 0.74 : 0.95;
      particleColors[i * 3 + 2] = 0.98;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    materialsToDispose.push(particleMat);
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    rootAssembly.add(particlePoints);

    // ─── 6. Pointer Parallax & Interactive Drag Physics ───────────────────────────
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotX = 0.18;
    let targetRotY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;
    let autoRotate = true;
    let autoRotateResumeTimer: ReturnType<typeof setTimeout> | null = null;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      if (autoRotateResumeTimer) clearTimeout(autoRotateResumeTimer);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      targetRotY += deltaX * 0.0065;
      targetRotX += deltaY * 0.0065;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      autoRotateResumeTimer = setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };

    // Desktop pointer parallax over the whole container
    const onWindowPointerMove = (e: MouseEvent) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);
      mouseParallaxX = normX * 0.22;
      mouseParallaxY = normY * 0.16;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mousemove", onWindowPointerMove);

    // ─── 7. Resize Observer ───────────────────────────────────────────────────────
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

    // ─── 8. Intersection Observer (Pause when off-screen) ─────────────────────────
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

    // ─── 9. Fluid Animation Loop ──────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.15 : 1.0;

      // Continuous Gyroscopic differential rotations
      gimbalRing1.rotation.x = elapsed * 0.35 * motionScale;
      gimbalRing1.rotation.y = elapsed * 0.25 * motionScale;

      gimbalRing2.rotation.y = -elapsed * 0.28 * motionScale;
      gimbalRing2.rotation.z = elapsed * 0.18 * motionScale;

      // Central core breathing rotation
      centralBodyGroup.rotation.y = elapsed * 0.22 * motionScale;
      meridianMesh.rotation.y = -elapsed * 0.15 * motionScale;
      meridianMesh.rotation.x = elapsed * 0.12 * motionScale;

      // Atmospheric soft pulsation
      const atmosScale = 1.0 + Math.sin(elapsed * 2.0) * 0.018;
      atmosphereMesh.scale.set(atmosScale, atmosScale, atmosScale);

      // Orbit 1 Spacecraft (Probe 1) Keplerian Motion
      const orbitProgress1 = (elapsed * 0.45 * motionScale) % (Math.PI * 2);
      const satPoint1 = orbit1.curve.getPoint(orbitProgress1 / (Math.PI * 2));
      const satPos1 = new THREE.Vector3(satPoint1.x, satPoint1.y, 0);
      satPos1.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbit1.inclinationX);
      satPos1.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbit1.inclinationZ);
      satGroup1.position.copy(satPos1);
      satGroup1.rotation.y = elapsed * 1.5;

      // Orbit 3 Pulsar Node (accelerates slightly at periapsis)
      const orbitProgress2 = (elapsed * 0.32 * motionScale) % (Math.PI * 2);
      const satPoint2 = orbit3.curve.getPoint(orbitProgress2 / (Math.PI * 2));
      const satPos2 = new THREE.Vector3(satPoint2.x, satPoint2.y, 0);
      satPos2.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbit3.inclinationX);
      satPos2.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbit3.inclinationZ);
      satGroup2.position.copy(satPos2);

      // Particle field subtle cosmic drift
      particlePoints.rotation.y = elapsed * 0.08 * motionScale;

      // User interaction + Parallax damping
      if (autoRotate && !prefersReducedMotion) {
        targetRotY += 0.0032;
      }

      const desiredRotY = targetRotY + mouseParallaxX;
      const desiredRotX = targetRotX - mouseParallaxY;

      rootAssembly.rotation.y += (desiredRotY - rootAssembly.rotation.y) * 0.055;
      rootAssembly.rotation.x += (desiredRotX - rootAssembly.rotation.x) * 0.055;

      // Subtle celestial levitation
      rootAssembly.position.y = Math.sin(elapsed * 1.4) * 0.09 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mousemove", onWindowPointerMove);
      if (autoRotateResumeTimer) clearTimeout(autoRotateResumeTimer);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [exam]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none group">
      {/* Environmental subtle celestial vignette glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,rgba(3,7,18,0)_72%)] pointer-events-none" />

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label="Interactive 3D Celestial Armillary Instrument"
      />

      {/* Understated Scientific Telemetry Badge */}
      <div className="hidden sm:inline-flex absolute bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 text-[10px] font-mono tracking-wider text-sky-300/90 backdrop-blur-md pointer-events-none items-center gap-2 shadow-sm whitespace-nowrap transition-opacity group-hover:border-sky-400/40">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>CELESTIAL ORBIT ENGINE • DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
