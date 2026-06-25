/* ============================================================
   SHOWROOM PLAN — Interactive SVG Store Layout Map
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { showroomZones } from '../data/abiAndCoData';

gsap.registerPlugin(ScrollTrigger);

const statusColors = {
  completed: { fill: 'rgba(201, 169, 110, 0.18)', stroke: '#c9a96e', label: 'Design Executed', activeFill: 'rgba(201, 169, 110, 0.45)' }
};

export default function ShowroomPlan() {
  const [activeTab, setActiveTab] = useState('interior'); // 'interior' or 'facade'
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const sectionRef = useRef(null);

  const zonesList = showroomZones[activeTab];

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedZone(null);
    setHoveredZone(null);
  }, [activeTab]);

  const activeZone = selectedZone || hoveredZone;

  return (
    <section className="abi-showroomplan" id="showroom-plan" ref={sectionRef}>
      <div className="kn-container">
        
        <div className="kn-section-header">
          <span className="kn-section-tag">Interactive Store Layout</span>
          <h2 className="kn-section-title">Explore the Showroom Plan</h2>
          <p className="kn-section-desc">
            Toggle between the exterior facade elevation and the interior ground floor blueprints. Click on highlighted zones to view structural details, materials used, and visual references.
          </p>
        </div>

        {/* View Toggle Controls */}
        <div className="kn-mp__phase-toggle" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '35px' }}>
          <button 
            className={`kn-btn ${activeTab === 'interior' ? 'kn-btn--primary' : 'kn-btn--outline'}`} 
            onClick={() => setActiveTab('interior')}
            style={{ padding: '0.8rem 1.8rem', fontSize: '0.8rem' }}
          >
            Ground Floor Layout
          </button>
          <button 
            className={`kn-btn ${activeTab === 'facade' ? 'kn-btn--primary' : 'kn-btn--outline'}`} 
            onClick={() => setActiveTab('facade')}
            style={{ padding: '0.8rem 1.8rem', fontSize: '0.8rem' }}
          >
            Exterior Facade Design
          </button>
        </div>

        {/* Legend */}
        <div className="kn-mp__controls" style={{ justifyContent: 'center', marginBottom: '25px' }}>
          <div className="kn-mp__legend">
            <div className="kn-mp__legend-item">
              <span 
                className="kn-mp__legend-dot" 
                style={{ 
                  background: 'repeating-linear-gradient(45deg, rgba(201, 169, 110, 0.15), rgba(201, 169, 110, 0.15) 3px, #c9a96e 3px, #c9a96e 6px)' 
                }} 
              />
              <span>Interactive Space Zone (Click to view)</span>
            </div>
          </div>
        </div>

        <div className="kn-mp__wrapper">
          {/* SVG Map Container */}
          <div className="kn-mp__map-container">
            {/* Architectural Grid Overlay */}
            <svg className="kn-mp__compass-overlay" viewBox="0 0 100 100" fill="none" stroke="var(--color-accent)" strokeWidth="0.8">
              <circle cx="50" cy="50" r="40" strokeDasharray="2,2" opacity="0.15" />
              <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1,2" opacity="0.2" />
              <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1,2" opacity="0.2" />
              <text x="50" y="9" textAnchor="middle" fill="var(--color-accent)" fontSize="6" fontWeight="bold" opacity="0.4">N</text>
            </svg>

            <svg viewBox="0 0 110 240" className="kn-mp__svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="showroom-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="rgba(201, 169, 110, 0.08)" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.6" />
                </pattern>
              </defs>
              
              {/* Plan Background */}
              <rect x="0" y="0" width="110" height="240" fill="var(--color-bg-alt)" rx="4" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              
              {activeTab === 'interior' ? (
                <>
                  {/* Grid Lines/Corridors representing walkways */}
                  <line x1="37.5" y1="10" x2="37.5" y2="230" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.3" />
                  <line x1="72.5" y1="10" x2="72.5" y2="230" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.3" />
                  
                  {/* Walkway corridor title */}
                  <text x="55" y="145" textAnchor="middle" fill="rgba(201, 169, 110, 0.15)" fontSize="2.8" fontWeight="600" fontFamily="var(--font-sans)">MAIN WALKWAY CORRIDOR</text>
                  <text x="55" y="235" textAnchor="middle" fill="var(--color-text-muted)" fontSize="3.5" fontFamily="var(--font-heading)" fontWeight="600" opacity="0.5">ABI & CO — GROUND FLOOR</text>
                </>
              ) : (
                <>
                  {/* Facade outlines */}
                  <line x1="10" y1="130" x2="100" y2="130" stroke="rgba(201, 169, 110, 0.2)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <text x="55" y="232" textAnchor="middle" fill="var(--color-text-muted)" fontSize="3.5" fontFamily="var(--font-heading)" fontWeight="600" opacity="0.5">FACADE ELEVATION VIEW</text>
                </>
              )}

              {/* Showroom clickable zones */}
              {zonesList.map((zone) => {
                const colors = statusColors[zone.status] || statusColors.completed;
                const isActive = activeZone?.id === zone.id;
                
                return (
                  <g
                    key={zone.id}
                    className="kn-mp__plot"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <polygon
                      points={zone.points}
                      fill={isActive ? colors.activeFill : 'url(#showroom-hatch)'}
                      stroke={isActive ? 'var(--color-white)' : colors.stroke}
                      strokeWidth={isActive ? 0.8 : 0.4}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    
                    {/* Zone ID/Short name */}
                    <text
                      x={zone.labelX} 
                      y={zone.labelY - 1}
                      textAnchor="middle" 
                      fill="var(--color-text)" 
                      fontSize="2.8"
                      fontFamily="var(--font-sans)" 
                      fontWeight="700"
                    >
                      {zone.name.split(' ')[0]}
                    </text>
                    <text
                      x={zone.labelX} 
                      y={zone.labelY + 2.5}
                      textAnchor="middle" 
                      fill="var(--color-text-secondary)" 
                      fontSize="1.6"
                      fontFamily="var(--font-sans)"
                      opacity="0.8"
                    >
                      {zone.area.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Details Sidebar Panel */}
          <div className={`kn-mp__detail ${activeZone ? 'visible' : ''}`}>
            {activeZone ? (
              <>
                <div className="kn-mp__detail-header" style={{ marginBottom: '1rem' }}>
                  <span className="kn-mp__detail-badge" style={{ color: 'var(--color-accent)', fontSize: '8px', letterSpacing: '2px' }}>
                    {activeZone.area.toUpperCase()}
                  </span>
                  <h3 className="kn-mp__detail-title" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '4px 0 0 0', color: '#fff' }}>
                    {activeZone.name}
                  </h3>
                </div>

                {/* Inline Image Preview */}
                <div style={{ width: '100%', aspectRatio: '16 / 10', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={activeZone.img} alt={activeZone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div className="kn-location__table-card" style={{ padding: 0, border: 'none', background: 'transparent', marginBottom: '1rem' }}>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Dimensions</span>
                    <strong style={{ color: '#fff' }}>{activeZone.dimensions}</strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Zoning Orientation</span>
                    <strong style={{ color: '#fff' }}>{activeZone.facing}</strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0', borderBottom: 'none' }}>
                    <span>Execution Status</span>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        background: '#c9a96e' 
                      }} />
                      {activeZone.statusLabel}
                    </strong>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-accent)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Design & Material Specs</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>
                    {activeZone.desc}
                  </p>
                </div>

                {/* WhatsApp Action Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  <a 
                    href={`https://wa.me/917540002054?text=Hi, I am interested in building a showroom/commercial space similar to the ${activeZone.name} design at Abi %26 Co.`}
                    className="kn-btn kn-btn--primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    Enquire about this Design ➔
                  </a>
                </div>
              </>
            ) : (
              <div className="kn-mp__detail-empty">
                <span className="kn-mp__detail-empty-icon">👆</span>
                <p>Select a highlighted area on the plan to view its interior photos, dimensions, and layout specifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
