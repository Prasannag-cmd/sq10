/* ============================================================
   WHY CHOOSE US — Luxury Fullscreen Statistics Experience
   Height: 200vh, ScrollTrigger Pinning, Apple Event Style,
   Three-Layer Depth Blur, Volumetric Lighting & Mouse Parallax
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statParticlesCount = 15;
const generateParticles = () => {
  return Array.from({ length: statParticlesCount }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 240 + 60;
    // Scattered starting positions over text boundaries
    const startX = (Math.random() - 0.5) * 280;
    const startY = (Math.random() - 0.5) * 140 - 20;
    return {
      id: i,
      size: Math.random() * 3.5 + 1.2,
      startX,
      startY,
      targetX: startX + Math.cos(angle) * distance,
      targetY: startY + Math.sin(angle) * distance - 50, // drift upward
    };
  });
};

const stats = [
  { target: '60+', label: 'Projects Completed', particles: generateParticles() },
  { target: '10+', label: 'Years Experience', particles: generateParticles() },
  { target: '50+', label: 'Team Members', particles: generateParticles() },
  { target: '98%', label: 'Client Satisfaction', particles: generateParticles() },
];

// Ambient particles for depth-of-field layers
const generateAmbientParticles = (count, sizeRange, durationRange) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
    delay: Math.random() * -durationRange[1],
  }));
};

const foreParticles = generateAmbientParticles(12, [6, 12], [6, 8]);
const midParticles = generateAmbientParticles(20, [3, 5], [9, 13]);
const backParticles = generateAmbientParticles(30, [1, 2], [15, 22]);

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  // Mouse move interactive 3D parallax tilt
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Animate active slide's inner text wrapper
    gsap.to('.why-us-pin .stat-slide__inner', {
      rotateX: -y * 22, // 3D vertical tilt
      rotateY: x * 22,  // 3D horizontal tilt
      x: x * 35,        // Shift horizontal
      y: y * 35,        // Shift vertical
      duration: 0.8,
      ease: 'power2.out',
    });

    // Subtly shift light streaks layer
    gsap.to('.why-us-pin .stats-bg__light-rays', {
      x: x * 50,
      y: y * 50,
      duration: 1.0,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to('.why-us-pin .stat-slide__inner', {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });
    gsap.to('.why-us-pin .stats-bg__light-rays', {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline synchronized to scroll progress with pinning enabled
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // --- SLIDE 0: 250+ Projects Completed ---
      tl.fromTo('.slide--0 .stat-slide__inner',
        { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 40 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'power3.out' },
        0
      );
      // Dissolve slide 0 out
      tl.to('.slide--0 .stat-slide__inner', {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(15px)',
        y: -30,
        duration: 0.8,
        ease: 'power2.in',
      }, 1.5);
      tl.fromTo('.slide--0 .stat-particle',
        { opacity: 0, scale: 0, x: (i) => stats[0].particles[i].startX, y: (i) => stats[0].particles[i].startY },
        {
          opacity: () => Math.random() * 0.8 + 0.2,
          scale: () => Math.random() * 1.6 + 0.4,
          x: (i) => stats[0].particles[i].targetX,
          y: (i) => stats[0].particles[i].targetY,
          duration: 0.8,
          ease: 'power2.out',
        },
        1.5
      );
      tl.to('.slide--0 .stat-particle', {
        opacity: 0,
        scale: 0.1,
        duration: 0.4,
        ease: 'power1.in',
      }, 2.3);

      // --- SLIDE 1: 10+ Years Experience ---
      tl.fromTo('.slide--1 .stat-slide__inner',
        { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 40 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'power3.out' },
        2.5
      );
      // Dissolve slide 1 out
      tl.to('.slide--1 .stat-slide__inner', {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(15px)',
        y: -30,
        duration: 0.8,
        ease: 'power2.in',
      }, 4.0);
      tl.fromTo('.slide--1 .stat-particle',
        { opacity: 0, scale: 0, x: (i) => stats[1].particles[i].startX, y: (i) => stats[1].particles[i].startY },
        {
          opacity: () => Math.random() * 0.8 + 0.2,
          scale: () => Math.random() * 1.6 + 0.4,
          x: (i) => stats[1].particles[i].targetX,
          y: (i) => stats[1].particles[i].targetY,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.0
      );
      tl.to('.slide--1 .stat-particle', {
        opacity: 0,
        scale: 0.1,
        duration: 0.4,
        ease: 'power1.in',
      }, 4.8);

      // --- SLIDE 2: 50+ Team Members ---
      tl.fromTo('.slide--2 .stat-slide__inner',
        { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 40 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'power3.out' },
        5.0
      );
      // Dissolve slide 2 out
      tl.to('.slide--2 .stat-slide__inner', {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(15px)',
        y: -30,
        duration: 0.8,
        ease: 'power2.in',
      }, 6.5);
      tl.fromTo('.slide--2 .stat-particle',
        { opacity: 0, scale: 0, x: (i) => stats[2].particles[i].startX, y: (i) => stats[2].particles[i].startY },
        {
          opacity: () => Math.random() * 0.8 + 0.2,
          scale: () => Math.random() * 1.6 + 0.4,
          x: (i) => stats[2].particles[i].targetX,
          y: (i) => stats[2].particles[i].targetY,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.5
      );
      tl.to('.slide--2 .stat-particle', {
        opacity: 0,
        scale: 0.1,
        duration: 0.4,
        ease: 'power1.in',
      }, 7.3);

      // --- SLIDE 3: 98% Client Satisfaction ---
      tl.fromTo('.slide--3 .stat-slide__inner',
        { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 40 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'power3.out' },
        7.5
      );
      // Exit slide 3 smoothly at end of pin
      tl.to('.slide--3 .stat-slide__inner', {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 9.2);

    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="why-us-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="why-us-pin" ref={pinRef}>
        {/* Cinematic Background Layer */}
        <div className="stats-bg">
          {/* Volumetric Moving Spotlight Streaks */}
          <div className="stats-bg__light-rays" />
          <div className="stats-bg__rim-light" />
          <div className="stats-bg__ambient-glow" />

          {/* Three-Layer Depth-of-Field Ambient Particles */}
          <div className="stats-bg__ambient-particles">
            {foreParticles.map((p) => (
              <div
                key={`fore-${p.id}`}
                className="ambient-particle ambient-particle--fore"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  '--duration': `${p.duration}s`,
                  '--delay': `${p.delay}s`,
                }}
              />
            ))}
            {midParticles.map((p) => (
              <div
                key={`mid-${p.id}`}
                className="ambient-particle ambient-particle--mid"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  '--duration': `${p.duration}s`,
                  '--delay': `${p.delay}s`,
                }}
              />
            ))}
            {backParticles.map((p) => (
              <div
                key={`back-${p.id}`}
                className="ambient-particle ambient-particle--back"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  '--duration': `${p.duration}s`,
                  '--delay': `${p.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── STAT SLIDES ── */}
        <div className="stats-container">
          {stats.map((stat, slideIdx) => (
            <div key={slideIdx} className={`stat-slide slide--${slideIdx}`}>
              {/* Disintegrating Particle Group */}
              <div className="stat-slide__particles">
                {stat.particles.map((p) => (
                  <div
                    key={p.id}
                    className="stat-particle"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                    }}
                  />
                ))}
              </div>

              {/* 3D Float Inner Wrapper */}
              <div className="stat-slide__inner">
                <div className="stat-slide__number">{stat.target}</div>
                <div className="stat-slide__label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
