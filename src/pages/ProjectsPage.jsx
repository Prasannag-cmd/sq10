/* ============================================================
   PROJECTS PAGE — Premium Minimal Motion Experience
   "Simplicity First. Motion Second."
   ============================================================ */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Project Data ────────────────────────────────────── */
const projectsData = [
  // ── Residential Projects ──────────────────────────────
  {
    id: 'maha-groups-residence',
    name: 'Maha Groups - Residence',
    location: 'Thathaneri, Madurai',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-maha-1.jpg',
    description: 'A premium contemporary double-story residential design combining horizontal wood-look accents, concrete textures, and custom geometric facade elements.',
    area: '6,800 sq.ft',
    year: '2026',
  },
  {
    id: 'sunrise-residences',
    name: 'Sunrise Residences',
    location: 'Nagudi, Aranthangi',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-nagudi-main.jpg',
    description: 'Modern 2 BHK residential home featuring a spacious veranda, dedicated vehicle parking, and landscaped gardening space.',
    area: '1,600 sq.ft',
    year: '2024',
  },
  {
    id: 'heritage-revival',
    name: 'Modern Duplex Residence',
    location: 'Thanjavur, Tamil Nadu',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-duplex-main.jpg',
    description: 'A premium 3 BHK modern duplex residence featuring textured stone wall cladding, a spacious glass balcony, and bespoke interiors.',
    area: '3,200 sq.ft',
    year: '2024',
  },
  {
    id: 'thirupaalai-residence',
    name: 'Thirupaalai Residence',
    location: 'Thirupaalai, Madurai',
    category: 'residential',
    status: 'Ongoing',
    img: '/assets/images/thirupaalai-image-1.jpeg',
    description: 'A modern contemporary premium residential project under construction in Madurai featuring latest finishes and high-end architecture.',
    progress: 45,
    phase: 'Interior Finishing',
    expectedCompletion: 'March 2027',
  },
  {
    id: 'sandhaipettai-residence',
    name: 'Sandhaipettai Residence',
    location: 'Sandhaipettai, Madurai',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/sandhaipettai-image-1.jpeg',
    description: 'A premium residential project under construction in Madurai featuring modern architectural planning and engineering.',
    area: '4,200 sq.ft',
    year: '2026',
  },

  // ── Commercial Projects ───────────────────────────────
  {
    id: 'mahatma-global-gateway',
    name: 'Mahatma Global Gateway',
    location: 'Madurai, Tamil Nadu',
    category: 'commercial',
    status: 'Completed',
    img: '/assets/images/school-image-1.jpeg',
    description: 'Engineering consultancy and comprehensive interior work execution for Mahatma Global Gateway in Madurai.',
    area: 'School Campus',
    year: '2025',
  },

  // ── Interior Projects ─────────────────────────────────
  {
    id: 'bonitaa-hair-skin-care',
    name: 'Bonitaa Hair & Skin Care - Madurai',
    location: 'Madurai Bypass Road, Tamil Nadu',
    category: 'interiors',
    status: 'Completed',
    img: '/assets/images/bonita-image-1.jpeg',
    description: 'A premium salon and wellness space designed and executed with modern interiors, elegant finishes, and a customer-focused experience.',
    area: 'Multiple Outlets',
    year: '2026',
  },
  {
    id: 'bonitaa-tiruvallur',
    name: 'Bonitaa Hair & Skin Care - Tiruvallur',
    location: 'Tiruvallur District, Tamil Nadu',
    category: 'interiors',
    status: 'Ongoing',
    img: '/assets/images/bonitaa-tiruvallur-1.jpeg',
    description: 'Ongoing interior project for a new franchise branch of Bonitaa featuring premium clinical layout, consulting areas, and advanced design execution.',
    progress: 35,
    phase: 'Layout Partitioning',
    expectedCompletion: 'November 2026',
  },
  {
    id: 'swimming-pool-mannadimangalam',
    name: 'Swimming Pool at Mannadimangalam',
    location: 'Mannadimangalam, Madurai',
    category: 'interiors',
    status: 'Completed',
    img: '/assets/images/pool-image-1.jpeg',
    description: 'A premium concrete swimming pool construction featuring custom filtration, blue mosaic tile finishing, and integrated lighting.',
    area: '1,200 sq.ft',
    year: '2024',
  },

  // ── Plots & Developments ──────────────────────────────
  {
    id: 'karuppiah-nagar',
    name: 'Karuppiah Nagar',
    location: 'Kovilpapakudi, Madurai',
    category: 'plots',
    status: 'Ongoing',
    img: '/assets/images/karuppiah-nagar-brochure-banner.jpg',
    description: 'DTCP-Approved premium residential plots in Kovilpapakudi, Madurai. Features 30 & 40 ft wide roads, underground drainage, street lights, water connection, and 100% clear titles.',
    plotArea: '1,200 – 2,400 sq.ft',
    approval: 'DTCP Approved',
    price: 'Starting ₹15 Lakhs',
    progress: 60,
    phase: 'Plot Development',
    expectedCompletion: 'December 2026',
  },
];

