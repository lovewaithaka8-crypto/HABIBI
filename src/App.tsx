import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoveLetter } from './components/LoveLetter';
import { Reasons } from './components/Reasons';
import { JourneyCounter } from './components/JourneyCounter';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveQuestions } from './components/LoveQuestions';
import { SurpriseSection } from './components/SurpriseSection';
import { FlowerShower } from './components/FlowerShower';
import { LoveCoupons } from './components/LoveCoupons';
import { Footer } from './components/Footer';
import { FloatingHearts } from './components/FloatingHearts';
import { getSavedTheme, setSavedTheme } from './utils/storage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getSavedTheme());
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    setSavedTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative overflow-x-hidden ${
        theme === 'dark'
          ? 'bg-transparent text-[#fff5fa]'
          : 'bg-[#fff0f5]/85 text-[#4a0d24] backdrop-blur-sm'
      }`}
    >
      {/* Interactive floating hearts & click burst layer */}
      <FloatingHearts />

      {/* Navigation Header adhering to Top Bar Contract */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        {/* Welcome Hero with big pulsing heart */}
        <Hero onOpenLetter={handleOpenLetter} />

        {/* Love Letter with wax seal unfolding */}
        <LoveLetter
          isOpen={isLetterOpen}
          onToggle={() => setIsLetterOpen((prev) => !prev)}
        />

        {/* Why You Are Special carousel */}
        <Reasons />

        {/* Live Relationship Journey Counter */}
        <JourneyCounter />

        {/* Photo Gallery & Memories */}
        <PhotoGallery />

        {/* One Little Question Interactive Quiz */}
        <LoveQuestions />

        {/* Surprise Secret Note */}
        <SurpriseSection />

        {/* Flower Bouquet & Rose Shower */}
        <FlowerShower />

        {/* Redeemable Love Coupons */}
        <LoveCoupons />
      </main>

      {/* Romantic Footer */}
      <Footer />
    </div>
  );
}
