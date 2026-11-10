import React, { useEffect, useState } from 'react';
import { romanticAudio } from '../utils/audio';

interface HeartParticle {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  opacity: number;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

const symbols = ['❤️', '💕', '💖', '💗', '💘', '🌹', '😘', '✨', '💍'];

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    let nextId = 0;
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Keep max 25 floating hearts active
        const filtered = prev.slice(-24);
        const newHeart: HeartParticle = {
          id: nextId++,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          left: Math.random() * 96 + 2, // 2% to 98%
          size: Math.floor(Math.random() * 22) + 14, // 14px to 36px
          duration: Math.random() * 4 + 7, // 7s to 11s
          opacity: Math.random() * 0.4 + 0.6,
        };
        return [...filtered, newHeart];
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Click anywhere to burst sparkling heart
  useEffect(() => {
    let clickId = 0;
    const handleClick = (e: MouseEvent) => {
      // Don't trigger on inputs or buttons to prevent distraction
      const target = e.target as HTMLElement;
      if (target.closest('button, input, textarea, a')) return;

      const newClickHearts: ClickHeart[] = Array.from({ length: 4 }).map((_, i) => ({
        id: clickId++,
        x: e.clientX + (Math.random() * 30 - 15),
        y: e.clientY + (Math.random() * 30 - 15) - i * 10,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      }));

      setClickHearts((prev) => [...prev.slice(-16), ...newClickHearts]);
      romanticAudio.playSparkle();

      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => !newClickHearts.includes(h)));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Background Ambient Floating Hearts */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none"
        aria-hidden="true"
      >
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart-particle select-none"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              opacity: h.opacity,
            }}
          >
            {h.symbol}
          </span>
        ))}
      </div>

      {/* Burst on Click */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50 select-none">
        {clickHearts.map((ch) => (
          <span
            key={ch.id}
            className="absolute transition-all transform -translate-x-1/2 -translate-y-1/2 animate-ping text-xl"
            style={{
              left: `${ch.x}px`,
              top: `${ch.y}px`,
              animationDuration: '0.8s',
            }}
          >
            {ch.symbol}
          </span>
        ))}
      </div>
    </>
  );
};
