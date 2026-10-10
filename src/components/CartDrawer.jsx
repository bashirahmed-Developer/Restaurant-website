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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Your Food Basket</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-6 flex-1 overflow-y-auto divide-y divide-slate-800">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm">Your basket is empty!</p>
                <p className="text-xs text-slate-500">Add mouthwatering dishes from our menu.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                    <span className="text-xs text-amber-400 font-bold">Rs. {item.price}</span>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
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
            <div className="p-6 border-t border-slate-800 bg-slate-950/60 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Estimated Subtotal:</span>
                <span className="text-xl font-black text-amber-400">Rs. {subtotal}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
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
