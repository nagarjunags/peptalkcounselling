import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DGatewayProps {
  exam: string;
}

export default function Hero3DGateway({ exam }: Hero3DGatewayProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    let width = container.clientWidth || (isMobile ? 320 : 460);
    let height = container.clientHeight || (isMobile ? 320 : 440);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 23);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Apple-Style Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key Light (Clean White Studio Spot)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    // Rim Light (Cool Titanium Specular)
    const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.0);
    rimLight.position.set(-14, 10, -10);
    scene.add(rimLight);

    // Warm Soft Fill Light
    const fillLight = new THREE.PointLight(0xfef08a, 1.8, 30);
    fillLight.position.set(0, -8, 12);
    scene.add(fillLight);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ─── 1. PHOTOREALISTIC TITANIUM MORTARBOARD ─────────────────────────
    const capGroup = new THREE.Group();

    // Board: Sleek obsidian ceramic with subtle metallic sheen
    const boardGeo = new THREE.BoxGeometry(6.6, 0.22, 6.6);
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.2,
      envMapIntensity: 1.0,
    });
    const capBoard = new THREE.Mesh(boardGeo, obsidianMat);
    capBoard.rotation.y = Math.PI / 4;
    capGroup.add(capBoard);

    // Skullcap
    const skullGeo = new THREE.CylinderGeometry(2.3, 2.6, 1.5, 32);
    const skullMesh = new THREE.Mesh(skullGeo, obsidianMat);
    skullMesh.position.y = -0.85;
    capGroup.add(skullMesh);

    // Brushed Champagne Gold Top Fastener
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5d061,
      metalness: 0.95,
      roughness: 0.15,
    });
    const buttonGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 24);
    const buttonMesh = new THREE.Mesh(buttonGeo, goldMat);
    buttonMesh.position.y = 0.18;
    capGroup.add(buttonMesh);

    // Precision Gold Tassel
    const tasselGroup = new THREE.Group();
    const stringGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.3, 12);
    const stringMesh = new THREE.Mesh(stringGeo, goldMat);
    stringMesh.position.set(1.4, -0.85, 1.4);
    stringMesh.rotation.z = -0.32;
    stringMesh.rotation.x = 0.32;
    tasselGroup.add(stringMesh);

    const bobGeo = new THREE.ConeGeometry(0.28, 0.9, 24);
    const bobMesh = new THREE.Mesh(bobGeo, goldMat);
    bobMesh.position.set(2.0, -1.95, 2.0);
    bobMesh.rotation.x = Math.PI;
    tasselGroup.add(bobMesh);

    capGroup.add(tasselGroup);
    capGroup.position.y = 1.0;
    masterGroup.add(capGroup);

    // ─── 2. MINIMALIST TITANIUM GYROSCOPIC RINGS ────────────────────────
    // Hairline Outer Ring (Space Titanium)
    const outerRingGeo = new THREE.TorusGeometry(6.8, 0.05, 16, 120);
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, titaniumMat);
    outerRing.rotation.x = Math.PI / 2.25;
    masterGroup.add(outerRing);

    // Hairline Inner Ring (Champagne Gold)
    const innerRingGeo = new THREE.TorusGeometry(5.4, 0.045, 16, 96);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
    innerRing.rotation.x = -Math.PI / 3;
    masterGroup.add(innerRing);

    // ─── 3. REFINED METALLIC SATELLITE BEACONS ──────────────────────────
    const satCount = isMobile ? 3 : 5;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.18, 16, 16);

    for (let i = 0; i < satCount; i++) {
      const isGold = i % 2 === 0;
      const satMesh = new THREE.Mesh(satGeo, isGold ? goldMat : titaniumMat);
      masterGroup.add(satMesh);
      satellites.push(satMesh);
    }

    // ─── 4. FLOATING PRISM (Rank Allotment Sculpture) ───────────────────
    const gemGeo = new THREE.OctahedronGeometry(1.0, 0);
    const rankGem = new THREE.Mesh(gemGeo, goldMat);
    rankGem.position.set(0, 4.4, 0);
    masterGroup.add(rankGem);

    // ─── INTERACTION & TOUCH/MOUSE CONTROLS ─────────────────────────────
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let autoRotationSpeed = 0.005;

    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalSwipe = false;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = normX * 0.4;
        targetRotationX = normY * 0.3;
        return;
      }
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      masterGroup.rotation.y += deltaX * 0.008;
      masterGroup.rotation.x += deltaY * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch handling allowing native vertical scroll
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        isHorizontalSwipe = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const dx = Math.abs(currentX - touchStartX);
        const dy = Math.abs(currentY - touchStartY);

        if (!isHorizontalSwipe && dx > 8 && dx > dy) {
          isHorizontalSwipe = true;
        }

        if (isHorizontalSwipe) {
          const deltaX = currentX - prevMouseX;
          masterGroup.rotation.y += deltaX * 0.012;
        }
        prevMouseX = currentX;
        prevMouseY = currentY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      isHorizontalSwipe = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Observer
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
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Smooth floating physics
      capGroup.position.y = 1.0 + Math.sin(elapsed * 1.5) * 0.2;
      capGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.04;
      tasselGroup.rotation.z = Math.sin(elapsed * 2.0) * 0.08;

      // Gem float
      rankGem.rotation.y = elapsed * 0.8;
      rankGem.rotation.x = elapsed * 0.5;
      rankGem.position.y = 4.4 + Math.sin(elapsed * 1.8) * 0.15;

      // Rings Rotation
      outerRing.rotation.z = elapsed * 0.3;
      innerRing.rotation.y = -elapsed * 0.45;

      // Satellites
      satellites.forEach((sat, i) => {
        const angle = elapsed * 0.5 + (i * Math.PI * 2) / satCount;
        const radius = 6.0;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.8,
          Math.sin(angle) * radius
        );
      });

      // Smooth subtle base rotation
      if (!isDragging) {
        masterGroup.rotation.y += autoRotationSpeed + targetRotationY * 0.015;
        masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      renderer.dispose();
      boardGeo.dispose();
      obsidianMat.dispose();
      skullGeo.dispose();
      buttonGeo.dispose();
      goldMat.dispose();
      stringGeo.dispose();
      bobGeo.dispose();
      outerRingGeo.dispose();
      titaniumMat.dispose();
      innerRingGeo.dispose();
      satGeo.dispose();
      gemGeo.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mx-auto select-none touch-pan-y"
      role="region"
      aria-label="3D Model Representation of Counselling Achievement"
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
      />

      {/* Apple-Style Minimalist Floating Tag */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl text-xs text-[#a1a1a6] font-medium tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>{exam} Strategy Model • Drag to inspect</span>
      </div>
    </div>
  );
}
