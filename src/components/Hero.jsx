/* ============================================================
   HERO — Responsive Luxury Construction Landing Page
   Swooping Curved Panel, Premium Trust Grid & Location Tracker
   ============================================================ */
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Hero({ isReady, onOpenEstimator }) {
  const heroRef = useRef(null);

  // Entrance animations
  useEffect(() => {
    if (!heroRef.current || !isReady) return;

    const hero = heroRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Left curved panel slide-in
      tl.fromTo('.hero__overlay-panel',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power4.out' }
      );

      // Tagline
      tl.fromTo('.hero__tagline',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      );

      // Title lines
      tl.fromTo('.hero__title-line',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      );

      // Subtitle
      tl.fromTo('.hero__subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // CTA buttons group
      tl.fromTo('.hero__cta-group',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Stats row items
      tl.fromTo('.hero__stat-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      );

      // Background image reveal zoom
      tl.fromTo('.hero__bg-img',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power3.out' },
        '0' // Start at the beginning of timeline
      );

      // Background container reveal fade
      tl.fromTo('.hero__bg-container',
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.out' },
        '0'
      );

    }, hero);

    return () => ctx.revert();
  }, [isReady]);

  const [isLightsOn, setIsLightsOn] = useState(false); // Default is unlit (dusk)

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className={`hero__bg-container ${isLightsOn ? 'lights-on' : ''}`}>
        <img
          src="/assets/images/luxury-interior-off.png"
          alt="Squaareten Luxury Villa - Unlit"
          className={`hero__bg-img hero__bg-img--off ${!isLightsOn ? 'is-active' : ''}`}
        />
        <img
          src="/assets/images/luxury-interior-on.png"
          alt="Squaareten Luxury Villa - Illuminated"
          className={`hero__bg-img hero__bg-img--on ${isLightsOn ? 'is-active' : ''}`}
        />
      </div>

      {/* Main Overlay Curved Panel Content */}
      <div className="hero__main-container">
        <div className={`hero__curve-wrapper ${isLightsOn ? 'lights-on' : ''}`}>
          <div className={`hero__overlay-panel ${isLightsOn ? 'lights-on' : ''}`}>
            <div className="hero__overlay-content">
              {/* Tagline Badge & Light Switch */}
              <div className="hero__tagline-row">
                <div className="hero__tagline">
                  <span className="hero__tagline-arrow">✦</span>
                  <span className="hero__tagline-text">BUILDING LANDMARKS, CREATING VALUE</span>
                </div>

                <button
                  type="button"
                  className={`hero__light-switch ${isLightsOn ? 'is-active' : ''}`}
                  onClick={() => setIsLightsOn(prev => !prev)}
                  title="Toggle Villa Lights"
                  aria-label="Toggle Villa Lights"
                >
                  <span className="hero__switch-label">VILLA LIGHTS</span>
                  <div className="hero__switch-track">
                    <div className="hero__switch-thumb">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {isLightsOn ? (
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                        ) : (
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        )}
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              {/* Main Title */}
              <h1 className="hero__title">
                <span className="hero__title-line">BUILDING THE FUTURE</span>
                <span className="hero__title-line hero__title-line--gold">OF TAMIL NADU</span>
              </h1>

              {/* Sub-headline Description */}
              <p className="hero__subtitle">
                Premium Construction, Villa Development & Investment-Oriented Layout Projects Across Tamil Nadu.
              </p>

              {/* Action Buttons */}
              <div className="hero__cta-group">
                <a href="#future-projects" className="hero__btn-explore">
                  <span className="hero__btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  </span>
                  <span>EXPLORE PROJECTS</span>
                  <span className="hero__btn-arrow">➔</span>
                </a>

                <a href="#contact" className="hero__btn-visit">
                  <span className="hero__btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <span>SCHEDULE SITE VISIT</span>
                  <span className="hero__btn-arrow">➔</span>
                </a>

                <button type="button" onClick={onOpenEstimator} className="hero__btn-visit" style={{ cursor: 'pointer' }}>
                  <span className="hero__btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                      <polyline points="7.5 19.79 7.5 14.6 3 12" />
                      <polyline points="21 12 16.5 14.6 16.5 19.79" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </span>
                  <span>COST ESTIMATE</span>
                  <span className="hero__btn-arrow">➔</span>
                </button>
              </div>

              {/* Grid Statistics Row */}
              <div className="hero__stats-row">
                <div className="hero__stat-item">
                  <div className="hero__stat-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="9" y1="22" x2="9" y2="16" />
                      <line x1="15" y1="22" x2="15" y2="16" />
                      <line x1="9" y1="16" x2="15" y2="16" />
                      <path d="M8 6h2" />
                      <path d="M14 6h2" />
                      <path d="M8 10h2" />
                      <path d="M14 10h2" />
                    </svg>
                  </div>
                  <div className="hero__stat-numbers">
                    <span className="hero__stat-value">60+</span>
                    <span className="hero__stat-label">Projects Completed</span>
                  </div>
                </div>

                <div className="hero__stat-item">
                  <div className="hero__stat-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="hero__stat-numbers">
                    <span className="hero__stat-value">100+</span>
                    <span className="hero__stat-label">Happy Clients</span>
                  </div>
                </div>

                <div className="hero__stat-item">
                  <div className="hero__stat-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" y1="3" x2="9" y2="18" />
                      <line x1="15" y1="6" x2="15" y2="21" />
                    </svg>
                  </div>
                  <div className="hero__stat-numbers">
                    <span className="hero__stat-value">25+</span>
                    <span className="hero__stat-label">Acres Developed</span>
                  </div>
                </div>

                <div className="hero__stat-item">
                  <div className="hero__stat-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div className="hero__stat-numbers">
                    <span className="hero__stat-value">10+</span>
                    <span className="hero__stat-label">Years of Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
