import React from 'react';
import { Star, ShieldCheck, Crown } from 'lucide-react';

export default function AboutAndReviews() {
  const reviews = [
    {
      id: 1,
      name: "Hamza Tariq",
      rating: 5,
      comment: "Saltanat's Royal Biryani is pure perfection! The aroma, tender chicken, and fast delivery in 25 mins made our family dinner memorable.",
      dish: "Royal Chicken Biryani"
    },
    {
      id: 2,
      name: "Ayesha Khan",
      rating: 5,
      comment: "Best Charcoal Grilled Malai Tikka and Chicken Karahi in town! Sizzling hot and rich authentic desi ghee flavors.",
      dish: "Chicken Malai Tikka & Karahi"
    },
    {
      id: 3,
      name: "Bilal Siddiqui",
      rating: 5,
      comment: "Crispy Peri Peri Fries and Zinger Burger were top notch, and the Mint Margarita was super refreshing. Highly recommended!",
      dish: "Zinger Burger & Peri Peri Fries"
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-600/30 inline-flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-red-500" />
              <span>The Saltanat Legacy</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Honoring Mughal Gastronomy With Modern Passion
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Saltanat Restaurant brings centuries-old royal culinary heritage straight to your table. Every kebab is flame-grilled over natural charcoal, every biryani is slow-cooked on traditional dum, and every burger is made with premium cuts and signature house-made sauces.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-red-900/40 transition">
                <span className="text-2xl font-black text-red-500 block">12+</span>
                <span className="text-xs text-neutral-400">Master Chefs</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-red-900/40 transition">
                <span className="text-2xl font-black text-red-500 block">100%</span>
                <span className="text-xs text-neutral-400">Halal Certified</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-red-900/40 transition">
                <span className="text-2xl font-black text-red-500 block">20K+</span>
                <span className="text-xs text-neutral-400">Happy Foodies</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
              alt="Saltanat Grand Dining"
              className="relative rounded-3xl shadow-2xl border border-neutral-800 w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">What Our Diners Say</h3>
            <p className="text-xs sm:text-sm text-neutral-400">Real feedback from food enthusiasts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-red-600/40 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-red-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{rev.name}</span>
                    <span className="text-neutral-500">{rev.dish}</span>
                  </div>
                  <span className="text-[10px] text-red-400 font-semibold bg-red-950/60 px-2 py-0.5 rounded-full border border-red-900/50">
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
