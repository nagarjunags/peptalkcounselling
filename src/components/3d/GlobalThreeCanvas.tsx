import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobalThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.012);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // Astronomical Starfield (Magnitude distribution: white, cyan, subtle pulsar violet)
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
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
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Floating Scientific Celestial Orbital Structures
    const group = new THREE.Group();
    scene.add(group);

    // Geodesic Wireframes & Celestial Rings
    const celestialWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });

    const violetWireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    // 1. Quantum Octahedron
    const octMesh = new THREE.Mesh(new THREE.OctahedronGeometry(4.5, 1), celestialWireMat);
    octMesh.position.set(-28, 14, -20);
    group.add(octMesh);

    // 2. Astrometry Coordinate Sphere
    const sphereMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(5.0, 1), violetWireMat);
    sphereMesh.position.set(30, -18, -25);
    group.add(sphereMesh);

    // 3. Orbital Resonance Ring
    const ringGeo = new THREE.TorusGeometry(8, 0.04, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(22, 18, -30);
    ringMesh.rotation.x = 1.1;
    group.add(ringMesh);

    // 4. Quantum Core
    const tetraMesh = new THREE.Mesh(new THREE.TetrahedronGeometry(3.5, 0), celestialWireMat);
    tetraMesh.position.set(-24, -14, -18);
    group.add(tetraMesh);

    // Lighting for depth
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
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

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 2.5 - targetX) * 0.03;
      targetY += (-mouseY * 2.5 - targetY) * 0.03;
      camera.position.x = targetX;
      camera.position.y = targetY;

      // Slow orbital drift of celestial structures
      octMesh.rotation.x = elapsed * 0.08;
      octMesh.rotation.y = elapsed * 0.12;

      sphereMesh.rotation.y = -elapsed * 0.09;
      sphereMesh.rotation.z = elapsed * 0.06;

      ringMesh.rotation.z = elapsed * 0.1;

      tetraMesh.rotation.x = -elapsed * 0.07;
      tetraMesh.rotation.y = elapsed * 0.11;

      // Starfield slow cosmic rotation
      starPoints.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
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
