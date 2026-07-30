import React, { useState, useId, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SparklineProps {
  data: number[];
  isPositive: boolean;
  height?: number;
  width?: number;
  interactive?: boolean;
  showEndDot?: boolean;
  animateOnMount?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  isPositive,
  height = 90,
  interactive = true,
  showEndDot = true,
  animateOnMount = true,
}) => {
  const gradientId = useId();
  const shadowId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // ViewBox dimensions
  const svgWidth = 300;
  const svgHeight = height;
  const paddingX = 6;
  const paddingTop = 12;
  const paddingBottom = 8;
  const drawableHeight = svgHeight - paddingTop - paddingBottom;
  const drawableWidth = svgWidth - paddingX * 2;

  // Compute points
  const points = useMemo(() => {
    return data.map((val, idx) => {
      const x = paddingX + (idx / (data.length - 1)) * drawableWidth;
      const y = paddingTop + drawableHeight - ((val - min) / range) * drawableHeight;
      return { x, y, val };
    });
  }, [data, min, range, drawableHeight, drawableWidth, paddingX, paddingTop]);

  // Construct smooth cubic bezier path string
  const pathD = useMemo(() => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Polygon area closed path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  // Color scheme matching design
  const strokeColor = isPositive ? '#059669' : '#BE123C';
  const stopColorTop = isPositive ? '#10B981' : '#F43F5E';

  const lastPoint = points[points.length - 1];
  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = (mouseX / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDistance = Math.abs(points[0].x - relativeX);
    for (let i = 1; i < points.length; i++) {
      const dist = Math.abs(points[i].x - relativeX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    }
    setHoverIndex(closestIdx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="w-full h-full relative overflow-visible group select-none">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stopColorTop} stopOpacity={isPositive ? 0.35 : 0.3} />
            <stop offset="60%" stopColor={stopColorTop} stopOpacity={isPositive ? 0.08 : 0.06} />
            <stop offset="100%" stopColor={stopColorTop} stopOpacity={0.0} />
          </linearGradient>
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={strokeColor} floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Filled Area Gradient */}
        <motion.path
          d={areaD}
          fill={`url(#${gradientId})`}
          initial={animateOnMount ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Main Animated Line Stroke */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${shadowId})`}
          initial={animateOnMount ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Live Pulsing End Dot */}
        {showEndDot && lastPoint && hoverIndex === null && (
          <g transform={`translate(${lastPoint.x}, ${lastPoint.y})`}>
            {/* Outer Ping Ring */}
            <circle
              r="6"
              fill={stopColorTop}
              opacity="0.4"
              className="animate-ping"
            />
            {/* Inner Glowing Core */}
            <circle
              r="3.5"
              fill={strokeColor}
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* Interactive Hover Guide Line & Active Point */}
        <AnimatePresence>
          {activePoint && (
            <g>
              {/* Vertical Guide Line */}
              <motion.line
                x1={activePoint.x}
                y1={paddingTop}
                x2={activePoint.x}
                y2={svgHeight}
                stroke={strokeColor}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity={0.6}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
              />

              {/* Hover Dot Marker */}
              <motion.circle
                cx={activePoint.x}
                cy={activePoint.y}
                r={4.5}
                fill="#FFFFFF"
                stroke={strokeColor}
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </g>
          )}
        </AnimatePresence>
      </svg>

      {/* Floating Hover Tooltip Badge */}
      {activePoint && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-1 transition-all duration-75"
          style={{
            left: `${(activePoint.x / svgWidth) * 100}%`,
            top: `${(activePoint.y / svgHeight) * 100}%`,
          }}
        >
          <div className="bg-gray-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-lg border border-gray-700 whitespace-nowrap">
            ${activePoint.val.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

