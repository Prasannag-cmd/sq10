/* ============================================================
   CURSOR — Custom Premium Cursor (Desktop Only)
   ============================================================ */

export function initCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  
  // Skip on small screens
  if (window.innerWidth < 1024) return;

  // Create cursor elements
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  
  const cursorCircle = document.createElement('div');
  cursorCircle.className = 'cursor-circle';

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorCircle);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background: var(--color-accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      will-change: transform;
      mix-blend-mode: difference;
    }
    
    .cursor-circle {
      position: fixed;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      border: 1px solid var(--color-accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      will-change: transform;
      opacity: 0.4;
      transition: 
        width 0.3s var(--ease-out-expo),
        height 0.3s var(--ease-out-expo),
        opacity 0.3s var(--ease-out-expo),
        border-color 0.3s var(--ease-out-expo);
    }
    
    .cursor-circle.is-hovering {
      width: 56px;
      height: 56px;
      opacity: 0.6;
      border-color: var(--color-accent-light);
    }
    
    .cursor-circle.is-clicking {
      width: 28px;
      height: 28px;
      opacity: 0.8;
    }

    /* Hide default cursor when custom cursor is active */
    body.has-custom-cursor,
    body.has-custom-cursor * {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Add class to body
  document.body.classList.add('has-custom-cursor');

  // Track mouse
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    gsap.set(cursorDot, { x: mouseX, y: mouseY });
  });

  // Circle follows with lag
  gsap.ticker.add(() => {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    gsap.set(cursorCircle, { x: circleX, y: circleY });
  });

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .btn, .carousel__arrow, .carousel__dot, .service-card, .navbar__link');
  
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      cursorCircle.classList.add('is-hovering');
    });
    target.addEventListener('mouseleave', () => {
      cursorCircle.classList.remove('is-hovering');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursorCircle.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    cursorCircle.classList.remove('is-clicking');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([cursorDot, cursorCircle], { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
    gsap.to(cursorCircle, { opacity: 0.4, duration: 0.2 });
  });
}
