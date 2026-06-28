/* ============================================================
   MASTER PLAN — Interactive SVG Plot Map
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allPlots as staticPhase1, allPlotsPhase2 as staticPhase2 } from '../data/karuppiahNagarPlots';
import { supabase } from '../lib/supabaseClient';

gsap.registerPlugin(ScrollTrigger);

const statusColors = {
  available: { fill: 'rgba(72, 187, 120, 0.25)', stroke: '#48bb78', label: 'Available', activeFill: 'rgba(72, 187, 120, 0.55)' },
  sold: { fill: 'rgba(245, 101, 101, 0.25)', stroke: '#f56565', label: 'Sold', activeFill: 'rgba(245, 101, 101, 0.55)' },
  reserved: { fill: 'rgba(237, 187, 69, 0.25)', stroke: '#edbb45', label: 'Reserved', activeFill: 'rgba(237, 187, 69, 0.55)' },
};

export default function MasterPlan({ activePhase = 1, setActivePhase, onOpenDownloadModal }) {
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [filter, setFilter] = useState('all');
  const [livePlots, setLivePlots] = useState(null); // null = not loaded yet
  const sectionRef = useRef(null);

  // Fetch plots from Supabase, fallback to static data
  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const { data, error } = await supabase.from('plots').select('*').order('id');
        if (!error && data && data.length > 0) {
          // Transform Supabase rows to match the format used by the SVG
          const transformed = data.map(row => ({
            id: row.plot_number,
            plotArea: Number(row.plot_area),
            roadArea: Number(row.road_area),
            totalArea: Number(row.total_area),
            cents: row.cents,
            facing: row.facing,
            dimensions: row.dimensions,
            points: row.points,
            labelX: Number(row.label_x),
            labelY: Number(row.label_y),
            status: row.status,
            notes: row.notes,
            phase: row.phase,
            price: Number(row.total_area) * Number(row.price_per_sqft),
            priceStr: `₹${(Number(row.total_area) * Number(row.price_per_sqft) / 100000).toFixed(2)} Lakhs`,
            area: Number(row.total_area),
            areaStr: `${Number(row.total_area).toLocaleString()} sq.ft`,
          }));
          setLivePlots(transformed);
        }
      } catch {
        // Supabase unavailable — use static data (no-op, livePlots stays null)
      }
    };
    fetchPlots();

    // Realtime subscription
    const channel = supabase
      .channel('public-plots-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'plots' }, () => {
        fetchPlots();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Use live data if available, else static
  const allPhase1 = livePlots ? livePlots.filter(p => p.phase === 1) : staticPhase1;
  const allPhase2 = livePlots ? livePlots.filter(p => p.phase === 2) : staticPhase2;
  const plotData = activePhase === 2 ? allPhase2 : allPhase1;

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
                <span 
                  className="kn-mp__legend-dot" 
                  style={{ 
                    background: key === 'available'
                      ? 'repeating-linear-gradient(45deg, rgba(72, 187, 120, 0.15), rgba(72, 187, 120, 0.15) 3px, #48bb78 3px, #48bb78 6px)'
                      : val.stroke 
                  }} 
                />
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
            {/* Compass Overlay */}
            <svg className="kn-mp__compass-overlay" viewBox="0 0 100 100" fill="none" stroke="var(--color-accent)" strokeWidth="1.2">
              <circle cx="50" cy="50" r="35" strokeDasharray="1.5,1.5" opacity="0.3" />
              <line x1="50" y1="15" x2="50" y2="85" opacity="0.4" />
              <line x1="15" y1="50" x2="85" y2="50" opacity="0.4" />
              <polygon points="50,15 46,46 50,50" fill="var(--color-accent)" stroke="var(--color-accent)" strokeWidth="0.5" />
              <polygon points="50,85 46,46 50,50" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="50" y="11" textAnchor="middle" fill="var(--color-accent)" fontSize="8" fontWeight="bold" fontFamily="var(--font-sans)">N</text>
              <text x="50" y="93" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-sans)">S</text>
              <text x="92" y="52" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-sans)">E</text>
              <text x="8" y="52" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-sans)">W</text>
            </svg>

            <svg viewBox="0 0 110 240" className="kn-mp__svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="available-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="rgba(72, 187, 120, 0.12)" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#48bb78" strokeWidth="2" />
                </pattern>
              </defs>
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
                const colors = statusColors[plot.status] || statusColors.available;
                const isActive = activePlot?.id === plot.id;
                return (
                  <g
                    key={plot.id}
                    className="kn-mp__plot"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedPlot(selectedPlot?.id === plot.id ? null : plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                  >
                    <polygon
                      points={plot.points}
                      fill={plot.status === 'available' ? (isActive ? colors.activeFill : 'url(#available-hatch)') : (isActive ? colors.activeFill : colors.fill)}
                      stroke={isActive ? 'var(--color-white)' : colors.stroke}
                      strokeWidth={isActive ? 0.8 : 0.3}
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
                <div className="kn-mp__detail-header" style={{ marginBottom: '1.25rem' }}>
                  <span className="kn-mp__detail-badge" style={{ color: 'var(--color-accent)', fontSize: '8px', letterSpacing: '2px' }}>
                    PLOT DETAILS
                  </span>
                  <h3 className="kn-mp__detail-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Plot No. {activePlot.id}
                  </h3>
                </div>
                
                <div className="kn-location__table-card" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Plot Size</span>
                    <strong>{activePlot.totalArea.toLocaleString()} Sqft.</strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Dimensions</span>
                    <strong>{activePlot.dimensions.replace(' ft', '')}</strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Facing</span>
                    <strong>{activePlot.facing}</strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0' }}>
                    <span>Status</span>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        background: activePlot.status === 'available' ? '#48bb78' : (activePlot.status === 'sold' ? '#f56565' : '#edbb45') 
                      }} />
                      {statusColors[activePlot.status].label}
                    </strong>
                  </div>
                  <div className="kn-location__table-row" style={{ padding: '6px 0', borderBottom: 'none' }}>
                    <span>Price</span>
                    <strong style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>{activePlot.priceStr}</strong>
                  </div>
                </div>

                {/* Nearby Amenities */}
                <div className="kn-mp__nearby-sec">
                  <h4 className="kn-mp__nearby-title">Nearby Amenities</h4>
                  <div className="kn-mp__nearby-grid">
                    <div className="kn-mp__nearby-item">
                      <span>⛲ Parks</span>
                      <strong>2 mins</strong>
                    </div>
                    <div className="kn-mp__nearby-item">
                      <span>🏫 School</span>
                      <strong>5 mins</strong>
                    </div>
                    <div className="kn-mp__nearby-item">
                      <span>🏥 Hospital</span>
                      <strong>10 mins</strong>
                    </div>
                    <div className="kn-mp__nearby-item">
                      <span>🚌 Bus Stand</span>
                      <strong>8 mins</strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.5rem' }}>
                  <a 
                    href={`https://wa.me/917540002054?text=I'm interested in Plot %23${activePlot.id} at Karuppaiah Nagar Phase ${activePhase} (${activePlot.areaStr})`}
                    className="kn-btn kn-btn--primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    Enquire Now ➔
                  </a>
                  <button 
                    onClick={onOpenDownloadModal}
                    className="kn-btn kn-btn--outline"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      padding: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Book Site Visit
                  </button>
                </div>
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

