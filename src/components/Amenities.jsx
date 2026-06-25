import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AMENITIES_DATA = [
  {
    title: 'Black Top Roads',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18" strokeDasharray="3,3" />
      </svg>
    )
  },
  {
    title: 'Street Lights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v6M9 8h6M12 8v14M6 22h12" />
        <circle cx="12" cy="5" r="1.5" fill="var(--color-accent)" />
      </svg>
    )
  },
  {
    title: 'Avenue Trees',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19V5M12 5L7 10M12 5l5 5M12 11l-4 4M12 13l4 4" />
      </svg>
    )
  },
  {
    title: "Children's Park",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22V6h16v16M8 6c0 4 8 4 8 0" strokeLinecap="round" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    )
  },
  {
    title: 'Water Facility',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    )
  },
  {
    title: 'EB Connection',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    title: 'Compound Wall',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v6M15 3v6M6 9v6M12 9v6M18 9v6M9 15v7M15 15v7" />
      </svg>
    )
  },
  {
    title: 'Grand Entrance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22V10a8 8 0 0 1 16 0v12M12 2v4" />
      </svg>
    )
  }
];

export default function Amenities() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.kn-amenities__title-main',
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

      gsap.fromTo('.kn-amenities__card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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

  return (
    <section className="kn-amenities" id="kn-amenities" ref={sectionRef}>
      <div className="kn-container">
        
        <div className="kn-section-header kn-amenities__title-main" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="kn-section-tag" style={{ color: 'var(--color-accent)', letterSpacing: '2px' }}>MODERN INFRASTRUCTURE</span>
          <h2 className="kn-section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-white)' }}>
            Amenities
          </h2>
          <div style={{ width: '40px', height: '1.5px', background: 'var(--color-accent)', margin: '15px auto 0 auto' }} />
        </div>

        <div className="kn-amenities__grid">
          {AMENITIES_DATA.map((amenity, idx) => (
            <div className="kn-amenities__card" key={idx}>
              <div className="kn-amenities__icon">
                {amenity.icon}
              </div>
              <span className="kn-amenities__title">{amenity.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
