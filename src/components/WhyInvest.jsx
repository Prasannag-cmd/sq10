import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WHY_INVEST_DATA = [
  {
    title: 'High Appreciation Zone',
    desc: 'Situated in a rapidly developing corridor with high future value.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="12 4 18 4 18 10" strokeLinecap="round" />
        <path d="M4 20L12 4" strokeDasharray="2,2" />
      </svg>
    )
  },
  {
    title: 'DTCP Approved',
    desc: 'Legally secure investment with clear documentation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 15 11 17 15 13" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    title: 'Infrastructure Growth',
    desc: 'New roads, facilities & connectivity boosting property value.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
        <path d="M22 21H2M19 21v-4a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v4M10 21v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8M14 8h2M14 11h2M6 14h1M6 17h1" />
      </svg>
    )
  },
  {
    title: 'Rental Potential',
    desc: 'High demand area with excellent rental income potential.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <circle cx="12" cy="7" r="1.5" fill="var(--color-accent)" />
      </svg>
    )
  }
];

export default function WhyInvest() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
    );
  }, []);

  return (
    <section className="kn-why-invest" id="kn-why-invest" ref={ref}>
      <div className="kn-container">
        
        <div className="kn-section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="kn-section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-white)' }}>
            Why Invest Here?
          </h2>
          <div style={{ width: '40px', height: '1.5px', background: 'var(--color-accent)', margin: '15px auto 0 auto' }} />
        </div>

        <div className="kn-why-invest__grid">
          {WHY_INVEST_DATA.map((item, idx) => (
            <div className="kn-why-invest__card" key={idx}>
              <div className="kn-why-invest__icon">
                {item.icon}
              </div>
              <span className="kn-why-invest__title">{item.title}</span>
              <p className="kn-why-invest__desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
