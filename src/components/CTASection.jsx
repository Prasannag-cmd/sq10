/* ============================================================
   CTA SECTION — High-conversion call-to-action
   ============================================================ */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
    );
  }, []);

  return (
    <section className="kn-cta" id="kn-cta" ref={ref}>
      <div className="kn-cta__bg-pattern" />
      <div className="kn-container kn-cta__inner">
        <span className="kn-cta__badge">✦ Limited Plots Available</span>
        <h2 className="kn-cta__title">
          Secure Your Dream Plot <br /> at Karuppiah Nagar
        </h2>
        <p className="kn-cta__desc">
          Don't miss this opportunity to own a premium DTCP-approved plot in the fastest-growing corridor of Madurai.
          Contact our team today for a site visit.
        </p>
        <div className="kn-cta__buttons">
          <a
            href="https://wa.me/917540002054?text=I'm interested in Karuppiah Nagar plots. Please share details."
            className="kn-btn kn-btn--primary kn-btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.313-3.083 1.034 1.034-3.083-.313-.42A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp Us
          </a>
          <a href="tel:+919750008484" className="kn-btn kn-btn--outline kn-btn--lg">
            📞 Call Now
          </a>
        </div>
        <p className="kn-cta__footer">
          Squareten Constructions Pvt Ltd · +91 97500 08484
        </p>
      </div>
    </section>
  );
}
