import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function ProjectGallery({ project, title }) {
  const { t } = useTranslation('projects');
  const [imageIndex, setImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, leftSide: false });
  const frameRef = useRef(null);
  const touchStart = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const total = project.images.length;

  const setImage = (nextIndex) => {
    const normalized = (nextIndex + total) % total;
    if (reduceMotion) {
      setImageIndex(normalized);
      return;
    }

    setIsChanging(true);
    window.setTimeout(() => {
      setImageIndex(normalized);
      setIsChanging(false);
    }, 180);
  };

  const previous = () => setImage(imageIndex - 1);
  const next = () => setImage(imageIndex + 1);

  const onPointerMove = (event) => {
    const rectangle = frameRef.current?.getBoundingClientRect();
    if (!rectangle) return;

    setCursor({
      x: event.clientX - rectangle.left,
      y: event.clientY - rectangle.top,
      leftSide: event.clientX - rectangle.left < rectangle.width / 2,
    });
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const delta = end - touchStart.current;
    touchStart.current = null;

    if (Math.abs(delta) > 36) {
      if (delta > 0) previous();
      else next();
    }
  };

  const onFrameClick = (event) => {
    const rectangle = frameRef.current?.getBoundingClientRect();
    if (!rectangle) return;
    if (event.clientX - rectangle.left < rectangle.width / 2) previous();
    else next();
  };

  return (
    <section className="px-page" aria-label={t('galleryAria', { title })}>
      <div
        ref={frameRef}
        className="gallery-frame relative grid cursor-none place-items-center overflow-hidden bg-card"
        onPointerMove={finePointer ? onPointerMove : undefined}
        onClick={onFrameClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={project.images[imageIndex]}
          alt={t('galleryImageAlt', { title, current: imageIndex + 1 })}
          className={`gallery-image max-h-[min(78svh,820px)] w-full object-contain transition duration-500 ease-smooth ${
            isChanging ? 'is-changing' : ''
          }`}
        />
        <span
          className="gallery-cursor"
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        >
          {cursor.leftSide ? '←' : '→'}
        </span>
      </div>
      <p className="m-0 mt-3.5 text-center text-[13px] text-muted">
        {t('imageCounter', { current: imageIndex + 1, total })}
      </p>
    </section>
  );
}
