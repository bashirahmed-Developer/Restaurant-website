import React from 'react';
import { Sparkles, Clock, Award, Flame, ArrowRight, ShieldCheck, Crown } from 'lucide-react';

export default function Hero({ onOrderClick, onMenuClick }) {
  return (
    <section className="relative overflow-hidden bg-black text-white py-16 lg:py-24 border-b border-red-950/40">
      
      {/* Decorative Red & Charcoal background glowing orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-rose-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-600/30 text-red-400 text-xs font-semibold tracking-wide shadow-md">
              <Crown className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Royal Flavors & Heritage · 100% Fresh Halal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Welcome To <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400">Saltanat</span> Restaurant
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Step into a world of royal culinary indulgence. From charcoal-sizzled Malai Tikkas and aromatic Biryanis to gourmet burgers and decadent desserts, every dish is prepared with sovereign perfection.
            </p>

            {/* Action Buttons with smooth hover animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-base shadow-xl shadow-red-700/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-red-600/50 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Order Now Online</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onMenuClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-base border border-neutral-800 hover:border-red-900/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-900">
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
                  <Clock className="w-4 h-4 text-red-500 group-hover:rotate-12 transition-transform" />
                  <span>30 Mins</span>
                </div>
                <span className="text-xs text-neutral-400 mt-0.5">Express Delivery</span>
              </div>
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
                  <Award className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Top Rated</span>
                </div>
                <span className="text-xs text-neutral-400 mt-0.5">4.9/5 by 1,500+ Diners</span>
              </div>
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
                  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>Fresh & Sizzling</span>
                </div>
                <span className="text-xs text-neutral-400 mt-0.5">Cooked Live on Order</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase with Floating Animation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none animate-float">
              
              {/* Outer decorative ring with red glow */}
              <div className="relative p-3 rounded-3xl bg-gradient-to-tr from-red-950 via-neutral-900 to-red-900/30 border border-red-800/40 shadow-2xl animate-pulse-glow">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                  alt="Saltanat Royal Feast"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-inner"
                />

                {/* Floating badge 1: Deal */}
                <div className="absolute -bottom-4 -left-4 sm:left-4 bg-black/95 border border-red-600/40 p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-black">
                    🔥
                  </div>
                  <div>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Free Delivery Today</p>
                    <p className="text-xs text-neutral-300">On all web orders over Rs. 1000</p>
                  </div>
                </div>

                {/* Floating badge 2: Quality */}
                <div className="absolute -top-4 -right-4 bg-black/95 border border-red-900/50 p-3 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-semibold text-neutral-200">100% Pure & Hygienic</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
