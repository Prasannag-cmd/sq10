/* ============================================================
   SQUAARE TEN CAREERS EXPERIENCE — Simplified Futuristic Version
   Clean, modern, performant, and architecture-focused.
   ============================================================ */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { emailConfig } from '../config/emailConfig';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Why Join Pillars Data (Section 2)
const pillarsData = [
  {
    id: 'growth',
    number: '01',
    title: 'Growth',
    description: 'Work on real landmark projects and advance your career with clear, structured milestones.'
  },
  {
    id: 'innovation',
    number: '02',
    title: 'Innovation',
    description: 'Use modern BIM models, virtual layout tools, and next-generation construction practices.'
  },
  {
    id: 'learning',
    number: '03',
    title: 'Learning',
    description: 'Continuous exposure to challenging structures, professional training, and expert leadership.'
  },
  {
    id: 'impact',
    number: '04',
    title: 'Impact',
    description: 'Create ultra-luxury homes and landmark commercial spaces that people experience every day.'
  }
];

// Open Positions Data (Section 3)
const positionsData = [
  {
    id: 'lead-architect',
    title: 'Lead Architect',
    location: 'Madurai, TN',
    experience: '5+ Years',
    type: 'Full-time',
    description: 'Lead high-end architectural concepts and custom luxury villa designs. Translate client vision into structural drawings, spatial layouts, and execution blueprints while coordinating design languages with the engineering team.'
  },
  {
    id: 'project-engineer',
    title: 'Project Engineer',
    location: 'Chennai, TN',
    experience: '4+ Years',
    type: 'Full-time',
    description: 'Manage site execution structural integrity, materials schedules, and concrete framework alignment. Ensure all physical civil construction conforms exactly to blueprint measurements and engineering criteria.'
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    location: 'Coimbatore, TN',
    experience: '3+ Years',
    type: 'Full-time',
    description: 'Curate luxury material boards, spatial layout aesthetics, custom cabinetry detailing, and mood lighting configurations for premium residential and commercial contracts.'
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    location: 'Madurai, TN',
    experience: '5+ Years',
    type: 'Full-time',
    description: 'Oversee daily site operations, coordination of labor teams, quality inspections of structural materials, and enforce site safety protocols to ensure timely and precise framework delivery.'
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    location: 'Madurai, TN',
    experience: '6+ Years',
    type: 'Full-time',
    description: 'Coordinate project constraints, client reviews, material supply logs, and project budget matrices. Synchronize multi-disciplinary engineering and design teams for smooth landmark handovers.'
  }
];

