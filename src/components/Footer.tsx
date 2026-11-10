import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  const handleHeartClick = () => {
    romanticAudio.playSparkle();
  };

  return (
    <footer className="mt-20 pb-16 pt-10 text-center relative z-10 border-t border-rose-500/20">
      <div className="max-w-xl mx-auto px-4 space-y-3">
        <p className="font-serif-romantic text-lg sm:text-xl text-rose-200 font-medium">
          Made with endless love ❤️
        </p>
        <p className="text-sm sm:text-base text-rose-100/90 font-light">
          For My One and Only Habibti 🥹💋
        </p>

        <div
          onClick={handleHeartClick}
          className="text-3xl select-none pt-2 tracking-widest cursor-pointer hover:scale-110 transition-transform inline-block"
          title="Click for love"
        >
          ❤️ 💍 🌹 ♾️
        </div>

        <p className="text-xs text-rose-300/60 pt-4 font-mono">
          Forever and always in my heart · Built just for you
        </p>
      </div>
    </footer>
  );
};
