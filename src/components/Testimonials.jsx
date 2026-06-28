/* ============================================================
   TESTIMONIALS — Client Reviews Section with Infinite Carousel
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: 'Squaareten Construction provides excellent repair and services. Their quick service is truly impressive, and they always deliver top-notch results. The team is professional, efficient, and always goes above and beyond to ensure customer satisfaction. I highly recommend Squaareten Construction!',
    avatar: 'H',
    name: 'Harish',
    role: 'Client, Arapalayam',
    rating: 5
  },
  {
    text: 'Squaareten Construction offers excellent repair and service. Their easily understandable quotation process makes it simple to get the work done without any confusion. Highly professional and trustworthy!',
    avatar: 'K',
    name: 'Kalpna',
    role: 'Client, Madurai',
    rating: 5
  },
  {
    text: 'Their team of experts listened to my vision and transformed it into a stunning reality, exceeding my expectations. The quality of craftsmanship, materials, and timelines were all top-notch. Special thanks to Er. Srinivasan and Praveen!',
    avatar: 'V',
    name: 'Vishwa',
    role: 'Homeowner, Madurai',
    rating: 5
  },
  {
    text: 'Best elevation work compared to others. Only best quality materials are used. Very transparent communication between the client and the construction team.',
    avatar: 'S',
    name: 'Sharath',
    role: 'Client, Best Elevation Project',
    rating: 5
  },
  {
    text: 'Squaareten Construction is excellent! They are very cost efficient and provide top-notch repair and services. I highly recommend them for any construction needs.',
    avatar: 'SK',
    name: 'Senthil Kumar',
    role: 'Client, Madurai',
    rating: 5
  },
  {
    text: 'I had an excellent experience with Squaareten Construction. Their service was quick and efficient, and the prices were very reasonable. I was impressed with their professionalism and quality of work.',
    avatar: 'GS',
    name: 'Girish S',
    role: 'Homeowner, Arapalayam',
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
