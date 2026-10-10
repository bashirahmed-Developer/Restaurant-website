import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-950/60 text-red-500 rounded-xl border border-red-900/40">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Your Food Basket</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-6 flex-1 overflow-y-auto divide-y divide-neutral-800">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-neutral-400">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
                <p className="text-sm font-semibold">Your basket is empty!</p>
                <p className="text-xs text-neutral-500">Pick signature dishes from Saltanat's menu.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-neutral-800"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                    <span className="text-xs text-red-400 font-bold">Rs. {item.price}</span>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-black border border-neutral-800 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-white">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-900/60 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400 font-medium">Estimated Subtotal:</span>
                <span className="text-xl font-black text-red-500">Rs. {subtotal}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-sm shadow-xl shadow-red-700/30 flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
