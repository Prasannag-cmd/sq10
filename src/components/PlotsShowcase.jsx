/* ============================================================
   PLOTS SHOWCASE — Redesigned visual showcase and quick links
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Carousel Slides (exactly 5 images)
const CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    img: '/assets/images/plots-slide-1.png',
    link: '/projects/karuppiah-nagar'
  },
  {
    id: 'slide-2',
    img: '/assets/images/plots-slide-2.png',
    link: '/projects/karuppiah-nagar'
  },
  {
    id: 'slide-3',
    img: '/assets/images/plots-slide-3.png',
    link: '/projects/karuppiah-nagar'
  },
  {
    id: 'slide-4',
    img: '/assets/images/plots-slide-4.png',
    link: '/projects/plots'
  },
  {
    id: 'slide-5',
    img: '/assets/images/plots-slide-5.png',
    link: '/projects/plots'
  }
];

// Independent Navigation Quick Links (Palamedu removed)
const NAVIGATION_BUTTONS = [
  { label: 'Karuppiah Nagar Phase 1', path: '/projects/karuppiah-nagar' },
  { label: 'Karuppiah Nagar Phase 2', path: '/projects/karuppiah-nagar' },
  { label: 'Premium Plots', path: '/projects/plots' },
  { label: 'Upcoming Projects', path: '/projects' },
  { label: 'More Projects', path: '/projects' }
];

export default function PlotsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const slideRef = useRef(null);
  const contentOverlayRef = useRef(null);
  const buttonsContainerRef = useRef(null);
  
  // Touch coordinates for swipe support
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  // Auto-play interval: always active and resets on activeIndex changes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 2000); // 2 seconds slide duration

    return () => clearInterval(timer);
  }, [activeIndex]);

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

  // Trigger animations whenever slide changes
  useEffect(() => {
    if (!slideRef.current || !contentOverlayRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom & Parallax entrance on active slide image
      gsap.fromTo('.plots-showcase__bg-img-active',
        { scale: 1.08, filter: 'blur(3px)' },
        { scale: 1.0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
      );

      // Fade in Details button
      gsap.fromTo('.plots-showcase__content-anim',
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartRef.current - touchEndRef.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
  };

  const activeSlide = CAROUSEL_SLIDES[activeIndex];

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

      {/* Main Full-Width Visual Showcase Carousel */}
      <div 
        className="plots-showcase__carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image Slide with Parallax Effect */}
        <div className="plots-showcase__slide-bg" ref={slideRef}>
          <img 
            src={activeSlide.img} 
            alt="Plots & Enclaves visual showcase" 
            className="plots-showcase__bg-img-active"
          />
          {/* Subtle grid lines matching architectural theme */}
          <div className="plots-showcase__bg-blueprint-lines"></div>
        </div>

        {/* Content Overlay - Positioned on the Right */}
        <div className="plots-showcase__content-container" ref={contentOverlayRef}>
          <div className="plots-showcase__content-card-simple">
            <Link 
              to="/projects/karuppiah-nagar" 
              className="kn-btn kn-btn--primary plots-showcase__more-details-btn plots-showcase__content-anim"
            >
              <span>More Details</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* Slide Progress Indicator Bar */}
        <div className="plots-showcase__progress-bar-container">
          <div 
            className="plots-showcase__progress-bar"
            style={{ 
              width: `${((activeIndex + 1) / CAROUSEL_SLIDES.length) * 100}%`,
              transition: 'width 0.4s ease-out'
            }}
          ></div>
        </div>
      </div>

      {/* Project Navigation Quick Links (Directly Below Carousel) */}
      <div className="plots-showcase__tabs-container">
        <div className="container">
          <div className="plots-showcase__tabs-inner" ref={buttonsContainerRef}>
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
