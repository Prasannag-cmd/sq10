/* ============================================================
   LOCATION MAP — Embedded Google Maps
   ============================================================ */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  { icon: '🏫', title: 'Schools & Colleges', desc: 'Multiple reputed educational institutions within 3 km radius.' },
  { icon: '🏥', title: 'Hospitals', desc: 'Major hospitals and clinics accessible within 5 km.' },
  { icon: '🛒', title: 'Shopping', desc: 'Supermarkets, malls, and local markets in close proximity.' },
  { icon: '🚌', title: 'Transport', desc: 'Well-connected by bus routes and near major highways.' },
  { icon: '🕌', title: 'Places of Worship', desc: 'Temples, mosques, and churches within walking distance.' },
  { icon: '🌳', title: 'Green Spaces', desc: 'Parks and recreational areas nearby for a healthy lifestyle.' },
];

export default function LocationMap() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
    );
  }, []);

  return (
    <section className="kn-location" id="kn-location" ref={ref}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Strategic Location</span>
          <h2 className="kn-section-title">Location Advantages</h2>
          <p className="kn-section-desc">Kovilpapakudi, Madurai — a thriving residential corridor with excellent connectivity.</p>
        </div>

        <div className="kn-location__wrapper">
          <div className="kn-location__advantages">
            {advantages.map((a, i) => (
              <div className="kn-location__adv-card" key={i}>
                <span className="kn-location__adv-icon">{a.icon}</span>
                <div>
                  <h4 className="kn-location__adv-title">{a.title}</h4>
                  <p className="kn-location__adv-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="kn-location__map-container-wrapper">
            <div className="kn-location__map">
              <iframe
                title="Karuppiah Nagar Location"
                src="https://maps.google.com/maps?q=KARUPPIAH+NAGAR+PHASE+I,+Kovilpapakudi,+Madurai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Maps Action Buttons */}
            <div className="kn-location__map-actions">
              <a 
                href="https://www.google.com/maps/place/KARUPPIAH+NAGAR+PHASE+I/@9.9801068,78.0882407,17z/data=!3m1!4b1!4m6!3m5!1s0x3b00c93caa2f2cf1:0x2b08f0eae2e0af2!8m2!3d9.9801068!4d78.0882407!16s%2Fg%2F11sbj4h2j3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="kn-map-btn kn-map-btn--orange"
              >
                <span className="kn-map-btn__icon">📍</span>
                Open in Google Maps
              </a>
              <a 
                href="https://www.google.com/maps/place/KARUPPIAH+NAGAR+PHASE+I/@9.9801068,78.0882407,17z/data=!4m8!3m7!1s0x3b00c93caa2f2cf1:0x2b08f0eae2e0af2!8m2!3d9.9801068!4d78.0882407!9m1!1b1!16s%2Fg%2F11sbj4h2j3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="kn-map-btn kn-map-btn--white"
              >
                <span className="kn-map-btn__icon">📷</span>
                View 400+ Real Photos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
