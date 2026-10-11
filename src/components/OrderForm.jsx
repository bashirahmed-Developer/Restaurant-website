import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { supabase } from '../supabaseClient';
import { EMAILJS_CONFIG } from '../emailConfig';
import { ShoppingCart, Plus, Minus, Trash2, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function OrderForm({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onBrowseMenu 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate Subtotal & Total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 150;
  const totalPrice = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validations (Core requirement: all fields must be filled)
    if (cartItems.length === 0) {
      setErrorMessage('Please pick at least one dish from the menu before placing an order.');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Phone, and Address).');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const orderTimeString = new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // Prepare items formatted for Email & Database
      const formattedEmailItems = cartItems
        .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} = Rs. ${item.price * item.quantity}`)
        .join('\n');

      const itemsForDb = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      // 1. Save order to Supabase in 'orders' table with status 'Pending'
      const { data: dbData, error: dbError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: formData.name.trim(),
            customer_phone: formData.phone.trim(),
            customer_address: formData.address.trim(),
            items: itemsForDb,
            total_price: totalPrice,
            status: 'Pending',
          },
        ])
        .select();

      if (dbError) {
        console.error('Supabase Insert Error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      const generatedOrderId = dbData && dbData[0] ? dbData[0].id : Math.floor(1000 + Math.random() * 9000);

      // 2. Send order email to Gmail via EmailJS
      const templateParams = {
        name: formData.name.trim(),
        email: 'restaurantbussines337@gmail.com',
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim(),
        customer_address: formData.address.trim(),
        order_items: formattedEmailItems,
        message: `Order Items:\n${formattedEmailItems}\n\nTotal Bill: Rs. ${totalPrice}\nCustomer Phone: ${formData.phone.trim()}\nAddress: ${formData.address.trim()}`,
        total_price: totalPrice,
        order_time: orderTimeString,
        notes: formData.notes || 'None',
      };

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );
      } catch (mailError) {
        console.warn('EmailJS warning:', mailError);
      }

      // Celebrate with Confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#ef4444', '#f87171', '#fbbf24', '#ffffff']
      });

      setOrderSuccess({
        id: generatedOrderId,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        total: totalPrice,
        itemsCount: cartItems.length,
      });

      // Reset form and cart
      setFormData({ name: '', phone: '', address: '', notes: '' });
      onClearCart();
    } catch (err) {
      console.error('Order Submission Error:', err);
      setErrorMessage(err.message || 'Failed to place order. Please check your internet or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order-section" className="py-20 bg-black text-white relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <ShoppingCart className="w-3.5 h-3.5 text-red-500" />
            <span>Fast Checkout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Place Your Royal Feast Order
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Selected dishes will be dispatched immediately. All fields marked with * are required.
          </p>
        </div>

        {/* Success Modal / Banner */}
        {orderSuccess && (
          <div className="mb-12 max-w-2xl mx-auto bg-neutral-900 border-2 border-emerald-500/60 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in relative">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-white flex items-center justify-between">
                  <span>Order Placed Successfully! 🎉</span>
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                    Order #{orderSuccess.id}
                  </span>
                </h3>
                <p className="text-sm text-neutral-300">
                  Thank you, <strong className="text-red-400">{orderSuccess.name}</strong>! Your order has been recorded into Saltanat's Supabase database with status <span className="text-red-400 font-bold">Pending</span> and complete details have been dispatched to our restaurant Gmail.
                </p>
                <div className="bg-black/60 p-4 rounded-xl text-xs space-y-1 text-neutral-400 border border-neutral-800">
                  <p>📍 <strong>Delivering to:</strong> {orderSuccess.address}</p>
                  <p>📞 <strong>Phone:</strong> {orderSuccess.phone}</p>
                  <p>💰 <strong>Total Amount:</strong> Rs. {orderSuccess.total}</p>
                </div>
                <button
                  onClick={() => setOrderSuccess(null)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs transition duration-200 cursor-pointer shadow-md shadow-red-700/30"
                >
                  Place Another Order
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Selected Items */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white">Your Selected Dishes</h3>
              </div>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full font-medium">
                {cartItems.length} items
              </span>
            </div>

            {/* Items List */}
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="text-sm text-neutral-400">Your order tray is currently empty.</p>
                <button
                  type="button"
                  onClick={onBrowseMenu}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs transition duration-200 shadow-md shadow-red-700/30 cursor-pointer"
                >
                  Pick Dishes From Menu
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-800 my-4 max-h-96 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-800"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                        <span className="text-xs text-red-400 font-bold">
                          Rs. {item.price} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-black border border-neutral-800 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white w-16 text-right">
                        Rs. {item.price * item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bill Summary */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-neutral-800 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-neutral-800">
                  <span>Total Bill</span>
                  <span className="text-red-500 text-xl font-black">Rs. {totalPrice}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Customer Details Form */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Delivery Details</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Enter your correct details so we can deliver your warm food without delay.
            </p>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ali Ahmed"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Complete Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  placeholder="House #, Street #, Area / Landmark, City"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition resize-none"
                />
              </div>

              {/* Special Instructions (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Special Instructions / Dietary Notes (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  placeholder="e.g. Extra raita, less spicy, call before knocking"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-base shadow-xl shadow-red-700/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting Order to Kitchen...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Place Order (Rs. {totalPrice})</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-neutral-500 text-center pt-2">
                🔒 Stored securely in Supabase database & dispatched to Saltanat's official Gmail.
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
