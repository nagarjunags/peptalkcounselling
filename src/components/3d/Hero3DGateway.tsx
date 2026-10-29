import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ExamType } from "../../config/siteConfig";

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

    // Explicitly release temporary test context immediately
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
 * CelestialOrbitFallback:
 *
 * A vector-crafted, GPU-accelerated SVG representation of the Celestial
 * Armillary Astrolabe. It loads with 0ms delay, consumes 0 WebGL contexts,
 * perfectly matches the dark space theme (#020617), and ensures that visitors
 * on low-memory mobile devices or restricted WebGL environments always see a
 * polished, futuristic, and beautiful centerpiece without any blank flashes or
 * broken element indicators.
 */
function CelestialOrbitFallback({ exam }: { exam: ExamType }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label={`${exam} Celestial Orbit Guidance System`}
    >
      {/* Ambient Celestial Nebula Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14)_0%,rgba(2,6,23,0)_72%)] pointer-events-none" />

      {/* Responsive Astrolabe Vector Hologram */}
      <div className="relative w-full h-full max-h-[280px] sm:max-h-[340px] flex items-center justify-center p-2">
        <svg
          viewBox="0 0 360 280"
          className="w-full h-full max-w-[420px] max-h-full overflow-visible"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Core Radial Atmosphere */}
            <radialGradient id="coreHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* Planetary Core Gradient */}
            <radialGradient id="planetCore" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#0284c7" />
              <stop offset="70%" stopColor="#071b3e" />
              <stop offset="100%" stopColor="#030816" />
            </radialGradient>

            {/* Equatorial Orbit Gradient */}
            <linearGradient id="orbitEquatorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.9" />
            </linearGradient>

            {/* Polar Meridian Orbit Gradient */}
            <linearGradient id="orbitPolarGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
            </linearGradient>

            {/* Outer Gimbal Metallic Ring */}
            <linearGradient id="gimbalGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
            </linearGradient>

            {/* Solar Panel Wing Gradient */}
            <linearGradient id="solarWingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* 1. Deep Space Atmospheric Flare Halo */}
          <circle cx="180" cy="140" r="95" fill="url(#coreHalo)" />

          {/* 2. Outer Astrolabe Gimbal Ring (Rotates slowly) */}
          <g
            className="animate-[spin_40s_linear_infinite]"
            style={{ transformOrigin: "180px 140px" }}
          >
            <circle
              cx="180"
              cy="140"
              r="105"
              stroke="url(#gimbalGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              strokeOpacity="0.75"
            />
            {/* Coordinate Beacons on outer ring */}
            <circle cx="180" cy="35" r="3" fill="#fde68a" />
            <circle cx="180" cy="245" r="3" fill="#fde68a" />
            <circle cx="75" cy="140" r="3" fill="#38bdf8" />
            <circle cx="285" cy="140" r="3" fill="#38bdf8" />
            <circle cx="106" cy="66" r="2" fill="#94a3b8" />
            <circle cx="254" cy="214" r="2" fill="#94a3b8" />
          </g>

          {/* 3. Elliptical Keplerian Orbit 1 (Primary Trajectory - Cyan) */}
          <g
            className="animate-[spin_24s_linear_infinite]"
            style={{ transformOrigin: "180px 140px" }}
          >
            <ellipse
              cx="180"
              cy="140"
              rx="125"
              ry="48"
              stroke="url(#orbitEquatorGrad)"
              strokeWidth="1.6"
              strokeDasharray="4 3"
              transform="rotate(-24 180 140)"
            />

            {/* Orbiting Satellite Probe 1 with Solar Array Wings */}
            <g transform="translate(68, 96)">
              {/* Solar array wings */}
              <rect x="-14" y="-2" width="28" height="4" rx="1" fill="url(#solarWingGrad)" stroke="#7dd3fc" strokeWidth="0.5" />
              {/* Probe core */}
              <circle cx="0" cy="0" r="4.5" fill="#fde68a" />
              <circle cx="0" cy="0" r="7" stroke="#fde68a" strokeWidth="0.8" strokeOpacity="0.5" className="animate-ping" style={{ animationDuration: "2.8s" }} />
            </g>
          </g>

          {/* 4. Elliptical Keplerian Orbit 2 (Polar Meridian - Pulsar Violet) */}
          <g
            className="animate-[spin_18s_linear_infinite_reverse]"
            style={{ transformOrigin: "180px 140px" }}
          >
            <ellipse
              cx="180"
              cy="140"
              rx="118"
              ry="42"
              stroke="url(#orbitPolarGrad)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
              transform="rotate(48 180 140)"
            />

            {/* Orbiting Pulsar Node */}
            <g transform="translate(265, 185)">
              <circle cx="0" cy="0" r="3.5" fill="#818cf8" />
              <circle cx="0" cy="0" r="6" stroke="#818cf8" strokeWidth="0.8" strokeOpacity="0.6" className="animate-pulse" />
            </g>
          </g>

          {/* 5. Central Planetary Obsidian Body & Geodesic Meridian Wireframe */}
          <g>
            {/* Soft Ambient Core Glow */}
            <circle cx="180" cy="140" r="46" fill="#38bdf8" fillOpacity="0.18" className="animate-pulse" style={{ animationDuration: "3.5s" }} />

            {/* Solid Obsidian Core Sphere */}
            <circle cx="180" cy="140" r="38" fill="url(#planetCore)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />

            {/* Astrometry Meridian Grid Lines on Sphere */}
            <ellipse cx="180" cy="140" rx="38" ry="14" stroke="#7dd3fc" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="3 2" />
            <ellipse cx="180" cy="140" rx="14" ry="38" stroke="#7dd3fc" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="3 2" />
            <line x1="142" y1="140" x2="218" y2="140" stroke="#fde68a" strokeWidth="0.9" strokeOpacity="0.5" />
            <line x1="180" y1="102" x2="180" y2="178" stroke="#fde68a" strokeWidth="0.9" strokeOpacity="0.5" />

            {/* Center Coordinate Pinpoint */}
            <circle cx="180" cy="140" r="2.5" fill="#ffffff" />
          </g>

          {/* 6. Surrounding Stellar Particle Constellation */}
          <circle cx="95" cy="55" r="1.5" fill="#fde68a" opacity="0.85" className="animate-pulse" style={{ animationDuration: "2.1s" }} />
          <circle cx="270" cy="65" r="1.5" fill="#ffffff" opacity="0.9" className="animate-pulse" style={{ animationDuration: "2.7s" }} />
          <circle cx="310" cy="120" r="1.2" fill="#38bdf8" opacity="0.75" />
          <circle cx="60" cy="175" r="1.2" fill="#38bdf8" opacity="0.7" />
          <circle cx="110" cy="235" r="1.5" fill="#fde68a" opacity="0.8" className="animate-pulse" style={{ animationDuration: "3.1s" }} />
          <circle cx="250" cy="245" r="1.2" fill="#ffffff" opacity="0.85" />
        </svg>
      </div>

      {/* Understated Scientific Telemetry Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/85 border border-sky-500/20 text-[10px] font-mono tracking-wider text-sky-300 backdrop-blur-md shadow-sm -mt-1 sm:mt-0">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>CELESTIAL ORBIT GUIDANCE • {exam}</span>
      </div>
    </div>
  );
}

export default function Hero3DGateway({ exam }: { exam: ExamType }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "failed">(() =>
    checkWebGLSupport() ? "loading" : "failed"
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !checkWebGLSupport()) return;

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 1024;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || (isMobile ? 320 : 360);
    let height = container.clientHeight || (isMobile ? 160 : 340);

    let renderer: THREE.WebGLRenderer;
    try {
      // Conservative, highly-stable renderer settings to prevent mobile GPU context loss
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile to prevent massive VRAM allocation
        powerPreference: "default", // Avoid aggressive discrete GPU requests on mobile
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
      });

      // Verify WebGL context was genuinely acquired
      const gl = renderer.getContext();
      if (!gl) {
        throw new Error("Unable to acquire valid WebGL context");
      }
    } catch (err) {
      console.warn("Hero3DGateway: WebGL init caught, using fallback UI", err);
      setLoadState("failed");
      return;
    }

    renderer.setSize(width, height);
    // Limit pixel ratio on mobile to keep framebuffer memory footprint minimal
    const maxPixelRatio = isMobile ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const dom = renderer.domElement;
    dom.style.display = "block";
    dom.style.width = "100%";
    dom.style.height = "100%";
    dom.style.background = "transparent";
    dom.style.touchAction = "pan-y";
    dom.style.outline = "none";
    dom.setAttribute("role", "img");
    dom.setAttribute(
      "aria-label",
      "Interactive 3D Celestial Armillary Instrument"
    );

    // CRITICAL: Handle WebGL context loss gracefully (prevents Chrome Android from rendering [x_x]!)
    let animId: number | null = null;
    const onContextLost = (e: Event) => {
      e.preventDefault(); // Prevents Chrome default dead-face [x_x] UI!
      console.warn("Hero3DGateway: WebGL context lost, activating graceful fallback");
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      setLoadState("failed");
    };

    const onContextRestored = () => {
      console.log("Hero3DGateway: WebGL context restored");
      setLoadState("loading");
    };

    dom.addEventListener("webglcontextlost", onContextLost, false);
    dom.addEventListener("webglcontextrestored", onContextRestored, false);

    // Empty container before appending
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(dom);

    // ─── Three.js Scene Setup ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 10.2);
    camera.lookAt(0, 0, 0);

    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    // Scientific Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const stellarKeyLight = new THREE.DirectionalLight(0xf8fafc, 3.2);
    stellarKeyLight.position.set(7, 10, 8);
    scene.add(stellarKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    cyanRimLight.position.set(-8, -4, -6);
    scene.add(cyanRimLight);

    const pulsarFillLight = new THREE.DirectionalLight(0x818cf8, 1.6);
    pulsarFillLight.position.set(0, -7, 6);
    scene.add(pulsarFillLight);

    // Materials and Geometries tracking for leak-free disposal
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

    // Optimized segment counts for mobile performance
    const sphereSegs = isMobile ? 32 : 48;
    const coreGeo = new THREE.SphereGeometry(1.22, sphereSegs, sphereSegs);
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
    const atmosphereGeo = new THREE.SphereGeometry(1.36, sphereSegs, sphereSegs);
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
    const meridianGeo = new THREE.IcosahedronGeometry(1.42, isMobile ? 1 : 2);
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

    const orbitPointsCount = isMobile ? 64 : 128;
    const createEllipticalOrbit = (
      xRadius: number,
      yRadius: number,
      inclinationX: number,
      inclinationZ: number,
      color: number,
      opacity: number
    ) => {
      const curve = new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(orbitPointsCount);
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

    const orbit1 = createEllipticalOrbit(2.8, 2.5, Math.PI / 3.2, 0.2, 0x38bdf8, 0.35);
    orbitsGroup.add(orbit1.line);

    const orbit2 = createEllipticalOrbit(3.3, 3.0, -Math.PI / 2.6, 0.5, 0x94a3b8, 0.28);
    orbitsGroup.add(orbit2.line);

    const orbit3 = createEllipticalOrbit(3.9, 3.6, Math.PI / 4.5, -0.6, 0x818cf8, 0.22);
    orbitsGroup.add(orbit3.line);

    // ─── 3. Precision Astrolabe Gimbal Rings (Physical Instrument) ────────────────
    const torusTubular = isMobile ? 64 : 96;
    const gimbalRing1Geo = new THREE.TorusGeometry(2.35, 0.032, 12, torusTubular);
    geometriesToDispose.push(gimbalRing1Geo);
    const gimbalRing1 = new THREE.Mesh(gimbalRing1Geo, cosmicBlueAlloy);
    rootAssembly.add(gimbalRing1);

    const gimbalRing2Geo = new THREE.TorusGeometry(3.1, 0.038, 12, torusTubular);
    geometriesToDispose.push(gimbalRing2Geo);
    const gimbalRing2 = new THREE.Mesh(gimbalRing2Geo, aerospaceTitanium);
    rootAssembly.add(gimbalRing2);

    // Coordinate telemetry beacons along outer gimbal
    const beaconGeo = new THREE.SphereGeometry(0.065, 12, 12);
    geometriesToDispose.push(beaconGeo);
    const beaconCount = 6;
    for (let i = 0; i < beaconCount; i++) {
      const angle = (i * Math.PI * 2) / beaconCount;
      const beacon = new THREE.Mesh(beaconGeo, warmStarlightBeacon);
      beacon.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 3.1, 0);
      gimbalRing2.add(beacon);
    }

    // ─── 4. Orbiting Spacecraft Probes (Keplerian Motion) ──────────────────────────
    const satGroup1 = new THREE.Group();
    rootAssembly.add(satGroup1);

    const satProbeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    geometriesToDispose.push(satProbeGeo);
    const satProbeMesh = new THREE.Mesh(satProbeGeo, stellarCyanGlow);
    satGroup1.add(satProbeMesh);

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

    const satGroup2 = new THREE.Group();
    rootAssembly.add(satGroup2);

    const pulsarNodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
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
    const particleCount = isMobile ? 70 : 120;
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

    // ─── 6. Pointer Parallax & Interactive Physics ────────────────────────────────
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

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mousemove", onWindowPointerMove);

    // ─── 7. Resize Observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    ro.observe(container);

    // ─── 8. Intersection Observer ─────────────────────────────────────────────────
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

    // ─── 9. Animation Loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let hasRenderedFirstFrame = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.15 : 1.0;

      // Gyroscopic rotations
      gimbalRing1.rotation.x = elapsed * 0.35 * motionScale;
      gimbalRing1.rotation.y = elapsed * 0.25 * motionScale;

      gimbalRing2.rotation.y = -elapsed * 0.28 * motionScale;
      gimbalRing2.rotation.z = elapsed * 0.18 * motionScale;

      centralBodyGroup.rotation.y = elapsed * 0.22 * motionScale;
      meridianMesh.rotation.y = -elapsed * 0.15 * motionScale;
      meridianMesh.rotation.x = elapsed * 0.12 * motionScale;

      const atmosScale = 1.0 + Math.sin(elapsed * 2.0) * 0.018;
      atmosphereMesh.scale.set(atmosScale, atmosScale, atmosScale);

      // Orbit 1 Spacecraft Probe
      const orbitProgress1 = (elapsed * 0.45 * motionScale) % (Math.PI * 2);
      const satPoint1 = orbit1.curve.getPoint(orbitProgress1 / (Math.PI * 2));
      const satPos1 = new THREE.Vector3(satPoint1.x, satPoint1.y, 0);
      satPos1.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbit1.inclinationX);
      satPos1.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbit1.inclinationZ);
      satGroup1.position.copy(satPos1);
      satGroup1.rotation.y = elapsed * 1.5;

      // Orbit 3 Pulsar Node
      const orbitProgress2 = (elapsed * 0.32 * motionScale) % (Math.PI * 2);
      const satPoint2 = orbit3.curve.getPoint(orbitProgress2 / (Math.PI * 2));
      const satPos2 = new THREE.Vector3(satPoint2.x, satPoint2.y, 0);
      satPos2.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbit3.inclinationX);
      satPos2.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbit3.inclinationZ);
      satGroup2.position.copy(satPos2);

      particlePoints.rotation.y = elapsed * 0.08 * motionScale;

      if (autoRotate && !prefersReducedMotion) {
        targetRotY += 0.0032;
      }

      const desiredRotY = targetRotY + mouseParallaxX;
      const desiredRotX = targetRotX - mouseParallaxY;

      rootAssembly.rotation.y += (desiredRotY - rootAssembly.rotation.y) * 0.055;
      rootAssembly.rotation.x += (desiredRotX - rootAssembly.rotation.x) * 0.055;
      rootAssembly.position.y = Math.sin(elapsed * 1.4) * 0.09 * motionScale;

      renderer.render(scene, camera);

      if (!hasRenderedFirstFrame) {
        hasRenderedFirstFrame = true;
        setLoadState("ready");
      }
    };

    animate();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mousemove", onWindowPointerMove);
      dom.removeEventListener("webglcontextlost", onContextLost);
      dom.removeEventListener("webglcontextrestored", onContextRestored);
      if (autoRotateResumeTimer) clearTimeout(autoRotateResumeTimer);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [exam]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none group bg-transparent overflow-hidden">
      {/* Environmental subtle celestial vignette glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,rgba(3,7,18,0)_72%)] pointer-events-none" />

      {/* Graceful Fallback UI: Always present in DOM; visible when loading or if WebGL fails */}
      {loadState !== "ready" && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <CelestialOrbitFallback exam={exam} />
        </div>
      )}

      {/* Interactive 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center transition-opacity duration-700 relative z-10 ${
          loadState === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Interactive 3D Celestial Armillary Instrument"
      />

      {/* Understated Scientific Telemetry Badge (Visible only when 3D engine is active) */}
      {loadState === "ready" && (
        <div className="hidden sm:inline-flex absolute bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/85 border border-sky-500/25 text-[10px] font-mono tracking-wider text-sky-300/90 backdrop-blur-md pointer-events-none items-center gap-2 shadow-sm whitespace-nowrap transition-opacity group-hover:border-sky-400/40 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>CELESTIAL ORBIT ENGINE • DRAG TO ROTATE</span>
        </div>
      )}
    </div>
  );
}
