import React, { useRef, useEffect } from 'react';
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

  return (
    <div className="tn-info-panel" ref={panelRef}>
      <div className="tn-info__content" ref={contentRef}>
        <span className="tn-info__subtitle">Region Profile</span>
        <h3 className="tn-info__title">{district.name}</h3>

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
      </div>
    </div>
  );
}
