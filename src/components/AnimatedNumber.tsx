import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  showFlash?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  className = '',
  showFlash = true,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [flashColor, setFlashColor] = useState<'up' | 'down' | null>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prev = prevValueRef.current;
    if (prev !== value) {
      if (value > prev) {
        setFlashColor('up');
      } else if (value < prev) {
        setFlashColor('down');
      }
      prevValueRef.current = value;

      // Smooth count animation frame
      let startTimestamp: number | null = null;
      const duration = 800; // ms

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Ease out quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const current = prev + (value - prev) * easeProgress;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(step);

      // Clear flash after 1 second
      const timer = setTimeout(() => {
        setFlashColor(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [value]);

  const formatted = `${prefix}${displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return (
    <motion.span
      key={`${value}`}
      initial={{ scale: flashColor ? 1.04 : 1 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex items-center transition-colors duration-500 rounded px-1 -mx-1 ${
        flashColor === 'up' && showFlash
          ? 'bg-emerald-100/80 text-emerald-700 font-extrabold'
          : flashColor === 'down' && showFlash
          ? 'bg-rose-100/80 text-rose-700 font-extrabold'
          : ''
      } ${className}`}
    >
      {formatted}
    </motion.span>
  );
};