export default function CareersPage() {
  const containerRef = useRef(null);

  // Section Refs
  const heroRef = useRef(null);
  const whyJoinRef = useRef(null);
  const positionsRef = useRef(null);
  const formRef = useRef(null);

  // Accordion active state
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });
  const [fileName, setFileName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Cursor gold light movement tracker inside Hero
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleHeroMouseMove = (e) => {
      const lightSource = heroElement.querySelector('.hero-gold-light');
      if (!lightSource) return;

      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Parallax soft move (max 3px drift)
      const xOffset = ((x / rect.width) - 0.5) * 6;
      const yOffset = ((y / rect.height) - 0.5) * 6;

      gsap.to(lightSource, {
        x: xOffset,
        y: yOffset,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    heroElement.addEventListener('mousemove', handleHeroMouseMove);
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleHeroMouseMove);
      }
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ── HERO ENTRANCE ───────────────────────────────────────────
      const label = heroRef.current.querySelector('.hero-label');
      const line = heroRef.current.querySelector('.hero-gold-line');
      const titleLines = heroRef.current.querySelectorAll('.hero-title-line');
      const supportingText = heroRef.current.querySelector('.hero-support');
      const buttons = heroRef.current.querySelectorAll('.hero-btn');
      const bgImg = heroRef.current.querySelector('.hero-bg-img');

      // Set initial states
      gsap.set(label, { opacity: 0, y: 15 });
      gsap.set(line, { scaleX: 0, transformOrigin: 'center center' });
      titleLines.forEach(l => gsap.set(l, { y: '100%', opacity: 0 }));
      gsap.set(supportingText, { opacity: 0, y: 15 });
      gsap.set(buttons, { opacity: 0, y: 15 });

      const heroTl = gsap.timeline();

      heroTl.to(label, {
        opacity: 0.8,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      heroTl.to(line, {
        scaleX: 1,
        duration: 1.0,
        ease: 'power3.inOut'
      }, '-=0.5');

      titleLines.forEach((titleLine, i) => {
        heroTl.to(titleLine, {
          y: '0%',
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out'
        }, `-=${i === 0 ? 0.6 : 0.8}`);
      });

      heroTl.to(supportingText, {
        opacity: 0.8,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');

      heroTl.to(buttons, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');

      // Gentle Background zoom scale on scroll
      gsap.fromTo(bgImg, 
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // ── SECTION 2: WHY JOIN ENTRANCE ─────────────────────────────
      const pillarsHeader = whyJoinRef.current.querySelector('.why-header');
      const pillarCards = whyJoinRef.current.querySelectorAll('.pillar-card');

      gsap.from(pillarsHeader, {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whyJoinRef.current,
          start: 'top 80%'
        }
      });

      gsap.from(pillarCards, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whyJoinRef.current,
          start: 'top 65%'
        }
      });

      // ── SECTION 3: OPEN POSITIONS ENTRANCE ───────────────────────
      const positionsHeader = positionsRef.current.querySelector('.positions-header');
      const accordionItems = positionsRef.current.querySelectorAll('.accordion-item');

      gsap.from(positionsHeader, {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: positionsRef.current,
          start: 'top 80%'
        }
      });

      gsap.from(accordionItems, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: positionsRef.current,
          start: 'top 70%'
        }
      });

      // ── SECTION 4: FORM CTA ENTRANCE ─────────────────────────────
      const formContent = formRef.current.querySelector('.form-content-wrapper');

      gsap.from(formContent, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%'
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formDataPayload = new FormData(e.target);
    formDataPayload.append("access_key", emailConfig.web3FormsKey);
    formDataPayload.append("subject", `New Careers Application: ${formData.position} - ${formData.name}`);
    formDataPayload.append("from_name", "Squaare Ten Constructions website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataPayload
      });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitError("Failed to submit the form. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Click handler to select role and scroll to form
  const handleApplyClick = (roleId) => {
    setFormData(prev => ({ ...prev, position: roleId }));
    if (window.lenis) {
      window.lenis.scrollTo('#apply-form-section');
    } else {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: '#apply-form-section',
        ease: 'power3.inOut'
      });
    }
  };

  const scrollToPositions = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#positions-section');
    } else {
      gsap.to(window, {
        duration: 1.0,
        scrollTo: '#positions-section',
        ease: 'power3.inOut'
      });
    }
  };

  const scrollToForm = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#apply-form-section');
    } else {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: '#apply-form-section',
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <div className="careers-page" ref={containerRef}>
      <Navbar isVisible={true} alwaysScrolled={true} />

      {/* ── SECTION 1: HERO EXPERIENCE ────────────────────────────── */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg-wrapper">
          <img 
            src="/assets/images/hero-bg.png" 
            alt="Premium Construction Backdrop" 
            className="hero-bg-img"
          />
          {/* Subtle animated grid overlay */}
          <div className="hero-blueprint-grid" />
          {/* Soft radial gold spotlight */}
          <div className="hero-gold-light" />
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-label">CAREERS AT SQUAARETEN PVT LTD</span>
            <div className="hero-gold-line" />
            
            <div className="hero-heading">
              <div className="hero-heading-mask">
                <h1 className="hero-title-line">Build The Future.</h1>
              </div>
              <div className="hero-heading-mask">
                <h1 className="hero-title-line gold-accent">Build Your Career.</h1>
              </div>
            </div>

            <p className="hero-support">
              Join a team creating premium construction, interior, and architectural projects across Tamil Nadu.
            </p>

            <div className="hero-actions">
              <button onClick={scrollToPositions} className="hero-btn primary">
                View Open Positions
              </button>
              <button onClick={scrollToForm} className="hero-btn secondary">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" onClick={scrollToPositions}>
          <span>Scroll to explore</span>
          <div className="hero-indicator-line" />
        </div>
      </section>

      {/* ── SECTION 2: WHY JOIN SQUAARE TEN ─────────────────────────── */}
      <section className="why-join-section" ref={whyJoinRef}>
        <div className="section-container">
          <div className="why-header">
            <span className="section-caption">Core Values</span>
            <h2 className="section-title">Why Join Squaareten Pvt Ltd</h2>
            <p className="section-desc">
              We provide the environment, resources, and vision to help our professionals excel and build their structural legacy.
            </p>
          </div>

          <div className="pillars-grid">
            {pillarsData.map((pillar) => (
              <div key={pillar.id} className="pillar-card">
                <div className="pillar-card-sweep" />
                <span className="pillar-number">{pillar.number}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OPEN POSITIONS ──────────────────────────────── */}
      <section className="positions-section" id="positions-section" ref={positionsRef}>
        <div className="section-container">
          <div className="positions-header">
            <span className="section-caption">Opportunities</span>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-desc">
              Explore our current vacancies and select a role to see credential profiles and submit files.
            </p>
          </div>

          <div className="positions-accordion">
            {positionsData.map((role, index) => {
              const isOpen = activeRoleIndex === index;
              return (
                <div 
                  key={role.id} 
                  className={`accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <div 
                    className="accordion-header" 
                    onClick={() => setActiveRoleIndex(isOpen ? -1 : index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveRoleIndex(isOpen ? -1 : index);
                      }
                    }}
                  >
                    <div className="accordion-header-left">
                      <span className="accordion-number">0{index + 1}</span>
                      <h3 className="accordion-role-title">{role.title}</h3>
                    </div>
                    <div className="accordion-header-right">
                      <span className="role-meta-tag">{role.location}</span>
                      <span className="role-meta-tag">{role.experience}</span>
                      <span className="role-meta-tag type">{role.type}</span>
                      <span className="accordion-arrow"></span>
                    </div>
                  </div>

                  <div className="accordion-body">
                    <div className="accordion-body-inner">
                      <p className="role-long-desc">{role.description}</p>
                      <button 
                        onClick={() => handleApplyClick(role.id)} 
                        className="role-apply-btn"
                      >
                        Apply For This Role
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: APPLICATION CTA ─────────────────────────────── */}
      <section className="application-section" id="apply-form-section" ref={formRef}>
        <div className="form-content-wrapper">
          <div className="form-header">
            <h2 className="form-title">Ready To Build The Future?</h2>
            <p className="form-desc">
              Join Squaareten Construction Pvt Ltd and be part of projects that shape communities and create lasting impact.
            </p>
          </div>

          <div className="form-container-box">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="careers-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="form-input-sweep" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="form-input-sweep" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="form-input-sweep" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="position">Position Applied For</label>
                    <select 
                      id="position"
                      name="position" 
                      required 
                      value={formData.position}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Opportunity</option>
                      {positionsData.map(pos => (
                        <option key={pos.id} value={pos.id}>{pos.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Resume / Credentials Upload</label>
                    <label className="file-upload-zone">
                      <span className="file-upload-text">
                        Drag and drop your credentials or <span className="highlight">browse files</span>
                      </span>
                      <input 
                        type="file" 
                        name="attachment"
                        accept=".pdf,.doc,.docx" 
                        required 
                        onChange={handleFileChange}
                        className="file-input-hidden"
                      />
                      {fileName && <div className="file-selected-name">Selected: {fileName}</div>}
                    </label>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="message">Message / Structural Ambition</label>
                    <textarea 
                      id="message"
                      name="message" 
                      rows="4" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      style={{ resize: 'none' }}
                    />
                    <div className="form-input-sweep" />
                  </div>
                </div>

                {submitError && (
                  <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center' }}>
                    {submitError}
                  </div>
                )}

                <div className="form-submit-wrapper">
                  <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Credentials"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="success-screen">
                <div className="success-icon-wrapper">
                  <svg className="success-checkmark" viewBox="0 0 52 52">
                    <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
                <h3 className="success-title">Application Received Successfully</h3>
                <p className="success-message">
                  We'll review your profile and contact you shortly. Thank you for choosing Squaareten Pvt Ltd.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
