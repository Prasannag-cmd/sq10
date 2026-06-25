import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FranchiseCTA() {
  const contentRef = useScrollReveal('fade-right');
  const cardRef = useScrollReveal('fade-left');

  return (
    <section className="franchise-section" id="franchise">
      <div className="franchise-section__bg" />
      <div className="container">
        <div className="franchise-grid">
          {/* Left Side: Copy */}
          <div className="franchise-content" ref={contentRef}>
            <span className="section__label">Business Opportunity</span>
            <h2 className="franchise-title">
              Franchise With <br />
              <span className="text-gold">Squaareten</span>
            </h2>
            <p className="franchise-desc">
              Partner with Tamil Nadu's premier luxury villa developer and turnkey construction brand. Bring Squaareten's hallmark engineering excellence, transparency, and design-led construction model to your city.
            </p>

            <div className="franchise-perks-list">
              <div className="franchise-perk-item">
                <span className="franchise-perk-icon">💎</span>
                <div>
                  <h4>Premium Brand Association</h4>
                  <p>Benefit from our established reputation, 10+ years of trust, and 60+ landmark builds.</p>
                </div>
              </div>
              <div className="franchise-perk-item">
                <span className="franchise-perk-icon">📐</span>
                <div>
                  <h4>Design & Engineering Support</h4>
                  <p>Direct architectural blueprints, structural drawings, and materials specifications support.</p>
                </div>
              </div>
              <div className="franchise-perk-item">
                <span className="franchise-perk-icon">📈</span>
                <div>
                  <h4>High Yield Business Model</h4>
                  <p>Lucrative margins in luxury villa layouts, turnkey residential, and commercial developments.</p>
                </div>
              </div>
            </div>

            <div className="franchise-actions">
              <a href="#contact" className="btn btn--primary">
                Apply For Franchise
              </a>
              <a href="https://wa.me/917540002054?text=Hello%20Squaareten%20Construction%2C%20I%20am%20interested%20in%20partnering%20with%20you%20as%20a%20franchisee." target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                Talk to Franchise Lead
              </a>
            </div>
          </div>

          {/* Right Side: Visual Partner Card */}
          <div className="franchise-card-wrap" ref={cardRef}>
            <div className="franchise-luxury-card">
              <div className="franchise-luxury-card__border-effect" />
              <div className="franchise-luxury-card__content">
                <div className="franchise-card-badge">PARTNER PROGRAM</div>
                <h3>Franchise Network</h3>
                <div className="franchise-metrics-grid">
                  <div className="franchise-metric">
                    <span className="metric-val">100%</span>
                    <span className="metric-lbl">Operational Support</span>
                  </div>
                  <div className="franchise-metric">
                    <span className="metric-val">10+</span>
                    <span className="metric-lbl">Year Partnership</span>
                  </div>
                  <div className="franchise-metric">
                    <span className="metric-val">High</span>
                    <span className="metric-lbl">ROI Projections</span>
                  </div>
                  <div className="franchise-metric">
                    <span className="metric-val">Exclusive</span>
                    <span className="metric-lbl">Territorial Rights</span>
                  </div>
                </div>

                <div className="franchise-card-footer">
                  <p className="card-footer-note">✦ Now accepting applications for major districts across Tamil Nadu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
