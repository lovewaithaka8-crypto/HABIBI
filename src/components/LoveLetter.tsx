import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LoveLetterProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ isOpen, onToggle }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const letterText = `My Habibiiii wanguuuuu ❤️🥹😘😍💋,

Sometimes I wish you could see yourself through my eyes 👀❤️ so you could understand just how special, beautiful and precious you are to me. 🥰🌹💖

I know I joke a lot 😂🤣, tease you 😜😘 and make funny comments. Sometimes you probably wonder whether I am serious or just playing around. 🙈❤️

But, my love, NOT EVERYTHING I SAY IS A JOKE. 🥺❤️ Some things come straight from the deepest part of my heart, and I genuinely mean every single word. 💯❤️

I love making you smile 😊💕, hearing you laugh 🤣😍 and keeping our conversations alive. Sometimes I joke simply because I want us to maintain that beautiful connection we are building. 🥹🫶

I want us to be lovers ❤️💋, best friends 🫂💕, partners in laughter 😂🥰 and each other's safe place. 🏡❤️

When I tell you that I love you, I MEAN IT. When I tell you that you are special to me, I MEAN IT. 🥺💍 When I talk about our future, I am not just passing time or saying sweet words to impress you. ❤️

I genuinely see something beautiful in us. I want to build it with patience, honesty, respect, loyalty and understanding. 🤝💖🔐

We will not always be perfect. We will have misunderstandings and difficult days. But I want us to communicate, listen, forgive and grow together. 🌱💑

I want to celebrate your happiness 🎉❤️, encourage you when things are difficult 🤗 and remind you that you are appreciated, valued and loved. 💖😘

So the next time I joke around, laugh with me 😂🤣😘. But when I become serious and tell you how I feel, please know that those words are genuine. 🥺❤️

I am not here just to pass time. I want something meaningful. I want us to keep discovering each other, supporting each other's dreams and building a bond that becomes stronger with time. 💍🌍💞

You are my favourite notification 📱😍, my reason to randomly smile at my phone 😂❤️ and the person I wish I could hold a little longer. 🫂💋

I may joke a lot, but one thing I will NEVER joke about is how much you mean to me. ❤️🔐

I am serious about you, serious about us and serious about the beautiful connection I want us to continue building. 🥹💞

I LOVE YOU, MY HABIBIIII! ❤️😘💋
Forever in my heart 🫀🔐♾️`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letterText);
      setCopied(true);
      romanticAudio.playSparkle();
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = letterText
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[❤️💕💖💗💘🌹😘✨💍🫂🥹😍💋👀🥰🙈💯😊🫶🏡🌱💑🎉🤗🌍📱🫀🔐♾️]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleWaxSealClick = () => {
    onToggle();
    romanticAudio.playSparkle();
    if (!isOpen) {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6cc', '#f45d91', '#ff4d6d'],
      });
    }
  };

  return (
    <section id="letter" className="scroll-mt-24 my-10">
      <div className="card p-6 sm:p-10 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-rose-500/20">
          <div className="text-center sm:text-left">
            <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-200 flex items-center justify-center sm:justify-start gap-2">
              <span>A Letter From My Heart</span>
              <span>💌</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Written genuinely, from the deepest part of my soul.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              title={isSpeaking ? 'Stop narration' : 'Listen to letter'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 rounded-lg transition-colors cursor-pointer"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-rose-300" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              title="Copy letter to clipboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-rose-300" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Closed Envelope Teaser */}
        {!isOpen && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div
              onClick={handleWaxSealClick}
              className="group relative cursor-pointer p-8 rounded-2xl bg-gradient-to-b from-rose-950/40 to-stone-950/60 border border-rose-500/30 hover:border-rose-400/60 transition-all duration-300 shadow-lg hover:shadow-rose-900/30 flex flex-col items-center max-w-sm w-full"
            >
              {/* Wax Seal */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-400 flex items-center justify-center shadow-lg border-2 border-rose-300/40 group-hover:scale-110 transition-transform mb-4">
                <Heart className="w-8 h-8 text-rose-100 fill-rose-100" />
              </div>
              <p className="font-serif-romantic text-lg font-medium text-rose-100 mb-1">
                Sealed With Love
              </p>
              <p className="text-xs text-rose-200/70">
                Click the seal to unfold my heart for you
              </p>
            </div>
          </div>
        )}

        {/* Open Letter Body */}
        {isOpen && (
          <div className="mt-8 transition-opacity duration-500">
            {/* Parchment Styled Container */}
            <div className="relative rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-rose-950/30 via-stone-950/40 to-rose-950/20 border border-rose-500/30 text-rose-100 shadow-inner">
              <div className="absolute top-4 right-4 text-xs font-serif-romantic italic text-rose-300/60">
                Always & Forever
              </div>

              {/* Salutation */}
              <p className="font-serif-romantic text-xl sm:text-2xl font-bold text-rose-200 mb-6">
                My Habibiiii wanguuuuu ❤️🥹😘😍💋,
              </p>

              {/* Paragraphs */}
              <div className="love-letter space-y-6">
                <p>
                  Sometimes I wish you could see yourself through my eyes 👀❤️ so you could understand just how special, beautiful and precious you are to me. 🥰🌹💖
                </p>

                <p>
                  I know I joke a lot 😂🤣, tease you 😜😘 and make funny comments. Sometimes you probably wonder whether I am serious or just playing around. 🙈❤️
                </p>

                <p className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-400/20 font-normal text-rose-200">
                  But, my love, <span className="font-semibold underline decoration-rose-400 underline-offset-4">NOT EVERYTHING I SAY IS A JOKE</span>. 🥺❤️ Some things come straight from the deepest part of my heart, and I genuinely mean every single word. 💯❤️
                </p>

                <p>
                  I love making you smile 😊💕, hearing you laugh 🤣😍 and keeping our conversations alive. Sometimes I joke simply because I want us to maintain that beautiful connection we are building. 🥹🫶
                </p>

                <p className="font-medium text-rose-200">
                  I want us to be lovers ❤️💋, best friends 🫂💕, partners in laughter 😂🥰 and each other&apos;s safe place. 🏡❤️
                </p>

                <p>
                  When I tell you that I love you, I MEAN IT. When I tell you that you are special to me, I MEAN IT. 🥺💍 When I talk about our future, I am not just passing time or saying sweet words to impress you. ❤️
                </p>

                <p>
                  I genuinely see something beautiful in us. I want to build it with patience, honesty, respect, loyalty and understanding. 🤝💖🔐
                </p>

                <p>
                  We will not always be perfect. We will have misunderstandings and difficult days. But I want us to communicate, listen, forgive and grow together. 🌱💑
                </p>

                <p>
                  I want to celebrate your happiness 🎉❤️, encourage you when things are difficult 🤗 and remind you that you are appreciated, valued and loved. 💖😘
                </p>

                <p>
                  So the next time I joke around, laugh with me 😂🤣😘. But when I become serious and tell you how I feel, please know that those words are genuine. 🥺❤️
                </p>

                <p>
                  I am not here just to pass time. I want something meaningful. I want us to keep discovering each other, supporting each other&apos;s dreams and building a bond that becomes stronger with time. 💍🌍💞
                </p>

                <p className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20 text-rose-200">
                  You are my favourite notification 📱😍, my reason to randomly smile at my phone 😂❤️ and the person I wish I could hold a little longer. 🫂💋
                </p>

                <p>
                  I may joke a lot, but one thing I will NEVER joke about is how much you mean to me. ❤️🔐
                </p>

                <p>
                  I am serious about you, serious about us and serious about the beautiful connection I want us to continue building. 🥹💞
                </p>
              </div>

              {/* Secret Climax Seal */}
              <div className="mt-10 pt-8 border-t border-rose-500/30 text-center">
                <div className="inline-flex items-center gap-2 text-rose-300 font-serif-romantic text-2xl sm:text-3xl font-bold tracking-wide">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                  <span>I LOVE YOU, MY HABIBIIII!</span>
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </div>
                <p className="font-script text-2xl sm:text-3xl text-rose-300 mt-2">
                  Forever in my heart 🫀🔐♾️
                </p>
              </div>
            </div>

            {/* Close Toggle */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleWaxSealClick}
                className="text-xs text-rose-300/80 hover:text-rose-200 underline underline-offset-4 cursor-pointer"
              >
                Close Letter 💌
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
