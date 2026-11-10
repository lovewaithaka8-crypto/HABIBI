import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  isMusicPlaying,
  setIsMusicPlaying,
}) => {
  const toggleMusic = () => {
    const playing = romanticAudio.toggleMusic();
    setIsMusicPlaying(playing);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-950/40 dark:bg-stone-950/50 border-b border-rose-500/20 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-serif-romantic text-xl font-bold tracking-tight text-rose-300 hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-rose-400">❤️</span>
          <span>My Habibti</span>
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-rose-100/80">
          <a
            href="#letter"
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            Love Letter
          </a>
          <a
            href="#reasons"
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            Reasons
          </a>
          <a
            href="#journey"
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            Our Journey
          </a>
          <a
            href="#memories"
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#coupons"
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            Love Coupons
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Mute romantic ambient music' : 'Play romantic ambient music'}
            aria-label={isMusicPlaying ? 'Mute romantic ambient music' : 'Play romantic ambient music'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
                <span className="hidden sm:inline">Melody On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-300/70" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Rose Blush mode' : 'Switch to Velvet Wine mode'}
            aria-label="Toggle theme"
            className="p-2 text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 rounded-lg transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-rose-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
