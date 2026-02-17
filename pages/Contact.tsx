import React from 'react';
import { Section } from '../components/Section';
import { ADDRESS, PHONE_PRIMARY, PHONE_SECONDARY, EMAIL } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <div className="bg-emerald-950 text-white py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-gold-400 uppercase tracking-widest text-sm">We'd love to hear from you</p>
      </div>

      <Section background="white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           
           {/* Contact Info */}
           <div className="space-y-8">
              <div>
                 <h2 className="font-serif text-3xl text-emerald-950 mb-6">Get in Touch</h2>
                 <p className="text-gray-600 mb-8">
                   Have a question about a product? Want to place a bulk order? Or just want to say hello? 
                   Reach out to us through any of the channels below.
                 </p>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-emerald-950" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950 uppercase text-sm mb-1">Visit Us</h4>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">{ADDRESS}</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-emerald-950" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950 uppercase text-sm mb-1">Call Us</h4>
                    <p className="text-gray-600">{PHONE_PRIMARY}</p>
                    <p className="text-gray-600">{PHONE_SECONDARY}</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-emerald-950" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950 uppercase text-sm mb-1">Email Us</h4>
                    <p className="text-gray-600">{EMAIL}</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-emerald-950" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950 uppercase text-sm mb-1">Opening Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 10:30 AM - 8:30 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                 </div>
              </div>
           </div>

           {/* Map Embed */}
           <div className="h-[400px] md:h-auto bg-gray-200 rounded-xl overflow-hidden shadow-lg">
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
      </Section>
    </>
  );
};

export default Contact;