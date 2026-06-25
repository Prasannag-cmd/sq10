/* ============================================================
   PRINT LAYOUT — Printable Plot Map with Status Colors
   ============================================================ */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const statusColors = {
  available: { fill: '#48bb78', label: 'Available' },
  sold:      { fill: '#f56565', label: 'Sold' },
  reserved:  { fill: '#edbb45', label: 'Reserved' },
};

export default function PrintLayout() {
  const [searchParams] = useSearchParams();
  const phase = Number(searchParams.get('phase')) || 1;
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlots = async () => {
      const { data } = await supabase.from('plots').select('*').eq('phase', phase).order('plot_number');
      if (data) setPlots(data);
      setLoading(false);
    };
    fetchPlots();
  }, [phase]);

  const available = plots.filter(p => p.status === 'available');
  const reserved = plots.filter(p => p.status === 'reserved');
  const sold = plots.filter(p => p.status === 'sold');
  const totalSqft = plots.reduce((s, p) => s + Number(p.total_area || 0), 0);

  const handlePrint = () => window.print();

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="print-layout">
      {/* Print action bar (hidden in print) */}
      <div className="print-layout__actions no-print">
        <button className="admin-btn admin-btn--primary" onClick={handlePrint}>
          🖨️ Print / Download PDF
        </button>
        <button className="admin-btn admin-btn--outline" onClick={() => window.close()}>
          Close
        </button>
      </div>

      {/* Printable Content */}
      <div className="print-layout__page">
        <div className="print-layout__header">
          <div>
            <h1 className="print-layout__company">Squaareten Construction Pvt Ltd</h1>
            <h2 className="print-layout__project">Karuppiah Nagar — Phase {phase} Layout</h2>
          </div>
          <div className="print-layout__date">
            Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* SVG Layout */}
        <div className="print-layout__map">
          <svg viewBox="0 0 110 240" width="100%" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '600px' }}>
            <rect x="0" y="0" width="110" height="240" fill="#fff" rx="1" stroke="#ddd" strokeWidth="0.3" />

            {phase === 1 ? (
              <>
                <polygon points="55.30,10 63.30,10 51.00,215 43.00,215" fill="#f5f5f5" stroke="#ccc" strokeWidth="0.2" />
                <text x="53.3" y="110" textAnchor="middle" fill="#999" fontSize="3" fontWeight="600" transform="rotate(-93.4, 53.3, 110)">24 FT WIDE ROAD</text>
                <polygon points="0,215 110,215 110,238 0,238" fill="#f5f5f5" stroke="#ccc" strokeWidth="0.2" />
                <text x="55" y="228" textAnchor="middle" fill="#999" fontSize="2.5" fontWeight="600">EXISTING ROAD TO PODUMBU</text>
                <text x="55" y="7" textAnchor="middle" fill="#333" fontSize="3.5" fontWeight="700">KARUPPIAH NAGAR — PHASE 1</text>
              </>
            ) : (
              <>
                <rect x="50" y="15" width="10" height="190" fill="#f5f5f5" stroke="#ccc" strokeWidth="0.2" />
                <text x="55" y="110" textAnchor="middle" fill="#999" fontSize="3" fontWeight="600" transform="rotate(-90, 55, 110)">30 FEET WIDE ROAD</text>
                <rect x="0" y="205" width="110" height="30" fill="#f5f5f5" stroke="#ccc" strokeWidth="0.2" />
                <text x="55" y="222" textAnchor="middle" fill="#999" fontSize="2.5" fontWeight="600">SENDHOOR AVENUE (30 FT ROAD)</text>
                <text x="55" y="7" textAnchor="middle" fill="#333" fontSize="3.5" fontWeight="700">KARUPPIAH NAGAR — PHASE 2</text>
              </>
            )}

            {plots.map(plot => {
              const sc = statusColors[plot.status] || statusColors.available;
              return (
                <g key={plot.id}>
                  <polygon
                    points={plot.points}
                    fill={sc.fill}
                    stroke="#333"
                    strokeWidth="0.3"
                    opacity="0.35"
                  />
                  <polygon
                    points={plot.points}
                    fill="none"
                    stroke={sc.fill}
                    strokeWidth="0.5"
                  />
                  <text
                    x={plot.label_x}
                    y={plot.plot_number === '35A' ? Number(plot.label_y) + 0.5 : Number(plot.label_y) - 0.5}
                    textAnchor="middle"
                    fill="#111"
                    fontSize={plot.plot_number === '35A' ? '1.4' : '2.4'}
                    fontWeight="700"
                  >
                    {plot.plot_number}
                  </text>
                  {plot.plot_number !== '35A' && (
                    <text
                      x={plot.label_x}
                      y={Number(plot.label_y) + 2}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="1.2"
                    >
                      {Number(plot.total_area).toLocaleString()}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="print-layout__legend">
          {Object.entries(statusColors).map(([key, val]) => (
            <div className="print-layout__legend-item" key={key}>
              <span className="print-layout__legend-dot" style={{ background: val.fill }} />
              <span>{val.label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="print-layout__summary">
          <h3>Summary — Phase {phase}</h3>
          <table className="print-layout__table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Total Sq.Ft</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Plots</td>
                <td>{plots.length}</td>
                <td>{totalSqft.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ color: '#48bb78' }}>
                <td>Available</td>
                <td>{available.length}</td>
                <td>{available.reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ color: '#edbb45' }}>
                <td>Reserved</td>
                <td>{reserved.length}</td>
                <td>{reserved.reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ color: '#f56565' }}>
                <td>Sold</td>
                <td>{sold.length}</td>
                <td>{sold.reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="print-layout__footer">
          <p>Squaareten Construction Pvt Ltd | +91 97500 08484 | info@squaareten.com</p>
        </div>
      </div>
    </div>
  );
}
