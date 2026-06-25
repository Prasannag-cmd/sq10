import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Independent Navigation Quick Links (Palamedu removed)
const NAVIGATION_BUTTONS = [
  { label: 'Karuppiah Nagar Phase 1', path: '/projects/karuppiah-nagar' },
  { label: 'Karuppiah Nagar Phase 2', path: '/projects/karuppiah-nagar' },
  { label: 'Premium Plots', path: '/projects/plots' },
  { label: 'Upcoming Projects', path: '/projects' },
  { label: 'More Projects', path: '/projects' }
];

export default function PlotsShowcase() {
  const sectionRef = useRef(null);

  // Entrance animations via GSAP
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.plots-showcase__header-new',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.plots-showcase__carousel-wrapper',
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="plots-showcase-section-new" ref={sectionRef} id="plots-showcase">
      <div className="plots-showcase__header-new">
        <div className="container">
          <span className="section__label">Plots & Enclaves</span>
          <h2 className="section__title">Gated Communities & Strategic Land</h2>
          <p className="plots-showcase__subtitle-new">
            Discover our luxury villa layouts and premium plotting landmarks across South India's premium growth corridors.
          </p>
        </div>
      </div>
      {/* Main Full-Width Visual Showcase (Static Poster - Gated Community Investment Land Poster) */}
      <div className="plots-showcase__carousel-wrapper" style={{ borderBottom: 'none' }}>
        <div className="plots-showcase__slide-bg">
          <Link to="/projects/karuppiah-nagar" style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              src="/assets/images/plots-slide-1.png" 
              alt="Invest In Land - Gated Communities & Strategic Land" 
              className="plots-showcase__bg-img-active"
            />
          </Link>
          <div className="plots-showcase__bg-blueprint-lines"></div>
        </div>
      </div>


      {/* Project Navigation Quick Links (Directly Below Poster) */}
      <div className="plots-showcase__tabs-container">
        <div className="container">
          <div className="plots-showcase__tabs-inner">
            {NAVIGATION_BUTTONS.map((btn, idx) => (
              <Link
                key={idx}
                to={btn.path}
                className="plots-showcase__tab-btn"
              >
                <span>{btn.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
