/* ============================================================
   FOOTER — Site Footer
   ============================================================ */
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';
  const homePrefix = isHomePage ? '' : '/';

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/assets/images/logo.png" alt="Squaareten Construction Pvt Ltd" className="footer__logo-img" />
              <div className="footer__logo-text">Squaareten<span>Construction Pvt Ltd</span></div>
            </Link>
            <p className="footer__desc">Building excellence since 2014. We transform visions into architectural masterpieces that stand the test of time.</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="footer__social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Services</h4>
            <div className="footer__links">
              <Link to="/projects/residential" className="footer__link">Residential</Link>
              <Link to="/projects/commercial" className="footer__link">Commercial</Link>
              <Link to="/projects/residential" className="footer__link">Villa Construction</Link>
              <Link to="/projects/interiors" className="footer__link">Renovation</Link>
              <Link to="/projects/interiors" className="footer__link">Interior Design</Link>
              <Link to="/projects/consulting" className="footer__link">Turnkey Solutions</Link>
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <div className="footer__links">
              {isHomePage ? (
                <>
                  <Link to="/about" className="footer__link">About Us</Link>
                  <Link to="/projects" className="footer__link">Projects</Link>
                  <Link to="/careers" className="footer__link">Careers</Link>
                  <Link to="/loan-emi-calculator" className="footer__link">EMI Calculator</Link>
                  <a href="#testimonials" className="footer__link">Testimonials</a>
                  <a href="#contact" className="footer__link">Contact</a>
                </>
              ) : (
                <>
                  <Link to="/about" className="footer__link">About Us</Link>
                  <Link to="/projects" className="footer__link">Projects</Link>
                  <Link to="/careers" className="footer__link">Careers</Link>
                  <Link to="/loan-emi-calculator" className="footer__link">EMI Calculator</Link>
                  <Link to="/#testimonials" className="footer__link">Testimonials</Link>
                  <Link to="/#contact" className="footer__link">Contact</Link>
                </>
              )}
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Contact</h4>
            <div className="footer__links">
              <a href="tel:+919750008484" className="footer__link">Call: +91 97500 08484</a>
              <a href="https://wa.me/917540002054?text=Hello%20Squaareten%20Construction%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="footer__link">WhatsApp: +91 75400 02054</a>
              <a href="mailto:info@squaareten.com" className="footer__link">Email: info@squaareten.com</a>
              <span className="footer__link" style={{ cursor: 'default', color: 'var(--color-text-muted)' }}>Mon – Sat: 9 AM – 7 PM</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 Squaareten Construction Pvt Ltd. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Light Beige Contact Strip placed below the main footer */}
      <div className="footer__contact-bar">
        <div className="footer__contact-inner">
          <div className="footer__contact-left">
            <div className="footer__phone-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="footer__contact-branding">
              <span className="footer__contact-sub">Let's Build Something</span>
              <h4 className="footer__contact-main">Extraordinary Together</h4>
            </div>
          </div>

          <div className="footer__contact-info-boxes">
            <div className="footer__contact-info-box">
              <span className="footer__info-lbl">Need help?</span>
              <a href="tel:+919750008484" className="footer__info-val">+91 97500 08484</a>
            </div>
            <div className="footer__contact-info-box">
              <span className="footer__info-lbl">Email us</span>
              <a href="mailto:info@squaareten.com" className="footer__info-val">info@squaareten.com</a>
            </div>
          </div>

          <div className="footer__contact-right">
            <a href="/assets/brochure.pdf" download className="footer__btn-brochure">
              <span>DOWNLOAD BROCHURE</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
