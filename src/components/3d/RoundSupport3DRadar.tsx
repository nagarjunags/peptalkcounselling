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

export default function RoundSupport3DRadar() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState<boolean>(() => !checkWebGLSupport());

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !checkWebGLSupport()) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });

      if (!renderer.getContext()) {
        throw new Error("Unable to acquire WebGL context");
      }
    } catch (err) {
      console.warn("RoundSupport3DRadar: WebGL unavailable, using fallback", err);
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
      console.warn("RoundSupport3DRadar: WebGL context lost");
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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 8.5, 12);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // Deep Space Studio Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xf0f9ff, 2.8);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // Astronomical Orbit Rings
    const ringRadii = [3.0, 4.8, 6.4];
    const ringColors = [0x38bdf8, 0x94a3b8, 0xf59e0b];
    const ringOpacities = [0.45, 0.28, 0.35];

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segs = isMobile ? 64 : 100;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
      }
      ringGeo.setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: ringOpacities[idx],
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      group.add(ringLine);
    });

    // Central Multi-Axis Astrolabe Gyro Core
    const gyroRing1Geo = new THREE.TorusGeometry(1.4, 0.04, 12, isMobile ? 48 : 80);
    const gyroRing1Mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const gyroRing1 = new THREE.Mesh(gyroRing1Geo, gyroRing1Mat);
    group.add(gyroRing1);

    const gyroRing2Geo = new THREE.TorusGeometry(1.0, 0.035, 12, isMobile ? 48 : 80);
    const gyroRing2Mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.15,
    });
    const gyroRing2 = new THREE.Mesh(gyroRing2Geo, gyroRing2Mat);
    group.add(gyroRing2);

    const centerPillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
    const centerPillarMat = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    const centerPillar = new THREE.Mesh(centerPillarGeo, centerPillarMat);
    group.add(centerPillar);

    // Counselling Milestone Node Satellites (Rounds 1, 2, 3)
    const milestoneAngles = [0, 2.1, 4.2];
    const milestoneRadii = [3.0, 4.8, 6.4];
    const nodeColors = [0x38bdf8, 0xfde68a, 0x10b981];
    const nodeMeshes: THREE.Mesh[] = [];

    milestoneAngles.forEach((angle, idx) => {
      const nodeGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[idx],
        emissive: nodeColors[idx],
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(
        Math.cos(angle) * milestoneRadii[idx],
        0,
        Math.sin(angle) * milestoneRadii[idx]
      );
      group.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    });

    // Radar Sweep Beam
    const sweepGeo = new THREE.RingGeometry(0.2, 6.6, 32, 1, 0, Math.PI / 4);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    });
    const sweep = new THREE.Mesh(sweepGeo, sweepMat);
    sweep.rotation.x = Math.PI / 2;
    group.add(sweep);

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
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.15 : 1.0;

      sweep.rotation.z = -elapsed * 0.85 * motionScale;

      gyroRing1.rotation.x = elapsed * 0.7 * motionScale;
      gyroRing1.rotation.y = elapsed * 0.4 * motionScale;
      gyroRing2.rotation.y = -elapsed * 0.6 * motionScale;
      gyroRing2.rotation.z = elapsed * 0.3 * motionScale;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsed * 1.4 + idx * 0.8) * 0.14 * motionScale;
      });

      group.rotation.y = Math.sin(elapsed * 0.25) * 0.12 * motionScale;
      group.rotation.x = Math.sin(elapsed * 0.18) * 0.04 * motionScale;

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
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="w-full h-72 sm:h-88 relative flex items-center justify-center pointer-events-none select-none overflow-hidden bg-transparent">
      <div
        ref={mountRef}
        className={`w-full h-full relative flex items-center justify-center ${
          webglFailed ? "hidden" : "block"
        }`}
        aria-hidden="true"
      />

      {webglFailed && (
        <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 280 280" className="w-64 h-64 max-w-full overflow-visible" fill="none">
            <circle cx="140" cy="140" r="120" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="6 4" />
            <circle cx="140" cy="140" r="85" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="140" cy="140" r="50" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />
            <ellipse cx="140" cy="140" rx="90" ry="30" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" transform="rotate(-30 140 140)" />
            {/* Center Core */}
            <circle cx="140" cy="140" r="12" fill="#0284c7" fillOpacity="0.4" className="animate-pulse" />
            <circle cx="140" cy="140" r="5" fill="#fde68a" />
            {/* Round checkpoint nodes */}
            <circle cx="95" cy="115" r="5" fill="#38bdf8" />
            <circle cx="185" cy="95" r="5" fill="#fde68a" />
            <circle cx="215" cy="170" r="5" fill="#10b981" />
          </svg>
        </div>
      )}
    </div>
  );
}
