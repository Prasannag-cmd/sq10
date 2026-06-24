import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/karuppiah-nagar.css';

export default function HeroSection({ activePhase = 1, onOpenDownloadModal }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.kn-hero__breadcrumbs', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
      .fromTo('.kn-hero__header-badge-pill', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.3')
      .fromTo('.kn-hero__header-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
      .fromTo('.kn-hero__header-location', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .fromTo('.kn-hero__header-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo('.kn-hero__cta-group', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .fromTo('.kn-hero__seal-badge', { opacity: 0, scale: 0.9, stagger: 0.1 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.5')
      .fromTo('.kn-hero__visual-banner', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.kn-hero__stat-card-new', { opacity: 0, y: 20, stagger: 0.05 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.5');
  }, [activePhase]);

  const handleEnquireScroll = () => {
    const el = document.getElementById('kn-masterplan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadClick = () => {
    if (onOpenDownloadModal) {
      onOpenDownloadModal();
    } else {
      const link = document.createElement('a');
      link.href = '/assets/karuppiah-nagar-layout.pdf';
      link.download = 'Karuppiah_Nagar_Layout_Plan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Dynamic parameters based on active phase
  const isPhase2 = activePhase === 2;
  const projectTitle = isPhase2 ? 'Karuppaiah Nagar' : 'Karuppaiah Nagar';
  const phaseText = isPhase2 ? 'Phase 2' : 'Phase 1';
  const locationText = isPhase2 ? 'Pothumbu, Madurai' : 'Kovilpapakudi, Madurai';
  const dtcpNumber = isPhase2 ? 'No. 511/2026' : 'No. 120/2022';
  
  // Custom Stats
  const statItems = [
    {
      value: isPhase2 ? '15' : '10',
      label: 'Acres',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      )
    },
    {
      value: isPhase2 ? '250' : '110',
      label: 'Total Plots',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      value: isPhase2 ? '120' : '45',
      label: 'Available',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    },
    {
      value: '30ft / 40ft',
      label: 'Road Width',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18" strokeDasharray="3,3" />
        </svg>
      )
    },
    {
      value: 'DTCP',
      label: 'Approved',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      value: 'Water',
      label: 'Available',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      value: 'EB',
      label: 'Available',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    }
  ];

  return (
    <section className="kn-hero" ref={heroRef} style={{ minHeight: 'auto', paddingTop: '100px' }}>
      <div className="kn-hero__overlay" />
      <div className="kn-container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        
        {/* Header Grid */}
        <div className="kn-hero__header-container">
          <div className="kn-hero__header-left">
            <span className="kn-hero__breadcrumbs">Home &gt; Projects &gt; Plots &amp; Lands</span>
            <span className="kn-hero__header-badge-pill">DTCP Approved Layout</span>
            <h1 className="kn-hero__header-title" style={{ background: 'none', webkitTextFillColor: 'initial', webkitBackgroundClip: 'initial' }}>
              {projectTitle} <br />
              <span>{phaseText}</span>
            </h1>
            <span className="kn-hero__header-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {locationText}
            </span>
            <p className="kn-hero__header-desc">
              Premium plotted development crafted for perfect living and high return investment.
            </p>
            <div className="kn-hero__cta-group" style={{ margin: 0, justifyContent: 'flex-start' }}>
              <button className="kn-btn kn-btn--primary" onClick={handleEnquireScroll}>
                Enquire Now ➔
              </button>
              <button className="kn-btn kn-btn--outline" onClick={handleDownloadClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Brochure
              </button>
            </div>
          </div>

          <div className="kn-hero__header-right">
            {/* DTCP Seal */}
            <div className="kn-hero__seal-badge">
              <img src="/assets/images/karuppiah-nagar-dtcp-seal.jpg" alt="DTCP Seal" className="kn-hero__seal-icon" />
              <div className="kn-hero__seal-text">
                DTCP Approved
                <span>{dtcpNumber}</span>
              </div>
            </div>

            {/* Clear Title Seal */}
            <div className="kn-hero__seal-badge">
              <svg className="kn-hero__seal-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 11 11 13 15 9" strokeWidth="2" />
              </svg>
              <div className="kn-hero__seal-text">
                Clear Title
                <span>100% Legal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Banner Rendering */}
        <div className="kn-hero__visual-banner">
          <img src="/assets/images/karuppiah-nagar-brochure-banner.jpg" alt="Karuppaiah Nagar DTCP Approved Layout & Clear Title Brochure" />
          <div className="kn-hero__visual-overlay" />
        </div>

        {/* Stats Row */}
        <div className="kn-hero__stats-row-new">
          {statItems.map((s, idx) => (
            <div className="kn-hero__stat-card-new" key={idx}>
              <div className="kn-hero__stat-icon-new">
                {s.icon}
              </div>
              <span className="kn-hero__stat-value-new">{s.value}</span>
              <span className="kn-hero__stat-label-new">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
