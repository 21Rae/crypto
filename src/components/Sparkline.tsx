import React, { useId } from 'react';

interface SparklineProps {
  data: number[];
  isPositive: boolean;
  height?: number;
  width?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, isPositive, height = 90 }) => {
  const gradientId = useId();

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // ViewBox dimensions
  const svgWidth = 300;
  const svgHeight = height;
  const paddingX = 4;
  const paddingTop = 8;
  const paddingBottom = 4;
  const drawableHeight = svgHeight - paddingTop - paddingBottom;
  const drawableWidth = svgWidth - paddingX * 2;

  // Compute points
  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * drawableWidth;
    const y = paddingTop + drawableHeight - ((val - min) / range) * drawableHeight;
    return { x, y };
  });

  // Construct smooth cubic bezier or line path string
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  // Polygon area closed path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  // Color scheme matching screenshot
  const strokeColor = isPositive ? '#059669' : '#BE123C';
  const stopColorTop = isPositive ? '#10B981' : '#F43F5E';

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stopColorTop} stopOpacity={isPositive ? 0.32 : 0.28} />
            <stop offset="70%" stopColor={stopColorTop} stopOpacity={isPositive ? 0.08 : 0.06} />
            <stop offset="100%" stopColor={stopColorTop} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Filled Area */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Line Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
