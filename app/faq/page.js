"use client";

import { useState } from "react";

// FAQ data - client component so these are defined inline
const faqData = [
  {
    question: "What materials do you use?",
    answer: "We use hypoallergenic, nickel-free metals with 18k gold, rose gold, or rhodium plating. All our pieces are designed to be comfortable for sensitive skin."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders ship within 1-2 business days. Standard delivery takes 2-5 days depending on your location. Express shipping options are available at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on unused items in original packaging. Buyer pays return shipping unless the item is defective."
  },
  {
    question: "How do I care for my jewellery?",
    answer: "Avoid water, perfume, and rough handling. Wipe with a soft cloth after each use and store in the provided pouch or box."
  },
  {
    question: "Is your jewellery nickel-free?",
    answer: "Yes! All our jewellery is nickel-free and hypoallergenic. It is safe for people with sensitive skin."
  },
  {
    question: "Do you offer wholesale pricing?",
    answer: "Yes, we offer wholesale pricing for bulk orders. Please contact us at wholesale@njyot.com for more information."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive an email with tracking information. You can also track your order through your account on our website."
  },
  {
    question: "What if my jewellery tarnishes?",
    answer: "With proper care, our jewellery is designed to last. However, if tarnish occurs due to manufacturing defects, please contact us for a replacement."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about NJYOT jewellery
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-charcoal">{faq.question}</span>
                <span className="text-primary text-2xl ml-4">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-charcoal mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help.
          </p>
          <a
            href="mailto:hello@njyot.com"
            className="btn-primary inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
