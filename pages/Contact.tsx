import React, { useState } from 'react';
import { Section } from '../components/Section';
import { ADDRESS, PHONE_PRIMARY, PHONE_SECONDARY, EMAIL } from '../constants';
import { MapPin, Phone, Mail, Clock, Send, Plus, Minus, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*General Enquiry from Website*%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
  };

  const FAQS = [
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide via premium carriers like DHL and FedEx. Shipping charges are calculated based on the weight of the package and destination country." },
    { q: "What is your return policy?", a: "We accept returns only if the product is damaged during transit. A complete unboxing video without cuts is mandatory to claim a return or exchange." },
    { q: "Is the jewellery anti-allergic?", a: "Our premium collection is crafted with high-quality copper alloy and is nickel & lead-free, making it safe for most skin types." },
    { q: "Do you take customization orders?", a: "Yes, we accept customization for bridal sets and bulk orders. The manufacturing timeline is typically 15-20 days depending on the design intricacy." },
  ];

  return (
    <>
      {/* Hero */}
      <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 animate-fade-in-up">
            <span className="text-gold-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Get In Touch</span>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">Contact Us</h1>
            <p className="text-emerald-100/60 text-sm font-light max-w-lg mx-auto">We are here to assist you with your orders and queries.</p>
        </div>
      </div>

      <Section background="white" className="relative z-10 -mt-10 pt-0">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left: Contact Information */}
                <div className="p-12 lg:p-16 bg-cream-50 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="font-serif text-3xl text-emerald-950 mb-6">Reach Out To Us</h2>
                        <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
                            Visit our store in Bangalore or connect with us online. We ensure a response within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 border border-gray-100 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Visit Our Store</h4>
                                <p className="text-gray-600 text-sm font-light leading-relaxed whitespace-pre-line">{ADDRESS}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 border border-gray-100 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Call Us</h4>
                                <p className="text-gray-600 text-sm font-light">+91 {PHONE_PRIMARY}</p>
                                <p className="text-gray-600 text-sm font-light">+91 {PHONE_SECONDARY}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 border border-gray-100 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Email</h4>
                                <p className="text-gray-600 text-sm font-light">{EMAIL}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 border border-gray-100 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Working Hours</h4>
                                <p className="text-gray-600 text-sm font-light">Mon - Sat: 10:30 AM - 8:30 PM</p>
                                <p className="text-gray-600 text-sm font-light">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Inquiry Form */}
                <div className="p-12 lg:p-16 bg-white">
                    <h3 className="font-serif text-2xl text-emerald-950 mb-8 flex items-center gap-3">
                        Send a Message
                        <span className="h-px bg-gray-100 flex-grow"></span>
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <input 
                                type="text" 
                                name="name" 
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950"
                            />
                        </div>
                        <div className="group">
                            <input 
                                type="tel" 
                                name="phone" 
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950"
                            />
                        </div>
                        <div className="group">
                            <input 
                                type="text" 
                                name="subject" 
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject (e.g., Order Status, General Enquiry)"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950"
                            />
                        </div>
                        <div className="group">
                            <textarea 
                                name="message" 
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-transparent placeholder:text-gray-300 text-emerald-950 h-32 resize-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-emerald-950 text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                            Send Message <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </Section>

      {/* Full Width Map */}
      <div className="h-[400px] w-full bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0256860087756!2d77.57396747507645!3d12.970196287345097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1605fa600001%3A0x6a0a0a0a0a0a0a0a!2sMamulpete%2C%20Chickpet%2C%20Bengaluru%2C%20Karnataka%20560053!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="D GRAND Location"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <Section background="cream">
         <div className="max-w-3xl mx-auto">
             <div className="text-center mb-12">
                 <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Help Center</span>
                 <h2 className="font-serif text-3xl text-emerald-950 mt-3">Frequently Asked Questions</h2>
             </div>
             
             <div className="space-y-4">
                 {FAQS.map((faq, idx) => (
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

             <div className="text-center mt-12">
                 <p className="text-gray-400 text-xs mb-4">Still have questions?</p>
                 <a href={`https://wa.me/91${PHONE_PRIMARY}`} className="inline-flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-widest border-b border-emerald-950 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                     <MessageSquare size={14} /> Chat with Support
                 </a>
             </div>
         </div>
      </Section>
    </>
  );
};

export default Contact;