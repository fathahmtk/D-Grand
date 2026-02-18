import { useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { useShop } from '../context/ShopContext';

const Checkout = () => {
  const { cart, cartTotal } = useShop();
  const [payment, setPayment] = useState('UPI');
  const [pincode, setPincode] = useState('');
  const [deliverable, setDeliverable] = useState<string | null>(null);

  const gst = useMemo(() => Math.round(cartTotal * 0.03), [cartTotal]);
  const grandTotal = cartTotal + gst;

  const checkPincode = () => {
    setDeliverable(/^\d{6}$/.test(pincode) ? 'Delivery available in 2-5 days' : 'Enter a valid Indian pincode');
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28 pb-28 md:pb-16">
      <Seo title="Secure Checkout" description="Checkout securely with UPI, cards, netbanking and cash on delivery." />
      <div className="container mx-auto px-3 md:px-6 grid lg:grid-cols-3 gap-5 md:gap-8">
        <div className="lg:col-span-2 border p-4 md:p-6">
          <h1 className="font-display text-2xl md:text-3xl mb-3 md:mb-4">Checkout</h1>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-5 md:mb-6">GST-ready invoice and secure payments</p>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
            <input className="border p-3 text-sm" placeholder="Full Name" />
            <input className="border p-3 text-sm" placeholder="Phone Number" />
            <input className="border p-3 text-sm md:col-span-2" placeholder="Address" />
            <input className="border p-3 text-sm" placeholder="City" />
            <input className="border p-3 text-sm" placeholder="State" />
          </div>

          <div className="border p-4 mb-5 md:mb-6">
            <h2 className="font-semibold mb-3">Pincode Delivery Check</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input className="border p-2 flex-1 text-sm" placeholder="6-digit pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
              <button className="bg-emerald-950 text-white px-4 py-2 text-sm" onClick={checkPincode}>Check</button>
            </div>
            {deliverable && <p className="text-sm mt-2 text-gold-600">{deliverable}</p>}
          </div>

          <div className="border p-4">
            <h2 className="font-semibold mb-3">Payment Options</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {['UPI', 'Cards', 'Net Banking', 'Cash on Delivery'].map((item) => (
                <label key={item} className="flex items-center gap-2 p-2 border text-sm">
                  <input type="radio" checked={payment === item} onChange={() => setPayment(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="border p-4 md:p-6 h-fit sticky top-24 md:top-28 hidden md:block">
          <h3 className="font-display text-xl md:text-2xl mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-sm py-2 border-b">
              <span className="line-clamp-2">{item.name} × {item.quantity}</span>
              <span>{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between"><span>GST</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between font-semibold text-lg mt-2"><span>Total</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
          <button className="w-full mt-4 bg-gold-500 text-emerald-950 py-3 font-semibold">Pay Securely ({payment})</button>
        </aside>
      </div>

      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t p-3 z-30">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-500">Total (incl. GST)</span>
          <span className="font-semibold text-emerald-950">₹{grandTotal.toLocaleString('en-IN')}</span>
        </div>
        <button className="w-full bg-gold-500 text-emerald-950 py-3 font-semibold text-sm">Pay Securely ({payment})</button>
      </div>
    </div>
  );
};

export default Checkout;
