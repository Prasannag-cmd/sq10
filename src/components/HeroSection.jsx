/* ============================================================
   KARUPPIAH NAGAR — Hero Section
   Fullscreen hero with particle canvas, GSAP animations
   ============================================================ */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/karuppiah-nagar.css';

/* ── Lightweight Canvas Particles ─────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const GOLD = 'rgba(201,169,110,';

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + p.o + ')';
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = GOLD + (0.08 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="kn-hero__particles" />;
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.kn-hero__badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
      .fromTo('.kn-hero__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
      .fromTo('.kn-hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo('.kn-hero__cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
      .fromTo('.kn-hero__stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
  }, []);

  const scrollToPlots = () => {
    const el = document.getElementById('kn-masterplan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="kn-hero" ref={heroRef}>
      <ParticleCanvas />
      <div className="kn-hero__overlay" />
      <div className="kn-hero__content" ref={contentRef}>
        <span className="kn-hero__badge">✦ SQUARETEN CONSTRUCTIONS PVT LTD</span>
        <h1 className="kn-hero__title">Karuppiah Nagar</h1>
        <p className="kn-hero__subtitle">
          Premium residential plots at Kovilpapakudi, Madurai — where tradition meets modern living.
        </p>
        <div className="kn-hero__cta-group kn-hero__cta">
          <button className="kn-btn kn-btn--primary" onClick={scrollToPlots}>
            Explore Master Plan
          </button>
          <a href="tel:+919750008484" className="kn-btn kn-btn--outline">
            Call Now
          </a>
        </div>
        <div className="kn-hero__stats">
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">30+</span>
            <span className="kn-hero__stat-label">Premium Plots</span>
          </div>
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">DTCP</span>
            <span className="kn-hero__stat-label">Approved</span>
          </div>
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">100%</span>
            <span className="kn-hero__stat-label">Clear Title</span>
          </div>
        </div>
      </div>
      <div className="kn-hero__scroll-indicator">
        <span>Scroll to explore</span>
        <div className="kn-hero__scroll-line" />
      </div>
    </section>
  );
}
