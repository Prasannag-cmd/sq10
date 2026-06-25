import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import MasterPlan from '../components/MasterPlan';
import Amenities from '../components/Amenities';
import LocationMap from '../components/LocationMap';
import ProjectGallery from '../components/ProjectGallery';
import WhyInvest from '../components/WhyInvest';
import DocumentModal from '../components/DocumentModal';
import CTASection from '../components/CTASection';

export default function KaruppiahNagarPage() {
  const [activePhase, setActivePhase] = useState(2); // Set default to Phase 2 to match mockup

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/assets/karuppiah-nagar-layout.pdf';
    link.download = 'Karuppiah_Nagar_Layout_Plan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="karuppiah-nagar-page app-layout is-ready" style={{ paddingBottom: '70px' }}>
      <Navbar alwaysScrolled />
      <main>
        {/* Redesigned Hero Section */}
        <HeroSection 
          activePhase={activePhase} 
          onOpenDownloadModal={handleDownloadBrochure} 
        />
        
        {/* Interactive SVG Plot Map & Details Panel */}
        <MasterPlan 
          activePhase={activePhase} 
          setActivePhase={setActivePhase} 
          onOpenDownloadModal={handleDownloadBrochure} 
        />
        
        {/* New 8-Card Amenities Section */}
        <Amenities />
        
        {/* Location Advantage and Brochure callout */}
        <LocationMap 
          activePhase={activePhase} 
          onOpenDownloadModal={handleDownloadBrochure} 
        />
        
        {/* Horizontal Project Gallery visual slides */}
        <ProjectGallery />
        
        {/* Why Invest Here section */}
        <WhyInvest />
        

        
        {/* Legal & Layout document downloads */}
        <DocumentModal />
        
        {/* Conversion CTA */}
        <CTASection />
      </main>
      <Footer />

      {/* Sticky Quick Contact Footer Action Bar */}
      <div className="kn-sticky-footer">
        <div className="kn-container">
          
          <div className="kn-sticky-footer__actions">
            {/* Call */}
            <a href="tel:+917540002054" className="kn-sticky-footer__item">
              <div className="kn-sticky-footer__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="kn-sticky-footer__body">
                <span className="kn-sticky-footer__label">CALL US</span>
                <span className="kn-sticky-footer__value">+91 75400 02054</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/917540002054?text=I'm interested in booking a site visit for Karuppaiah Nagar." 
              className="kn-sticky-footer__item"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="kn-sticky-footer__icon whatsapp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <div className="kn-sticky-footer__body">
                <span className="kn-sticky-footer__label">WHATSAPP</span>
                <span className="kn-sticky-footer__value">Chat Now</span>
              </div>
            </a>

            {/* Site Visit */}
            <a 
              href="https://wa.me/917540002054?text=I'd like to book a site visit for Karuppaiah Nagar."
              className="kn-sticky-footer__item"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="kn-sticky-footer__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="kn-sticky-footer__body">
                <span className="kn-sticky-footer__label">SITE VISIT</span>
                <span className="kn-sticky-footer__value">Book Now</span>
              </div>
            </a>
          </div>

          <button 
            className="kn-btn kn-btn--primary" 
            onClick={handleDownloadBrochure}
            style={{ 
              padding: '10px 24px', 
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Brochure
          </button>

        </div>
      </div>

    </div>
  );
}
