import React, { useState } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

export const SurpriseSection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    romanticAudio.playSparkle();

    // Fire fireworks-style confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6f9f', '#ffb6cc', '#f45d91', '#ffe4e6'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6f9f', '#ffb6cc', '#f45d91', '#ffe4e6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="my-10">
      <div className="card p-6 sm:p-10 shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <span>A Little Surprise</span>
          <span>🎁</span>
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/70 mb-8">
          There is something I want you to read, straight from my heart.
        </p>

        {!isRevealed ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div
              onClick={handleReveal}
              className="group cursor-pointer p-6 rounded-3xl bg-gradient-to-tr from-rose-950/60 to-stone-950/70 border border-rose-500/30 hover:border-rose-400/70 transition-all duration-300 shadow-xl hover:shadow-rose-900/40 hover:scale-105 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform mb-4">
                <Gift className="w-10 h-10 text-white animate-bounce" />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 rounded-full shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-900" />
                <span>Reveal My Secret 💌</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-rose-950/50 via-stone-950/60 to-rose-950/40 border border-rose-400/40 text-rose-100 shadow-2xl transition-all duration-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 text-rose-400 mb-6">
              <Heart className="w-6 h-6 fill-rose-500" />
              <Heart className="w-8 h-8 fill-rose-400" />
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>

            <div className="font-serif-romantic text-lg sm:text-xl font-medium leading-relaxed space-y-6 text-rose-100/95">
              <p>
                If I had to choose again, I would still choose the chance to know you, laugh with you, grow with you and love you. ❤️
              </p>

              <p className="text-rose-200 font-semibold text-xl sm:text-2xl">
                You are not just someone I talk to.<br />
                You are someone I genuinely want in my life. 🥹💍
              </p>

              <div className="pt-4 border-t border-rose-500/30">
                <span className="font-bold tracking-wider text-2xl sm:text-3xl text-rose-300 uppercase block">
                  I LOVE YOU, HABIBTI! 😘🌹
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
