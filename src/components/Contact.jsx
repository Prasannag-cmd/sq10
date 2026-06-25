/* ============================================================
   CONTACT — Contact Info & Form Section
   ============================================================ */
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const infoRef = useScrollReveal('fade-left');
  const formRef = useScrollReveal('fade-right');

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
                  <div className="contact__detail-value"><a href="mailto:info@squaareten.com">info@squaareten.com</a></div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact__form" ref={formRef} id="contact-form" onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className="btn btn--primary contact__form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
