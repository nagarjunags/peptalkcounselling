import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobalThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Subtle Apple-style Ambient Starlight Dust
    const particleCount = isMobile ? 50 : 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 1.0 : 1.2,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Precision Titanium Geometric Sculptures in Deep Space
    const sculptureGroup = new THREE.Group();

    // 1. Sleek Torus (Thin hairline titanium ring)
    const ringGeo = new THREE.TorusGeometry(8, 0.06, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x86868b,
      transparent: true,
      opacity: 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-36, 16, -15);
    sculptureGroup.add(ringMesh);

    // 2. Minimalist Icosahedron (Frosted titanium edges)
    const icoGeo = new THREE.IcosahedronGeometry(6.5, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xa1a1a6,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(38, -18, -20);
    sculptureGroup.add(icoMesh);

    // 3. Precision Octahedron
    const octGeo = new THREE.OctahedronGeometry(5, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x6e6e73,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(32, 24, -25);
    sculptureGroup.add(octMesh);

    scene.add(sculptureGroup);

    // Subtle Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      targetX += (mouseX * 5 - targetX) * 0.03;
      targetY += (-mouseY * 5 - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = targetY - (scrollY * 0.015) % 25;
      camera.lookAt(0, 0, 0);

      // Slow, majestic rotation
      ringMesh.rotation.x = elapsed * 0.1;
      ringMesh.rotation.y = elapsed * 0.12;

      icoMesh.rotation.x = elapsed * 0.08;
      icoMesh.rotation.y = elapsed * 0.1;

      octMesh.rotation.z = elapsed * 0.07;
      octMesh.rotation.x = -elapsed * 0.09;

      // Particle subtle drift
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];

        if (Math.abs(posArray[i * 3]) > 70) velocities[i * 3] *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 60) velocities[i * 3 + 1] *= -1;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);

      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
}
