/* ============================================================
   NAVBAR — Scroll-Aware Navigation with Premium Projects Dropdown
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

/* ── Dropdown Category Data ──────────────────────────────── */
const dropdownCategories = [
  {
    title: 'Residential Projects',
    description: 'Luxury homes, villas, and residential developments crafted with precision.',
    path: '/projects/residential',
    items: ['Luxury Villas', 'Individual Homes', 'Apartment Projects'],
  },
  {
    title: 'Commercial Projects',
    description: 'Office buildings, educational facilities, and retail spaces built to perform.',
    path: '/projects/commercial',
    items: ['Office Buildings', 'Schools & Educational Facilities', 'Retail & Showrooms', 'Corporate Spaces'],
  },
  {
    title: 'Interior Projects',
    description: 'Bespoke interior transformations for residential and commercial spaces.',
    path: '/projects/interiors',
    items: ['Residential Interiors', 'Commercial Interiors', 'Office Interiors', 'Luxury Interior Design'],
  },
  {
    title: 'Strategic Consulting',
    description: 'Expert advisory for construction planning, feasibility, and project strategy.',
    path: '/projects/consulting',
    items: ['Construction Advisory', 'Project Planning', 'Interior Consulting', 'Development Consulting'],
  },
  {
    title: 'Plots & Developments',
    description: 'Premium approved plots and strategically planned layout developments.',
    path: '/projects/plots',
    items: ['Available Plots', 'Layout Developments', 'Land Development Projects'],
  },
];

/* ── Arrow Icon ──────────────────────────────────────────── */
const ChevronDown = () => (
  <svg className="navbar__chevron" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 4 6 8 10 4" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="8" x2="13" y2="8" />
    <polyline points="9 4 13 8 9 12" />
  </svg>
);


