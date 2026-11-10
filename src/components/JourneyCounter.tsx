import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Clock, Sparkles, Check } from 'lucide-react';
import { getSavedDate, setSavedDate } from '../utils/storage';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const JourneyCounter: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(() => getSavedDate());
  const [inputDate, setInputDate] = useState<string>(() => getSavedDate());
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  // Calculate live countdown/count-up
  useEffect(() => {
    const updateTime = () => {
      if (!selectedDate) return;
      const start = new Date(selectedDate + 'T00:00:00');
      const now = new Date();

      const diffMs = now.getTime() - start.getTime();
      if (diffMs < 0) {
        setElapsed({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
        });
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setElapsed({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [selectedDate]);

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate) return;
    setSelectedDate(inputDate);
    setSavedDate(inputDate);
    setSavedFeedback(true);
    romanticAudio.playSparkle();

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ffb6cc', '#f45d91', '#ff4d6d'],
    });

    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <section id="journey" className="scroll-mt-24 my-10">
      <div className="card p-6 sm:p-10 shadow-xl transition-all">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            <span>Our Beautiful Journey</span>
            <span>⏳❤️</span>
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Let&apos;s celebrate every single moment together.
          </p>
        </div>

        {/* Date Selector Form */}
        <form
          onSubmit={handleSaveDate}
          className="max-w-md mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-stone-950/60 border border-rose-500/30 rounded-xl text-rose-100 focus:outline-none focus:border-rose-400 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-rose-300 hover:from-rose-100 hover:to-rose-200 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-rose-950" />
                <span>Date Saved! ❤️</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 text-rose-950" />
                <span>Save Date ❤️</span>
              </>
            )}
          </button>
        </form>

        {/* 4 Counter Metric Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-stone-950/40 border border-rose-500/25 text-center flex flex-col items-center justify-center">
            <span className="font-mono tabular-nums text-3xl sm:text-5xl font-bold text-rose-200 tracking-tight">
              {elapsed.days.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-300/80 uppercase tracking-wider mt-1">
              Days
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-stone-950/40 border border-rose-500/25 text-center flex flex-col items-center justify-center">
            <span className="font-mono tabular-nums text-3xl sm:text-5xl font-bold text-rose-200 tracking-tight">
              {elapsed.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-300/80 uppercase tracking-wider mt-1">
              Hours
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-stone-950/40 border border-rose-500/25 text-center flex flex-col items-center justify-center">
            <span className="font-mono tabular-nums text-3xl sm:text-5xl font-bold text-rose-200 tracking-tight">
              {elapsed.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-300/80 uppercase tracking-wider mt-1">
              Minutes
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-stone-950/40 border border-rose-500/25 text-center flex flex-col items-center justify-center">
            <span className="font-mono tabular-nums text-3xl sm:text-5xl font-bold text-rose-200 tracking-tight">
              {elapsed.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-300/80 uppercase tracking-wider mt-1">
              Seconds
            </span>
          </div>
        </div>

        {/* Milestone Subtext */}
        <div className="mt-8 text-center">
          <p className="text-sm font-serif-romantic text-rose-200 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Every moment with you is precious. 🥹</span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-rose-300/60 mt-2 font-mono">
            <Clock className="w-3.5 h-3.5 text-rose-400/60" />
            <span>{elapsed.totalSeconds.toLocaleString()} total heartbeat seconds</span>
            <span aria-hidden="true">·</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400/60" />
            <span>Every day I love you more</span>
          </div>
        </div>
      </div>
    </section>
  );
};
