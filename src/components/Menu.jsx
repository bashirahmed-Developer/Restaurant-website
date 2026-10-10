import React, { useState } from 'react';
import { DISHES } from '../data/dishes';
import { Star, Plus, Check, Search, UtensilsCrossed } from 'lucide-react';

export default function Menu({ onAddToCart, cartItems }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  const categories = ['All', 'Main Course', 'Fast Food', 'Starters', 'Desserts', 'Drinks'];

  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (dish) => {
    onAddToCart(dish);
    setRecentlyAddedId(dish.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  const getItemCountInCart = (dishId) => {
    const found = cartItems.find((item) => item.id === dishId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu-section" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Curated Deliciousness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Signature Dishes & Menu
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Handcrafted with age-old recipes and cooked with aromatic spices. Pick your favorites and order in seconds!
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search biryani, burger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => {
            const count = getItemCountInCart(dish.id);
            const isJustAdded = recentlyAddedId === dish.id;

            return (
              <div 
                key={dish.id}
                className="group bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dish Picture & Badge */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs px-2.5 py-1 rounded-lg font-medium border border-amber-500/20">
                    {dish.badge || dish.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-amber-300 border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Price</span>
                      <span className="text-xl font-extrabold text-amber-400">
                        Rs. {dish.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        isJustAdded
                          ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{count > 0 ? `Add (${count})` : 'Add to Order'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No dishes match your filter. Try searching for something else!</p>
          </div>
        )}

      </div>
    </section>
  );
}
