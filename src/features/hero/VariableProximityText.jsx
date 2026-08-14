import { useEffect, useMemo, useRef, useState } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';

function Letters({ text, italic = false }) {
  return (
    <span className={cn('proximity-line', italic && 'italic')}>
      {Array.from(text).map((character, index) => (
        <span
          // Text can repeat characters, index is stable inside this exact line.
          key={`${character}-${index}`}
          className={cn('proximity-letter', character === ' ' && 'is-space')}
          aria-hidden="true"
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      ))}
    </span>
  );
}

export default function VariableProximityText({ lines, ariaLabel }) {
  const containerRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const frame = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const [tick, setTick] = useState(0);

  const visibleLines = useMemo(
    () =>
      lines.flatMap((line) =>
        line.text.split('\n').map((text, index) => ({
          ...line,
          key: `${line.key}-${index}`,
          text,
        })),
      ),
    [lines],
  );

  useEffect(() => {
    setTick((value) => value + 1);
  }, [visibleLines]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reduceMotion || !finePointer) return undefined;

    const radius = 500;
    const minWeight = 200;
    const maxWeight = 1200;
    const falloff = 1.6;

    const updateLetters = () => {
      node.querySelectorAll('.proximity-letter').forEach((letter) => {
        let force = 0;

        if (pointer.current.active) {
          const rectangle = letter.getBoundingClientRect();
          const centerX = rectangle.left + rectangle.width / 2;
          const centerY = rectangle.top + rectangle.height / 2;
          const distance = Math.hypot(centerX - pointer.current.x, centerY - pointer.current.y);
          force = Math.pow(Math.max(0, 1 - distance / radius), falloff);
        }

        const weight = Math.round(minWeight + (maxWeight - minWeight) * force);
        letter.style.fontVariationSettings = `"wght" ${weight}`;
        letter.style.fontWeight = String(weight);
      });

      if (pointer.current.active) frame.current = window.requestAnimationFrame(updateLetters);
      else frame.current = null;
    };

    const start = () => {
      if (!frame.current) frame.current = window.requestAnimationFrame(updateLetters);
    };
    const onPointerMove = (event) => {
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
      start();
    };
    const onPointerEnter = () => {
      pointer.current.active = true;
      start();
    };
    const onPointerLeave = () => {
      pointer.current.active = false;
      start();
    };

    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerenter', onPointerEnter);
    node.addEventListener('pointerleave', onPointerLeave);

    return () => {
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerenter', onPointerEnter);
      node.removeEventListener('pointerleave', onPointerLeave);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [finePointer, reduceMotion, tick]);

  return (
    <h1
      ref={containerRef}
      className="display-title variable-proximity flex w-full max-w-[980px] select-none flex-col items-start text-[clamp(62px,7.8vw,140px)] leading-[0.86] tracking-[-0.055em] max-[900px]:max-w-full max-[900px]:text-[clamp(58px,15vw,112px)] max-[560px]:text-[clamp(48px,17vw,82px)]"
      aria-label={ariaLabel}
    >
      {visibleLines.map((line) => (
        <Letters key={`${line.key}-${line.text}`} text={line.text} italic={line.italic} />
      ))}
    </h1>
  );
}
