import React, { useState } from 'react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenLetter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLetter }) => {
  const [heartBeats, setHeartBeats] = useState(0);

  const handleHeartClick = () => {
    setHeartBeats((prev) => prev + 1);
    romanticAudio.playSparkle();

    // Soft heart confetti
    confetti({
      particleCount: 18,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#ff6f9f', '#ffb6cc', '#f45d91', '#ffe4e6'],
    });
  };

  return (
    <section className="relative min-h-[500px] flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive Big Heart */}
      <div className="relative group cursor-pointer mb-6" onClick={handleHeartClick}>
        <div className="text-8xl select-none animate-pulse-glow transition-transform duration-300 group-hover:scale-125">
          💗
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-sm text-rose-200 text-xs px-2.5 py-1 rounded-full whitespace-nowrap border border-rose-500/30">
          {heartBeats === 0 ? 'Click my heart ✨' : `Beating for you: ${heartBeats} ❤️`}
        </div>
      </div>

      <h1 className="font-vibes text-6xl sm:text-8xl md:text-9xl font-normal text-[#ffb3c7] drop-shadow-md mb-4 tracking-normal select-none">
        My Habibti
      </h1>

      <p className="max-w-xl text-lg md:text-xl text-rose-100/90 leading-relaxed font-light mb-8">
        To the girl who makes my heart smile, my favourite person and my sweetest blessing.
        I created something special just for you. 🥹❤️
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          onClick={() => {
            handleHeartClick();
            onOpenLetter();
          }}
          className="group relative inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 hover:from-rose-100 hover:to-rose-300 rounded-full shadow-lg shadow-rose-900/40 hover:shadow-rose-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <MailOpen className="w-5 h-5 text-rose-900 transition-transform group-hover:rotate-12" />
          <span>Open My Heart 💌</span>
          <Sparkles className="w-4 h-4 text-rose-900 opacity-80" />
        </button>

        <a
          href="#reasons"
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-rose-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-full transition-colors backdrop-blur-sm cursor-pointer"
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Why You Are Special</span>
        </a>
      </div>

      <p className="mt-8 text-xs text-rose-200/70 tracking-wide uppercase font-medium flex items-center gap-1.5">
        <span>Made with love, just for you.</span>
        <span className="text-rose-400">🌹</span>
      </p>
    </section>
  );
};
