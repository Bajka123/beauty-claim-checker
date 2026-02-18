import { useLocation } from 'react-router';
import { useEffect, type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const location = useLocation();

  // Reset scroll position on every page mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={`animate-fadeInUp ${className}`}
    >
      {children}
    </div>
  );
}