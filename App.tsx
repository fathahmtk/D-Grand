import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Wholesale from './pages/Wholesale';
import Marketplaces from './pages/Marketplaces';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';
import Wishlist from './pages/Wishlist';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ShopProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="wholesale" element={<Wholesale />} />
            <Route path="marketplaces" element={<Marketplaces />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:id" element={<JournalPost />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="shop" element={<Shop />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="return-policy" element={<ReturnPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </HashRouter>
    </ShopProvider>
  );
};

export default App;