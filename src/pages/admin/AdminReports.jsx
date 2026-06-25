/* ============================================================
   ADMIN REPORTS — Filtered Reports with PDF/Excel Export
   ============================================================ */
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import * as XLSX from 'xlsx';
import AdminLayout from '../../components/admin/AdminLayout';

const REPORT_TYPES = [
  { key: 'available', label: 'Available Plots', filter: p => p.status === 'available', color: '#48bb78' },
  { key: 'reserved', label: 'Reserved Plots', filter: p => p.status === 'reserved', color: '#edbb45' },
  { key: 'sold', label: 'Sold Plots', filter: p => p.status === 'sold', color: '#f56565' },
  { key: 'phase1', label: 'Phase 1 Plots', filter: p => p.phase === 1, color: '#4299E1' },
  { key: 'phase2', label: 'Phase 2 Plots', filter: p => p.phase === 2, color: '#38B2AC' },
];

export default function AdminReports() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState('available');
  const printRef = useRef(null);

  useEffect(() => {
    const fetchPlots = async () => {
      const { data } = await supabase.from('plots').select('*').order('phase').order('plot_number');
      if (data) setPlots(data);
      setLoading(false);
    };
    fetchPlots();
  }, []);

  const report = REPORT_TYPES.find(r => r.key === activeReport);
  const filtered = plots.filter(report.filter);

  // Export as Excel
  const exportExcel = () => {
    const rows = filtered.map(p => ({
      'Plot #': p.plot_number,
      'Phase': p.phase,
      'Total Sq.Ft': Number(p.total_area),
      'Facing': p.facing,
      'Dimensions': p.dimensions,
      'Status': p.status.charAt(0).toUpperCase() + p.status.slice(1),
      'Price (₹)': Number(p.total_area) * Number(p.price_per_sqft),
      'Cents': p.cents,
      'Notes': p.notes || '',
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, report.label);
    XLSX.writeFile(wb, `Squaareten_${report.label.replace(/\s/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Export as PDF (print)
  const exportPDF = () => {
    const printContent = printRef.current;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>${report.label} — Squaareten Construction</title>
          <style>
            body { font-family: 'Outfit', 'Inter', sans-serif; padding: 30px; color: #1a1a1a; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            h2 { font-size: 16px; color: #666; font-weight: 400; margin-bottom: 20px; }
            .meta { font-size: 12px; color: #888; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #f5f5f5; padding: 10px 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600; }
            td { padding: 8px 12px; border-bottom: 1px solid #eee; }
            .status { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
            .status-available { background: #e6ffee; color: #22543d; }
            .status-reserved { background: #fff8e6; color: #744210; }
            .status-sold { background: #ffe6e6; color: #742a2a; }
            .summary { margin-top: 20px; font-size: 13px; color: #555; }
            @media print { body { padding: 15px; } }
          </style>
        </head>
        <body>
          <h1>Squaareten Construction Pvt Ltd</h1>
          <h2>${report.label} — Karuppiah Nagar</h2>
          <div class="meta">Generated: ${new Date().toLocaleString('en-IN')}</div>
          ${printContent.innerHTML}
          <div class="summary">
            <strong>Total Plots:</strong> ${filtered.length} &nbsp;|&nbsp;
            <strong>Total Sq.Ft:</strong> ${filtered.reduce((s, p) => s + Number(p.total_area), 0).toLocaleString('en-IN')}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Reports</h2>
            <p className="admin-page__subtitle">Generate and export plot inventory reports</p>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="admin-report-tabs">
          {REPORT_TYPES.map(r => (
            <button
              key={r.key}
              className={`admin-report-tab ${activeReport === r.key ? 'is-active' : ''}`}
              onClick={() => setActiveReport(r.key)}
              style={activeReport === r.key ? { borderColor: r.color, color: r.color } : {}}
            >
              {r.label}
              <span className="admin-report-tab__count">{plots.filter(r.filter).length}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading...</p></div>
        ) : (
          <>
            {/* Export Buttons */}
            <div className="admin-export-bar">
              <button className="admin-btn admin-btn--outline" onClick={exportPDF}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Export PDF
              </button>
              <button className="admin-btn admin-btn--outline" onClick={exportExcel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Export Excel
              </button>
            </div>

            {/* Report Table (printable) */}
            <div className="admin-table-card" ref={printRef}>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Plot #</th>
                      <th>Phase</th>
                      <th>Total Sq.Ft</th>
                      <th>Facing</th>
                      <th>Dimensions</th>
                      <th>Status</th>
                      <th>Price (₹)</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No plots match this filter</td></tr>
                    ) : (
                      filtered.map(p => (
                        <tr key={p.id}>
                          <td><strong>{p.plot_number}</strong></td>
                          <td>Phase {p.phase}</td>
                          <td>{Number(p.total_area).toLocaleString()}</td>
                          <td>{p.facing}</td>
                          <td>{p.dimensions}</td>
                          <td>
                            <span className={`admin-status admin-status--${p.status}`}>
                              {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                            </span>
                          </td>
                          <td>₹{(Number(p.total_area) * Number(p.price_per_sqft)).toLocaleString('en-IN')}</td>
                          <td>{p.notes || '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="admin-report-summary">
              <span><strong>Total Plots:</strong> {filtered.length}</span>
              <span><strong>Total Sq.Ft:</strong> {filtered.reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</span>
              <span><strong>Total Value:</strong> ₹{filtered.reduce((s, p) => s + Number(p.total_area || 0) * Number(p.price_per_sqft || 0), 0).toLocaleString('en-IN')}</span>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
