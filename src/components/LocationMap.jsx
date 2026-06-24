import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DISTANCES_DATA = [
  { place: 'Mattuthavani Bus Stand', time: '10 mins' },
  { place: 'Meenakshi Mission Hospital', time: '12 mins' },
  { place: 'Madurai Airport', time: '20 mins' },
  { place: 'Schools & Colleges', time: '5 mins' },
  { place: 'Madurai Railway Station', time: '18 mins' },
  { place: 'Shopping Complex', time: '8 mins' }
];

export default function LocationMap({ activePhase = 1, onOpenDownloadModal }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
    );
  }, []);

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

  // Google Maps Iframe link based on active phase
  const mapIframeSrc = activePhase === 2
    ? "https://maps.google.com/maps?q=Pothumbu,+Madurai&t=&z=14&ie=UTF8&iwloc=&output=embed"
    : "https://maps.google.com/maps?q=KARUPPIAH+NAGAR+PHASE+I,+Kovilpapakudi,+Madurai&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const googleMapsLink = activePhase === 2
    ? "https://www.google.com/maps/place/Pothumbu,+Tamil+Nadu"
    : "https://www.google.com/maps/place/KARUPPIAH+NAGAR+PHASE+I/@9.9801068,78.0882407,17z";

  return (
    <section className="kn-location" id="kn-location" ref={ref} style={{ padding: 'var(--space-section) 0' }}>
      <div className="kn-container">
        
        <div className="kn-section-header" style={{ marginBottom: '3rem' }}>
          <span className="kn-section-tag" style={{ color: 'var(--color-accent)', letterSpacing: '2px' }}>STRATEGIC LOCATION</span>
          <h2 className="kn-section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-white)' }}>
            Location Advantage
          </h2>
          <div style={{ width: '40px', height: '1.5px', background: 'var(--color-accent)', marginTop: '15px' }} />
        </div>

        <div className="kn-location__layout-new">
          
          {/* Map Column */}
          <div className="kn-location__map-new">
            <iframe
              title="Karuppiah Nagar Location Map"
              src={mapIframeSrc}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Distances Table Column */}
          <div className="kn-location__table-card">
            {DISTANCES_DATA.map((item, idx) => (
              <div className="kn-location__table-row" key={idx}>
                <span>{item.place}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>

          {/* Brochure/Explore Card Column */}
          <div className="kn-location__brochure-card">
            <h3 className="kn-location__brochure-title">Explore Every Detail</h3>
            <p className="kn-location__brochure-desc">
              Download the complete brochure for layout, pricing, amenities, approvals and more.
            </p>
            
            {/* Brochure Mockup rendering */}
            <div className="kn-location__brochure-visual">
              <img src="/assets/images/plots-slide-1.png" alt="Brochure booklet mockup" />
            </div>

            <div className="kn-location__brochure-btn-group">
              <button className="kn-btn kn-btn--primary" onClick={handleDownloadClick}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Brochure
              </button>
              <button className="kn-btn kn-btn--outline" onClick={handleDownloadClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule Site Visit
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
