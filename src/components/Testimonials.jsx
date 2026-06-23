/* ============================================================
   TESTIMONIALS — Client Reviews Section with Infinite Carousel
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: 'Squaareten delivered our dream villa beyond expectations. The attention to detail and quality of finish is unmatched. Truly a premium experience.',
    avatar: 'RK',
    name: 'Rajesh Kumar',
    role: 'Villa Owner, Sunrise Residences',
  },
  {
    text: 'Professional, transparent, and incredibly skilled. Our commercial complex was completed ahead of schedule with impeccable quality.',
    avatar: 'SP',
    name: 'Sanya Patel',
    role: 'Director, Apex Industries',
  },
  {
    text: 'The renovation of our heritage home was handled with such care and expertise. They preserved the character while adding modern comforts.',
    avatar: 'AM',
    name: 'Arjun Mehta',
    role: 'Homeowner, Heritage Revival',
  },
  {
    text: 'The interior design and fit-out execution for our salon was top-notch. Clients frequently praise the upscale aesthetic and spatial layout.',
    avatar: 'DS',
    name: 'Deepak Sundar',
    role: 'Founder, Bonitaa Hair & Skin',
  },
  {
    text: 'Exceptional coordination from blueprints to key handover. The turnkey process took all the stress out of building our first home.',
    avatar: 'MK',
    name: 'Meera Krishnan',
    role: 'Resident, Thirupaalai Project',
  },
  {
    text: 'Squaareten has been our go-to contractor. Their structural precision, timely execution, and material quality are benchmark standards.',
    avatar: 'VR',
    name: 'Vikas Reddy',
    role: 'Owner, Trichy Business Park',
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo('.testimonials__header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Fade in carousel track
      gsap.fromTo('.testimonials__carousel',
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Duplicate testimonials for smooth infinite marquee looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section testimonials" id="testimonials" ref={containerRef}>
      <div className="container testimonials__container-header">
        <div className="testimonials__header">
          <span className="section__label">Client Reviews</span>
          <h2 className="section__title">What Our Clients Say</h2>
          <p className="section__subtitle">Don't just take our word for it — hear from the families and businesses who trusted us.</p>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="testimonials__carousel">
        <div className="testimonials__track">
          {duplicatedTestimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, j) => (
                  <span className="testimonial-card__star" key={j}>★</span>
                ))}
              </div>
              <div className="testimonial-card__quote">"</div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
