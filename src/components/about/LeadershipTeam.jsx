/* ============================================================
   LEADERSHIP TEAM — Premium Team Showcase
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    initials: 'SV', name: 'Srinivasan', role: 'Co-Founder & Director',
    bio: '15+ years in luxury architectural design. Visionary leading the design direction of Squaareten.',
    socials: [{ label: 'in', url: '#' }, { label: 'ig', url: '#' }],
  },
  {
    initials: 'PK', name: 'Praveen Kumar', role: 'Co-Founder & Director',
    bio: '15+ years in engineering project execution. Directs construction excellence and structural safety standards.',
    socials: [{ label: 'in', url: '#' }, { label: 'ig', url: '#' }],
  },
];

export default function LeadershipTeam() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.leader-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.leadership__grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section leadership" ref={sectionRef}>
      <div className="container">
        <div className="leadership__header">
          <span className="about-section__label">Our Team</span>
          <h2 className="about-section__title">The Minds Behind<br />the Builds</h2>
          <p className="about-section__subtitle" style={{ margin: '0 auto' }}>
            Meet the visionaries who bring expertise, passion, and decades of experience to every project.
          </p>
        </div>

        <div className="leadership__grid">
          {team.map((member, i) => (
            <div className="leader-card" key={i}>
              <div className="leader-card__photo">
                <span className="leader-card__photo-initials">{member.initials}</span>
              </div>
              <div className="leader-card__info">
                <h3 className="leader-card__name">{member.name}</h3>
                <div className="leader-card__role">{member.role}</div>
                <p className="leader-card__bio">{member.bio}</p>
                <div className="leader-card__socials">
                  {member.socials.map((s, si) => (
                    <a key={si} href={s.url} className="leader-card__social" aria-label={s.label}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
