import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center py-16">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✕</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <div className="space-y-4">
          <Link href="/cart" className="btn-primary block">
            Try Again
          </Link>
          <Link href="/shop" className="block text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
