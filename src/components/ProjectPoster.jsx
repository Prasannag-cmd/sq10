/* ============================================================
   PROJECT POSTER — Official Brochure & Flyer Section
   Displays high-res marketing poster with lightbox zoom & download
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPoster({ activePhase = 1 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const sectionRef = useRef(null);
  const posterFrameRef = useRef(null);

  const posterPath = activePhase === 2 
    ? '/assets/images/karuppiah-nagar-phase2-poster.png' 
    : '/assets/images/karuppiah-nagar-poster.jpg';

  const downloadName = activePhase === 2 
    ? 'Karuppiah_Nagar_Phase_2_Poster.png' 
    : 'Karuppiah_Nagar_Poster.jpg';

  useEffect(() => {
    // ScrollTrigger entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(posterFrameRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: posterFrameRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle keyboard interaction for lightbox (Escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setZoomScale(1);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch(posterPath);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      const link = document.createElement('a');
      link.href = posterPath;
      link.download = downloadName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleZoom = () => {
    setZoomScale(prev => (prev === 1 ? 1.6 : 1));
  };

  return (
    <section className="kn-poster-sec" id="kn-poster" ref={sectionRef}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Project Flyer (Phase {activePhase})</span>
          <h2 className="kn-section-title">Official Brochure & Layout Poster</h2>
          <p className="kn-section-desc">
            Explore the official marketing brochure for Karuppiah Nagar Phase {activePhase}. Click on the poster to view in full screen and check plot sizes, amenities, and layout features in high resolution.
          </p>
        </div>

        <div className="kn-poster__wrapper" key={activePhase}>
          <div 
            className="kn-poster__frame" 
            ref={posterFrameRef}
            onClick={() => setIsOpen(true)}
          >
            <div className="kn-poster__overlay">
              <div className="kn-poster__expand-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>Click to Expand Brochure</span>
              </div>
            </div>
            <img 
              src={posterPath} 
              alt={`Karuppiah Nagar Phase ${activePhase} Project Poster`} 
              className="kn-poster__img" 
              loading="lazy"
            />
          </div>
        </div>

        {/* Dynamic Download Section directly below the flyer */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button 
            className="kn-btn kn-btn--primary" 
            onClick={handleDownload}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>DOWNLOAD PHASE {activePhase} BROCHURE</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="kn-lightbox" onClick={() => { setIsOpen(false); setZoomScale(1); }}>
          <div className="kn-lightbox__toolbar" onClick={e => e.stopPropagation()}>
            <button 
              className="kn-lightbox__btn" 
              onClick={toggleZoom} 
              title={zoomScale === 1 ? "Zoom In" : "Zoom Out"}
            >
              {zoomScale === 1 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              )}
            </button>
            <button 
              className="kn-lightbox__btn" 
              onClick={handleDownload} 
              title="Download Brochure"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </button>
            <button 
              className="kn-lightbox__btn kn-lightbox__close" 
              onClick={() => { setIsOpen(false); setZoomScale(1); }} 
              title="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div className="kn-lightbox__content" onClick={e => e.stopPropagation()}>
            <img 
              src={posterPath} 
              alt={`Karuppiah Nagar Phase ${activePhase} Project Poster Full Screen`} 
              className="kn-lightbox__img" 
              style={{ 
                transform: `scale(${zoomScale})`, 
                cursor: zoomScale === 1 ? 'zoom-in' : 'zoom-out' 
              }}
              onClick={toggleZoom}
            />
          </div>
        </div>
      )}
    </section>
  );
}
