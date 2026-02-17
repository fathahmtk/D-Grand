import React, { useState } from 'react';
import { Section } from '../components/Section';
import { WholesaleForm } from '../types';
import { PHONE_PRIMARY } from '../constants';
import { Send, UserCheck, FileText, Truck, Package, Plus, Minus, TrendingUp, Shield } from 'lucide-react';

const Wholesale: React.FC = () => {
  const [formData, setFormData] = useState<WholesaleForm>({ name: '', businessName: '', phone: '', city: '', requirement: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Wholesale Enquiry from Website*%0A%0AName: ${formData.name}%0ABusiness: ${formData.businessName}%0APhone: ${formData.phone}%0ACity: ${formData.city}%0ARequirement: ${formData.requirement}`;
    window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
  };

  const InputField = ({ label, name, type = "text", placeholder, required = true }: any) => (
    <div className="relative group z-0 w-full mb-6 group">
      <input 
        type={type} 
        name={name} 
        required={required}
        value={formData[name as keyof WholesaleForm]}
        onChange={handleChange}
        placeholder=" "
        className="block py-3 px-0 w-full text-sm text-emerald-950 bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer transition-colors"
      />
      <label className="peer-focus:font-medium absolute text-xs text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
        {label}
      </label>
    </div>
  );

  return (
    <>
       <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 animate-fade-in-up">
          <span className="text-teal-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">B2B Partnership</span>
          <h1 className="font-display text-5xl md:text-7xl mb-6 uppercase tracking-tighter">Wholesale</h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm font-light">
            Factory-direct infrastructure for your business.
          </p>
        </div>
      </div>

      <Section background="white">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="font-display text-3xl text-emerald-950">Process Protocol</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                      { icon: <UserCheck size={28} />, title: "Register", desc: "Submit details." },
                      { icon: <FileText size={28} />, title: "Verify", desc: "24h validation." },
                      { icon: <Package size={28} />, title: "Select", desc: "Access catalog." },
                      { icon: <Truck size={28} />, title: "Dispatch", desc: "Secure ship." }
                  ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center group border border-gray-100 p-8 hover:border-emerald-950 transition-colors">
                          <div className="mb-6 text-emerald-950 group-hover:text-teal-600 transition-colors">
                              {step.icon}
                          </div>
                          <h4 className="font-display text-xl text-emerald-950 mb-3">{step.title}</h4>
                          <p className="text-gray-500 text-xs font-light">{step.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </Section>

      <Section background="cream" className="pt-0">
        <div className="max-w-6xl mx-auto bg-white border border-gray-100 shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-5/12 bg-emerald-950 text-white p-12 flex flex-col justify-between">
               <div>
                  <h3 className="font-display text-3xl mb-12 uppercase tracking-tight">Metrics</h3>
                  <div className="space-y-8">
                      {[
                          { icon: TrendingUp, title: "Margins", desc: "Optimized for reseller profitability." },
                          { icon: Package, title: "MOQ", desc: "Flexible scaling options." },
                          { icon: Shield, title: "Quality", desc: "3-tier audit protocol." }
                      ].map((item, i) => (
                          <div key={i} className="flex gap-5">
                              <item.icon size={24} className="text-teal-500" />
                              <div>
                                  <h4 className="font-display text-lg mb-1">{item.title}</h4>
                                  <p className="text-gray-400 text-xs">{item.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
            </div>

            <div className="lg:w-7/12 p-12 lg:p-16">
                <div className="mb-10">
                    <h2 className="font-display text-3xl text-emerald-950 uppercase tracking-tight">Application</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <InputField label="Name" name="name" placeholder="John Doe" />
                        <InputField label="Business" name="businessName" placeholder="Grand Boutique" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <InputField label="WhatsApp" name="phone" type="tel" placeholder="9876543210" />
                        <InputField label="City" name="city" placeholder="Bangalore" />
                    </div>
                    <div className="relative group z-0 w-full mb-6">
                        <textarea 
                        name="requirement" 
                        required
                        value={formData.requirement}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-3 px-0 w-full text-sm text-emerald-950 bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:border-teal-500 peer h-24 resize-none"
                        ></textarea>
                        <label className="peer-focus:font-medium absolute text-xs text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
                        Requirements
                        </label>
                    </div>
                    <div className="pt-6">
                        <button type="submit" className="w-full md:w-auto px-10 py-4 bg-emerald-950 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all flex items-center justify-center gap-3">
                            <span>Submit Data</span>
                            <Send size={14} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </Section>

      <Section background="white">
         <div className="max-w-3xl mx-auto border-t border-gray-100 pt-12">
             <h2 className="font-display text-3xl text-emerald-950 mb-8 text-center">B2B FAQ</h2>
             <div className="space-y-4">
                 {[
                      { q: "MOV?", a: "₹10,000 First Order. ₹5,000 Repeat." },
                      { q: "Assets?", a: "White-label images provided post-verification." },
                      { q: "Custom?", a: "MOQ 10+ per design. 20-day lead time." }
                  ].map((faq, idx) => (
                     <div key={idx} className="border-b border-gray-100 pb-4">
                         <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full flex items-center justify-between py-2 text-left focus:outline-none group"
                         >
                             <span className="font-display text-lg text-emerald-950 group-hover:text-teal-600">{faq.q}</span>
                             <div className="text-gray-300">{openFaqIndex === idx ? <Minus size={14} /> : <Plus size={14} />}</div>
                         </button>
                         <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-20 pt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <p className="text-sm text-gray-500">{faq.a}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </Section>
    </>
  );
};

export default Wholesale;