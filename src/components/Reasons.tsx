import React, { useState } from 'react';
import { Heart, Shuffle, ArrowRight, ArrowLeft, Plus, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

const initialReasons = [
  "Your smile makes my world brighter. 😍❤️",
  "You make ordinary conversations special. 🥹💕",
  "I love the way you make me laugh. 😂😘",
  "You are someone I genuinely care about. 🫂❤️",
  "Your happiness means something to me. 🌹",
  "I love having you in my life. 💍",
  "You make my heart feel something beautiful. 🥰",
  "Even your little habits make me smile. 🙈❤️",
  "I want to see you achieve your dreams. 🌟",
  "Because you are simply YOU! ❤️😘",
  "The peace I feel whenever we speak. 🕊️✨",
  "The gentle warmth and kindness in your voice. 🌸",
  "How you believe in us, even on difficult days. 🤝💖",
];

export const Reasons: React.FC = () => {
  const [reasons, setReasons] = useState<string[]>(initialReasons);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [newReason, setNewReason] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const nextReason = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
    romanticAudio.playSparkle();
  };

  const prevReason = () => {
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    romanticAudio.playSparkle();
  };

  const shuffleReason = () => {
    let nextIdx = Math.floor(Math.random() * reasons.length);
    if (nextIdx === currentIndex && reasons.length > 1) {
      nextIdx = (currentIndex + 1) % reasons.length;
    }
    setCurrentIndex(nextIdx);
    romanticAudio.playSparkle();
  };

  const toggleFavorite = (idx: number) => {
    if (favorites.includes(idx)) {
      setFavorites(favorites.filter((i) => i !== idx));
    } else {
      setFavorites([...favorites, idx]);
      romanticAudio.playSparkle();
      confetti({
        particleCount: 15,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#f45d91', '#ffb6cc'],
      });
    }
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReason.trim()) return;
    const updated = [...reasons, newReason.trim()];
    setReasons(updated);
    setCurrentIndex(updated.length - 1);
    setNewReason('');
    setShowAddForm(false);
    romanticAudio.playSparkle();
  };

  return (
    <section id="reasons" className="scroll-mt-24 my-10">
      <div className="card p-6 sm:p-10 shadow-xl transition-all">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            <span>Why You Are Special</span>
            <span>❤️</span>
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            A few reasons why you mean so much to me.
          </p>
        </div>

        {/* Reason Display Card */}
        <div className="relative min-h-[160px] flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-rose-950/30 to-stone-950/40 border border-rose-500/30 text-center shadow-inner">
          <button
            type="button"
            onClick={() => toggleFavorite(currentIndex)}
            title={favorites.includes(currentIndex) ? 'Remove favorite' : 'Save as favorite'}
            className="absolute top-4 right-4 p-2 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-transform hover:scale-125 ${
                favorites.includes(currentIndex) ? 'text-rose-400 fill-rose-400' : 'text-rose-400/50'
              }`}
            />
          </button>

          <div className="text-xs font-mono tabular-nums text-rose-300/60 mb-2">
            Reason #{currentIndex + 1} of {reasons.length}
          </div>

          <p className="text-xl sm:text-2xl font-serif-romantic font-medium text-rose-100 leading-relaxed max-w-lg transition-all duration-300">
            &ldquo;{reasons[currentIndex]}&rdquo;
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={prevReason}
            aria-label="Previous reason"
            className="p-3 text-rose-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={nextReason}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 hover:from-rose-100 hover:to-rose-300 rounded-full shadow-md shadow-rose-900/30 hover:shadow-rose-600/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-900" />
            <span>Another Reason 💕</span>
          </button>

          <button
            type="button"
            onClick={shuffleReason}
            title="Random reason"
            className="p-3 text-rose-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={nextReason}
            aria-label="Next reason"
            className="p-3 text-rose-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Add custom reason toggle */}
        <div className="text-center mt-6">
          {!showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-rose-200 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add another reason why she is special</span>
            </button>
          ) : (
            <form onSubmit={handleAddReason} className="max-w-md mx-auto mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="e.g., The way your eyes light up..."
                className="flex-1 px-4 py-2 text-sm bg-stone-950/60 border border-rose-500/30 rounded-xl text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-rose-950 bg-rose-300 hover:bg-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 text-xs text-rose-300/80 hover:text-rose-200 cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
