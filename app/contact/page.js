"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Message secured. Our concierge will contact you within 24 hours.");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-6 block">Concierge Services</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tighter leading-tight">
              Connect With <br /> <span className="text-secondary italic">The Studio.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12 font-light italic leading-relaxed">
              Whether you are looking for a bespoke bridal suite or a personalized selection, our curators are here to assist.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl">📍</div>
                <div>
                  <h4 className="font-bold text-primary text-[10px] uppercase tracking-widest mb-1">Our Heritage Studio</h4>
                  <p className="text-gray-500 text-sm italic">Artisan Boulevard, Gold Souk, Suite 404</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl">📧</div>
                <div>
                  <h4 className="font-bold text-primary text-[10px] uppercase tracking-widest mb-1">Concierge Email</h4>
                  <p className="text-gray-500 text-sm italic underline">concierge@luxespark.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary p-10 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <h2 className="font-heading text-3xl text-white mb-8">Send An Inquiry</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">FullName</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border-b border-white/20 py-4 text-white focus:border-secondary outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border-b border-white/20 py-4 text-white focus:border-secondary outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Inquiry</label>
                <textarea 
                  rows="4"
                  className="w-full bg-white/5 border-b border-white/20 py-4 text-white focus:border-secondary outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <button className="btn-primary !w-full !py-6 !bg-secondary !text-primary !rounded-xl !tracking-[0.3em]">
                Secure Send
              </button>
            </form>

            {status && (
              <div className="mt-8 p-4 bg-secondary/20 border border-secondary/30 rounded-xl text-secondary text-[10px] font-bold uppercase tracking-widest animate-fade-up">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