const categories = [
  { id: 'residential', label: 'Residential', path: '/projects/residential' },
  { id: 'interiors', label: 'Interior', path: '/projects/interiors' },
  { id: 'commercial', label: 'Commercial', path: '/projects/commercial' },
  { id: 'plots', label: 'Plots', path: '/projects/plots' },
];

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Ongoing', label: 'Ongoing' },
];

const materialsData = [
  {
    name: 'Structural Steel',
    description: 'High-tensile structural beams providing superior seismic load resistance and structural integrity.',
    img: '/assets/images/material-steel.png',
    brand: 'TATA Tiscon / JSW',
  },
  {
    name: 'Premium Cement',
    description: 'Grade 53 OPC/PPC cement ensuring high early strength and long-term durability of concrete structures.',
    img: '/assets/images/material-cement.png',
    brand: 'Ultratech / Ramco',
  },
  {
    name: 'High-Grade Bricks',
    description: 'High-pressure chamber burnt bricks offering exceptional thermal insulation and high load-bearing capacity.',
    img: '/assets/images/material-bricks.png',
    brand: 'Chamber Bricks',
  },
  {
    name: 'TMT Reinforcement',
    description: 'Thermo-Mechanically Treated steel bars with advanced rib patterns for superior concrete bonding.',
    img: '/assets/images/material-steel.png',
    brand: 'TATA Tiscon',
  },
  {
    name: 'Designer Tiles',
    description: 'Premium vitrified and glazed ceramic flooring with contemporary matte and polished finishes.',
    img: '/assets/images/material-tiles.png',
    brand: 'Kajaria / Somany',
  },
  {
    name: 'Natural Stone',
    description: 'Elite black granite and polished marble panels sourced from premium quarries.',
    img: '/assets/images/material-stone.png',
    brand: 'Premium Granite',
  },
  {
    name: 'Electrical Systems',
    description: 'Flame-retardant low-smoke (FR-LSH) copper wiring and modular high-end electrical panels.',
    img: '/assets/images/material-smarthome.png',
    brand: 'Finolex / Havells',
  },
  {
    name: 'Plumbing Systems',
    description: 'Lead-free CPVC/UPVC corrosion-proof pipes and high-pressure hydraulic pressure testing.',
    img: '/assets/images/material-cement.png',
    brand: 'Ashirvad / Astral',
  },
  {
    name: 'Premium Paints',
    description: 'Weather-proof external emulsion and luxury interior paints with zero VOC ratings.',
    img: '/assets/images/material-tiles.png',
    brand: 'Asian Paints / Nippon',
  },
  {
    name: 'Smart Home Components',
    description: 'Integrated automation modules, smart touch switches, and digital security locks.',
    img: '/assets/images/material-smarthome.png',
    brand: 'Schneider / Legrand',
  },
];

