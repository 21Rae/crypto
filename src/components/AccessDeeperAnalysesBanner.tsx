import React, { useEffect, useRef } from 'react';

interface AccessDeeperAnalysesBannerProps {
  onConnectWallet: () => void;
}

export const AccessDeeperAnalysesBanner: React.FC<AccessDeeperAnalysesBannerProps> = ({ onConnectWallet }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationY = 0;
    const tiltX = 0.35; // ~20 degree tilt

    // Generate sphere particles grid
    const particles: { lat: number; lon: number; size: number }[] = [];
    const latCount = 28;
    const lonCount = 56;

    for (let i = 0; i < latCount; i++) {
      const lat = ((i / (latCount - 1)) - 0.5) * Math.PI * 0.88; // -79 to +79 deg
      const numLon = Math.max(6, Math.floor(lonCount * Math.cos(lat)));
      for (let j = 0; j < numLon; j++) {
        const lon = (j / numLon) * Math.PI * 2;
        particles.push({
          lat,
          lon,
          size: 2.2 + (i % 2 === 0 ? 0.6 : 0),
        });
      }
    }

    // Arc connections
    const arcs = [
      { startLat: -0.3, startLon: 0.5, endLat: 0.5, endLon: 2.2, progress: 0, speed: 0.008 },
      { startLat: 0.2, startLon: 2.8, endLat: -0.4, endLon: 4.8, progress: 0.3, speed: 0.006 },
      { startLat: -0.5, startLon: 4.2, endLat: 0.3, endLon: 0.8, progress: 0.7, speed: 0.007 },
    ];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.42;

      rotationY += 0.0035;

      // Glow backdrop behind globe
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.1,
        centerX,
        centerY,
        radius * 1.3
      );
      gradient.addColorStop(0, 'rgba(30, 58, 138, 0.4)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.2)');
      gradient.addColorStop(1, 'rgba(7, 14, 32, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Project 3D point (lat, lon) onto 2D canvas with Y-rotation and X-tilt
      const project = (lat: number, lon: number, altitude = 0) => {
        const r = radius + altitude;
        const x0 = r * Math.cos(lat) * Math.sin(lon + rotationY);
        const y0 = r * Math.sin(lat);
        const z0 = r * Math.cos(lat) * Math.cos(lon + rotationY);

        // Apply X-tilt
        const x = x0;
        const y = y0 * Math.cos(tiltX) - z0 * Math.sin(tiltX);
        const z = y0 * Math.sin(tiltX) + z0 * Math.cos(tiltX);

        return {
          px: centerX + x,
          py: centerY + y,
          z, // Depth for sorting & opacity
        };
      };

      // Project & sort particles by depth z
      const projected = particles.map((p) => {
        const proj = project(p.lat, p.lon);
        return { ...p, ...proj };
      });

      projected.sort((a, b) => a.z - b.z);

      // Draw particles
      for (const p of projected) {
        // Normalized depth z: from -radius to +radius
        const depth = (p.z + radius) / (2 * radius); // 0 (back) to 1 (front)
        
        if (p.z < -radius * 0.15) {
          // Back side particles - dim blue dot
          const alpha = Math.max(0.08, (p.z + radius) / (radius * 1.8) * 0.3);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Front side particles - bright glowing rounded square / dot
          const alpha = Math.min(1, 0.35 + depth * 0.65);
          const size = p.size * (0.8 + depth * 0.5);

          ctx.fillStyle = depth > 0.7 
            ? `rgba(147, 197, 253, ${alpha})` 
            : `rgba(96, 165, 250, ${alpha})`;
          
          // Draw rounded square block
          const half = size;
          ctx.beginPath();
          ctx.roundRect(p.px - half, p.py - half, size * 1.8, size * 1.8, 1);
          ctx.fill();
        }
      }

      // Draw glowing animated orbital arcs
      for (const arc of arcs) {
        arc.progress = (arc.progress + arc.speed) % 1;

        const numSteps = 30;
        const points: { px: number; py: number; z: number }[] = [];

        for (let i = 0; i <= numSteps; i++) {
          const t = i / numSteps;
          const lat = arc.startLat + (arc.endLat - arc.startLat) * t;
          const lon = arc.startLon + (arc.endLon - arc.startLon) * t;
          // Arc height bump in the middle
          const alt = Math.sin(t * Math.PI) * 32;
          points.push(project(lat, lon, alt));
        }

        // Draw arc path
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          if (pt.z > -radius * 0.2) {
            if (!started) {
              ctx.moveTo(pt.px, pt.py);
              started = true;
            } else {
              ctx.lineTo(pt.px, pt.py);
            }
          }
        }

        ctx.strokeStyle = 'rgba(147, 197, 253, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw pulsing particle on the arc
        const activeIdx = Math.floor(arc.progress * numSteps);
        const activePt = points[activeIdx];
        if (activePt && activePt.z > -radius * 0.2) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.arc(activePt.px, activePt.py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
          ctx.beginPath();
          ctx.arc(activePt.px, activePt.py, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full bg-[#070E20] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text & CTA Column */}
        <div className="lg:col-span-5 space-y-6 z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            Access Deeper<br />Analyses Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
            Get a 360 view on your onchain holdings and tokenized stock exposure. The global markets await.
          </p>
          <div className="pt-2">
            <button
              type="button"
              disabled
              onClick={onConnectWallet}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1C263A] text-white text-sm font-semibold rounded-xl border border-slate-700/60 transition-all opacity-50 cursor-not-allowed shadow-lg"
            >
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Right 3D Animated Globe Canvas Column */}
        <div className="lg:col-span-7 flex items-center justify-center relative min-h-[320px] sm:min-h-[420px]">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[500px] h-[340px] sm:h-[420px] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
