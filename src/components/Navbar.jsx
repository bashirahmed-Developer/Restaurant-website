import React, { useState } from 'react';
import { Utensils, ShoppingBag, ShieldCheck, Menu, X, PhoneCall } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => { setCurrentView('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Utensils className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                Royal <span className="text-amber-400">Dine</span>
              </span>
              <p className="text-xs text-amber-300/80 tracking-widest uppercase font-medium">Fine Flavors & Bistro</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => { setCurrentView('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-slate-300 hover:text-amber-400 text-sm font-semibold transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollTo('menu-section')}
              className="text-slate-300 hover:text-amber-400 text-sm font-semibold transition-colors"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollTo('order-section')}
              className="text-slate-300 hover:text-amber-400 text-sm font-semibold transition-colors"
            >
              Order Online
            </button>
            <button 
              onClick={() => scrollTo('about-section')}
              className="text-slate-300 hover:text-amber-400 text-sm font-semibold transition-colors"
            >
              About
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone Help */}
            <a 
              href="tel:+923001234567" 
              className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-2 rounded-full border border-slate-700/60 hover:text-amber-400 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>+92 300 1234567</span>
            </a>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Cart</span>
              {totalQuantity > 0 && (
                <span className="bg-slate-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-black ml-1 animate-pulse">
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                currentView === 'admin' 
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50' 
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{currentView === 'admin' ? 'View Website' : 'Admin Portal'}</span>
            </button>
          </div>

          {/* Mobile Hamburger & Cart */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-amber-500 text-slate-950"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-slate-950 text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-amber-400">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => scrollTo('menu-section')} 
              className="text-left text-slate-200 hover:text-amber-400 font-medium py-2 border-b border-slate-800"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => scrollTo('order-section')} 
              className="text-left text-slate-200 hover:text-amber-400 font-medium py-2 border-b border-slate-800"
            >
              Order Online
            </button>
            <button 
              onClick={() => scrollTo('about-section')} 
              className="text-left text-slate-200 hover:text-amber-400 font-medium py-2 border-b border-slate-800"
            >
              About Us
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-amber-400 font-semibold border border-slate-700"
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
