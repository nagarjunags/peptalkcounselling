import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function OptionEntry3DVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [strategyMode, setStrategyMode] = useState<"random" | "optimized">("optimized");

  const targetPositions = useRef<number[]>([2.2, 0.7, -0.7, -2.2]);
  const currentPositions = useRef<number[]>([2.2, 0.7, -0.7, -2.2]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(7, 6, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.6);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Apple Style Frosted Titanium & Obsidian Priority Slabs
    const blockMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xf5d061, metalness: 0.9, roughness: 0.2 }), // Tier 1 Dream (Gold)
      new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.85, roughness: 0.25 }), // High Priority (Silver)
      new THREE.MeshStandardMaterial({ color: 0x71717a, metalness: 0.8, roughness: 0.3 }), // Mid Target
      new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.7, roughness: 0.4 }), // Safe Backup
    ];

    const blocks: THREE.Mesh[] = [];
    const geo = new THREE.BoxGeometry(6.0, 0.75, 3.2);

    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(geo, blockMaterials[i]);
      mesh.position.set(0, targetPositions.current[i], 0);
      sceneGroup.add(mesh);
      blocks.push(mesh);
    }

    // Minimalist Studio Floor Grid
    const gridHelper = new THREE.GridHelper(10, 10, 0x3f3f46, 0x18181b);
    gridHelper.position.y = -3.2;
    sceneGroup.add(gridHelper);

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
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      sceneGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.2;

      blocks.forEach((b, i) => {
        currentPositions.current[i] += (targetPositions.current[i] - currentPositions.current[i]) * 0.08;
        b.position.y = currentPositions.current[i];
        b.position.x = Math.sin(elapsed * 1.2 + i) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      blockMaterials.forEach((m) => m.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSetMode = (mode: "random" | "optimized") => {
    setStrategyMode(mode);
    if (mode === "optimized") {
      targetPositions.current = [2.2, 0.7, -0.7, -2.2];
    } else {
      targetPositions.current = [-2.2, 2.2, -0.7, 0.7];
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0c0c0e] border border-white/[0.08] p-5 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Header with Apple-Style Segmented Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <h4 className="text-white font-semibold text-sm tracking-tight">
            Option Hierarchy Architecture
          </h4>
          <p className="text-xs text-[#86868b] mt-0.5">
            Real-time simulation of option entry ordering logic
          </p>
        </div>

        {/* Minimalist Segmented Switcher */}
        <div className="flex items-center bg-white/[0.06] p-0.5 rounded-full border border-white/[0.08] text-xs font-medium w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleSetMode("optimized")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all text-center ${
              strategyMode === "optimized"
                ? "bg-white text-black shadow-sm font-semibold"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            Optimized Strategy
          </button>
          <button
            type="button"
            onClick={() => handleSetMode("random")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all text-center ${
              strategyMode === "random"
                ? "bg-white text-black shadow-sm font-semibold"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            Unstructured Order
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-52 sm:h-64 my-2 cursor-pointer touch-manipulation"
        onClick={() => handleSetMode(strategyMode === "optimized" ? "random" : "optimized")}
        title="Tap to toggle simulation"
      />

      {/* Professional Analysis Output */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className={strategyMode === "optimized" ? "text-white" : "text-[#d4d4d8]"}>
            {strategyMode === "optimized"
              ? "Strategy Status: Maximum Rank Efficiency"
              : "Strategy Status: Suboptimal Early Lock Risk"}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#a1a1a6]">
            {strategyMode === "optimized" ? "Zero Opportunity Loss" : "Higher Choices Blocked"}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[#86868b]">
          {strategyMode === "optimized"
            ? "Top choices (e.g. RVCE, BMSCE) are evaluated first in the allotment algorithm. If closing ranks permit, you secure the higher branch immediately without forfeiting realistic backups."
            : "Placing safe backups above dream options terminates evaluation early. The authority confirms the lower preference automatically, permanently preventing upgrade consideration."}
        </p>
      </div>
    </div>
  );
}
