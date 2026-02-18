import Seo from '../components/Seo';

const ShippingPolicy = () => (
  <div className="min-h-screen bg-white pt-28 pb-16">
    <Seo title="Shipping Policy" description="Shipping policy for D Grand Jewellery orders across India." />
    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
      <h1 className="font-display text-4xl mb-6">Shipping Policy</h1>
      <p className="mb-3">We ship across India within 24-48 hours of order confirmation.</p>
      <p className="mb-3">Delivery timeline is 2-7 business days based on pincode. COD availability is pincode dependent.</p>
      <p>All items are quality checked and securely packed before dispatch.</p>
    </div>
  </div>
);

export default ShippingPolicy;
