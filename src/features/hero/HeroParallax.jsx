import { useEffect, useRef } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const photos = [
  {
    src: '/assets/photo/Anna_0.webp',
    className: 'left-[40%] top-[27%] z-[2] w-[clamp(72px,8vw,126px)] max-[900px]:left-auto max-[900px]:right-[60px] max-[900px]:top-[calc(var(--header-height)+70px)] max-[900px]:w-[clamp(78px,12vw,132px)] max-[560px]:right-[10px] max-[560px]:w-[74px]',
    depth: 0.1,
  },
  {
    src: '/assets/photo/magazine1.webp',
    className: 'right-[23%] top-[13%] w-[clamp(160px,20vw,310px)] max-[900px]:hidden',
    depth: 0.13,
    rotate: '-6deg',
  },
  {
    src: '/assets/photo/instagram-visual.webp',
    className: 'bottom-[12%] right-[3%] w-[clamp(220px,25vw,470px)] max-[900px]:hidden',
    depth: 0.1,
  },
  {
    src: '/assets/photo/app.webp',
    className: 'bottom-[5%] left-[48%] w-[clamp(160px,21vw,200px)] max-[900px]:hidden',
    depth: 0.15,
    rotate: '-8deg',
  },
];

export default function HeroParallax() {
  const wrapperRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || reduceMotion || !finePointer) return undefined;

    const onPointerMove = (event) => {
      const offsetX = event.clientX / window.innerWidth - 0.5;
      const offsetY = event.clientY / window.innerHeight - 0.5;

      node.querySelectorAll('[data-mouse-depth]').forEach((photo) => {
        const depth = Number(photo.dataset.mouseDepth);
        photo.style.setProperty('--mouse-x', `${offsetX * depth * 180}px`);
        photo.style.setProperty('--mouse-y', `${offsetY * depth * 180}px`);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [finePointer, reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    >
      {photos.map((photo) => (
        <img
          key={photo.src}
          src={photo.src}
          alt=""
          className={`hero-photo ${photo.className}`}
          data-mouse-depth={photo.depth}
          style={{ '--photo-rotate': photo.rotate ?? '0deg' }}
          draggable="false"
        />
      ))}
    </div>
  );
}
