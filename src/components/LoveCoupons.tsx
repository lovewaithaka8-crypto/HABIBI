import React, { useState } from 'react';
import { Ticket, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { LoveCoupon } from '../types';
import { getSavedCoupons, saveCoupons, defaultCoupons } from '../utils/storage';
import { romanticAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LoveCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => getSavedCoupons());
  const [redeemedToast, setRedeemedToast] = useState<string | null>(null);

  const handleRedeem = (couponId: string) => {
    const updated = coupons.map((c) => {
      if (c.id === couponId && !c.redeemed) {
        romanticAudio.playRoseChime();
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fff'],
        });
        setRedeemedToast(`Coupon Redeemed: "${c.title}"! I owe you this forever! 🥰`);
        setTimeout(() => setRedeemedToast(null), 4000);

        return {
          ...c,
          redeemed: true,
          redeemedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        };
      }
      return c;
    });

    setCoupons(updated);
    saveCoupons(updated);
  };

  const handleResetCoupons = () => {
    setCoupons(defaultCoupons);
    saveCoupons(defaultCoupons);
    romanticAudio.playSparkle();
  };

  return (
    <section id="coupons" className="scroll-mt-24 my-10">
      <div className="card p-6 sm:p-10 shadow-xl transition-all">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            <span>Love Coupons For Habibti</span>
            <span>🎟️💕</span>
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Redeemable anytime you want. No expiration date, always guaranteed with love.
          </p>
        </div>

        {/* Redeemed Toast banner */}
        {redeemedToast && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-center text-rose-100 animate-in fade-in slide-in-from-top-2">
            <span className="font-medium text-sm">{redeemedToast}</span>
          </div>
        )}

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                coupon.redeemed
                  ? 'bg-stone-950/30 border-rose-900/30 opacity-75'
                  : 'bg-gradient-to-b from-rose-950/30 to-stone-950/50 border-rose-500/30 hover:border-rose-400/60 shadow-lg hover:shadow-rose-950/50 hover:-translate-y-1'
              }`}
            >
              {/* Notched Coupon Border Accents */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-stone-950 border border-rose-500/20" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-3xl select-none">{coupon.icon}</span>
                  {coupon.redeemed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-300/80 bg-rose-900/30 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Claimed {coupon.redeemedAt}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-rose-300/70 uppercase tracking-widest">
                      VIP PASS
                    </span>
                  )}
                </div>

                <h3 className="font-serif-romantic text-base font-bold text-rose-100 mb-1">
                  {coupon.title}
                </h3>
                <p className="text-xs text-rose-200/80 leading-relaxed font-light mb-6">
                  {coupon.description}
                </p>
              </div>

              <div>
                {coupon.redeemed ? (
                  <div className="w-full py-2.5 text-xs text-center text-rose-300/60 font-mono border-t border-rose-500/20">
                    Redeemed With Love ❤️
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRedeem(coupon.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-rose-300 hover:from-rose-100 hover:to-rose-200 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Redeem This Coupon 🎟️</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reset Coupons option */}
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={handleResetCoupons}
            className="inline-flex items-center gap-1 text-xs text-rose-300/60 hover:text-rose-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset All Coupons</span>
          </button>
        </div>
      </div>
    </section>
  );
};
