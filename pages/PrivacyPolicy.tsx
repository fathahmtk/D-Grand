import Seo from '../components/Seo';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white pt-28 pb-16">
    <Seo title="Privacy Policy" description="Privacy practices of D Grand Jewellery eCommerce platform." />
    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
      <h1 className="font-display text-4xl mb-6">Privacy Policy</h1>
      <p className="mb-3">We collect only essential customer data for order processing, support, and shipping.</p>
      <p className="mb-3">Payments are processed via secure gateways like Razorpay. Card details are never stored on our servers.</p>
      <p>Your data will not be sold to third parties. WhatsApp communication is opt-in based.</p>
    </div>
  </div>
);

export default PrivacyPolicy;
