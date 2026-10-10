import React from 'react';
import { Star, ShieldCheck, Heart, Award, Users } from 'lucide-react';

export default function AboutAndReviews() {
  const reviews = [
    {
      id: 1,
      name: "Hamza Tariq",
      rating: 5,
      comment: "The Royal Biryani is pure perfection! The aroma, tender chicken, and fast delivery in 25 mins made our family dinner special.",
      dish: "Royal Chicken Biryani"
    },
    {
      id: 2,
      name: "Ayesha Khan",
      rating: 5,
      comment: "Best Chicken Karahi in town! Fresh ginger and authentic desi ghee flavor. Easily the best food order experience.",
      dish: "Special Chicken Karahi"
    },
    {
      id: 3,
      name: "Bilal Siddiqui",
      rating: 5,
      comment: "Crispy Zinger was crunchy and juicy, and the Mint Margarita was super refreshing. Will definitely be ordering regularly!",
      dish: "Zinger Burger & Margarita"
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              Our Culinary Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Crafting Memorable Flavors With Passion & Precision
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded with the vision to celebrate authentic sub-continental cuisine, Royal Dine brings together time-tested heritage recipes and high-standard kitchen hygiene. Every single meal is prepared on order to guarantee freshness and unbeatable taste.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-2xl font-black text-amber-400 block">10+</span>
                <span className="text-xs text-slate-400">Master Chefs</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-2xl font-black text-amber-400 block">100%</span>
                <span className="text-xs text-slate-400">Halal Certified</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-2xl font-black text-amber-400 block">15K+</span>
                <span className="text-xs text-slate-400">Happy Diners</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant Dining"
              className="rounded-3xl shadow-2xl border border-slate-800 w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">What Our Guests Say</h3>
            <p className="text-xs sm:text-sm text-slate-400">Real feedback from verified food lovers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{rev.name}</span>
                    <span className="text-slate-500">{rev.dish}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Verified Order
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
