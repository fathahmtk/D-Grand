import React, { useState } from 'react';
import { Section } from '../components/Section';
import { WholesaleForm } from '../types';
import { PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Send, CheckCircle } from 'lucide-react';

const Wholesale: React.FC = () => {
  const [formData, setFormData] = useState<WholesaleForm>({
    name: '',
    businessName: '',
    phone: '',
    city: '',
    requirement: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Wholesale Enquiry from Website*%0A%0AName: ${formData.name}%0ABusiness: ${formData.businessName}%0APhone: ${formData.phone}%0ACity: ${formData.city}%0ARequirement: ${formData.requirement}`;
    window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
  };

  const InputField = ({ label, name, type = "text", placeholder, required = true }: any) => (
    <div className="relative group">
      <input 
        type={type} 
        name={name} 
        required={required}
        value={formData[name as keyof WholesaleForm]}
        onChange={handleChange}
        placeholder=" "
        className="block w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gold-500 peer transition-colors text-emerald-950"
      />
      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gold-600 peer-focus:dark:text-gold-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide uppercase text-xs">
        {label}
      </label>
    </div>
  );

  return (
    <>
       <div className="bg-emerald-950 text-white py-20 text-center relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Wholesale Partner Program</h1>
          <p className="text-gold-400 uppercase tracking-[0.2em] text-xs font-medium">Grow your business with D GRAND</p>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-5xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden">
          
          {/* Info Side */}
          <div className="bg-emerald-950 p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            {/* Background Image Overlay */}
             <div className="absolute inset-0 z-0 opacity-20">
                <img 
                    src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Background" 
                    onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                />
             </div>
             <div className="absolute inset-0 bg-emerald-950/80 z-0"></div>

            <div className="relative z-10">
              <h3 className="font-serif text-3xl mb-8 text-white">Why Partner With Us?</h3>
              <ul className="space-y-8">
                <li className="flex gap-5 group">
                   <div className="mt-1">
                      <CheckCircle size={20} className="text-gold-500" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1 group-hover:text-gold-400 transition-colors">Direct Factory Rates</h4>
                     <p className="text-emerald-100/60 text-sm font-light">Best margins in the industry with our factory-direct pricing.</p>
                   </div>
                </li>
                <li className="flex gap-5 group">
                   <div className="mt-1">
                      <CheckCircle size={20} className="text-gold-500" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1 group-hover:text-gold-400 transition-colors">Trendsetting Designs</h4>
                     <p className="text-emerald-100/60 text-sm font-light">Weekly catalog updates with trending designs from Bangalore.</p>
                   </div>
                </li>
                <li className="flex gap-5 group">
                   <div className="mt-1">
                      <CheckCircle size={20} className="text-gold-500" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1 group-hover:text-gold-400 transition-colors">Flexible MOQ</h4>
                     <p className="text-emerald-100/60 text-sm font-light">Start small and scale big. We support businesses of all sizes.</p>
                   </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 pt-8 border-t border-emerald-800 relative z-10">
               <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Support</p>
               <p className="font-serif text-xl">+91 {PHONE_PRIMARY}</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12 md:w-3/5 bg-white">
            <div className="mb-10">
              <h3 className="font-serif text-3xl text-emerald-950 mb-2">Send Enquiry</h3>
              <p className="text-gray-500 text-sm">Fill out the form below to receive our latest catalog via WhatsApp.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <InputField label="Your Name" name="name" placeholder="John Doe" />
              <InputField label="Business Name" name="businessName" placeholder="JD Boutique" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <InputField label="WhatsApp Number" name="phone" type="tel" placeholder="9876543210" />
                 <InputField label="City" name="city" placeholder="Bangalore" />
              </div>

              <div className="relative group">
                <textarea 
                  name="requirement" 
                  required
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder=" "
                  className="block w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gold-500 peer transition-colors text-emerald-950 h-24 resize-none"
                ></textarea>
                <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gold-600 peer-focus:dark:text-gold-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide uppercase text-xs">
                  Requirement Details
                </label>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-emerald-950 text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xs">
                  <Send size={16} /> Send Request
                </button>
              </div>
            </form>
          </div>

        </div>
      </Section>
    </>
  );
};

export default Wholesale;