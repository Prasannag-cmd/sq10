/* ============================================================
   TESTIMONIALS — Real-Time Google Reviews via Places API
   ============================================================ */
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. LOCAL REVIEWS FALLBACK & SEED DATA (Actual reviews parsed from profiles)
const localTestimonials = [
  {
    text: 'Squaareten Construction provides excellent repair and services. Their quick service is truly impressive, and they always deliver top-notch results. The team is professional, efficient, and always goes above and beyond to ensure customer satisfaction. I highly recommend Squaareten Construction!',
    avatar: 'H',
    name: 'Harish',
    role: 'Client, Arapalayam',
    rating: 5,
    date: '9th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  },
  {
    text: 'Squaareten Construction offers excellent repair and service. Their easily understandable quotation process makes it simple to get the work done without any confusion. Highly professional and trustworthy!',
    avatar: 'K',
    name: 'Kalpna',
    role: 'Client, Madurai',
    rating: 5,
    date: '7th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  },
  {
    text: 'Their team of experts listened to my vision and transformed it into a stunning reality, exceeding my expectations. The quality of craftsmanship, materials, and timelines were all top-notch. Special thanks to Er. Srinivasan and Praveen!',
    avatar: 'V',
    name: 'Vishwa',
    role: 'Homeowner, Madurai',
    rating: 5,
    date: '7th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  },
  {
    text: 'Best elevation work compared to others. Only best quality materials are used. Very transparent communication between the client and the construction team.',
    avatar: 'S',
    name: 'Sharath',
    role: 'Client, Best Elevation Project',
    rating: 5,
    date: '7th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  },
  {
    text: 'Squaareten Construction is excellent! They are very cost efficient and provide top-notch repair and services. I highly recommend them for any construction needs.',
    avatar: 'SK',
    name: 'Senthil Kumar',
    role: 'Client, Madurai',
    rating: 5,
    date: '7th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  },
  {
    text: 'I had an excellent experience with Squaareten Construction. Their service was quick and efficient, and the prices were very reasonable. I was impressed with their professionalism and quality of work.',
    avatar: 'GS',
    name: 'Girish S',
    role: 'Homeowner, Arapalayam',
    rating: 5,
    date: '7th July, 2024',
    url: 'https://www.justdial.com/Madurai/Squaareten-Construction-Arapalayam/0452P4525STD240001_BZDET'
  }
];

const CACHE_KEY = 'squaareten_google_reviews_cache';
const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 Hours Cache

export default function Testimonials() {
  const containerRef = useRef(null);
  const [reviews, setReviews] = useState(localTestimonials);
  const [overallRating, setOverallRating] = useState(4.9);
  const [totalReviews, setTotalReviews] = useState(22);

  // Helper: Format Date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recent Review';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  useEffect(() => {
    // 2. CHECK CACHE FIRST
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setReviews(data.reviews);
          setOverallRating(data.overallRating);
          setTotalReviews(data.totalReviews);
          return; // Skip script load, cache is fresh
        }
      } catch (err) {
        console.warn("Error reading reviews cache:", err);
      }
    }

    // 3. LOAD GOOGLE MAPS SCRIPT DYNAMICALLY
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || 'ChIJd39999999999999';

    if (!apiKey) {
      console.info("VITE_GOOGLE_API_KEY not configured. Testimonials running in offline fallback mode.");
      return;
    }

    const scriptId = 'google-maps-places-sdk';
    let script = document.getElementById(scriptId);

    const initializePlacesService = () => {
      try {
        const dummyDiv = document.createElement('div');
        const service = new window.google.maps.places.PlacesService(dummyDiv);

        service.getDetails({
          placeId: placeId,
          fields: ['reviews', 'rating', 'user_ratings_total', 'url']
        }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            // Map Places API review nodes to Testimonial shapes
            const fetchedReviews = (place.reviews || []).map(r => ({
              text: r.text,
              avatar: r.author_name ? r.author_name.substring(0, 2).toUpperCase() : 'G',
              name: r.author_name,
              role: 'Verified Google Reviewer',
              rating: r.rating,
              profile_photo_url: r.profile_photo_url,
              time: r.time * 1000, // API returns seconds
              url: r.author_url || place.url
            }));

            // Filter out 1-star reviews as requested by user
            const filteredReviews = fetchedReviews.filter(r => r.rating > 1);

            // Merge with local testimonials (ensures the infinite carousel remains full and rich)
            const mergedReviews = [...filteredReviews, ...localTestimonials];

            setReviews(mergedReviews);
            setOverallRating(place.rating || 4.9);
            setTotalReviews(place.user_ratings_total || 22);

            // Update cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: {
                reviews: mergedReviews,
                overallRating: place.rating || 4.9,
                totalReviews: place.user_ratings_total || 22
              }
            }));
          } else {
            console.warn("Places details call failed. Status:", status);
          }
        });
      } catch (err) {
        console.error("Google Places integration failed gracefully:", err);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializePlacesService;
      script.onerror = () => console.warn("Google Maps JS script load failed. Reverting to local testimonials.");
      document.head.appendChild(script);
    } else {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializePlacesService();
      } else {
        script.addEventListener('load', initializePlacesService);
      }
    }
  }, []);

  // 4. ANIMATION & GSAP TRIGGER
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
  }, [reviews]); // Re-trigger only when reviews list shifts

  // Duplicate testimonials for smooth infinite marquee looping
  const duplicatedTestimonials = [...reviews, ...reviews];

  return (
    <section className="section testimonials" id="testimonials" ref={containerRef}>
      <div className="container testimonials__container-header">
        <div className="testimonials__header">
          <span className="section__label">Client Reviews</span>
          <h2 className="section__title">What Our Clients Say</h2>
          
          {/* Dynamic Google overall rating badge */}
          <div className="testimonials__google-rating">
            <div className="google-rating__badge">
              <span className="google-rating__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </span>
              <span className="google-rating__stars">⭐ {Number(overallRating).toFixed(1)} / 5</span>
              <span className="google-rating__count">({totalReviews} Google Reviews)</span>
            </div>
          </div>

          <p className="section__subtitle">Don't just take our word for it — hear from the families and businesses who trusted us.</p>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="testimonials__carousel">
        <div className="testimonials__track">
          {duplicatedTestimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              
              <div className="testimonial-card__header">
                {/* Star rating */}
                <div className="testimonial-card__stars">
                  {[...Array(5)].map((_, j) => (
                    <span 
                      className="testimonial-card__star" 
                      key={j}
                      style={{ color: j < (t.rating || 5) ? 'var(--color-premium-gold)' : 'rgba(0,0,0,0.12)' }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Verified badge */}
                <span className="testimonial-card__verified-badge">
                  <svg viewBox="0 0 24 24" className="verified-icon">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Verified Review
                </span>
              </div>

              {/* Review date */}
              <div className="testimonial-card__date">
                {t.time ? formatDate(t.time) : t.date || 'Recent Review'}
              </div>

              {/* Review quote text */}
              <p className="testimonial-card__text">"{t.text}"</p>

              {/* Author footer and original link */}
              <div className="testimonial-card__author">
                <div className="testimonial-card__author-info">
                  {t.profile_photo_url ? (
                    <img 
                      src={t.profile_photo_url} 
                      alt={t.name} 
                      className="testimonial-card__photo" 
                      referrerPolicy="no-referrer"
                      loading="lazy" 
                    />
                  ) : (
                    <div className="testimonial-card__avatar">{t.avatar}</div>
                  )}
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>

                {/* External link to Google review */}
                <a 
                  href={t.url || "https://www.google.com/maps"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="testimonial-card__google-link" 
                  title="View original review"
                >
                  <svg viewBox="0 0 24 24" className="google-icon-svg" style={{ width: '16px', height: '16px' }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
