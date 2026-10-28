import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobalThreeCanvas() {
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

    let width = window.innerWidth;
    let height = window.innerHeight;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.014);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.z = 46;

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

    // Subtle Astronomical Starfield
    const starCount = 320;
    const starGeo = new THREE.BufferGeometry();
    geometriesToDispose.push(starGeo);
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xf8fafc), // pure starlight
      new THREE.Color(0x38bdf8), // celestial cyan
      new THREE.Color(0x818cf8), // pulsar violet
      new THREE.Color(0x93c5fd), // nebula blue
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPos[idx] = (Math.random() - 0.5) * 160;
      starPos[idx + 1] = (Math.random() - 0.5) * 160;
      starPos[idx + 2] = (Math.random() - 0.5) * 120;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    materialsToDispose.push(starMat);
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Floating Scientific Celestial Structures
    const group = new THREE.Group();
    scene.add(group);

    const celestialWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    materialsToDispose.push(celestialWireMat);

    const violetWireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    materialsToDispose.push(violetWireMat);

    // 1. Quantum Octahedron
    const octGeo = new THREE.OctahedronGeometry(4.2, 1);
    geometriesToDispose.push(octGeo);
    const octMesh = new THREE.Mesh(octGeo, celestialWireMat);
    octMesh.position.set(-28, 14, -22);
    group.add(octMesh);

    // 2. Astrometry Coordinate Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(4.8, 1);
    geometriesToDispose.push(sphereGeo);
    const sphereMesh = new THREE.Mesh(sphereGeo, violetWireMat);
    sphereMesh.position.set(30, -18, -26);
    group.add(sphereMesh);

    // 3. Orbital Resonance Ring
    const ringGeo = new THREE.TorusGeometry(7.5, 0.035, 16, 80);
    geometriesToDispose.push(ringGeo);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
    });
    materialsToDispose.push(ringMat);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(22, 18, -32);
    ringMesh.rotation.x = 1.1;
    group.add(ringMesh);

    // Ambient Space Light
    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambLight);

    // Parallax mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

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

    // Tab visibility handling
    let isVisible = document.visibilityState === "visible";
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
      const motionScale = prefersReducedMotion ? 0.1 : 1.0;

      // Camera parallax
      targetX += (mouseX * 2.0 - targetX) * 0.025;
      targetY += (-mouseY * 2.0 - targetY) * 0.025;
      camera.position.x = targetX;
      camera.position.y = targetY;

      // Slow orbital drift of celestial structures
      octMesh.rotation.x = elapsed * 0.06 * motionScale;
      octMesh.rotation.y = elapsed * 0.09 * motionScale;

      sphereMesh.rotation.y = -elapsed * 0.07 * motionScale;
      sphereMesh.rotation.z = elapsed * 0.05 * motionScale;

      ringMesh.rotation.z = elapsed * 0.08 * motionScale;

      // Starfield slow cosmic rotation
      starPoints.rotation.y = elapsed * 0.012 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
