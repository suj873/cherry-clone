export default function Policies() {
  return (
    <section className="bg-transparent min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#7a0016] tracking-[3px] text-sm font-semibold">
            OUR POLICIES
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold text-[#3a0a0a] mt-4">
            Simple, Transparent & Trustworthy
          </h1>

          <p className="text-[#5a3a3a] mt-4">
            We believe in clarity and honesty so your gifting experience stays stress-free.
          </p>

          <div className="mt-6 inline-block bg-white px-5 py-3 rounded-md shadow-sm text-[#7a0016] font-medium">
            🚚 Free Shipping on Orders Above ₹999
          </div>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">

          {/* Shipping */}
          <div className="bg-white p-7 border-l-4 border-[#7a0016] shadow-sm rounded-md">
            <h2 className="text-2xl font-semibold text-[#7a0016] mb-4">
              Shipping & Delivery Policy
            </h2>

            <p className="text-[#5a3a3a] leading-relaxed">
              At Cherry Side, we carefully prepare every gift hamper and personalized creation
              with love and attention to detail.
            </p>

            <ul className="mt-4 space-y-2 text-[#5a3a3a]">
              <li>
                <strong>Delivery Timeline:</strong> Orders are typically delivered within
                7–10 business days depending on your location.
              </li>

              <li>
                <strong>Shipping Charges:</strong> A flat shipping fee of ₹70 applies
                to orders below ₹999.
              </li>

              <li>
                <strong>Order Tracking:</strong> Once dispatched, tracking details will
                be shared on your WhatsApp number.
              </li>

              <li>
                <strong>Note:</strong> Delays may occur due to weather conditions,
                courier delays, public holidays, or other unforeseen circumstances.
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-white p-7 border-l-4 border-[#7a0016] shadow-sm rounded-md">
            <h2 className="text-2xl font-semibold text-[#7a0016] mb-4">
              Privacy Policy
            </h2>

            <p className="text-[#5a3a3a] leading-relaxed">
              At Cherry Side, your privacy is important to us.
              We may collect details such as your name, email address,
              phone number, shipping address, and order information
              solely for order processing and customer support.
            </p>

            <p className="text-[#5a3a3a] leading-relaxed mt-3">
              Your information is never sold or shared with third parties
              except where necessary for payment processing, shipping,
              or order fulfillment.
            </p>
          </div>

          {/* Refund */}
          <div className="bg-white p-7 border-l-4 border-[#7a0016] shadow-sm rounded-md">
            <h2 className="text-2xl font-semibold text-[#7a0016] mb-4">
              No Refund & No Exchange Policy
            </h2>

            <p className="text-[#5a3a3a] leading-relaxed">
              All purchases made on Cherry Side are final.
            </p>

            <div className="mt-4 bg-[#fff5f5] border border-[#7a0016] rounded-md p-4">
              <p className="font-semibold text-[#7a0016]">
                ❌ No Refunds
              </p>

              <p className="font-semibold text-[#7a0016] mt-2">
                ❌ No Exchanges
              </p>
            </div>

            <p className="mt-4 text-[#5a3a3a] leading-relaxed">
              We do not offer refunds or exchanges once an order has
              been placed and processed.
            </p>

            <p className="mt-4 text-[#5a3a3a] leading-relaxed">
              In case you receive a damaged product, an unboxing video
              is mandatory for verification.
            </p>

            <ul className="mt-4 space-y-2 text-[#5a3a3a]">
              <li>Video must start before opening the package.</li>
              <li>Package seal must be clearly visible.</li>
              <li>No cuts, edits, pauses, or filters allowed.</li>
              <li>Damaged product must be clearly shown.</li>
            </ul>

            <p className="mt-4 text-[#5a3a3a]">
              Without a complete unboxing video, damage claims cannot be accepted.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[#5a3a3a]">
          <p>
            Need help? Feel free to contact us — we're always happy to assist 💌
          </p>
        </div>

      </div>
    </section>
  );
}