/* ============================================================
   PROJECTS PAGE — Gallery, Filters & Modal
   ============================================================ */

export function initProjectsPage() {
  initFilters();
  initGalleryModal();
  initScrollReveals();
}

// ── Category Filters ──
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.masonry__item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const cat = btn.dataset.filter;

      items.forEach(item => {
        const itemCat = item.dataset.category;
        const show = cat === 'all' || itemCat === cat;

        gsap.to(item, {
          opacity: show ? 1 : 0.15,
          scale: show ? 1 : 0.95,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            item.style.pointerEvents = show ? '' : 'none';
          },
        });
      });
    });
  });
}

// ── Full-Screen Gallery Modal ──
function initGalleryModal() {
  const modal = document.querySelector('.gallery-modal');
  if (!modal) return;

  const image = modal.querySelector('.gallery-modal__image');
  const title = modal.querySelector('.gallery-modal__title');
  const category = modal.querySelector('.gallery-modal__category');
  const closeBtn = modal.querySelector('.gallery-modal__close');
  const prevBtn = modal.querySelector('.gallery-modal__nav--prev');
  const nextBtn = modal.querySelector('.gallery-modal__nav--next');

  const items = document.querySelectorAll('.masonry__item');
  let currentIndex = 0;
  const images = [];

  items.forEach((item, i) => {
    const img = item.querySelector('img');
    const titleText = item.querySelector('.masonry__item-title')?.textContent || '';
    const catText = item.querySelector('.masonry__item-category')?.textContent || '';
    images.push({ src: img?.src, title: titleText, category: catText });

    item.addEventListener('click', () => {
      currentIndex = i;
      openGallery();
    });
  });

  function openGallery() {
    updateGallery();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateGallery() {
    const data = images[currentIndex];
    if (!data) return;
    if (image) image.src = data.src;
    if (title) title.textContent = data.title;
    if (category) category.textContent = data.category;
  }

  closeBtn?.addEventListener('click', closeGallery);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGallery();
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; updateGallery(); }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; updateGallery(); }
  });
}

// ── Scroll Reveals ──
function initScrollReveals() {
  const revealEls = document.querySelectorAll('[data-animate]');
  revealEls.forEach(el => {
    const type = el.dataset.animate;
    let fromVars = { opacity: 0, y: 40 };
    if (type === 'fade-left') fromVars = { opacity: 0, x: -40 };
    if (type === 'fade-right') fromVars = { opacity: 0, x: 40 };
    if (type === 'scale-in') fromVars = { opacity: 0, scale: 0.9 };

    gsap.fromTo(el, fromVars, {
      ...Object.fromEntries(Object.keys(fromVars).map(k => [k, k === 'opacity' ? 1 : 0])),
      scale: 1,
      duration: 0.7,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Stagger children
  document.querySelectorAll('[data-animate="stagger-children"]').forEach(parent => {
    gsap.fromTo(parent.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: parent, start: 'top 85%' } }
    );
  });
}
