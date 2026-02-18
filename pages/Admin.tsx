import Seo from '../components/Seo';

const Admin = () => {
  return (
    <div className="min-h-screen bg-cream-50 pt-24 md:pt-28 pb-16">
      <Seo title="Admin Panel" description="Admin operations for products, inventory, orders and coupons." />
      <div className="container mx-auto px-3 md:px-6">
        <h1 className="font-display text-3xl md:text-4xl mb-4 md:mb-6">Admin Panel</h1>
        <p className="mb-5 md:mb-6 text-sm text-gray-600">Startup-ready dashboard modules for catalogue and order operations.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[
            'Add / Edit / Delete Products',
            'Upload Product Images (Cloudinary)',
            'Manage Inventory',
            'Order Management',
            'Coupon & Discount Management',
            'GST Invoice Management'
          ].map((item) => (
            <div key={item} className="bg-white border p-4 md:p-6 text-sm md:text-base font-medium">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
