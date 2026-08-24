import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import MediaLightbox from './MediaLightbox';
import ProjectMedia from './ProjectMedia';

export default function ProjectGallery({ project, title }) {
  const { t } = useTranslation('projects');
  const [imageIndex, setImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, action: 'next' });
  const frameRef = useRef(null);
  const touchStart = useRef(null);
  const didSwipe = useRef(false);
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

    const relativeX = event.clientX - rectangle.left;
    const ratio = relativeX / rectangle.width;

    setCursor({
      x: relativeX,
      y: event.clientY - rectangle.top,
      action: ratio < 0.24 ? 'previous' : ratio > 0.76 ? 'next' : 'zoom',
    });
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    didSwipe.current = false;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) > 36 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipe.current = true;
      if (deltaX > 0) previous();
      else next();
    }
  };

  const onFrameClick = (event) => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    const rectangle = frameRef.current?.getBoundingClientRect();
    if (!rectangle) return;
    if (!finePointer) {
      setIsLightboxOpen(true);
      return;
    }

    const ratio = (event.clientX - rectangle.left) / rectangle.width;
    if (ratio < 0.24) previous();
    else if (ratio > 0.76) next();
    else setIsLightboxOpen(true);
  };

  const mediaAlt = t('galleryImageAlt', { title, current: imageIndex + 1 });

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
        <ProjectMedia
          src={project.images[imageIndex]}
          alt={mediaAlt}
          className={`gallery-image max-h-[min(78svh,820px)] w-full object-contain transition duration-500 ease-smooth ${
            isChanging ? 'is-changing' : ''
          }`}
          draggable="false"
        />
        <span
          className="gallery-cursor"
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        >
          {cursor.action === 'previous' ? '←' : cursor.action === 'next' ? '→' : '↗'}
        </span>
      </div>
      <p className="m-0 mt-3.5 text-center text-[13px] text-muted">
        {t('imageCounter', { current: imageIndex + 1, total })}
      </p>
      {isLightboxOpen && (
        <MediaLightbox
          key={project.images[imageIndex]}
          src={project.images[imageIndex]}
          alt={mediaAlt}
          closeLabel={t('closeMedia')}
          previousLabel={t('previousImage')}
          nextLabel={t('nextImage')}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={previous}
          onNext={next}
        />
      )}
    </section>
  );
}
