import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useExam } from "../../context/ExamContext";

export default function OptionEntry3DVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { exam } = useExam();
  const [strategyMode, setStrategyMode] = useState<"random" | "optimized">("optimized");

  const targetPositions = useRef<number[]>([2.2, 0.7, -0.7, -2.2]);
  const currentPositions = useRef<number[]>([2.2, 0.7, -0.7, -2.2]);
  const targetRotations = useRef<number[]>([0, 0, 0, 0]);
  const currentRotations = useRef<number[]>([0, 0, 0, 0]);

  // Three.js material refs for dynamic shader updates
  const blockMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const beamMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const strategyModeRef = useRef<"random" | "optimized">(strategyMode);

  useEffect(() => {
    strategyModeRef.current = strategyMode;
  }, [strategyMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(7, 5.5, 11);
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

    // Celestial Space Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf0f9ff, 2.8);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const hazardLight = new THREE.PointLight(0xf43f5e, 0, 15);
    hazardLight.position.set(0, 2, 4);
    scene.add(hazardLight);

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Central Telemetry Trajectory Guide Beam
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.2, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    beamMatRef.current = beamMat;
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    sceneGroup.add(beamMesh);

    // Priority Telemetry Slabs
    const blockMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        metalness: 0.88,
        roughness: 0.18,
      }), // Slot 1: Dream Reach (Stellar Cyan)
      new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.22,
      }), // Slot 2: Realistic Target (Pulsar Indigo)
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        emissive: 0x0369a1,
        emissiveIntensity: 0.15,
        metalness: 0.9,
        roughness: 0.28,
      }), // Slot 3: Safe Mid-Band (Aerospace Titanium)
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: 0x0f172a,
        emissiveIntensity: 0.1,
        metalness: 0.95,
        roughness: 0.25,
      }), // Slot 4: Guaranteed Anchor (Deep Cosmos)
    ];
    blockMaterialsRef.current = blockMaterials;

    const blocks: THREE.Mesh[] = [];
    const geo = new THREE.BoxGeometry(6.2, 0.72, 3.2);

    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(geo, blockMaterials[i]);
      mesh.position.set(0, targetPositions.current[i], 0);
      sceneGroup.add(mesh);
      blocks.push(mesh);
    }

    // Celestial Coordinate Floor Grid
    const gridHelper = new THREE.GridHelper(10, 10, 0x0284c7, 0x0f172a);
    gridHelper.position.y = -3.2;
    sceneGroup.add(gridHelper);

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
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const isRandom = strategyModeRef.current === "random";

      // Scene rotation
      sceneGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.18;

      // Update trajectory beam
      if (beamMatRef.current) {
        if (isRandom) {
          beamMatRef.current.color.setHex(0xf43f5e);
          beamMatRef.current.opacity = 0.3 + Math.sin(elapsed * 18) * 0.25;
          hazardLight.intensity = 1.6 + Math.sin(elapsed * 12) * 0.8;
        } else {
          beamMatRef.current.color.setHex(0x38bdf8);
          beamMatRef.current.opacity = 0.8 + Math.sin(elapsed * 2.5) * 0.15;
          hazardLight.intensity = 0;
        }
      }

      // Smooth position & rotation transitions
      blocks.forEach((b, i) => {
        currentPositions.current[i] += (targetPositions.current[i] - currentPositions.current[i]) * 0.08;
        currentRotations.current[i] += (targetRotations.current[i] - currentRotations.current[i]) * 0.08;

        b.position.y = currentPositions.current[i];
        b.rotation.z = currentRotations.current[i];
        b.rotation.x = currentRotations.current[i] * 0.45;

        // Visual jitter / float dynamics
        if (isRandom) {
          b.position.x = Math.sin(elapsed * 14 + i * 2.1) * 0.06;
        } else {
          b.position.x = Math.sin(elapsed * 1.2 + i) * 0.08;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      blockMaterials.forEach((m) => m.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const setOptimized = () => {
    setStrategyMode("optimized");
    targetPositions.current = [2.2, 0.7, -0.7, -2.2];
    targetRotations.current = [0, 0, 0, 0];

    // Restore laser-calibrated colors
    if (blockMaterialsRef.current.length === 4) {
      // Slot 1: Dream Reach (Stellar Cyan)
      blockMaterialsRef.current[0].color.setHex(0x38bdf8);
      blockMaterialsRef.current[0].emissive.setHex(0x0284c7);
      blockMaterialsRef.current[0].emissiveIntensity = 0.45;

      // Slot 2: Realistic Target (Pulsar Indigo)
      blockMaterialsRef.current[1].color.setHex(0x818cf8);
      blockMaterialsRef.current[1].emissive.setHex(0x4f46e5);
      blockMaterialsRef.current[1].emissiveIntensity = 0.35;

      // Slot 3: Safe Mid-Band (Aerospace Titanium)
      blockMaterialsRef.current[2].color.setHex(0x94a3b8);
      blockMaterialsRef.current[2].emissive.setHex(0x0369a1);
      blockMaterialsRef.current[2].emissiveIntensity = 0.15;

      // Slot 4: Guaranteed Anchor (Deep Cosmos)
      blockMaterialsRef.current[3].color.setHex(0x1e293b);
      blockMaterialsRef.current[3].emissive.setHex(0x0f172a);
      blockMaterialsRef.current[3].emissiveIntensity = 0.1;
    }
  };

  const setRandom = () => {
    setStrategyMode("random");
    // Inverted chaos: Worst choice placed high, dream choice trapped at bottom
    targetPositions.current = [-2.1, 1.8, 0.5, -0.8];
    targetRotations.current = [0.14, -0.16, 0.09, -0.12];

    // Hazard alarm materials
    if (blockMaterialsRef.current.length === 4) {
      // Misplaced Slot 1 (Worst choice falsely on top): Warning Crimson Lock-in
      blockMaterialsRef.current[1].color.setHex(0xf43f5e);
      blockMaterialsRef.current[1].emissive.setHex(0x991b1b);
      blockMaterialsRef.current[1].emissiveIntensity = 0.75;

      // Slot 0 (Dream choice trapped at bottom): Deactivated & Forfeited
      blockMaterialsRef.current[0].color.setHex(0x334155);
      blockMaterialsRef.current[0].emissive.setHex(0x000000);
      blockMaterialsRef.current[0].emissiveIntensity = 0;

      // Middle slots: Mismatched hazard amber
      blockMaterialsRef.current[2].color.setHex(0xf59e0b);
      blockMaterialsRef.current[2].emissive.setHex(0xb45309);
      blockMaterialsRef.current[2].emissiveIntensity = 0.35;

      blockMaterialsRef.current[3].color.setHex(0x64748b);
      blockMaterialsRef.current[3].emissive.setHex(0x000000);
      blockMaterialsRef.current[3].emissiveIntensity = 0.1;
    }
  };

  const isOptimized = strategyMode === "optimized";
  const authorityName = exam === "COMEDK" ? "COMEDK Authority" : "KEA";

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Visualizer Canvas Container with HUD telemetry overlays */}
      <div className="relative w-full h-64 sm:h-76 rounded-2xl overflow-hidden border border-sky-500/15 bg-[#050b18]/60 backdrop-blur-md shadow-inner flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full" />

        {/* Top Left Live Telemetry HUD Badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-medium tracking-wider flex items-center gap-1.5 backdrop-blur-md border ${
              isOptimized
                ? "bg-sky-950/70 border-sky-500/30 text-sky-300"
                : "bg-rose-950/80 border-rose-500/40 text-rose-300 animate-pulse"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOptimized ? "bg-sky-400" : "bg-rose-500"
              }`}
            />
            <span>
              {isOptimized
                ? "TRAJECTORY: CALIBRATED (DHRONA BATCH)"
                : "ALERT: PREFERENCE INVERSION DETECTED"}
            </span>
          </div>
        </div>

        {/* Top Right State Indicator */}
        <div className="absolute top-3 right-3 pointer-events-none hidden sm:block">
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider backdrop-blur-md border ${
              isOptimized
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/70 border-rose-500/40 text-rose-300"
            }`}
          >
            {isOptimized ? "ALLOTMENT SAFE • ZERO LOCK-OUT" : "HIGH SEAT-LOSS RISK"}
          </div>
        </div>

        {/* Dynamic 3D Slab Label Markers (floating in canvas) */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-slate-400 pointer-events-none px-2 py-1 rounded-lg bg-[#030712]/80 border border-sky-500/10 backdrop-blur-sm">
          <span>Tier 1 (Reach)</span>
          <span>Tier 2 (Target)</span>
          <span>Tier 3 (Safe)</span>
          <span>Tier 4 (Anchor)</span>
        </div>
      </div>

      {/* Interactive Telemetry Toggle Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-slate-900/90 border border-sky-500/20 backdrop-blur-xl mt-4 shadow-lg w-full sm:w-auto">
        <button
          type="button"
          onClick={setOptimized}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
            isOptimized
              ? "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>Dhrona Batch Trajectory (Optimised)</span>
        </button>

        <button
          type="button"
          onClick={setRandom}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
            !isOptimized
              ? "bg-rose-500/20 text-rose-200 border border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.35)]"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Unoptimised Order (Common Mistake)</span>
        </button>
      </div>

      {/* Dynamic Feedback Panel: Emphasizes Dhrona Batch vs Warning for Unoptimised */}
      <div className="w-full mt-4 transition-all duration-300">
        {!isOptimized ? (
          /* CRITICAL WARNING / ERROR PANEL (Shown when Unoptimised is clicked) */
          <div className="apple-card p-4 sm:p-5 border-rose-500/40 bg-rose-950/15 shadow-[0_0_30px_rgba(244,63,94,0.12)] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-400 mt-0.5">
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-rose-200 font-semibold text-sm sm:text-base tracking-tight flex items-center gap-2">
                    <span>Critical Allotment Hazard Detected: Unoptimised Order</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High Risk
                  </span>
                </div>

                <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed mb-3">
                  <strong className="text-white font-semibold">The Premature Lock-in Trap:</strong> By putting lower-tier backup branches or safe colleges above your top choices, the {authorityName} algorithm freezes and allots the lower choice in Round 1. Once allotted, <strong className="text-rose-300 underline underline-offset-2">all options listed below it are irrevocably deleted from your matrix</strong>—permanently locking you out of top colleges you actually qualified for!
                </p>

                {/* 3 Fatal Flaws Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-rose-500/20 text-xs">
                  <div className="flex items-start gap-1.5 text-rose-200/90">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Forfeited Dream Seats:</strong> Can never upgrade to choices placed below.</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-rose-200/90">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Wasted Rank Advantage:</strong> Rank 4k student gets seat meant for 20k.</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-rose-200/90">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Zero Upward Mobility:</strong> Deadlock prevents Round 2 & 3 upgrades.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* OPTIMISED DHRONA BATCH ARCHITECTURE PANEL (Shown when Optimised is active) */
          <div className="apple-card p-4 sm:p-5 border-sky-500/30 bg-sky-950/15 shadow-[0_0_30px_rgba(56,189,248,0.1)] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center flex-shrink-0 text-sky-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sky-200 font-semibold text-sm sm:text-base tracking-tight flex items-center gap-2">
                    <span>Dhrona Batch Optimised Trajectory: Data-Driven Calibration</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Recommended
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                  <strong className="text-white font-semibold">Zero-Loss Laddering:</strong> In the Dhrona Batch, your preference matrix is mathematically sequenced using historical {exam} seat matrix cutoff data. Ambitious reach colleges sit safely at the top with 0% risk of premature lock-in, protected by calibrated target choices and unbreakable safety anchors.
                </p>

                {/* 3 Safeguards Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-sky-500/20 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-sky-400 font-bold">✓</span>
                    <span><strong>Maximum Upward Mobility:</strong> Retain allotted seat while upgrading in next rounds.</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-sky-400 font-bold">✓</span>
                    <span><strong>Rank Maximization:</strong> Squeeze the absolute highest tier college for your score.</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-sky-400 font-bold">✓</span>
                    <span><strong>No Lock-in Traps:</strong> 1-on-1 personalized review eliminates costly mistakes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
