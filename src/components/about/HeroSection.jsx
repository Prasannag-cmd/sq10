/* ============================================================
   HERO SECTION — Premium Fullscreen Luxury Experience
   Inspired by Apple, Dwellist, Foster + Partners
   ============================================================ */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle lists for text disintegration on scroll
const particlesCount = 45;
const textParticlesData = Array.from({ length: particlesCount }).map((_, i) => {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 140 + 40;
  return {
    id: i,
    size: Math.random() * 4 + 2, // 2px to 6px
    x: Math.cos(angle) * radius * 1.6, // spread horizontal
    y: Math.sin(angle) * radius * 0.45, // spread vertical
    driftX: (Math.random() - 0.5) * 180,
    driftY: -400 - Math.random() * 300,
  };
});

// Ambient background particles
const ambientParticlesData = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * -15,
}));

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const depthBlurRef = useRef(null);
  const titleRef = useRef(null);

  // Magnetic button effect handler
  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline for words
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade and float in details
          gsap.to('.about-hero__desc', {
            opacity: 0.75,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          });
          gsap.to('.about-hero__actions', {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            delay: 0.15,
          });
          gsap.to('.about-hero__scroll', {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            delay: 0.3,
          });
        }
      });

      // Staggered word animation: Mask reveal, Blur, Upward translation, Opacity
      const words = titleRef.current?.querySelectorAll('.word');
      if (words?.length) {
        words.forEach((word, idx) => {
          tl.to(word, {
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power4.out',
          }, idx * 0.95);
        });
      }

      // 2. Background initial zoom entry
      gsap.fromTo(bgRef.current,
        { scale: 1.1, filter: 'blur(8px)' },
        { scale: 1.05, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' }
      );

      // 3. Scroll Trigger interactions (disintegration, zoom, parallax)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: false,
        }
      });

      // Fade out title with blur and shrink
      if (titleRef.current) {
        tlScroll.to(titleRef.current, {
          opacity: 0,
          filter: 'blur(20px)',
          scale: 0.85,
          y: -120,
          ease: 'none',
        }, 0);
      }

      // Fade details on scroll
      tlScroll.to('.about-hero__desc, .about-hero__actions, .about-hero__scroll', {
        opacity: 0,
        y: -60,
        ease: 'none',
      }, 0);

      // Trigger text particles splitting off
      tlScroll.fromTo('.text-particle',
        { opacity: 0, scale: 0 },
        {
          opacity: () => Math.random() * 0.7 + 0.3,
          scale: () => Math.random() * 1.5 + 0.5,
          y: (i) => textParticlesData[i].driftY,
          x: (i) => `+=${textParticlesData[i].driftX}`,
          ease: 'power1.out',
        },
        0
      );

      // Parallax zoom background & depth-of-field blur shift
      tlScroll.to(bgRef.current, {
        scale: 1.2,
        y: '8%',
        ease: 'none',
      }, 0);

      // Fade in depth blur layer as we scroll
      if (depthBlurRef.current) {
        tlScroll.to(depthBlurRef.current, {
          opacity: 0.8,
          scale: 1.25,
          y: '8%',
          ease: 'none',
        }, 0);
      }

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-hero" ref={sectionRef}>
      {/* Cinematic Background Engine */}
      <div className="about-hero__bg-container">
        {/* Main Background Image Layer */}
        <div className="about-hero__bg" ref={bgRef}>
          <img src="/assets/images/hero-bg.png" alt="Luxury construction backdrop" loading="eager" />
        </div>

        {/* Depth Blur Image Layer (for depth-of-field shifting) */}
        <div className="about-hero__depth-blur" ref={depthBlurRef}>
          <img src="/assets/images/hero-bg.png" alt="Depth blur overlay" loading="eager" />
        </div>

        {/* Ambient Moving Light Beam */}
        <div className="about-hero__light-rays" />

        {/* Glass Prism Reflection */}
        <div className="about-hero__glass-reflection" />

        {/* Cinematic Dark Overlay */}
        <div className="about-hero__overlay" />

        {/* Floating Ambient Gold Dust Particles */}
        <div className="about-hero__ambient-particles">
          {ambientParticlesData.map((p) => (
            <div
              key={p.id}
              className="ambient-particle"
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

      {/* Disintegrating Text Particles */}
      <div className="about-hero__text-particles">
        {textParticlesData.map((p) => (
          <div
            key={p.id}
            className="text-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="about-hero__content">
        <h1 className="about-hero__title" ref={titleRef}>
          <span className="line-wrapper">
            <span className="word word--1">Building</span>
          </span>
          <span className="line-wrapper">
            <span className="word word--2">
              <span className="highlight">Tomorrow's</span>
            </span>
          </span>
          <span className="line-wrapper">
            <span className="word word--3">Landmarks</span>
          </span>
        </h1>

        <p className="about-hero__desc">
          We shape the future of luxury architectures. By combining cinematic design principles
          with unmatched structural mastery, Squaareten Construction Pvt Ltd crafts structural landmarks
          that redefine landscapes and endure for generations.
        </p>

        <div className="about-hero__actions">
          <Link
            to="/projects"
            className="btn--gold"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            View Projects
          </Link>
          <a
            href="/#contact"
            className="btn--ghost"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Get Consultation
          </a>
        </div>
      </div>

      {/* Premium Circular Scroll Indicator */}
      <div className="about-hero__scroll">
        <div className="scroll-indicator" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <svg viewBox="0 0 100 100" className="scroll-indicator__circle">
            <path id="scrollCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
            <text className="scroll-indicator__text">
              <textPath href="#scrollCirclePath" startOffset="0%">
                SCROLL • SCROLL • SCROLL •
              </textPath>
            </text>
          </svg>
          <div className="scroll-indicator__center">
            <div className="scroll-indicator__dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
