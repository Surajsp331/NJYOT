"use client";

import { useState } from "react";
import Link from "next/link";

const faqData = [
  {
    question: "What defines NJYOT's artisan materials?",
    answer: "Our collections are curated from hypoallergenic, nickel-free surgical-grade alloys. Each piece is meticulously finished with high-micron plating of 18k gold, rose gold, or genuine rhodium, ensuring both enduring brilliance and absolute comfort for the most sensitive skin."
  },
  {
    question: "What is the timeline for boutique delivery?",
    answer: "Excellence shouldn't wait. We dispatch your selections within 24-48 business hours. Standard boutique delivery arrives in 3-5 days, while our Express Air service offers overnight or second-day delivery across most major metropolitan areas."
  },
  {
    question: "How should I care for my NJYOT pieces?",
    answer: "To preserve your jewelry's radiant finish, avoid direct contact with fragrances, sea water, and harsh chemicals. We recommend a gentle wipe with our artisan polishing cloth after each wear, followed by storage in the provided anti-tarnish NJYOT vault."
  },
  {
    question: "Can I return a selection if it doesn't resonate?",
    answer: "Your satisfaction is paramount. We offer a 14-day discovery period for all boutique purchases. Items must be returned in their original, pristine condition within the NJYOT presentation suite. Please contact our Concierge for complimentary return logistics."
  },
  {
    question: "Is every piece truly nickel-free?",
    answer: "Yes, without exception. We enforce a zero-nickel laboratory standard across our entire manufacturing suite to ensure the NJYOT experience is safe, comfortable, and inclusive for all skin types."
  },
  {
    question: "Do you offer private consultations or bulk curation?",
    answer: "For bridal suites, editorial styling, or corporate gifting, our lead curators are available for private consultation. We offer specialized pricing and curation services for orders exceeding 20 pieces. Kindly reach out to our concierge at curate@njyot.com."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-offwhite pb-32">
      {/* Hero Section */}
      <div className="bg-charcoal text-white py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block animate-fade-up">Concierge Care</span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 italic">Clarifying Elegance</h1>
          <div className="w-16 h-0.5 bg-secondary/50 mx-auto"></div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 rounded-[2.5rem] overflow-hidden border ${openIndex === index
                  ? 'bg-white shadow-2xl border-gray-100 scale-[1.02]'
                  : 'bg-white/50 backdrop-blur-sm border-gray-100/50 hover:bg-white/80'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-10 py-8 text-left flex justify-between items-center group-hover:px-12 transition-all duration-300"
              >
                <span className={`font-heading text-xl md:text-2xl font-bold transition-colors ${openIndex === index ? 'text-charcoal' : 'text-gray-400 group-hover:text-charcoal'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${openIndex === index
                    ? 'bg-charcoal border-charcoal text-secondary rotate-180 shadow-lg'
                    : 'bg-transparent border-gray-200 text-gray-300'
                  }`}>
                  <span className="text-xl leading-none">↓</span>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
              >
                <div className="px-10 pb-10 md:px-12 text-gray-500 leading-relaxed text-lg border-t border-gray-50 pt-8">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Tier */}
        <div className="mt-24 bg-charcoal rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/2"></div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.5em] mb-6 block">Personal Concierge</span>
          <h3 className="font-heading text-4xl font-bold text-white mb-6">
            Still seeking assistance?
          </h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-12 leading-relaxed">
            Our specialists are available to handle bespoke inquiries, sizing consults, and order coordination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:concierge@njyot.com"
              className="btn-primary px-12 py-5"
            >
              Direct Message
            </a>
            <Link href="/shop" className="px-12 py-5 rounded-full border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
