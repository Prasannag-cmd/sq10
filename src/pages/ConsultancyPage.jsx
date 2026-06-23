/* ============================================================
   STRATEGIC CONSULTING PAGE — Premium Advisory Experience
   ============================================================ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ConsultancyPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const formSectionRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'residential',
    location: '',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');

    // Page Load Animations (GSAP timeline)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Background image slow zoom out (Scale: 1.02 -> 1.00)
      gsap.fromTo('.consulting-hero__bg img',
        { scale: 1.02 },
        { scale: 1, duration: 3.5, ease: 'power2.out' }
      );

      // 1. Label Reveal
      tl.fromTo('.consulting-hero__label',
        { opacity: 0, y: 15 },
        { opacity: 0.9, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      // 2. Gold Line Expansion
      tl.fromTo('.consulting-hero__gold-line',
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // 3. Main Heading reveal (translateY(20px) opacity(0) -> translateY(0) opacity(1))
      tl.fromTo('.consulting-hero__title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // 4. Supporting text small fade reveal
      tl.fromTo('.consulting-hero__desc',
        { opacity: 0, y: 10 },
        { opacity: 0.85, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // 5. Buttons smooth appearance
      tl.fromTo('.consulting-hero__actions .btn',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      );

      // Scroll Reveal: Project Advisory Expertise Cards
      gsap.fromTo('.expertise-card',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.consulting-expertise__grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Scroll Reveal: Form Info & Form Container
      gsap.fromTo('.consulting-form__info > *',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.consulting-form-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.consulting-form-container',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.consulting-form-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, heroRef);

    // Refresh ScrollTrigger after a slight delay for correct triggering spots
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.location.trim()) newErrors.location = 'Project location is required';
    if (!formData.budget.trim()) newErrors.budget = 'Estimated budget is required';
    if (!formData.message.trim()) newErrors.message = 'Message description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const expertiseAreas = [
    {
      num: '01',
      title: 'Land Development Strategy',
      desc: 'Comprehensive feasibility analysis, zoning assessment, and land-use optimization strategies before you break ground.',
      image: '/assets/images/project-villa.png'
    },
    {
      num: '02',
      title: 'Commercial Planning',
      desc: 'Strategic layout design, financial viability consulting, and functional workspace mapping tailored to commercial enterprise requirements.',
      image: '/assets/images/project-commercial.png'
    },
    {
      num: '03',
      title: 'Construction Advisory',
      desc: 'Value engineering, risk mitigation planning, vendor selection consulting, and structural feasibility reviews to protect your investment.',
      image: '/assets/images/project-turnkey.png'
    },
    {
      num: '04',
      title: 'Interior Design Consulting',
      desc: 'Material curation, space optimization, spatial aesthetics strategy, and detailed budget planning to envision final spaces accurately.',
      image: '/assets/images/project-interior.png'
    }
  ];

  return (
    <div className="consulting-page app-layout is-ready">
      <Navbar alwaysScrolled />

      <main ref={heroRef}>
        {/* SECTION 01: HERO */}
        <section className="consulting-hero">
          <div className="consulting-hero__bg">
            <img src="/assets/images/about-story.jpg" alt="Squaare Ten Corporate Office Reception" />
          </div>
          <div className="consulting-hero__overlay"></div>

          <div className="container consulting-hero__content">
            <span className="consulting-hero__label">Strategic Consulting</span>
            <div className="consulting-hero__gold-line"></div>
            
            <h1 className="consulting-hero__title">
              Build With Confidence.<br />Plan With Clarity.
            </h1>
            
            <p className="consulting-hero__desc">
              From land development and commercial planning to construction strategy and interior design consulting, we help clients make informed decisions before execution begins.
            </p>
            
            <div className="consulting-hero__actions">
              <button 
                className="btn btn--primary" 
                onClick={() => scrollToSection(formSectionRef)}
              >
                Discuss Your Project
              </button>
              <button 
                className="btn btn--outline" 
                onClick={() => scrollToSection(gridRef)}
              >
                Explore Advisory Services
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 02: PROJECT ADVISORY EXPERTISE */}
        <section className="consulting-expertise" ref={gridRef} id="expertise">
          <div className="container">
            <div className="consulting-expertise__header">
              <span className="section-caption">Expertise</span>
              <h2 className="section-title">Project Advisory Expertise</h2>
              <div className="consulting-expertise__header-line"></div>
            </div>

            <div className="consulting-expertise__grid">
              {expertiseAreas.map((area, index) => (
                <div className="expertise-card" key={index}>
                  <div className="expertise-card__bg">
                    <img src={area.image} alt={area.title} />
                  </div>
                  <div className="expertise-card__overlay"></div>
                  <div className="expertise-card__border-accent"></div>
                  <div className="expertise-card__content">
                    <span className="expertise-card__number">{area.num}</span>
                    <h3 className="expertise-card__title">{area.title}</h3>
                    <p className="expertise-card__desc">{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: CONSULTATION FORM */}
        <section className="consulting-form-section" ref={formSectionRef} id="consultation">
          <div className="container consulting-form__wrapper">
            
            {/* Left Side: Headline and Trust Points */}
            <div className="consulting-form__info">
              <div className="consulting-form__info-content">
                <span className="section-caption">Start Consultation</span>
                <h2 className="consulting-form__title">Let's Discuss Your Vision</h2>
                <p className="consulting-form__desc">
                  Whether you're planning a residential project, commercial development, interior transformation, or land development strategy, our team is ready to guide you.
                </p>

                <div className="consulting-form__trust-grid">
                  <div className="trust-item">
                    <div className="trust-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                    </div>
                    <div className="trust-item__text">
                      <h4>10+ Years Experience</h4>
                      <p>Advising clients with construction and layout strategies since 2014.</p>
                    </div>
                  </div>

                  <div className="trust-item">
                    <div className="trust-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
                      </svg>
                    </div>
                    <div className="trust-item__text">
                      <h4>250+ Projects Delivered</h4>
                      <p>Consistent execution quality from conceptual planning to final handover.</p>
                    </div>
                  </div>

                  <div className="trust-item">
                    <div className="trust-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="trust-item__text">
                      <h4>End-to-End Expertise</h4>
                      <p>Unified supervision across design development, budgeting, and engineering.</p>
                    </div>
                  </div>

                  <div className="trust-item">
                    <div className="trust-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div className="trust-item__text">
                      <h4>Strategic Planning Support</h4>
                      <p>Helping you control layout choices, zoning limits, and budgets proactively.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Consultation Form */}
            <div className="consulting-form-container">
              {!submitted ? (
                <form className="consulting-form" onSubmit={handleSubmit} noValidate>
                  <div className="consulting-form__grid">
                    <div className="form-group">
                      <label htmlFor="fullName" className="consulting-label">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        className="consulting-input" 
                        placeholder="Enter Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required 
                      />
                      {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="consulting-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        className="consulting-input" 
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                      />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="consulting-label">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="consulting-input" 
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="projectType" className="consulting-label">Project Type *</label>
                      <select 
                        id="projectType" 
                        name="projectType"
                        className="consulting-select"
                        value={formData.projectType}
                        onChange={handleInputChange}
                      >
                        <option value="residential">Residential Strategy</option>
                        <option value="commercial">Commercial Planning</option>
                        <option value="land-development">Land Development Strategy</option>
                        <option value="interior-design">Interior Design Consulting</option>
                        <option value="turnkey-advisory">Turnkey Advisory</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location" className="consulting-label">Location *</label>
                      <input 
                        type="text" 
                        id="location" 
                        name="location"
                        className="consulting-input" 
                        placeholder="Enter Location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required 
                      />
                      {errors.location && <span className="form-error">{errors.location}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="budget" className="consulting-label">Estimated Budget *</label>
                      <input 
                        type="text" 
                        id="budget" 
                        name="budget"
                        className="consulting-input" 
                        placeholder="Enter Estimated Budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required 
                      />
                      {errors.budget && <span className="form-error">{errors.budget}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message" className="consulting-label">Describe Your Vision *</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows="4" 
                        className="consulting-textarea" 
                        placeholder="Enter Your Vision"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>
                  </div>

                  <div className="form-submit-wrapper">
                    <button type="submit" className="btn btn--primary consulting-submit-btn">
                      Request Consultation
                    </button>
                  </div>
                </form>
              ) : (
                <div className="consulting-success">
                  <div className="consulting-success__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="consulting-success__title">Thank You</h3>
                  <p className="consulting-success__msg">
                    Our consulting team will connect with you shortly.
                  </p>
                  <button 
                    className="btn btn--outline" 
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        projectType: 'residential',
                        location: '',
                        budget: '',
                        message: ''
                      });
                      setSubmitted(false);
                    }}
                    style={{ marginTop: '20px' }}
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
