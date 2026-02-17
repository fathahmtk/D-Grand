import React from 'react';
import { Section } from '../components/Section';
import { ADDRESS, PHONE_PRIMARY, PHONE_SECONDARY, EMAIL } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10">
            <span className="text-gold-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Get In Touch</span>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">Contact Us</h1>
        </div>
      </div>

      <Section background="white" className="relative z-10 -mt-10 pt-0">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Contact Information */}
                <div className="p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-12">
                        <h2 className="font-serif text-3xl text-emerald-950 mb-6">We'd love to hear from you</h2>
                        <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
                            Whether you are a retailer looking for wholesale partnership or a customer enquiring about a product, our team is here to assist you.
                        </p>
                    </div>

                    <div className="space-y-10">
                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Visit Our Store</h4>
                                <p className="text-gray-600 text-sm font-light leading-relaxed whitespace-pre-line">{ADDRESS}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Call Us</h4>
                                <p className="text-gray-600 text-sm font-light">+91 {PHONE_PRIMARY}</p>
                                <p className="text-gray-600 text-sm font-light">+91 {PHONE_SECONDARY}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-widest mb-2">Email</h4>
                                <p className="text-gray-600 text-sm font-light">{EMAIL}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center flex-shrink-0 text-gold-600 group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
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

                {/* Map */}
                <div className="h-[500px] lg:h-auto bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-700">
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
            </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;