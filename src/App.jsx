import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import AboutAndReviews from './components/AboutAndReviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('customer'); // 'customer' or 'admin'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('royal_dine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Check existing admin session on mount
  useEffect(() => {
    const logged = sessionStorage.getItem('admin_logged_in');
    if (logged === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem('royal_dine_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add dish to cart
  const handleAddToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove single item
  const handleRemoveItem = (dishId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== dishId));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Admin access flow
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLoginModal(false);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_email');
    setIsAdminLoggedIn(false);
    setCurrentView('customer');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If in admin view, render AdminDashboard
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard 
        onLogout={handleAdminLogout} 
        onGoToWebsite={() => setCurrentView('customer')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Responsive Header */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Public Website Sections */}
      <main className="flex-grow">
        {/* Hero Banner (Top Section) */}
        <Hero 
          onOrderClick={() => scrollToSection('order-section')}
          onMenuClick={() => scrollToSection('menu-section')}
        />

        {/* 6+ Dishes Menu */}
        <Menu 
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        {/* Order Form (Required Fields, Saves to Supabase, Sends to Gmail) */}
        <OrderForm 
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onBrowseMenu={() => scrollToSection('menu-section')}
        />

        {/* About & Customer Testimonials */}
        <AboutAndReviews />
      </main>

      {/* Footer with links & Admin toggle */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Side Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => scrollToSection('order-section')}
      />

      {/* Admin Login Modal */}
      {showAdminLoginModal && (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onCancel={() => setShowAdminLoginModal(false)}
        />
      )}

    </div>
  );
}
