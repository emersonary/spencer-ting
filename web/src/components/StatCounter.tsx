import { useEffect, useState } from 'react';

type StatCounterProps = {
  value: number;
  active: boolean;
  /** Text before the number, e.g. "$" */
  prefix?: string;
  /** Text after the number, e.g. "+", "M+" */
  suffix?: string;
  durationMs?: number;
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function renderStableNumber(text: string) {
  return [...text].map((char, index) => {
    if (/\d/.test(char)) {
      return (
        <span key={`${index}-${char}`} className="stat-digit">
          {char}
        </span>
      );
    }
    return (
      <span key={`${index}-${char}`} className="stat-char">
        {char}
      </span>
    );
  });
}

export function StatCounter({
  value,
  active,
  prefix = '',
  suffix = '',
  durationMs = 8000,
}: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const finalText = `${prefix}${value.toLocaleString()}${suffix}`;

  useEffect(() => {
    if (!active) {
      setDisplay(0);
      return;
    }

    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // Strong ease-out: decelerates more as it nears the final value
      const eased = 1 - Math.pow(1 - t, 5);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, durationMs]);

  const text = `${prefix}${display.toLocaleString()}${suffix}`;

  return (
    <div className="stat-value" style={{ minWidth: `${finalText.length}ch` }}>
      {renderStableNumber(text)}
    </div>
  );
}
