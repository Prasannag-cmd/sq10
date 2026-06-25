/* ============================================================
   AWARDS MARQUEE — Infinite Horizontal Showcase
   ============================================================ */

const awards = [
  { icon: '🏆', text: 'Best Residential Builder', year: '2024' },
  { icon: '⭐', text: 'Excellence in Construction', year: '2023' },
  { icon: '🏅', text: 'Green Building Certification', year: '2023' },
  { icon: '🎖️', text: 'Top Luxury Villa Constructor', year: '2022' },
  { icon: '📐', text: 'Best Architectural Design', year: '2022' },
  { icon: '🛡️', text: 'ISO 9001:2015 Certified', year: '2021' },
  { icon: '🌿', text: 'Sustainable Builder Award', year: '2021' },
  { icon: '🏗️', text: 'Excellence in Engineering', year: '2020' },
  { icon: '💎', text: 'Premium Quality Standards', year: '2020' },
  { icon: '🤝', text: 'Client Satisfaction Award', year: '2019' },
];

export default function AwardsMarquee() {
  // Double the items for infinite loop
  const items = [...awards, ...awards];

  return (
    <section className="awards">
      <div className="container">
        <div className="awards__header">
          <span className="about-section__label">Recognition</span>
          <h2 className="about-section__title">Awards & Achievements</h2>
        </div>
      </div>

      <div className="awards__track-wrapper">
        <div className="awards__track">
          {items.map((award, i) => (
            <div className="award-item" key={i}>
              <span className="award-item__icon">{award.icon}</span>
              <span className="award-item__text">{award.text}</span>
              <span className="award-item__year">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
