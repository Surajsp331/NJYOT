export const metadata = {
  title: "About Us | NJYOT",
  description: "Learn about NJYOT - our story, materials, and commitment to sustainable fashion jewellery.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Crafting beautiful jewellery that makes you feel incredible
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Welcome to NJYOT</h2>
            <p className="text-gray-600 mb-4">
              We design statement jewellery for people who want impact without the weight of high cost. Every piece is thoughtfully crafted, ethically plated, and tested for long-lasting shine. Our promise: beautiful, comfortable, and conscientious.
            </p>
            <p className="text-gray-600">
              NJYOT was born from a simple belief: everyone deserves to feel like royalty without breaking the bank. We combine fashion-forward designs with quality materials to create jewellery that you will love wearing every day.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Our Materials</h2>
            <p className="text-gray-600 mb-4">
              We use only the finest materials to ensure your jewellery looks beautiful for years to come:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>✓ <strong>Hypoallergenic metals</strong> - Safe for sensitive skin</li>
              <li>✓ <strong>Nickel-free plating</strong> - No irritation, just style</li>
              <li>✓ <strong>Quality alloys</strong> - Durable and tarnish-resistant</li>
              <li>✓ <strong>Premium finishes</strong> - 18k gold, rose gold, and rhodium options</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Sustainability Commitment</h2>
            <p className="text-gray-600 mb-4">
              We care about our planet as much as we care about your style. That is why we are committed to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>✓ <strong>Eco-friendly packaging</strong> - Recycled and recyclable materials</li>
              <li>✓ <strong>Ethical manufacturing</strong> - Fair wages and safe working conditions</li>
              <li>✓ <strong>Minimal waste</strong> - Thoughtful production processes</li>
              <li>✓ <strong>Quality over quantity</strong> - Pieces designed to last</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Our Promise to You</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-600 mb-4">
                Every NJYOT piece comes with our promise of quality. If you are not completely satisfied with your purchase, we offer a 30-day return policy. We want you to love your jewellery as much as we love creating it.
              </p>
              <p className="text-gray-600">
                Thank you for being part of the NJYOT family. Here is to beautiful jewellery and even better moments.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Team/CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Join the NJYOT Family</h2>
          <p className="text-gray-600 mb-8">
            Follow us on social media for the latest designs, styling tips, and exclusive offers.
          </p>
          <a href="/shop" className="btn-primary">
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  );
}
