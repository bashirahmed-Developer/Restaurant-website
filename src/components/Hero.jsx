import React from 'react';
import { Sparkles, Clock, Award, Flame, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero({ onOrderClick, onMenuClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 lg:py-24 border-b border-slate-800">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Cuisine · 100% Fresh Halal Ingredients</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Experience The True Essence Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">Royal Dine</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Indulge in handcrafted Biryanis, sizzling Karahis, gourmet Burgers and artisanal desserts prepared by master chefs. Delivered piping hot to your doorstep!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Order Now Online</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={onMenuClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>30 Mins</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">Express Delivery</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Top Rated</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">4.9/5 from 1,200+ foodies</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Fresh & Hot</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">Cooked to Order</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="relative p-3 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-slate-800 to-amber-500/10 border border-amber-500/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                  alt="Delicious Feast"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-inner"
                />

                {/* Floating badge 1: Special discount */}
                <div className="absolute -bottom-4 -left-4 sm:left-4 bg-slate-900/95 border border-amber-500/40 p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                    🔥
                  </div>
                  <div>
                    <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">Free Delivery Today</p>
                    <p className="text-xs text-slate-300">On all web orders over Rs. 1000</p>
                  </div>
                </div>

                {/* Floating badge 2: Chef quality */}
                <div className="absolute -top-4 -right-4 bg-slate-900/95 border border-slate-700 p-3 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">100% Pure & Hygienic</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
