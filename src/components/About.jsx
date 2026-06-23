/* ============================================================
   ABOUT — Company Story Section
   ============================================================ */
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const imageRef = useScrollReveal('clip-reveal');
  const contentRef = useScrollReveal('fade-right');
  const statsRef = useScrollReveal('stagger-children');

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__image-wrapper" ref={imageRef}>
            <img src="/assets/images/about-story.jpg" alt="Our Story - Squaare Ten Constructions Corporate Office" className="about__image" />
            <div className="about__image-accent"></div>
          </div>

          <div className="about__content" ref={contentRef}>
            <span className="section__label">Our Story</span>
            <h2 className="section__title">Crafting Legacies<br />in Concrete &amp; Steel</h2>
            <p className="about__text">
              Founded with a passion for excellence, <strong>Squaareten Construction Pvt Ltd</strong> has
              grown into a trusted name in the construction industry. We bring together innovative
              design, sustainable practices, and meticulous craftsmanship to create spaces that
              inspire and endure.
            </p>
            <p className="about__text">
              From luxurious villas to modern commercial complexes, every project reflects our
              commitment to quality, transparency, and client satisfaction. We don't just build
              structures — we <strong>build trust</strong>.
            </p>

            <div className="about__stats" ref={statsRef}>
              <div className="about__stat">
                <div className="about__stat-number">10+</div>
                <div className="about__stat-label">Years</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">250+</div>
                <div className="about__stat-label">Projects</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">98%</div>
                <div className="about__stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
