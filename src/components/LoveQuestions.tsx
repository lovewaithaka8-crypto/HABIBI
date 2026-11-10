import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LoveQuestions: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [noHoverCount, setNoHoverCount] = useState(0);

  const handleAnswer = (choice: 'yes' | 'no') => {
    setSelectedAnswer(choice);
    romanticAudio.playSparkle();

    confetti({
      particleCount: choice === 'yes' ? 35 : 25,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff6f9f', '#ffb6cc', '#f45d91'],
    });
  };

  return (
    <section className="my-10">
      <div className="card p-6 sm:p-10 shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <span>One Little Question</span>
          <span>😘</span>
        </h2>

        <p className="text-lg sm:text-xl font-medium text-rose-100/90 leading-relaxed max-w-lg mx-auto my-6 font-serif-romantic">
          Do you know that someone is smiling right now because of you? 🥹❤️
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 my-6">
          <button
            type="button"
            onClick={() => handleAnswer('yes')}
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 hover:from-rose-100 hover:to-rose-300 rounded-full shadow-lg shadow-rose-900/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-rose-950 text-rose-950 group-hover:scale-125 transition-transform" />
            <span>Yes 😍</span>
          </button>

          <button
            type="button"
            onMouseEnter={() => setNoHoverCount((c) => c + 1)}
            onClick={() => handleAnswer('no')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-rose-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all cursor-pointer"
          >
            <span>No 🙈</span>
          </button>
        </div>

        {/* Response message */}
        {selectedAnswer && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-400/30 max-w-md mx-auto transition-all animate-in fade-in zoom-in-95">
            <p className="font-serif-romantic text-lg sm:text-xl font-medium text-rose-200">
              {selectedAnswer === 'yes'
                ? 'Then you know how much I adore you! 😍❤️😘'
                : 'Well, now you know! YOU make me smile every day! 🥹💕'}
            </p>
            <p className="text-xs text-rose-300/70 mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>You are always the reason behind my happiness.</span>
            </p>
          </div>
        )}

        {noHoverCount > 2 && !selectedAnswer && (
          <p className="text-xs text-rose-300/60 mt-3 italic animate-pulse">
            (You can&apos;t escape how much I adore you, Habibti! 😉)
          </p>
        )}
      </div>
    </section>
  );
};
