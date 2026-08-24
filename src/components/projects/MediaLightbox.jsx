import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import ProjectMedia from './ProjectMedia';

const MIN_SCALE = 1;
const MAX_SCALE = 5;

const clampScale = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

const distanceBetween = (first, second) =>
  Math.hypot(second.x - first.x, second.y - first.y);

const midpointBetween = (first, second) => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

export default function MediaLightbox({
  src,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onPrevious,
  onNext,
}) {
  const [scale, setScale] = useState(MIN_SCALE);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const movedRef = useRef(false);
  const transformRef = useRef({ scale: MIN_SCALE, position: { x: 0, y: 0 } });

  const updateTransform = (nextScale, nextPosition) => {
    const normalizedScale = clampScale(nextScale);
    const normalizedPosition =
      normalizedScale === MIN_SCALE ? { x: 0, y: 0 } : nextPosition;

    transformRef.current = { scale: normalizedScale, position: normalizedPosition };
    setScale(normalizedScale);
    setPosition(normalizedPosition);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  const zoomAround = (nextScale, point) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rectangle = stage.getBoundingClientRect();
    const current = transformRef.current;
    const center = {
      x: rectangle.left + rectangle.width / 2,
      y: rectangle.top + rectangle.height / 2,
    };
    const ratio = nextScale / current.scale;
    const relative = {
      x: point.x - center.x - current.position.x,
      y: point.y - center.y - current.position.y,
    };

    updateTransform(nextScale, {
      x: point.x - center.x - relative.x * ratio,
      y: point.y - center.y - relative.y * ratio,
    });
  };

  const onWheel = (event) => {
    event.preventDefault();
    const currentScale = transformRef.current.scale;
    const nextScale = clampScale(currentScale * Math.exp(-event.deltaY * 0.0015));
    zoomAround(nextScale, { x: event.clientX, y: event.clientY });
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    movedRef.current = false;

    const pointers = [...pointersRef.current.values()];
    if (pointers.length === 2) {
      gestureRef.current = {
        type: 'pinch',
        distance: distanceBetween(pointers[0], pointers[1]),
        midpoint: midpointBetween(pointers[0], pointers[1]),
        ...transformRef.current,
      };
      return;
    }

    gestureRef.current = {
      type: 'pan',
      pointerId: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      position: transformRef.current.position,
    };
  };

  const onPointerMove = (event) => {
    if (!pointersRef.current.has(event.pointerId)) return;

    event.preventDefault();
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pointers = [...pointersRef.current.values()];
    const gesture = gestureRef.current;

    if (pointers.length === 2 && gesture?.type === 'pinch') {
      const nextMidpoint = midpointBetween(pointers[0], pointers[1]);
      const nextScale = clampScale(
        gesture.scale * (distanceBetween(pointers[0], pointers[1]) / gesture.distance),
      );
      const stage = stageRef.current;
      if (!stage) return;

      const rectangle = stage.getBoundingClientRect();
      const center = {
        x: rectangle.left + rectangle.width / 2,
        y: rectangle.top + rectangle.height / 2,
      };
      const ratio = nextScale / gesture.scale;
      const relative = {
        x: gesture.midpoint.x - center.x - gesture.position.x,
        y: gesture.midpoint.y - center.y - gesture.position.y,
      };

      movedRef.current = true;
      updateTransform(nextScale, {
        x: nextMidpoint.x - center.x - relative.x * ratio,
        y: nextMidpoint.y - center.y - relative.y * ratio,
      });
      return;
    }

    if (
      pointers.length === 1 &&
      gesture?.type === 'pan' &&
      gesture.pointerId === event.pointerId &&
      transformRef.current.scale > MIN_SCALE
    ) {
      const delta = {
        x: event.clientX - gesture.start.x,
        y: event.clientY - gesture.start.y,
      };
      if (Math.hypot(delta.x, delta.y) > 3) movedRef.current = true;
      updateTransform(transformRef.current.scale, {
        x: gesture.position.x + delta.x,
        y: gesture.position.y + delta.y,
      });
    }
  };

  const onPointerUp = (event) => {
    pointersRef.current.delete(event.pointerId);
    const remaining = [...pointersRef.current.entries()];

    if (remaining.length === 1) {
      const [pointerId, point] = remaining[0];
      gestureRef.current = {
        type: 'pan',
        pointerId,
        start: point,
        position: transformRef.current.position,
      };
    } else if (remaining.length === 0) {
      gestureRef.current = null;
      if (movedRef.current) {
        window.setTimeout(() => {
          movedRef.current = false;
        }, 0);
      }
    }
  };

  const onStageClick = () => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    onClose();
  };

  const stopButtonPointer = (event) => event.stopPropagation();

  return createPortal(
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[200] grid touch-none place-items-center overflow-hidden bg-black/95"
      onClick={onStageClick}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <ProjectMedia
        src={src}
        alt={alt}
        className="pointer-events-none max-h-[92svh] max-w-[92vw] select-none object-contain will-change-transform"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})` }}
        draggable="false"
      />
      <button
        type="button"
        aria-label={closeLabel}
        className="fixed right-5 top-4 z-[3] grid h-12 w-12 place-items-center rounded-full bg-black/45 text-[36px] font-light leading-none text-white backdrop-blur-sm"
        onPointerDown={stopButtonPointer}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
      <button
        type="button"
        aria-label={previousLabel}
        className="fixed left-3 top-1/2 z-[3] grid h-16 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-[42px] font-light text-white backdrop-blur-sm max-[560px]:left-0"
        onPointerDown={stopButtonPointer}
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        className="fixed right-3 top-1/2 z-[3] grid h-16 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-[42px] font-light text-white backdrop-blur-sm max-[560px]:right-0"
        onPointerDown={stopButtonPointer}
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>
    </div>,
    document.body,
  );
}
