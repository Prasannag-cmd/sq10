/* ============================================================
   CURSOR — Custom Premium Cursor (Desktop Only)
   ============================================================ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Skip on touch devices or small screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;
    if (isTouch || isMobile) return;

    // Add class to body to hide default cursor
    document.body.classList.add('has-custom-cursor');

    // Create inline styles for cursors dynamically or rely on base.css / theme-toggle.css styles
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
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

      body.has-custom-cursor,
      body.has-custom-cursor * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    let mouseX = null;
    let mouseY = null;
    let circleX = null;
    let circleY = null;

    const onMouseMove = (e) => {
      const isFirstMove = mouseX === null;
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (isFirstMove) {
        circleX = mouseX;
        circleY = mouseY;
        if (circleRef.current) {
          gsap.set(circleRef.current, { x: circleX, y: circleY });
        }
      }
      
      setIsVisible(true);
      // Dot follows immediately
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: mouseX, y: mouseY });
      }
    };

    const tickerCallback = () => {
      if (mouseX === null || circleX === null) return;
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      if (circleRef.current) {
        gsap.set(circleRef.current, { x: circleX, y: circleY });
      }
    };

    // Global listener for hover targets (delegated)
    const onMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest) {
        const isInteractive = target.closest('a, button, .btn, .carousel__arrow, .carousel__dot, .service-card, .navbar__link, [data-hover-cursor]');
        if (isInteractive) {
          setIsHovering(true);
        }
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (target && target.closest) {
        const isInteractive = target.closest('a, button, .btn, .carousel__arrow, .carousel__dot, .service-card, .navbar__link, [data-hover-cursor]');
        if (isInteractive) {
          setIsHovering(false);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      gsap.to([dotRef.current, circleRef.current], { opacity: 0, duration: 0.2 });
    };
    const onMouseEnter = () => {
      if (mouseX !== null) {
        setIsVisible(true);
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
        gsap.to(circleRef.current, { opacity: 0.4, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    gsap.ticker.add(tickerCallback);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      const addedStyle = document.getElementById('custom-cursor-style');
      if (addedStyle) addedStyle.remove();

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);

      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ display: isVisible ? 'block' : 'none' }}
      />
      <div
        ref={circleRef}
        className={`cursor-circle ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-clicking' : ''}`}
        style={{ display: isVisible ? 'block' : 'none' }}
      />
    </>
  );
}
