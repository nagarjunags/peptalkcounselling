import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RoundSupport3DRadar() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

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

    // Studio Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x70a9ff, 1.5);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // Titanium Orbit Rings (Vision Pro spatial style)
    const ringRadii = [3.0, 4.8, 6.4];
    const rings: THREE.Mesh[] = [];

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.02, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: idx === 2 ? 0xe2b474 : 0x86868b,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: idx === 2 ? 0.6 : 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      rings.push(ring);
    });

    // 5 Checkpoint Nodes (Phases)
    const nodeCount = 5;
    const nodeMeshes: THREE.Mesh[] = [];
    // Titanium and subtle champagne tones
    const nodePalette = [0xd1d5db, 0x86868b, 0xe2b474, 0xf5c984, 0x34c759];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * Math.PI * 2) / nodeCount - Math.PI / 2;
      const radius = 4.8;

      const sphereGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: nodePalette[i],
        metalness: 0.85,
        roughness: 0.2,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      group.add(sphere);
      nodeMeshes.push(sphere);

      // Delicate radial connector ray
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x86868b,
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

    // Central Precision Titanium Gyro Core
    const coreGroup = new THREE.Group();
    group.add(coreGroup);

    const innerSphereGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.1,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    const gyroRingGeo = new THREE.TorusGeometry(0.9, 0.03, 16, 64);
    const gyroRingMat = new THREE.MeshStandardMaterial({
      color: 0xe2b474,
      metalness: 0.9,
      roughness: 0.2,
    });
    const gyroRing1 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    const gyroRing2 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyroRing2.rotation.y = Math.PI / 2;
    coreGroup.add(gyroRing1);
    coreGroup.add(gyroRing2);

    // Subtle Sweep Arc
    const sweepGeo = new THREE.ConeGeometry(6.4, 0.02, 48, 1, true, 0, Math.PI / 6);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0xe2b474,
      transparent: true,
      opacity: 0.08,
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

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth sweep rotation
      sweep.rotation.z = -elapsed * 0.9;

      // Gyro Core gentle rotation
      gyroRing1.rotation.x = elapsed * 0.8;
      gyroRing1.rotation.y = elapsed * 0.5;
      gyroRing2.rotation.y = -elapsed * 0.7;
      gyroRing2.rotation.z = elapsed * 0.4;

      // Checkpoint nodes gentle harmonic oscillation
      nodeMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsed * 1.5 + idx * 0.8) * 0.15;
      });

      // Very subtle tilt of the whole orbital plane
      group.rotation.y = Math.sin(elapsed * 0.3) * 0.15;
      group.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-80 sm:h-96 relative flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
}
