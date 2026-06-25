/* ============================================================
   THEME TOGGLE — Dark/Light Theme Switcher
   ============================================================ */

export function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const html = document.documentElement;

  // ── Restore saved preference ──
  const saved = localStorage.getItem('sq10-theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  // ── Toggle handler ──
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';

    // Add transition class
    html.classList.add('theme-transitioning');

    html.setAttribute('data-theme', next);
    localStorage.setItem('sq10-theme', next);

    // Remove transition class after animation
    setTimeout(() => {
      html.classList.remove('theme-transitioning');
    }, 450);
  });

  // ── Listen for OS preference changes ──
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('sq10-theme')) {
      html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });
}
