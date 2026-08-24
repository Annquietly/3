import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useRevealOnScroll(forwardedRef, immediate = false) {
  const localRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    if (forwardedRef && 'current' in forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    const node = localRef.current;
    if (!node) return undefined;

    if (immediate) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, reduceMotion]);

  return { ref: setRef, isVisible };
}
