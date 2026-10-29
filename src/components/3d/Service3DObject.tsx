export type ServiceObjectType = "rank" | "branch" | "option" | "rounds";

/**
 * Service3DObject: High-performance vector 3D cybernetic visualization.
 *
 * Replaces heavy per-card WebGL renderers with crisp, GPU-accelerated SVG/CSS 3D
 * constructs. This frees 4 concurrent WebGL contexts, preventing context starvation
 * and driver crashes on mobile devices while rendering at an ultra-smooth 60fps.
 */
export default function Service3DObject({ type }: { type: ServiceObjectType }) {
  if (type === "rank") {
    // 1. Quantum Data Monolith & Celestial Orbital Ring (Rank-based guidance)
    return (
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="rankPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="rankRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="rankGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ambient Aura */}
          <circle cx="24" cy="24" r="14" fill="#0284c7" fillOpacity="0.12" />

          {/* Pulsing Elliptical Orbit Ring */}
          <ellipse
            cx="24"
            cy="24"
            rx="19"
            ry="7"
            stroke="url(#rankRingGrad)"
            strokeWidth="1.5"
            transform="rotate(-25 24 24)"
            strokeDasharray="4 2"
            className="animate-[spin_8s_linear_infinite]"
            style={{ transformOrigin: "24px 24px" }}
          />

          {/* Central Isometric Data Monolith */}
          <g filter="url(#rankGlow)">
            {/* Top Face */}
            <polygon points="24,11 31,15 24,19 17,15" fill="#7dd3fc" fillOpacity="0.95" />
            {/* Left Face */}
            <polygon points="17,15 24,19 24,35 17,31" fill="#0284c7" fillOpacity="0.85" />
            {/* Right Face */}
            <polygon points="24,19 31,15 31,31 24,35" fill="#0369a1" fillOpacity="0.95" />
          </g>

          {/* Core Energy Line */}
          <line x1="24" y1="13" x2="24" y2="33" stroke="#fde68a" strokeWidth="1" strokeDasharray="2 2" />

          {/* Orbiting Satellite Node */}
          <circle cx="39" cy="18" r="2" fill="#fde68a" className="animate-pulse" />
        </svg>
      </div>
    );
  }

  if (type === "branch") {
    // 2. Dual Gravitational Gyroscope & Astrolabe Gimbal (Branch & College Selection)
    return (
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="branchGimbal1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="branchGimbal2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>

          {/* Outer Gyro Ring */}
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="url(#branchGimbal1)"
            strokeWidth="1.4"
            strokeDasharray="6 3"
            className="animate-[spin_12s_linear_infinite]"
            style={{ transformOrigin: "24px 24px" }}
          />

          {/* Middle Inclined Ring */}
          <ellipse
            cx="24"
            cy="24"
            rx="14"
            ry="6"
            stroke="url(#branchGimbal2)"
            strokeWidth="1.2"
            transform="rotate(40 24 24)"
            className="animate-[spin_7s_linear_infinite_reverse]"
            style={{ transformOrigin: "24px 24px" }}
          />

          {/* Inner Counter Ring */}
          <ellipse
            cx="24"
            cy="24"
            rx="11"
            ry="4"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.8"
            transform="rotate(-35 24 24)"
          />

          {/* Central Pulsing Coordinate Core */}
          <circle cx="24" cy="24" r="3.5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: "2.4s" }} />
          <circle cx="24" cy="24" r="3" fill="#fde68a" />
        </svg>
      </div>
    );
  }

  if (type === "option") {
    // 3. Optical Spectrometer / Refractive Prism & Laser (Option Entry Guidance)
    return (
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="prismFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="spectralBeam" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Spectral Halo */}
          <ellipse
            cx="24"
            cy="27"
            rx="17"
            ry="6"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
            className="animate-[spin_9s_linear_infinite]"
            style={{ transformOrigin: "24px 27px" }}
          />

          {/* Refraction Beam Passing Through */}
          <path d="M 6 22 L 24 24 L 42 16" stroke="url(#spectralBeam)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 24 24 L 42 26" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />
          <path d="M 24 24 L 41 33" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />

          {/* Isometric Prismatic Body */}
          <polygon points="24,9 35,32 13,32" fill="url(#prismFace)" stroke="#7dd3fc" strokeWidth="1.2" />
          <polygon points="24,9 24,32 13,32" fill="#0284c7" fillOpacity="0.35" />

          {/* Apex Starlight Sparkle */}
          <circle cx="24" cy="9" r="1.8" fill="#fde68a" className="animate-pulse" />
        </svg>
      </div>
    );
  }

  // 4. Relativistic Spacetime Möbius / Multi-Round Orbital Knot (Round Support)
  return (
    <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="mobiusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Outer Orbital Orbit Loop */}
        <circle
          cx="24"
          cy="24"
          r="17"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="4 4"
        />

        {/* Interlocking Infinity Loop (Continuous Round Upgrades) */}
        <path
          d="M 16 24 C 16 19, 21 19, 24 24 C 27 29, 32 29, 32 24 C 32 19, 27 19, 24 24 C 21 29, 16 29, 16 24 Z"
          stroke="url(#mobiusGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />

        {/* Active Stage Radar Sweep Dot */}
        <circle cx="24" cy="24" r="2.5" fill="#fde68a" className="animate-ping" style={{ animationDuration: "1.8s" }} />
        <circle cx="24" cy="24" r="2" fill="#ffffff" />

        {/* Milestone Node Beads (Rounds 1, 2, 3) */}
        <circle cx="16" cy="24" r="1.8" fill="#38bdf8" />
        <circle cx="32" cy="24" r="1.8" fill="#f59e0b" />
      </svg>
    </div>
  );
}
