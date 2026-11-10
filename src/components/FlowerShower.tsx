import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { getRoseCount, saveRoseCount } from '../utils/storage';
import confetti from 'canvas-confetti';

export const FlowerShower: React.FC = () => {
  const [roseCount, setRoseCount] = useState<number>(() => getRoseCount());
  const [showMessage, setShowMessage] = useState(false);

  const handleSendRoses = () => {
    const updatedCount = roseCount + 50;
    setRoseCount(updatedCount);
    saveRoseCount(updatedCount);

    romanticAudio.playRoseChime();

    // Rose petals shower
    confetti({
      particleCount: 50,
      angle: 90,
      spread: 120,
      origin: { y: 0.8 },
      colors: ['#e11d48', '#be123c', '#fda4af', '#f43f5e', '#ffe4e6'],
      shapes: ['circle'],
    });

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4500);
  };

  return (
    <section className="my-10">
      <div className="card p-6 sm:p-10 shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 mb-4">
          <span>Flowers For You</span>
          <span>🌹</span>
        </h2>

        <div className="text-5xl sm:text-7xl select-none my-4 tracking-widest animate-pulse">
          🌹🌷🌹🌸🌹
        </div>

        <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-lg mx-auto font-light my-4">
          I may not always have flowers in my hands,<br />
          but I will always have love in my heart for you. ❤️
        </p>

        {/* Live Rose Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs font-mono my-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>{roseCount.toLocaleString()} Roses Blossoming For You</span>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSendRoses}
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 hover:from-rose-100 hover:to-rose-300 rounded-full shadow-lg shadow-rose-900/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">🌹</span>
            <span>Send You More Roses 🌹</span>
            <Sparkles className="w-4 h-4 text-rose-900" />
          </button>
        </div>

        {/* In-app sweet toast replaces browser alert() */}
        {showMessage && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-900/80 to-pink-900/80 border border-rose-400/40 text-rose-100 max-w-md mx-auto shadow-xl animate-in fade-in slide-in-from-bottom-3">
            <p className="font-serif-romantic text-base sm:text-lg font-medium text-rose-100">
              A thousand virtual roses for you, Habibti! 🌹❤️😘
            </p>
            <p className="text-xs text-rose-200/80 mt-1">
              May every petal remind you of how deeply you are loved.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
