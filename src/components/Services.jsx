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
    tag: 'Ongoing',
    title: 'Thirupaalai Residence',
    location: 'Thirupaalai, Madurai',
    desc: 'Premium contemporary residential project currently in finishing phase, featuring modern luxury woodwork and layouts.',
    path: '/projects/thirupaalai-residence'
  },
  {
    num: '02',
    tag: 'Ongoing',
    title: 'Karuppiah Nagar Layout',
    location: 'Kovilpapakudi, Madurai',
    desc: 'Approved gated community layout featuring wide concrete roads, modern underground drainage, and clear titles.',
    path: '/projects/karuppiah-nagar'
  },
  {
    num: '03',
    tag: 'Ongoing',
    title: 'Bonitaa Salon & Spa',
    location: 'Tiruvallur, Chennai',
    desc: 'Advanced architectural layouts and high-end clinical salon interiors being executed for a new franchise branch.',
    path: '/projects/bonitaa-tiruvallur'
  },
  {
    num: '04',
    tag: 'Upcoming',
    title: 'Coimbatore Smart Heights',
    location: 'Coimbatore',
    desc: 'Upcoming premium high-rise residential estate planned with state-of-the-art automation systems and green spaces.',
    path: '/projects'
  },
  {
    num: '05',
    tag: 'Upcoming',
    title: 'Tirunelveli Royal Palace',
    location: 'Tirunelveli',
    desc: 'Planned luxury custom villa estate combining traditional Dravidian design elements with modern RCC strength.',
    path: '/projects'
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
          <span className="section__label">Upcoming Ventures</span>
          <h2 className="section__title">Future Projects</h2>
          <p className="services-new__subtitle">
            Explore our highly anticipated upcoming developments, premium residential layouts, and commercial enclaves planned across Tamil Nadu.
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

              <div className="services-new__card-header">
                <span className={`services-new__card-tag ${s.tag.toLowerCase()}`}>
                  {s.tag}
                </span>
              </div>

              <div className="services-new__card-body">
                <div className="services-new__card-location">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{s.location}</span>
                </div>
                <h3 className="services-new__card-title">{s.title}</h3>
                <p className="services-new__card-desc">{s.desc}</p>
              </div>

              <div className="services-new__card-footer">
                <span className="services-new__card-link-text">Explore Project</span>
                <span className="services-new__card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
