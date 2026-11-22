import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let activeLenis = null;

export function scrollToTop() {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (activeLenis && !reduceMotion) {
    activeLenis.scrollTo(0, { duration: 0.55, immediate: false });
    window.dispatchEvent(new Event('pp:lenis-wake'));
    return;
  }
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
}

export default function SmoothScroll({ reducedMotion = false }) {
  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      anchors: true
    });
    activeLenis = lenis;
    let rafId = 0;

    const raf = time => {
      rafId = 0;
      lenis.raf(time);
      if (lenis.isScrolling) rafId = window.requestAnimationFrame(raf);
    };
    const wake = () => {
      if (!rafId) rafId = window.requestAnimationFrame(raf);
    };
    const onAnchorClick = event => {
      if (event.target?.closest?.('a[href^="#"]')) wake();
    };

    lenis.on('virtual-scroll', wake);
    window.addEventListener('pp:lenis-wake', wake);
    window.addEventListener('click', onAnchorClick, true);
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && lenis.isScrolling) wake();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      lenis.off('virtual-scroll', wake);
      window.removeEventListener('pp:lenis-wake', wake);
      window.removeEventListener('click', onAnchorClick, true);
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, [reducedMotion]);

  return null;
}
