import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;

    document.body.classList.add('is-changing-page');
    const timer = window.setTimeout(() => {
      document.body.classList.remove('is-changing-page');
    }, 450);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return <div className="page-transition" aria-hidden="true" />;
}
