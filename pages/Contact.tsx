import React, { useState } from 'react';
import { Section } from '../components/Section';
import { ADDRESS, PHONE_PRIMARY, PHONE_SECONDARY, EMAIL } from '../constants';
import { MapPin, Phone, Mail, Clock, Send, Plus, Minus, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });
  const { showNotification } = useShop();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Redirecting to WhatsApp...");
    const text = `*General Enquiry from Website*%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    setTimeout(() => {
        window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
    }, 1000);
  };

  const FAQS = [
    { q: "International Shipping?", a: "Yes, via DHL/FedEx based on weight." },
    { q: "Return Policy?", a: "Returns accepted only for damage during transit with unboxing video." },
    { q: "Materials Used?", a: "High-quality copper alloy, nickel & lead-free." },
    { q: "Customization?", a: "Available for bulk orders (MOQ applies)." },
  ];

  return (
    <>
      <div className="bg-emerald-950 text-white pt-32 pb-20 text-center">
        <div className="relative z-10 animate-fade-in-up">
            <span className="text-teal-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Connect</span>
            <h1 className="font-display text-5xl md:text-7xl mb-4 uppercase tracking-tighter">Contact Us</h1>
            <p className="text-gray-400 text-sm font-light max-w-lg mx-auto">We engineer solutions for your needs.</p>
        </div>
      </div>

      <Section background="white" className="pt-0 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto bg-white border border-gray-100 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                <div className="p-12 lg:p-16 bg-gray-50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="mb-10">
                        <h2 className="font-display text-3xl text-emerald-950 mb-6">Headquarters</h2>
                        <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
                            Bangalore, India.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            { icon: MapPin, title: "Visit", content: ADDRESS },
                            { icon: Phone, title: "Call", content: `+91 ${PHONE_PRIMARY}\n+91 ${PHONE_SECONDARY}` },
                            { icon: Mail, title: "Email", content: EMAIL },
                            { icon: Clock, title: "Hours", content: "Mon - Sat: 10:30 AM - 8:30 PM" }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0 text-emerald-950">
                                    <item.icon size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">{item.title}</h4>
                                    <p className="text-gray-600 text-sm font-light whitespace-pre-line">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-12 lg:p-16 bg-white">
                    <h3 className="font-display text-2xl text-emerald-950 mb-8">Send Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {['name', 'phone', 'subject'].map((field) => (
                            <div key={field} className="group">
                                <input 
                                    type={field === 'phone' ? 'tel' : 'text'} 
                                    name={field} 
                                    required
                                    value={formData[field as keyof typeof formData]}
                                    onChange={handleChange}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950"
                                />
                            </div>
                        ))}
                        <div className="group">
                            <textarea 
                                name="message" 
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950 h-32 resize-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-emerald-950 text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2">
                            Send Message <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </Section>

      <div className="h-[400px] w-full bg-gray-100 grayscale invert">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0256860087756!2d77.57396747507645!3d12.970196287345097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1605fa600001%3A0x6a0a0a0a0a0a0a0a!2sMamulpete%2C%20Chickpet%2C%20Bengaluru%2C%20Karnataka%20560053!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Location"
        ></iframe>
      </div>

      <Section background="white">
         <div className="max-w-3xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="font-display text-3xl text-emerald-950 mt-3">FAQ</h2>
             </div>
             
             <div className="border-t border-gray-100">
                 {FAQS.map((faq, idx) => (
                     <div key={idx} className="border-b border-gray-100">
                         <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                         >
                             <span className="font-display text-lg text-emerald-950 group-hover:text-teal-600 transition-colors">{faq.q}</span>
                             <div className="text-gray-300 group-hover:text-teal-600">{openFaqIndex === idx ? <Minus size={14} /> : <Plus size={14} />}</div>
                         </button>
                         <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <p className="text-sm text-gray-500 font-light">{faq.a}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </Section>
    </>
  );
};

export default Contact;