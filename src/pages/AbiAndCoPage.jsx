/* ============================================================
   ABI & CO DETAIL PAGE — Custom Commercial & Interior Showcase
   ============================================================ */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShowroomPlan from '../components/ShowroomPlan';
import '../styles/abi-and-co.css';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  '/assets/images/abi-exterior-1.jpg',
  '/assets/images/abi-exterior-2.jpg',
  '/assets/images/abi-interior.jpg',
  '/assets/images/abi-night.jpg'
];

/* ── Custom Premium Gold SVGs for Specifications ─────── */
const ProjectTypeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <path d="M9 22V12h6v10M2 9h20M2 15h20" />
  </svg>
);

const LandAreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6l9-3 9 3v12l-9 3-9-3V6z" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);

const BuiltUpAreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StatusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const LocationPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#C9A96E' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function AbiAndCoPage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  // Animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo('.pd-main-grid',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    }, pageRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="project-detail-page app-layout is-ready" ref={pageRef} style={{ backgroundColor: '#0C0806', color: '#FFFFFF' }}>
      <Navbar alwaysScrolled />

      <main style={{ padding: '120px 0 var(--space-4xl) 0' }}>
        <div className="container">
          
          {/* Back Button */}
          <button 
            className="pd-hero__back" 
            onClick={() => navigate('/projects')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'rgba(255, 255, 255, 0.6)', 
              cursor: 'pointer', 
              fontSize: '0.9rem', 
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            ← Back to Projects
          </button>

          {/* ── TOP SECTION: 2-Column Gallery & Specs ── */}
          <div className="pd-main-grid" style={{ marginBottom: '80px' }}>
            
            {/* Left: Info Specifications Card */}
            <div className="pd-details-panel">
              <span className="pd-details-cat" style={{ display: 'block', color: '#C9A96E', fontSize: '0.6875rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Commercial & Interiors
              </span>
              <h1 className="pd-details-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px', fontStyle: 'italic', fontWeight: '700' }}>
                Abi & Co — Home Appliances
              </h1>
              <div className="pd-details-loc" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '20px' }}>
                <LocationPin />
                <span>Bypass Road, Madurai</span>
              </div>
              <p className="pd-details-desc" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '30px' }}>
                Abi & Co stands as a premier double-story commercial showroom landmark built and designed by Squaare Ten Constructions. Merging large structural glazing spans with custom internal cabinetry, decorative lighting grids, and custom parking cantilever structures, this project defines our capability in turnkey commercial designs and premium interior transformations.
              </p>

              {/* Specifications Table */}
              <div className="pd-specs-table" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <ProjectTypeIcon />
                    <span>Project Type</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    Showroom & Interiors
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <LandAreaIcon />
                    <span>Total Area</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    4,500 sq.ft
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <BuiltUpAreaIcon />
                    <span>Floors Built</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    Ground + 1 Floor
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <CalendarIcon />
                    <span>Year Completed</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    2026
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <StatusIcon />
                    <span>Status</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    Completed & Fully Open
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Gallery Showcase */}
            <div className="pd-gallery-showcase">
              {/* Main Showcase Image */}
              <div className="pd-main-image-wrap">
                <img 
                  src={galleryImages[activeImageIndex]} 
                  alt="Abi & Co Showroom" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'rgba(255, 255, 255, 0.02)' }} 
                />
              </div>

              {/* Thumbnails Row */}
              <div className="pd-thumbnails-slider" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => {
                    const maxIndex = galleryImages.length > 5 ? 3 : galleryImages.length - 1;
                    setActiveImageIndex(prev => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
                  }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201, 169, 110, 0.2)', color: '#C9A96E', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}
                >
                  ‹
                </button>
                <div className="pd-thumbnails-track" style={{ display: 'flex', gap: '10px', flexGrow: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {galleryImages.slice(0, galleryImages.length > 5 ? 5 : galleryImages.length).map((img, idx) => {
                    const isLast = idx === 4 && galleryImages.length > 5;
                    const remainingCount = galleryImages.length - 4;
                    return (
                      <div 
                        key={idx} 
                        onClick={() => {
                          if (isLast) {
                            // AbiAndCo has no lightbox, so we just set active index or ignore
                            setActiveImageIndex(idx);
                          } else {
                            setActiveImageIndex(idx);
                          }
                        }}
                        style={{ 
                          width: '90px', 
                          height: '60px', 
                          borderRadius: '4px', 
                          overflow: 'hidden', 
                          cursor: 'pointer', 
                          border: !isLast && activeImageIndex === idx ? '2px solid #C9A96E' : '1px solid rgba(255,255,255,0.1)',
                          flexShrink: 0,
                          opacity: !isLast && activeImageIndex === idx ? 1 : 0.6,
                          transition: 'all 0.3s ease',
                          position: 'relative'
                        }}
                      >
                        <img src={img} alt={`thumbnail-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {isLast && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(12, 8, 6, 0.75)',
                            backdropFilter: 'blur(2px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#C9A96E',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            textAlign: 'center'
                          }}>
                            <span style={{ fontSize: '1rem', color: '#FFFFFF' }}>+{remainingCount}</span>
                            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Photos</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => {
                    const maxIndex = galleryImages.length > 5 ? 3 : galleryImages.length - 1;
                    setActiveImageIndex(prev => (prev + 1) % (maxIndex + 1));
                  }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201, 169, 110, 0.2)', color: '#C9A96E', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Layout Component */}
          <ShowroomPlan />
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