export default function Navbar({ isVisible = true, alwaysScrolled = false }) {
  const [isScrolled, setIsScrolled] = useState(alwaysScrolled);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(0);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const navbarRef = useRef(null);
  const mobileLinksRef = useRef(null);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const dropdownTriggerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';
  const isAboutPage = location.pathname === '/about';
  const isCareersPage = location.pathname === '/careers';
  const isConsultancyPage = location.pathname === '/consultancy';
  const isProjectsActive = location.pathname.startsWith('/projects');
  const isHomeActive = isHomePage && activeSection !== 'future-projects' && activeSection !== 'contact';
  const isNavVisible = isVisible;

  // Navbar show/hide animation based on isNavVisible and isVisible
  useEffect(() => {
    if (!navbarRef.current || !isVisible) return;

    if (isNavVisible) {
      gsap.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
        delay: isScrolled ? 0 : 0.2,
      });
    } else {
      gsap.to(navbarRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        overwrite: 'auto',
      });
    }
  }, [isNavVisible, isVisible, isScrolled]);

  // Scroll behavior
  useEffect(() => {
    if (alwaysScrolled) return;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > lastScrollY.current && currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysScrolled]);

  // Active section tracking
  useEffect(() => {
    if (!isHomePage) return;

    const sections = document.querySelectorAll('.section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileProjectsOpen(false);
  }, [location.pathname]);

  // Desktop dropdown hover handlers
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Animate dropdown on open/close
  useEffect(() => {
    if (!dropdownRef.current) return;
    if (dropdownOpen) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => {
          dropdownRef.current.style.visibility = 'visible';
          dropdownRef.current.style.pointerEvents = 'auto';
        },
      });
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (dropdownRef.current) {
            dropdownRef.current.style.visibility = 'hidden';
            dropdownRef.current.style.pointerEvents = 'none';
          }
        },
      });
    }
  }, [dropdownOpen]);

  // Mobile menu toggle
  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const willOpen = !prev;
      if (willOpen) {
        document.body.style.overflow = 'hidden';
        // Animate links in after state update
        setTimeout(() => {
          const links = document.querySelectorAll('.navbar__mobile-link');
          if (links.length) {
            gsap.fromTo(links,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out', delay: 0.15 }
            );
          }
        }, 0);
      } else {
        document.body.style.overflow = '';
        setMobileProjectsOpen(false);
      }
      return willOpen;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileProjectsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navClasses = [
    'navbar',
    isNavVisible ? 'is-visible' : '',
    isScrolled ? 'is-scrolled' : '',
    isHidden ? 'is-hidden' : '',
  ].filter(Boolean).join(' ');

  const homePrefix = isHomePage ? '' : '/';

  /* ── Desktop Dropdown Markup ─────────────────────────── */
  const renderDropdown = () => (
    <div
      className="navbar__mega-dropdown"
      ref={dropdownRef}
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
      style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(10px)' }}
    >
      <div className="navbar__mega-inner">
        {/* Left: Category List */}
        <div className="navbar__mega-categories">
          {dropdownCategories.map((cat, i) => (
            <Link
              key={cat.path}
              to={cat.path}
              className={`navbar__mega-cat-item ${i === activeDropdownIndex ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveDropdownIndex(i)}
            >
              <span className="navbar__mega-cat-title">{cat.title}</span>
              <ArrowRight />
            </Link>
          ))}
        </div>

        {/* Right: Description Panel */}
        <div className="navbar__mega-detail">
          <div className="navbar__mega-detail-inner" key={activeDropdownIndex}>
            <h4 className="navbar__mega-detail-title">
              {dropdownCategories[activeDropdownIndex].title}
            </h4>
            <p className="navbar__mega-detail-desc">
              {dropdownCategories[activeDropdownIndex].description}
            </p>
            <ul className="navbar__mega-detail-list">
              {dropdownCategories[activeDropdownIndex].items.map((item) => (
                <li key={item} className="navbar__mega-detail-list-item">
                  <span className="navbar__mega-detail-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom: View All */}
      <Link to="/projects" className="navbar__mega-viewall">
        <span>View All Projects</span>
        <ArrowRight />
      </Link>
    </div>
  );

  /* ── Mobile Accordion Markup ─────────────────────────── */
  const renderMobileProjectsAccordion = () => (
    <div className="navbar__mobile-accordion">
      <button
        className={`navbar__mobile-link navbar__mobile-link--parent ${isProjectsActive ? 'is-active' : ''}`}
        onClick={() => setMobileProjectsOpen(prev => !prev)}
      >
        Projects
        <ChevronDown />
      </button>
      <div className={`navbar__mobile-submenu ${mobileProjectsOpen ? 'is-open' : ''}`}>
        {dropdownCategories.map((cat) => (
          <Link
            key={cat.path}
            to={cat.path}
            className="navbar__mobile-link navbar__mobile-link--sub"
            onClick={closeMobile}
          >
            {cat.title}
          </Link>
        ))}
        <Link
          to="/projects"
          className="navbar__mobile-link navbar__mobile-link--sub navbar__mobile-link--viewall"
          onClick={closeMobile}
        >
          View All Projects
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <nav className={navClasses} id="navbar" ref={navbarRef}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/assets/images/logo.png" alt="Squaareten Construction Pvt Ltd" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              Squaareten
              <span>Construction Pvt Ltd</span>
            </div>
          </Link>

          <div className="navbar__links">
            {isHomePage ? (
              <>
                <a href="#hero" className={`navbar__link ${isHomeActive ? 'is-active' : ''}`}>Home</a>
                <Link to="/about" className="navbar__link">About</Link>
                <a href="#future-projects" className={`navbar__link ${activeSection === 'future-projects' ? 'is-active' : ''}`}>Future Projects</a>

                {/* Projects with Dropdown */}
                <div
                  className="navbar__dropdown-wrapper"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  ref={dropdownTriggerRef}
                >
                  <Link
                    to="/projects"
                    className={`navbar__link ${isProjectsActive ? 'is-active' : ''}`}
                  >
                    Projects <ChevronDown />
                  </Link>
                  {renderDropdown()}
                </div>

                <Link to="/careers" className="navbar__link">Careers</Link>
                <Link to="/consultancy" className="navbar__link">Consultancy</Link>
              </>
            ) : (
              <>
                <Link to="/" className="navbar__link">Home</Link>
                <Link to="/about" className={`navbar__link ${isAboutPage ? 'is-active' : ''}`}>About</Link>
                <Link to="/#future-projects" className="navbar__link">Future Projects</Link>

                {/* Projects with Dropdown */}
                <div
                  className="navbar__dropdown-wrapper"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  ref={dropdownTriggerRef}
                >
                  <Link
                    to="/projects"
                    className={`navbar__link ${isProjectsActive ? 'is-active' : ''}`}
                  >
                    Projects <ChevronDown />
                  </Link>
                  {renderDropdown()}
                </div>

                <Link to="/careers" className={`navbar__link ${isCareersPage ? 'is-active' : ''}`}>Careers</Link>
                <Link to="/consultancy" className={`navbar__link ${isConsultancyPage ? 'is-active' : ''}`}>Consultancy</Link>
              </>
            )}
          </div>

          <div className="navbar__actions">
            {isHomePage ? (
              <a href="#contact" className="navbar__cta">
                <span>GET A QUOTE</span>
                <span className="navbar__cta-arrow">➔</span>
              </a>
            ) : (
              <Link to="/#contact" className="navbar__cta">
                <span>GET A QUOTE</span>
                <span className="navbar__cta-arrow">➔</span>
              </Link>
            )}
          </div>

          <button
            className={`navbar__hamburger ${mobileOpen ? 'is-active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'is-open' : ''}`} ref={mobileLinksRef}>
        {isHomePage ? (
          <>
            <a href="#hero" className="navbar__mobile-link" onClick={closeMobile}>Home</a>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <a href="#future-projects" className="navbar__mobile-link" onClick={closeMobile}>Future Projects</a>
            {renderMobileProjectsAccordion()}
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <Link to="/consultancy" className="navbar__mobile-link" onClick={closeMobile}>Consultancy</Link>
          </>
        ) : (
          <>
            <Link to="/" className="navbar__mobile-link" onClick={closeMobile}>Home</Link>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <Link to="/#future-projects" className="navbar__mobile-link" onClick={closeMobile}>Future Projects</Link>
            {renderMobileProjectsAccordion()}
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <Link to="/consultancy" className="navbar__mobile-link" onClick={closeMobile}>Consultancy</Link>
          </>
        )}
      </div>
    </>
  );
}