/* ── Location Pin SVG ────────────────────────────────── */
const LocationPin = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ── Arrow SVG ───────────────────────────────────────── */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Lazy Image Component ────────────────────────────── */
function LazyImage({ src, alt, className }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }

    const onLoad = () => setLoaded(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${loaded ? 'is-loaded' : ''}`}
      loading="lazy"
    />
  );
}

/* ── Project Card Component ──────────────────────────── */
/* ── Project Card Component ──────────────────────────── */
function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const categoryIcon = {
    plots: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#8E7544' }}>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
    residential: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#8E7544' }}>
        <path d="M3 10l9-8 9 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    commercial: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#8E7544' }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18" />
        <path d="M3 9h18M3 15h18" />
      </svg>
    ),
    interiors: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#8E7544' }}>
        <path d="M4 18h16" />
        <path d="M7 18V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9" />
        <path d="M9 11h6" />
      </svg>
    )
  }[project.category] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#8E7544' }}>
      <path d="M12 22v-8M5 12h14" />
      <path d="M19 12a7 7 0 0 0-14 0c0 4.5 4.5 6 7 8 2.5-2 7-3.5 7-8z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  return (
    <article
      ref={cardRef}
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${project.id}`)}
    >
      {/* Top: Image Container */}
      <div className="project-card__image-wrap" style={{ position: 'relative', overflow: 'visible' }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <LazyImage
            src={project.img}
            alt={project.name}
            className="project-card__image"
          />
        </div>
        
        {/* Category Label at bottom-right corner of image */}
        <span className="project-card__category-tag" style={{ position: 'absolute', right: '12px', bottom: '12px', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C9A96E', zIndex: 5 }}>
          {categories.find(c => c.id === project.category)?.label || project.category}
        </span>

        {/* Overlapping Badge Icon at bottom-left corner of image */}
        <div className="project-card__badge-icon" style={{ position: 'absolute', bottom: '-15px', left: '15px', width: '38px', height: '38px', backgroundColor: 'var(--color-bg-alt)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
          {categoryIcon}
        </div>
      </div>

      {/* Middle: Project Information */}
      <div className="project-card__body" style={{ paddingTop: '2rem' }}>
        <h3 className="project-card__name" style={{ fontSize: '1.25rem', letterSpacing: '0.01em', marginBottom: '0.5rem', color: '#FFFFFF', fontStyle: 'normal' }}>{project.name}</h3>
        
        <div className="project-card__location" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0' }}>
          <LocationPin />
          {project.location}
        </div>
      </div>

      {/* Bottom: Action Area */}
      <div className="project-card__action" style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="project-card__link" style={{ color: '#C9A96E' }}>
          View Details <ArrowRight />
        </span>
      </div>
    </article>
  );
}

/* ── Main Page Component ─────────────────────────────── */
export default function ProjectsPage({ category }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Resolve initial category from prop or default to 'residential'
  const resolvedCategory = category || 'residential';
  const [activeCategory, setActiveCategory] = useState(resolvedCategory);
  const [activeStatus, setActiveStatus] = useState('all');
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const explorerRef = useRef(null);
  const ctaRef = useRef(null);
  const indicatorRef = useRef(null);
  const categoryBtnsRef = useRef([]);
  const statusBtnsRef = useRef([]);
  const statusIndicatorRef = useRef(null);
  const materialsSectionRef = useRef(null);
  const materialsTrackRef = useRef(null);

  // Sync category from route prop when it changes
  useEffect(() => {
    if (category && category !== activeCategory) {
      setActiveCategory(category);
      setActiveStatus('all');
    }
  }, [category]);

  // Filter projects by active category + status
  const filteredProjects = useMemo(
    () => projectsData.filter(p => {
      const matchCategory = p.category === activeCategory;
      const matchStatus = activeStatus === 'all' || p.status === activeStatus;
      return matchCategory && matchStatus;
    }),
    [activeCategory, activeStatus]
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  // ── Hero animations (on mount) ───────────────────────
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background cinematic zoom
      gsap.fromTo('.projects-hero__bg img',
        { scale: 1.03 },
        { scale: 1, duration: 10, ease: 'none' }
      );

      // Content reveal sequence
      tl.to('.projects-hero__label', {
        opacity: 1,
        duration: 0.6,
        delay: 0.3,
      })
      .to('.projects-hero__heading', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.3')
      .to('.projects-hero__gold-line', {
        width: '80px',
        duration: 0.6,
      }, '-=0.4')
      .to('.projects-hero__text', {
        opacity: 1,
        duration: 0.6,
      }, '-=0.3')
      .to('.projects-hero__actions', {
        opacity: 1,
        duration: 0.5,
      }, '-=0.2')
      .to('.projects-hero__scroll', {
        opacity: 1,
        duration: 0.5,
      }, '-=0.2');

      // Set initial state for heading
      gsap.set('.projects-hero__heading', { y: 20 });

      // Scroll parallax — subtle text movement
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.projects-hero__content', {
            y: progress * -60,
            opacity: 1 - progress * 0.6,
          });
          gsap.set('.projects-hero__bg img', {
            scale: 1 - progress * 0.02,
          });
        },
      });
    }, heroRef.current);

    return () => ctx.revert();
  }, []);

  // ── Category indicator position ──────────────────────
  const updateIndicator = useCallback(() => {
    const activeBtn = categoryBtnsRef.current.find(
      btn => btn && btn.dataset.category === activeCategory
    );
    const indicator = indicatorRef.current;

    if (!activeBtn || !indicator) return;

    indicator.style.left = `${activeBtn.offsetLeft}px`;
    indicator.style.width = `${activeBtn.offsetWidth}px`;
  }, [activeCategory]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // ── Scroll reveal and futuristic motion effects ──────
  useEffect(() => {
    if (!explorerRef.current) return;

    const explorerEl = explorerRef.current;
    const cards = explorerEl.querySelectorAll('.project-card');

    const ctx = gsap.context(() => {
      // 1. Entrance staggered fade-in animation
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Futuristic blueprint grid parallax scroll
      gsap.to('.projects-explorer__blueprint-grid', {
        backgroundPositionY: '120px',
        ease: 'none',
        scrollTrigger: {
          trigger: explorerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, explorerEl);

    return () => ctx.revert();
  }, [activeCategory]);

  // ── CTA scroll reveal ────────────────────────────────
  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-cta__content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ctaRef.current);

  }, []);

  // ── Materials Showcase scroll animation ────────────────
  useEffect(() => {
    if (!materialsSectionRef.current || !materialsTrackRef.current) return;

    const section = materialsSectionRef.current;
    const track = materialsTrackRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinning horizontal track only on desktop/tablet (min-width 992px)
      mm.add("(min-width: 992px)", () => {
        const panels = gsap.utils.toArray('.materials-panel');
        
        // Pin section and scroll track horizontally
        const scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - track.parentElement.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${track.scrollWidth - track.parentElement.clientWidth}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          }
        });

        // Staggered panel opacity and image scale reveals inside the horizontal scrolling
        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { opacity: 0.5 },
            {
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left center+=250',
                end: 'right center-=250',
                scrub: true,
              }
            }
          );

          const img = panel.querySelector('.materials-panel__image');
          if (img) {
            gsap.fromTo(img,
              { scale: 1.0 },
              {
                scale: 1.02,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left center+=250',
                  end: 'right center-=250',
                  scrub: true,
                }
              }
            );
          }
        });
      });
      
      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Category switch handler ──────────────────────────
  const handleCategoryChange = useCallback((categoryId) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setActiveStatus('all');
    // Update URL to match category
    const cat = categories.find(c => c.id === categoryId);
    if (cat) navigate(cat.path, { replace: true });
  }, [activeCategory, navigate]);

  // ── Status filter handler ───────────────────────────
  const handleStatusChange = useCallback((statusId) => {
    if (statusId === activeStatus) return;
    setActiveStatus(statusId);
  }, [activeStatus]);

  // ── Status indicator position ────────────────────────
  const updateStatusIndicator = useCallback(() => {
    const activeBtn = statusBtnsRef.current.find(
      btn => btn && btn.dataset.status === activeStatus
    );
    const indicator = statusIndicatorRef.current;

    if (!activeBtn || !indicator) return;

    indicator.style.left = `${activeBtn.offsetLeft}px`;
    indicator.style.width = `${activeBtn.offsetWidth}px`;
  }, [activeStatus]);

  useEffect(() => {
    updateStatusIndicator();
    window.addEventListener('resize', updateStatusIndicator);
    return () => window.removeEventListener('resize', updateStatusIndicator);
  }, [updateStatusIndicator]);

  // ── Scroll to explorer ───────────────────────────────
  const scrollToExplorer = useCallback(() => {
    if (explorerRef.current) {
      const offset = categoriesRef.current ? categoriesRef.current.offsetHeight : 0;
      const top = explorerRef.current.getBoundingClientRect().top + window.scrollY - offset - 20;
      window.lenis?.scrollTo(top, { duration: 1.2 });
    }
  }, []);



  return (
    <div className="projects-page app-layout is-ready">
      <Navbar alwaysScrolled />

      <main>
        {/* ── SECTION 01: Hero ─────────────────────────── */}
        <section className="projects-hero" ref={heroRef}>
          <div className="projects-hero__bg">
            <img
              src="/assets/images/project-villa.png"
              alt="Premium construction project"
              loading="eager"
            />
          </div>
          <div className="projects-hero__overlay" />

          <div className="projects-hero__content">
            <div className="projects-hero__label">Our Projects</div>
            <h1 className="projects-hero__heading">
              Spaces Built With Purpose
            </h1>
            <div className="projects-hero__gold-line" />
            <p className="projects-hero__text">
              Explore completed projects, ongoing developments, premium houses,
              and available plots across Tamil Nadu.
            </p>
            <div className="projects-hero__actions">
              <button className="btn btn--primary" onClick={scrollToExplorer}>
                View Projects
              </button>
              <Link to="/#contact" className="btn btn--outline">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="projects-hero__scroll">
            <span className="projects-hero__scroll-text">Scroll</span>
            <div className="projects-hero__scroll-line" />
          </div>
        </section>

        {/* ── SECTION 02: Category Switcher & SECTION 03: Project Explorer Wrapper ── */}
        <div className="projects-explorer-wrapper">
          {/* ── SECTION 02: Category Switcher ─────────────── */}
          <nav className="projects-categories" ref={categoriesRef}>
            <div className="projects-categories__inner">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  ref={el => categoryBtnsRef.current[i] = el}
                  data-category={cat.id}
                  className={`projects-categories__btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
              <div className="projects-categories__indicator" ref={indicatorRef} />
            </div>

            {/* Status Sub-Filter */}
            <div className="projects-status-filters">
              {statusFilters.map((sf, i) => (
                <button
                  key={sf.id}
                  ref={el => statusBtnsRef.current[i] = el}
                  data-status={sf.id}
                  className={`projects-status__btn ${activeStatus === sf.id ? 'is-active' : ''}`}
                  onClick={() => handleStatusChange(sf.id)}
                >
                  {sf.label}
                </button>
              ))}
              <div className="projects-status__indicator" ref={statusIndicatorRef} />
            </div>
          </nav>

          {/* ── SECTION 03: Project Explorer ──────────────── */}
          <section className="projects-explorer" ref={explorerRef}>
            <div className="projects-explorer__blueprint-grid" />
            <div className="projects-explorer__header">
              <div>
                <span className="section__label">Browse Projects</span>
                <h2 className="section__title" style={{ marginBottom: 0 }}>
                  {categories.find(c => c.id === activeCategory)?.label}
                </h2>
              </div>
              <div className="projects-explorer__count">
                Showing <span>{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="projects-grid" key={activeCategory}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))
              ) : (
                <div className="projects-empty">
                  <div className="projects-empty__icon">🏗️</div>
                  <h3 className="projects-empty__heading">Coming Soon</h3>
                  <p className="projects-empty__text">
                    New projects in this category will be available shortly.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── SECTION 03.5: Materials Showcase ──────────── */}
        <section className="projects-materials" ref={materialsSectionRef}>
          <div className="projects-materials__grid-bg" />
          
          <div className="projects-materials__sticky-wrapper">
            {/* Sticky Header block on the left */}
            <div className="projects-materials__header">
              <span className="section__label">Quality Materials</span>
              <h2 className="projects-materials__heading">Built With The Finest Materials</h2>
              <p className="projects-materials__text">
                Every project is constructed using carefully selected materials from trusted brands and suppliers, ensuring durability, performance, and long-term value.
              </p>
              <div className="projects-materials__scroll-hint">
                <span className="scroll-hint__text">Scroll to explore</span>
                <div className="scroll-hint__line" />
              </div>
            </div>

            {/* Horizontal sliding track container */}
            <div className="projects-materials__track-container">
              <div className="projects-materials__track" ref={materialsTrackRef}>
                {materialsData.map((material, idx) => (
                  <div key={idx} className="materials-panel" data-index={idx}>
                    <div className="materials-panel__image-wrap">
                      <img 
                        src={material.img} 
                        alt={material.name} 
                        loading="lazy" 
                        className="materials-panel__image" 
                      />
                      <div className="materials-panel__overlay" />
                    </div>
                    <div className="materials-panel__body">
                      <h3 className="materials-panel__name">{material.name}</h3>
                      <p className="materials-panel__description">{material.description}</p>
                      {material.brand && <span className="materials-panel__brand">Partner: {material.brand}</span>}
                    </div>
                  </div>
                ))}
                
                {/* Final Panel: Quality Message */}
                <div className="materials-panel materials-panel--message">
                  <div className="materials-panel__message-content">
                    <span className="materials-panel__category text-gold">Quality Foundation</span>
                    <h3 className="materials-panel__message-heading">Why Material Quality Matters</h3>
                    <p className="materials-panel__message-text">
                      The strength of every structure begins with the quality of its foundation and materials. At Squaare Ten, we partner with trusted suppliers and industry-leading brands to ensure every project delivers lasting performance, safety, and value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 04: Final CTA ────────────────────── */}
        <section className="projects-cta" ref={ctaRef}>
          <div className="projects-cta__bg">
            <img
              src="/assets/images/project-commercial.png"
              alt="Premium construction"
              loading="lazy"
            />
          </div>
          <div className="projects-cta__overlay" />

          <div className="projects-cta__content">
            <h2 className="projects-cta__heading">
              Ready To Shape The Next Landmark?
            </h2>
            <p className="projects-cta__text">
              Let's create extraordinary spaces together.
            </p>
            <div className="projects-cta__actions">
              <Link to="/#contact" className="btn btn--primary">
                Start Your Project
              </Link>
              <Link to="/#contact" className="btn btn--outline">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
