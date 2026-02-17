import React, { useState } from 'react';
import { Section } from '../components/Section';
import { WholesaleForm } from '../types';
import { PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Send, CheckCircle, TrendingUp, Package, Shield, UserCheck, FileText, Truck, Plus, Minus } from 'lucide-react';

const Wholesale: React.FC = () => {
  const [formData, setFormData] = useState<WholesaleForm>({
    name: '',
    businessName: '',
    phone: '',
    city: '',
    requirement: ''
  });

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
        className="block py-3 px-0 w-full text-sm text-emerald-950 bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gold-500 peer transition-colors"
      />
      <label className="peer-focus:font-medium absolute text-xs text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gold-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
        {label}
      </label>
    </div>
  );

  const PROCESS_STEPS = [
      { icon: <UserCheck size={28} />, title: "Register", desc: "Submit the form below with your business details." },
      { icon: <FileText size={28} />, title: "Verification", desc: "Our team validates your business profile within 24h." },
      { icon: <Package size={28} />, title: "Select", desc: "Access our full wholesale catalog & place your order." },
      { icon: <Truck size={28} />, title: "Ship", desc: "Secure packaging & dispatch within 2-3 business days." }
  ];

  const WHOLESALE_FAQS = [
      { q: "What is the Minimum Order Value (MOV)?", a: "To qualify for wholesale pricing, the minimum order value is ₹10,000 for the first order. Subsequent orders have a flexible minimum of ₹5,000." },
      { q: "Do you provide product images for reselling?", a: "Yes, once you become a verified partner, we provide high-resolution, watermark-free images that you can use on your social media or website." },
      { q: "Can I customize the jewellery?", a: "Customization is available for bulk orders of a single design (MOQ 10+ pieces per design). Production time varies from 15-20 days." },
      { q: "What are the shipping charges for bulk orders?", a: "Shipping is calculated based on actual weight. We have tie-ups with major logistics partners to ensure the lowest shipping rates for you." }
  ];

  return (
    <>
       <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 opacity-50"></div>
         
        <div className="relative z-10 container mx-auto px-6">
          <span className="text-gold-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in-up">B2B Partnership</span>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Wholesale Program</h1>
          <p className="text-emerald-100/70 max-w-lg mx-auto text-sm font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join our exclusive network of retailers and boutiques. Access premium designs at factory-direct pricing.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <Section background="cream">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">How It Works</span>
                  <h2 className="font-serif text-3xl text-emerald-950 mt-3">Simple 4-Step Process</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-emerald-950/20 z-0"></div>

                  {PROCESS_STEPS.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                          <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center text-emerald-950 mb-6 shadow-sm group-hover:border-gold-500 group-hover:text-gold-600 transition-all duration-300">
                              {step.icon}
                          </div>
                          <h4 className="font-serif text-xl text-emerald-950 mb-3">{step.title}</h4>
                          <p className="text-gray-500 text-xs font-light px-4 leading-relaxed">{step.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </Section>

      <Section background="white" className="relative pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden bg-white">
            
            {/* Left Side - Visual & Benefits */}
            <div className="lg:w-5/12 bg-emerald-950 relative text-white p-12 flex flex-col justify-between overflow-hidden">
               {/* Background Image */}
               <div className="absolute inset-0 opacity-30">
                  <img 
                    src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover"
                    alt="Jewellery Background"
                  />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-900/50"></div>

               <div className="relative z-10">
                  <h3 className="font-serif text-3xl mb-12">Partnership Benefits</h3>
                  <div className="space-y-10">
                      <div className="flex gap-5">
                          <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/20">
                             <TrendingUp size={20} />
                          </div>
                          <div>
                              <h4 className="font-serif text-lg mb-2 text-gold-200">High Margins</h4>
                              <p className="text-emerald-100/60 text-xs leading-relaxed">Competitive factory-direct pricing ensuring excellent profitability for your business.</p>
                          </div>
                      </div>
                      <div className="flex gap-5">
                          <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/20">
                             <Package size={20} />
                          </div>
                          <div>
                              <h4 className="font-serif text-lg mb-2 text-gold-200">Low MOQ</h4>
                              <p className="text-emerald-100/60 text-xs leading-relaxed">Start small with our flexible Minimum Order Quantity and scale as you grow.</p>
                          </div>
                      </div>
                      <div className="flex gap-5">
                          <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/20">
                             <Shield size={20} />
                          </div>
                          <div>
                              <h4 className="font-serif text-lg mb-2 text-gold-200">Quality Assurance</h4>
                              <p className="text-emerald-100/60 text-xs leading-relaxed">Every piece undergoes a 3-step quality check before dispatch.</p>
                          </div>
                      </div>
                  </div>
               </div>
               
               <div className="relative z-10 mt-12 pt-8 border-t border-emerald-800/50">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2">Have questions?</p>
                  <p className="font-serif text-xl text-white">+91 {PHONE_PRIMARY}</p>
               </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-7/12 p-12 lg:p-16 bg-white">
                <div className="mb-10">
                    <span className="text-gold-600 text-[10px] uppercase tracking-widest font-bold">Application</span>
                    <h2 className="font-serif text-3xl text-emerald-950 mt-2">Become a Partner</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <InputField label="Contact Name" name="name" placeholder="John Doe" />
                        <InputField label="Business Name" name="businessName" placeholder="Grand Boutique" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <InputField label="WhatsApp Number" name="phone" type="tel" placeholder="9876543210" />
                        <InputField label="City / Location" name="city" placeholder="Bangalore" />
                    </div>

                    <div className="relative group z-0 w-full mb-6 group">
                        <textarea 
                        name="requirement" 
                        required
                        value={formData.requirement}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-3 px-0 w-full text-sm text-emerald-950 bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gold-500 peer transition-colors h-24 resize-none"
                        ></textarea>
                        <label className="peer-focus:font-medium absolute text-xs text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gold-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
                        Business Requirement
                        </label>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="group w-full md:w-auto px-10 py-4 bg-emerald-950 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl">
                            <span>Submit Enquiry</span>
                            <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>

          </div>
        </div>
      </Section>

      {/* Wholesale FAQ */}
      <Section background="cream">
         <div className="max-w-3xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="font-serif text-3xl text-emerald-950 mt-3">Business FAQ</h2>
             </div>
             
             <div className="space-y-4">
                 {WHOLESALE_FAQS.map((faq, idx) => (
                     <div 
                        key={idx} 
                        className={`bg-white rounded-sm border transition-all duration-300 overflow-hidden ${
                            openFaqIndex === idx ? 'border-gold-500/50 shadow-md' : 'border-gray-100 hover:border-gold-200'
                        }`}
                     >
                         <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                         >
                             <span className={`font-serif text-lg ${openFaqIndex === idx ? 'text-emerald-950' : 'text-gray-600'}`}>
                                 {faq.q}
                             </span>
                             <div className={`p-2 rounded-full transition-colors ${openFaqIndex === idx ? 'bg-gold-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                 {openFaqIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                             </div>
                         </button>
                         <div 
                            className={`px-6 text-sm text-gray-500 font-light leading-relaxed transition-all duration-300 ease-in-out ${
                                openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                         >
                             {faq.a}
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