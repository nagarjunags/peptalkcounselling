import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RoundSupport3DRadar() {
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

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 8.5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

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

    // Astronomical Orbit Rings (Deep Space Observatory)
    const ringRadii = [3.0, 4.8, 6.4];
    const rings: THREE.Mesh[] = [];

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.025, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: idx === 2 ? 0x38bdf8 : 0x475569,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: idx === 2 ? 0.7 : 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      rings.push(ring);
    });

    // 5 Checkpoint Nodes (Lifecycle Celestial Phases)
    const nodeCount = 5;
    const nodeMeshes: THREE.Mesh[] = [];
    const nodePalette = [0x94a3b8, 0x60a5fa, 0x818cf8, 0xf59e0b, 0x38bdf8];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * Math.PI * 2) / nodeCount - Math.PI / 2;
      const radius = 4.8;

      const sphereGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: nodePalette[i],
        emissive: nodePalette[i],
        emissiveIntensity: 0.45,
        metalness: 0.85,
        roughness: 0.2,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      group.add(sphere);
      nodeMeshes.push(sphere);

      // Radial Telemetry Beam
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.2,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius),
      ]);
      const ray = new THREE.Line(lineGeo, lineMat);
      group.add(ray);
    }

    // Central Telemetry Observatory Core
    const coreGroup = new THREE.Group();
    group.add(coreGroup);

    const innerSphereGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.1,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    const gyroRingGeo = new THREE.TorusGeometry(0.95, 0.035, 16, 64);
    const gyroRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const gyroRing1 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    const gyroRing2 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyroRing2.rotation.y = Math.PI / 2;
    coreGroup.add(gyroRing1);
    coreGroup.add(gyroRing2);

    // Celestial Radar Sweep Arc
    const sweepGeo = new THREE.ConeGeometry(6.4, 0.02, 48, 1, true, 0, Math.PI / 6);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.1,
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

      // Smooth sweep rotation
      sweep.rotation.z = -elapsed * 0.85 * motionScale;

      // Gyro Core gentle rotation
      gyroRing1.rotation.x = elapsed * 0.7 * motionScale;
      gyroRing1.rotation.y = elapsed * 0.4 * motionScale;
      gyroRing2.rotation.y = -elapsed * 0.6 * motionScale;
      gyroRing2.rotation.z = elapsed * 0.3 * motionScale;

      // Checkpoint nodes gentle harmonic oscillation
      nodeMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsed * 1.4 + idx * 0.8) * 0.14 * motionScale;
      });

      // Subtle tilt of the whole orbital plane
      group.rotation.y = Math.sin(elapsed * 0.25) * 0.12 * motionScale;
      group.rotation.x = Math.sin(elapsed * 0.18) * 0.04 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-72 sm:h-88 relative flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
}
