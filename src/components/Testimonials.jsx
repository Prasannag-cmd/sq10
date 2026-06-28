/* ============================================================
   TESTIMONIALS — Client Reviews Section with Infinite Carousel
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: 'Squaareten Construction provides excellent repair and services. Their quick service is truly impressive, and they always deliver top-notch results. The team is professional, efficient, and always goes above and beyond to ensure customer satisfaction.',
    avatar: 'RK',
    name: 'Rajesh Kumar',
    role: 'Villa Owner, Arapalayam, Madurai',
    rating: 5
  },
  {
    text: 'The interior design and fit-out execution for our salon (Bonitaa Hair & Skin) was top-notch. Clients frequently praise the upscale aesthetic, structural precision, and spatial layout.',
    avatar: 'DS',
    name: 'Deepak Sundar',
    role: 'Founder, Bonitaa Hair & Skin',
    rating: 5
  },
  {
    text: 'Extremely transparent construction process and highly cost-efficient services. They helped us build our dream home within budget and ahead of schedule with premium quality.',
    avatar: 'RB',
    name: 'Ramesh Babu',
    role: 'Homeowner, Madurai',
    rating: 5
  },
  {
    text: 'They use very high-quality materials and their design and elevation work are really outstanding. Highly professional builders in Madurai. Highly recommend Squaareten Construction!',
    avatar: 'PD',
    name: 'Priya Dharshini',
    role: 'Resident, Thirupaalai Project',
    rating: 5
  },
  {
    text: 'Squaareten Construction provides quick service with truly impressive results. Each time we used their services, we were extremely satisfied with the outcome and professionalism.',
    avatar: 'MK',
    name: 'Manikandan',
    role: 'Homeowner, Madurai',
    rating: 5
  },
  {
    text: 'Squaareten has been our go-to contractor. Their structural precision, timely execution, and material quality are benchmark standards in the region.',
    avatar: 'VR',
    name: 'Vikas Reddy',
    role: 'Owner, Trichy Business Park',
    rating: 5
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
                  <span 
                    className="testimonial-card__star" 
                    key={j}
                    style={{ color: j < (t.rating || 5) ? 'var(--color-premium-gold)' : 'rgba(0,0,0,0.1)' }}
                  >
                    ★
                  </span>
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
