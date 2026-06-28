/* ============================================================
   ADMIN LAYOUT — Sidebar + Header wrapper for admin pages
   ============================================================ */
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/plots', label: 'Plot Management', icon: '🗺️' },
  { path: '/admin/bookings', label: 'Bookings', icon: '📋' },
  { path: '/admin/reports', label: 'Reports', icon: '📈' },
];

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/assets/images/logo.png" alt="Squaareten" className="admin-sidebar__logo" />
          <div className="admin-sidebar__brand-text">
            <span className="admin-sidebar__brand-name">Squaareten</span>
            <span className="admin-sidebar__brand-sub">Admin Panel</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__link admin-sidebar__link--back">
            <span className="admin-sidebar__link-icon">🌐</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="admin-main">
        {/* Top header */}
        <header className="admin-header">
          <button
            className="admin-header__menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <h1 className="admin-header__title">Karuppiah Nagar — Admin</h1>

          <div className="admin-header__right">
            <span className="admin-header__user">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {user?.email}
            </span>
            <button className="admin-header__logout" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
