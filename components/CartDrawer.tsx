import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { PHONE_PRIMARY } from '../constants';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useShop();
  const [note, setNote] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const itemsList = cart.map((item, index) => 
      `${index + 1}. ${item.name} (${item.quantity} x ${item.price})`
    ).join('%0A');

    const totalStr = `Total Estimate: ₹${cartTotal.toLocaleString('en-IN')}`;
    const noteStr = note.trim() ? `%0A%0A*Note:* ${note}` : '';
    const text = `*Order Enquiry from Website*%0A%0AHi, I would like to place an order:%0A%0A${itemsList}%0A%0A${totalStr}${noteStr}%0A%0APlease confirm availability.`;
    
    window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleCart}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-cream-50 h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-gold-500" size={24} />
            <h2 className="font-serif text-2xl text-emerald-950">Your Bag</h2>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2 py-1 rounded-full">{cartCount} items</span>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={48} className="text-gray-300 mb-4" strokeWidth={1} />
              <p className="font-serif text-xl text-emerald-950 mb-2">Your bag is empty</p>
              <p className="text-sm text-gray-400 mb-8 max-w-xs">Looks like you haven't added any premium jewellery to your collection yet.</p>
              <button 
                onClick={toggleCart}
                className="px-8 py-3 bg-emerald-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-emerald-950 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
                  <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-emerald-950 leading-tight pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gold-600 font-bold mt-1">{item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-emerald-950">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Order Note */}
              <div className="mt-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Order Notes (Optional)</label>
                <textarea 
                   className="w-full bg-white border border-gray-200 rounded-sm p-3 text-sm text-emerald-950 focus:outline-none focus:border-gold-500 resize-none h-20 placeholder:text-gray-300"
                   placeholder="E.g. Ring size, gift wrap request..."
                   value={note}
                   onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Total Estimate</span>
              <span className="font-serif text-3xl text-emerald-950">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.2em] hover:brightness-105 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                Checkout on WhatsApp <MessageCircle size={18} />
              </button>
              <button 
                onClick={toggleCart}
                className="w-full py-3 bg-transparent border border-emerald-950 text-emerald-950 text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-950 hover:text-white transition-all"
              >
                Continue Shopping
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-4">
              Secure Checkout • Order via WhatsApp • Pay via UPI/Card
            </p>
          </div>
        )}
      </div>
    </div>
  );
};