/* ============================================================
   STATS — Animated Number Counters
   ============================================================ */

export function initStats() {
  const statNumbers = document.querySelectorAll('.stat-item__number');
  if (!statNumbers.length) return;

  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';

    // Set initial value
    el.textContent = prefix + '0' + suffix;

    // ScrollTrigger animation
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.innerHTML = prefix + Math.round(counter.value) + 
              `<span class="stat-item__suffix">${suffix}</span>`;
          },
        });
      },
    });
  });
}
