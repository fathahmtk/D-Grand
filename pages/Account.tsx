import { useState } from 'react';
import Seo from '../components/Seo';

const Account = () => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-cream-50 pt-24 md:pt-28 pb-16">
      <Seo title="My Account" description="OTP login, order history, wishlist and address management for D Grand Jewellery customers." />
      <div className="container mx-auto px-3 md:px-6 grid lg:grid-cols-3 gap-4 md:gap-6">
        <div className="border bg-white p-4 md:p-6">
          <h1 className="font-display text-xl md:text-2xl mb-4">OTP Login</h1>
          <input className="border p-3 w-full mb-3 text-sm" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number" />
          {!otpSent ? (
            <button className="bg-emerald-950 text-white px-4 py-2.5 text-sm w-full md:w-auto" onClick={() => setOtpSent(true)}>Send OTP</button>
          ) : (
            <>
              <input className="border p-3 w-full mb-3 text-sm" placeholder="Enter OTP" />
              <button className="bg-gold-500 text-emerald-950 px-4 py-2.5 text-sm w-full md:w-auto">Verify OTP</button>
            </>
          )}
        </div>

        <div className="border bg-white p-4 md:p-6">
          <h2 className="font-display text-xl md:text-2xl mb-4">Order History</h2>
          <ul className="space-y-3 text-sm">
            <li className="border p-3">DG-10201 · Delivered · ₹2,450</li>
            <li className="border p-3">DG-10202 · In Transit · ₹1,899</li>
          </ul>
        </div>

        <div className="border bg-white p-4 md:p-6">
          <h2 className="font-display text-xl md:text-2xl mb-4">Wishlist & Addresses</h2>
          <p className="text-sm mb-4">Manage your saved products and shipping addresses.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="border px-3 py-2 text-sm">View Wishlist</button>
            <button className="border px-3 py-2 text-sm">Manage Addresses</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
