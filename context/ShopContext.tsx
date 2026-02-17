import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  notification: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleCart: () => void;
  toggleWishlist: (productId: string) => void;
  cartTotal: number;
  cartCount: number;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dgrand_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('dgrand_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('dgrand_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dgrand_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (msg: string) => {
    setNotification(msg);
  };

  const getPriceValue = (priceStr?: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showNotification(`Increased quantity of ${product.name}`);
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showNotification(`Added ${product.name} to bag`);
      setIsCartOpen(true);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showNotification("Removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showNotification("Saved to wishlist");
        return [...prev, productId];
      }
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + (getPriceValue(item.price) * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      notification,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      toggleWishlist,
      cartTotal,
      cartCount,
      showNotification
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};