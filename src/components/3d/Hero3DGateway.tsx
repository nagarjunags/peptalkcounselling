import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { ExamType } from "../../config/siteConfig";

export default function Hero3DGateway({ exam }: { exam: ExamType }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // Main Scientific Observatory Assembly Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Scientific Aerospace & Space Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    // Stellar Key Light (pure starlight)
    const keyLight = new THREE.DirectionalLight(0xf0f9ff, 3.2);
    keyLight.position.set(6, 9, 8);
    scene.add(keyLight);

    // Deep Cosmic Rim Light (cyan nebula)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Pulsar Violet Fill Light
    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.6);
    fillLight.position.set(0, -6, 5);
    scene.add(fillLight);

    // Materials: Aerospace Titanium, Anodized Cosmic Blue, Refractive Celestial Glass
    const aerospaceTitanium = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.18,
    });

    const cosmicBlueAlloy = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15,
    });

    const stellarCyanGlow = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
    });

    // 1. Central Celestial Core Sphere (Quantum Core)
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    const coreGeo = new THREE.SphereGeometry(1.2, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      metalness: 0.95,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Geodesic Quantum Grid around Core
    const wireCoreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireCoreMesh = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    coreGroup.add(wireCoreMesh);

    // 2. Three Precision Astrolabe Orbital Gimbal Rings
    // Ring 1: Equatorial Orbital Ring
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.04, 16, 96);
    const ring1 = new THREE.Mesh(ring1Geo, cosmicBlueAlloy);
    mainGroup.add(ring1);

    // Ring 2: Polar Orbital Ring
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.045, 16, 96);
    const ring2 = new THREE.Mesh(ring2Geo, aerospaceTitanium);
    mainGroup.add(ring2);

    // Ring 3: Oblique Celestial Meridian Ring
    const ring3Geo = new THREE.TorusGeometry(3.2, 0.05, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, cosmicBlueAlloy);
    mainGroup.add(ring3);

    // 3. Orbiting Satellite Explorer (Keplerian Orbit)
    const satGroup = new THREE.Group();
    mainGroup.add(satGroup);

    const satProbeGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const satProbe = new THREE.Mesh(satProbeGeo, stellarCyanGlow);
    satProbe.position.set(2.8, 0, 0);
    satGroup.add(satProbe);

    // Micro Solar Panels on Satellite
    const panelGeo = new THREE.BoxGeometry(0.35, 0.02, 0.12);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(2.8, 0, 0);
    satGroup.add(panel);

    // 4. Hairline Orbital Trajectory Ring
    const orbitPathGeo = new THREE.TorusGeometry(2.8, 0.012, 8, 128);
    const orbitPathMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
    });
    const orbitPath = new THREE.Mesh(orbitPathGeo, orbitPathMat);
    satGroup.add(orbitPath);

    // 5. Scientific Telemetry Coordinate Beacons (6 Nodes)
    const beaconCount = 6;
    for (let i = 0; i < beaconCount; i++) {
      const angle = (i * Math.PI * 2) / beaconCount;
      const bGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const bMesh = new THREE.Mesh(bGeo, stellarCyanGlow);
      bMesh.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, 0);
      ring3.add(bMesh);
    }

    // Interactive Drag Physics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.15;
    let targetRotationY = 0;
    let autoRotate = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 2500);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

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

      // Gyroscopic differential rotations
      ring1.rotation.x = elapsed * 0.45;
      ring1.rotation.y = elapsed * 0.3;

      ring2.rotation.y = -elapsed * 0.35;
      ring2.rotation.z = elapsed * 0.25;

      ring3.rotation.z = elapsed * 0.2;
      ring3.rotation.x = -elapsed * 0.15;

      // Quantum Core oscillation
      coreGroup.rotation.y = elapsed * 0.5;
      wireCoreMesh.rotation.y = -elapsed * 0.3;
      wireCoreMesh.rotation.x = elapsed * 0.2;

      // Orbiting satellite Explorer
      satGroup.rotation.z = elapsed * 0.8;
      satGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.3;

      // Automatic celestial breath
      if (autoRotate) {
        targetRotationY += 0.004;
      }

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      // Subtle celestial levitation
      mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [exam]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label="Interactive 3D Celestial Orbit Instrument"
      />
      {/* Telemetry Indicator */}
      <div className="hidden sm:flex absolute bottom-0.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-950/70 border border-sky-500/20 text-[10px] lg:text-[11px] font-medium text-sky-300 backdrop-blur-md pointer-events-none items-center gap-1.5 shadow-sm whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>Celestial Orbit Engine • Drag to Rotate</span>
      </div>
    </div>
  );
}
