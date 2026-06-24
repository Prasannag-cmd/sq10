/* ============================================================
   FUTURE PROJECTS — Showcase of ongoing and upcoming enclaves
   ============================================================ */
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FUTURE_PROJECTS_DATA = [
  {
    num: '01',
    title: 'Plots and Lands',
    desc: 'Premium layout developments, gated community enclaves, and strategic land investments with clear titles.',
    path: '/projects/plots',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', color: '#8E7544' }}>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'Renovation',
    desc: 'Breathe new life into existing spaces with our expert restoration, expansion, and structural upgrade services.',
    path: '/consultancy',
    image: '/assets/images/project-renovation.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', color: '#8E7544' }}>
        <path d="M12 22v-8M5 12h14" />
        <path d="M19 12a7 7 0 0 0-14 0c0 4.5 4.5 6 7 8 2.5-2 7-3.5 7-8z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'Commercial',
    desc: 'Modern corporate offices, commercial hubs, and industrial enclaves built for high-performance operations.',
    path: '/projects/commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', color: '#8E7544' }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18" />
        <path d="M3 9h18M3 15h18" />
      </svg>
    )
  },
  {
    num: '04',
    title: 'Residential',
    desc: 'Luxury individual villas, modern residences, and custom apartments constructed with meticulous craftsmanship.',
    path: '/projects/residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', color: '#8E7544' }}>
        <path d="M3 10l9-8 9 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
        <path d="M9 22V12h6v10" />
      </svg>
    )
  },
  {
    num: '05',
    title: 'Interior',
    desc: 'Premium custom woodworking, spatial flow configurations, and luxury design touchpoints for residences and businesses.',
    path: '/projects/interiors',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', color: '#8E7544' }}>
        <path d="M4 18h16" />
        <path d="M7 18V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9" />
        <path d="M9 11h6" />
      </svg>
    )
  }
];


export default function FutureProjects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in section title and header elements
      gsap.fromTo('.services-new__header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Stagger slide-up for cards
      gsap.fromTo('.services-new__card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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
    <section className="services-new-section" ref={sectionRef} id="future-projects">
      <div className="container">
        <div className="services-new__header">
          <span className="section__label">Portfolio</span>
          <h2 className="section__title">Featured Categories</h2>
          <p className="services-new__subtitle">
            Explore our core building, design, and land investment categories across Tamil Nadu.
          </p>
        </div>

        <div className="services-new__grid">
          {FUTURE_PROJECTS_DATA.map((s) => (
            <Link key={s.num} to={s.path} className="services-new__card">
              {/* CAD blueprint corner lines */}
              <span className="card-corner top-left"></span>
              <span className="card-corner top-right"></span>
              <span className="card-corner bottom-left"></span>
              <span className="card-corner bottom-right"></span>

              <div className="services-new__card-bg-mesh"></div>

              {/* Image Container */}
              <div className="services-new__card-img-container" style={{ position: 'relative', width: '100%', height: '160px', overflow: 'visible', marginBottom: '1.5rem' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={s.image} alt={s.title} className="category-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                </div>
                {/* Overlapping Badge Icon */}
                <div className="category-card-badge-icon" style={{ position: 'absolute', bottom: '-15px', left: '15px', width: '42px', height: '42px', backgroundColor: '#FFFFFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)', zIndex: 10 }}>
                  {s.icon}
                </div>
              </div>

              {/* Text content below */}
              <div className="services-new__card-text-body" style={{ padding: '0.75rem 0.25rem 0.5rem 0.25rem', flexGrow: 1 }}>
                <h3 className="services-new__card-title" style={{ fontSize: '1.15rem', fontWeight: '700', letterSpacing: '0.01em', marginBottom: '0.5rem', color: '#1F150C' }}>{s.title}</h3>
                <p className="services-new__card-desc" style={{ fontSize: '0.82rem', opacity: 0.8, color: '#5C5248', lineHeight: '1.5', marginBottom: '0' }}>{s.desc}</p>
              </div>

              <div className="services-new__card-footer" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem', marginTop: '1rem' }}>
                <span className="services-new__card-link-text">Explore Category</span>
                <span className="services-new__card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
