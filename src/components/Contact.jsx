/* ============================================================
   CONTACT — Contact Info & Form Section
   ============================================================ */
import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { emailConfig } from '../config/emailConfig';

export default function Contact() {
  const infoRef = useScrollReveal('fade-left');
  const formRef = useScrollReveal('fade-right');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formDataPayload = new FormData(e.target);
    formDataPayload.append("access_key", emailConfig.web3FormsKey);
    formDataPayload.append("subject", `New Contact Inquiry from ${formDataPayload.get("name")}`);
    formDataPayload.append("from_name", "Squaare Ten Constructions website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataPayload
      });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
        e.target.reset();
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitError("Failed to submit message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info" ref={infoRef}>
            <span className="section__label">Get In Touch</span>
            <h2 className="contact__title section__title">Let's Build<br />Something Great</h2>
            <p className="contact__text">Ready to turn your vision into reality? Contact us today for a free consultation.</p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">📍</div>
                <div>
                  <div className="contact__detail-label">Visit Us</div>
                  <div className="contact__detail-value">116/294 J VIJAYASEKARAN STREET, KANMAIKARAI ROAD, ARAPALAYAM, MADURAI - 625016.</div>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">📞</div>
                <div>
                  <div className="contact__detail-label">Call Us</div>
                  <div className="contact__detail-value">
                    <a href="tel:+919750008484">+91 97500 08484</a>
                  </div>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">💬</div>
                <div>
                  <div className="contact__detail-label">WhatsApp Us</div>
                  <div className="contact__detail-value">
                    <a href="https://wa.me/917540002054?text=Hello%20Squaareten%20Construction%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noopener noreferrer">+91 75400 02054</a>
                  </div>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">✉️</div>
                <div>
                  <div className="contact__detail-label">Email Us</div>
                  <div className="contact__detail-value"><a href="mailto:squaaretenconstruction@gmail.com">squaaretenconstruction@gmail.com</a></div>
                </div>
              </div>
            </div>
          </div>

          {formSubmitted ? (
            <div className="contact__form-success" style={{
              background: 'rgba(201, 169, 110, 0.05)',
              border: '1px solid rgba(201, 169, 110, 0.2)',
              borderRadius: '8px',
              padding: '40px 30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ fontSize: '2.5rem', color: '#C9A96E' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>Message Sent Successfully</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>Thank you for reaching out. We will get back to you shortly.</p>
              <button className="btn btn--outline" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact__form" ref={formRef} id="contact-form" onSubmit={handleFormSubmit}>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="name">Your Name</label>
                <input type="text" className="contact__form-input" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="email">Email Address</label>
                <input type="email" className="contact__form-input" id="email" name="email" placeholder="Enter your email address" required />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="phone">Phone Number</label>
                <input type="tel" className="contact__form-input" id="phone" name="phone" placeholder="Enter your phone number" />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="message">Your Message</label>
                <textarea className="contact__form-textarea" id="message" name="message" placeholder="Enter your message" required></textarea>
              </div>
              {submitError && (
                <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center' }}>
                  {submitError}
                </div>
              )}
              <button type="submit" className="btn btn--primary contact__form-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
