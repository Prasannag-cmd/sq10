import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function DistrictInfoPanel({ district }) {
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  // Animate content change when active district changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Pure fade transition (0.4s duration, no slide, no flip)
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power1.out' }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [district.id]);

  const isMaduraiHq = district.id === 'madurai-hq';

  return (
    <div className="tn-info-panel" ref={panelRef}>
      <div className="tn-info__content" ref={contentRef}>
        <span className="tn-info__subtitle">Region Profile</span>
        <h3 className="tn-info__title">{district.name}</h3>

        {isMaduraiHq ? (
          <div className="tn-founders-container">
            <div className="tn-founders-photo-wrapper">
              <img 
                src="/assets/images/founders.jpg" 
                alt="Squaareten Co-founders" 
                className="tn-founders-photo"
              />
              <div className="tn-founders-overlay" />
            </div>
            
            <div className="tn-founders-stats">
              <div className="tn-founders-stat">
                <span className="tn-founders-stat__value">10+ Years</span>
                <span className="tn-founders-stat__label">Of Excellence</span>
              </div>
              <div className="tn-founders-stat">
                <span className="tn-founders-stat__value">60+</span>
                <span className="tn-founders-stat__label">Completed Projects</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="tn-info__stats">
              <div className="tn-stat">
                <div className="tn-stat__label">Completed Projects</div>
                <div className="tn-stat__value">{district.completed}+ Projects</div>
              </div>
              <div className="tn-stat">
                <div className="tn-stat__label">Ongoing Projects</div>
                <div className="tn-stat__value">{district.ongoing} Ongoing</div>
              </div>
            </div>

            {district.categories && district.categories.length > 0 && (
              <div className="tn-categories">
                <h4 className="tn-categories__title">Featured Categories</h4>
                <div className="tn-categories__grid">
                  {district.categories.map((cat, idx) => (
                    <div key={idx} className="tn-category-tag">
                      <span className="tn-category-tag__dot" />
                      <span className="tn-category-tag__name">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
