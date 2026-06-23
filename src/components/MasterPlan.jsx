/* ============================================================
   MASTER PLAN — Interactive SVG Plot Map
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allPlots as phase1Plots, allPlotsPhase2 as phase2Plots } from '../data/karuppiahNagarPlots';

gsap.registerPlugin(ScrollTrigger);

const statusColors = {
  available: { fill: 'rgba(72, 187, 120, 0.25)', stroke: '#48bb78', label: 'Available' },
  sold: { fill: 'rgba(245, 101, 101, 0.25)', stroke: '#f56565', label: 'Sold' },
  reserved: { fill: 'rgba(237, 187, 69, 0.25)', stroke: '#edbb45', label: 'Reserved' },
};

export default function MasterPlan({ activePhase = 1, setActivePhase }) {
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const plotData = activePhase === 2 ? phase2Plots : phase1Plots;

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  // Reset selection when phase changes
  useEffect(() => {
    setSelectedPlot(null);
    setHoveredPlot(null);
  }, [activePhase]);

  const filteredPlots = filter === 'all' ? plotData : plotData.filter(p => p.status === filter);
  const activePlot = selectedPlot || hoveredPlot;

  return (
    <section className="kn-masterplan" id="kn-masterplan" ref={sectionRef}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Interactive Layout</span>
          <h2 className="kn-section-title">Master Plan</h2>
          <p className="kn-section-desc">Click on any plot to view details. Use filters to find your perfect plot.</p>
        </div>

        {/* Phase Toggle Controls */}
        <div className="kn-mp__phase-toggle" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '35px' }}>
          <button 
            className={`kn-btn ${activePhase === 1 ? 'kn-btn--primary' : 'kn-btn--outline'}`} 
            onClick={() => setActivePhase(1)}
            style={{ padding: '0.8rem 1.8rem', fontSize: '0.8rem' }}
          >
            Phase 1 Layout
          </button>
          <button 
            className={`kn-btn ${activePhase === 2 ? 'kn-btn--primary' : 'kn-btn--outline'}`} 
            onClick={() => setActivePhase(2)}
            style={{ padding: '0.8rem 1.8rem', fontSize: '0.8rem' }}
          >
            Phase 2 Layout
          </button>
        </div>

        {/* Legend & Filters */}
        <div className="kn-mp__controls">
          <div className="kn-mp__legend">
            {Object.entries(statusColors).map(([key, val]) => (
              <div className="kn-mp__legend-item" key={key}>
                <span className="kn-mp__legend-dot" style={{ background: val.stroke }} />
                <span>{val.label}</span>
              </div>
            ))}
          </div>
          <div className="kn-mp__filters">
            {['all', 'available', 'sold', 'reserved'].map(f => (
              <button
                key={f}
                className={`kn-mp__filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All Plots' : statusColors[f]?.label || f}
              </button>
            ))}
          </div>
        </div>

        <div className="kn-mp__wrapper">
          {/* SVG Map */}
          <div className="kn-mp__map-container">
            <svg viewBox="0 0 110 240" className="kn-mp__svg" preserveAspectRatio="xMidYMid meet">
              {/* Background */}
              <rect x="0" y="0" width="110" height="240" fill="var(--color-bg-alt)" rx="2" />
              
              {activePhase === 1 ? (
                <>
                  {/* Phase 1 Layout Maps */}
                  {/* Central Road (Slanted 24 FT Road) */}
                  <polygon points="55.30,10 63.30,10 51.00,215 43.00,215" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
                  <text x="53.3" y="110" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="3.2" fontWeight="600" transform="rotate(-93.4, 53.3, 110)" fontFamily="var(--font-sans)">24 FT WIDE ROAD</text>
                  
                  {/* Bottom Road (Existing Road to Podumbu) */}
                  <polygon points="0,215 110,215 110,238 0,238" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.12)" strokeWidth="0.2" />
                  <text x="55" y="228" textAnchor="middle" fill="rgba(201,169,110,0.25)" fontSize="2.8" fontWeight="600" fontFamily="var(--font-sans)">EXISTING ROAD TO PODUMBU</text>

                  {/* Title */}
                  <text x="55" y="7" textAnchor="middle" fill="var(--color-accent)" fontSize="3.8" fontFamily="var(--font-heading)" fontWeight="600">
                    KARUPPIAH NAGAR — PHASE 1
                  </text>
                </>
              ) : (
                <>
                  {/* Phase 2 Layout Maps */}
                  {/* Central Road (30 FEET WIDE ROAD) */}
                  <rect x="50" y="15" width="10" height="190" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
                  <text x="55" y="110" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="3.2" fontWeight="600" transform="rotate(-90, 55, 110)" fontFamily="var(--font-sans)">30 FEET WIDE ROAD</text>
                  
                  {/* Bottom Road (Sendhoor Avenue) */}
                  <rect x="0" y="205" width="110" height="30" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.12)" strokeWidth="0.2" />
                  <text x="55" y="222" textAnchor="middle" fill="rgba(201,169,110,0.25)" fontSize="2.5" fontWeight="600" fontFamily="var(--font-sans)">SENDHOOR AVENUE (30 FT ROAD)</text>

                  {/* Title */}
                  <text x="55" y="7" textAnchor="middle" fill="var(--color-accent)" fontSize="3.8" fontFamily="var(--font-heading)" fontWeight="600">
                    KARUPPIAH NAGAR — PHASE 2
                  </text>
                </>
              )}

              {/* Plot blocks */}
              {filteredPlots.map((plot) => {
                const colors = statusColors[plot.status];
                const isActive = activePlot?.id === plot.id;
                return (
                  <g
                    key={plot.id}
                    className="kn-mp__plot"
                    style={{ cursor: plot.status !== 'sold' ? 'pointer' : 'not-allowed' }}
                    onClick={() => plot.status !== 'sold' && setSelectedPlot(selectedPlot?.id === plot.id ? null : plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                  >
                    <polygon
                      points={plot.points}
                      fill={isActive ? colors.stroke.replace(')', ',0.4)').replace('rgb', 'rgba') : colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={isActive ? 0.6 : 0.3}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      x={plot.labelX} 
                      y={plot.id === '35A' ? plot.labelY + 0.8 : plot.labelY - 0.8}
                      textAnchor="middle" 
                      fill="var(--color-text)" 
                      fontSize={plot.id === '35A' ? "1.6" : "2.6"}
                      fontFamily="var(--font-sans)" 
                      fontWeight="600"
                    >
                      {plot.id}
                    </text>
                    {plot.id !== '35A' && (
                      <text
                        x={plot.labelX} 
                        y={plot.labelY + 2}
                        textAnchor="middle" 
                        fill="var(--color-text-secondary)" 
                        fontSize="1.3"
                        fontFamily="var(--font-sans)"
                      >
                        {plot.totalArea.toLocaleString()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail Panel */}
          <div className={`kn-mp__detail ${activePlot ? 'visible' : ''}`}>
            {activePlot ? (
              <>
                <div className="kn-mp__detail-header">
                  <span className="kn-mp__detail-badge" style={{ color: statusColors[activePlot.status].stroke }}>
                    {statusColors[activePlot.status].label}
                  </span>
                  <h3 className="kn-mp__detail-title">Plot #{activePlot.id}</h3>
                </div>
                <div className="kn-mp__detail-grid">
                  <div className="kn-mp__detail-item"><span>Total Area</span><strong>{activePlot.totalArea.toLocaleString()} sq.ft</strong></div>
                  <div className="kn-mp__detail-item"><span>Net Plot Area</span><strong>{activePlot.plotArea.toLocaleString()} sq.ft</strong></div>
                  <div className="kn-mp__detail-item"><span>Road Share</span><strong>{activePlot.roadArea > 0 ? activePlot.roadArea.toLocaleString() + ' sq.ft' : '-'}</strong></div>
                  <div className="kn-mp__detail-item"><span>Land Measure</span><strong>{activePlot.cents}</strong></div>
                  <div className="kn-mp__detail-item"><span>Dimensions</span><strong>{activePlot.dimensions}</strong></div>
                  <div className="kn-mp__detail-item"><span>Status</span><strong>{statusColors[activePlot.status].label}</strong></div>
                </div>
                {activePlot.status === 'available' && (
                  <a href={`https://wa.me/917540002054?text=I'm interested in Plot %23${activePlot.id} at Karuppiah Nagar Phase ${activePhase} (${activePlot.areaStr})`}
                    className="kn-btn kn-btn--primary kn-mp__detail-cta" target="_blank" rel="noopener noreferrer">
                    Enquire on WhatsApp
                  </a>
                )}
              </>
            ) : (
              <div className="kn-mp__detail-empty">
                <span className="kn-mp__detail-empty-icon">👆</span>
                <p>Select a plot on the map to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
