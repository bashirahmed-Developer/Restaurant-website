import React, { useState } from 'react';
import { Utensils, ShoppingBag, ShieldCheck, Menu, X, PhoneCall, Crown } from 'lucide-react';

export default function Navbar({ 
  cartItems, 
  onOpenCart, 
  onOpenAdmin, 
  isAdminLoggedIn, 
  currentView, 
  setCurrentView 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'customer') {
      setCurrentView('customer');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-950/40 text-white shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo: Saltanat Restaurant */}
          <div 
            onClick={() => { setCurrentView('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-700/40 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Crown className="w-6 h-6 text-white font-bold" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Saltanat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Restaurant</span>
              </span>
              <p className="text-[10px] text-red-400/90 tracking-widest uppercase font-semibold">The Royal Taste of Heritage</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => { setCurrentView('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-neutral-300 hover:text-red-400 text-sm font-semibold transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollTo('menu-section')}
              className="text-neutral-300 hover:text-red-400 text-sm font-semibold transition-colors duration-200"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollTo('order-section')}
              className="text-neutral-300 hover:text-red-400 text-sm font-semibold transition-colors duration-200"
            >
              Order Online
            </button>
            <button 
              onClick={() => scrollTo('about-section')}
              className="text-neutral-300 hover:text-red-400 text-sm font-semibold transition-colors duration-200"
            >
              Our Story
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone Help */}
            <a 
              href="tel:+923001234567" 
              className="hidden lg:flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/90 px-3.5 py-2 rounded-full border border-neutral-800 hover:text-red-400 hover:border-red-900/40 transition duration-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>+92 300 1234567</span>
            </a>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-700/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalQuantity > 0 && (
                <span className="bg-black text-red-400 text-xs px-2 py-0.5 rounded-full font-black ml-1 border border-red-500/40 animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => {
                if (currentView === 'admin') {
                  setCurrentView('customer');
                } else {
                  onOpenAdmin();
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition duration-200 cursor-pointer ${
                currentView === 'admin' 
                  ? 'bg-red-950/60 text-red-400 border-red-500/60' 
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>{currentView === 'admin' ? 'View Website' : 'Admin Portal'}</span>
            </button>
          </div>

          {/* Mobile Hamburger & Cart */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-700/30"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-red-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-red-500">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-red-950/40 px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => scrollTo('menu-section')} 
              className="text-left text-neutral-200 hover:text-red-400 font-medium py-2 border-b border-neutral-900"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => scrollTo('order-section')} 
              className="text-left text-neutral-200 hover:text-red-400 font-medium py-2 border-b border-neutral-900"
            >
              Order Online
            </button>
            <button 
              onClick={() => scrollTo('about-section')} 
              className="text-left text-neutral-200 hover:text-red-400 font-medium py-2 border-b border-neutral-900"
            >
              Our Story
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView === 'admin') {
                  setCurrentView('customer');
                } else {
                  onOpenAdmin();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 text-red-400 font-semibold border border-red-950"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{currentView === 'admin' ? 'View Website' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
