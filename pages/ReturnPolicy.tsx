import Seo from '../components/Seo';

const ReturnPolicy = () => (
  <div className="min-h-screen bg-white pt-28 pb-16">
    <Seo title="Return Policy" description="Return and replacement policy for D Grand Jewellery." />
    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
      <h1 className="font-display text-4xl mb-6">Return Policy</h1>
      <p className="mb-3">Easy 7-day returns for damaged or wrong products with unboxing video proof.</p>
      <p className="mb-3">Hygiene products like earrings are not returnable unless damaged on arrival.</p>
      <p>Refunds are processed to original payment mode within 5-7 working days after inspection.</p>
    </div>
  </div>
);

export default ReturnPolicy;
