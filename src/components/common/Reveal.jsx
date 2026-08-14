import { forwardRef } from 'react';

import { cn } from '../../lib/cn';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const Reveal = forwardRef(function Reveal(
  { as: Component = 'div', delay = false, className, children, ...props },
  forwardedRef,
) {
  const { ref, isVisible } = useRevealOnScroll(forwardedRef);

  return (
    <Component
      ref={ref}
      className={cn('reveal', delay && 'reveal-delay-1', isVisible && 'is-visible', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Reveal;
