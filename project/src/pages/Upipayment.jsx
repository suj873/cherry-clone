// Upipayment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UPIPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const UPI_ID = import.meta.env.VITE_UPI_ID || "cherryside@upi";

  // ✅ Total ab route state se aayega (Checkout se navigate() ke through bheja gaya)
  const finalAmount = location.state?.total || 0;

  // Agar koi direct is page pe aa jaye (refresh / direct URL) to total 0 hoga -> checkout bhej do
  useEffect(() => {
    if (!finalAmount || finalAmount <= 0) {
      navigate("/checkout");
    }
  }, [finalAmount, navigate]);

  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isPaymentInitiated) {
        navigate("/checkout");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPaymentInitiated, navigate]);

  const handleAppPayment = (appType) => {
    const baseLink = `upi://pay?pa=${UPI_ID}&pn=Cherry%20Side%20Gifting&am=${finalAmount}&cu=INR`;
    let deepLink = baseLink;

    switch (appType) {
      // ✅ GPay ka correct scheme: gpay://upi/pay?... (upi:// ke baad extra /upi/ segment)
      case "gpay": deepLink = baseLink.replace("upi://", "gpay://upi/"); break;
      case "phonepe": deepLink = baseLink.replace("upi://", "phonepe://"); break;
      case "paytm": deepLink = baseLink.replace("upi://", "paytmmp://"); break;
      default: deepLink = baseLink; break;
    }

    setIsPaymentInitiated(true);
    window.location.href = deepLink;
  };

  return (
    <div className="min-h-screen bg-[#FDF7EE] py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-[#fffaf6] border border-[#f3e1c7] p-6 sm:p-8 rounded-3xl shadow-sm text-center">

        {!isPaymentInitiated ? (
          <>
            <span className="text-4xl">🍒</span>
            <h2 className="font-serif text-2xl font-bold text-[#7A0016] mt-3 mb-1">
              Select Payment App
            </h2>
            <p className="text-xs text-gray-400 font-light mb-6">
              Pay ₹{finalAmount.toFixed(2)} and take a screenshot of the success screen.
            </p>

            <div className="bg-[#7A0016] text-[#FDF7EE] p-4 rounded-2xl mb-6 flex justify-between items-center px-6">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-[#f5efe5] opacity-80">Total Payable</p>
              </div>
              <div className="text-2xl font-serif font-bold">₹{finalAmount.toFixed(2)}</div>
            </div>

            <div className="space-y-3">
              {[
                { id: "gpay", label: "Google Pay", logo: "gpay_logo.webp" },
                { id: "phonepe", label: "PhonePe", logo: "phonepe_logo.webp" },
                { id: "paytm", label: "Paytm", logo: "paytm_logo.webp" },
                { id: "generic", label: "Any Other UPI App", logo: "upi_logo.webp" }
              ].map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppPayment(app.id)}
                  className="w-full bg-[#fffbf7] border border-[#e0d3c1] text-[#7A0016] py-3 px-5 rounded-xl font-medium hover:bg-[#7A0016] hover:text-white hover:border-[#7A0016] transition-all flex items-center justify-between shadow-sm outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={app.logo}
                      alt={app.label}
                      className="h-6 w-12 object-contain filter group-hover:brightness-0 group-hover:invert transition-all"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-sm font-semibold tracking-wide">{app.label}</span>
                  </div>
                  <span className="text-xs opacity-60 group-hover:translate-x-1 transition-transform">➔</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="py-10 space-y-4">
            <div className="w-12 h-12 border-4 border-[#7A0016] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="font-serif text-xl font-bold text-[#7A0016]">Opening Payment App...</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Complete the payment in the app and take a screenshot. Once you return to the browser, this page will automatically redirect to checkout.
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="text-xs text-[#7A0016] underline font-medium mt-4 cursor-pointer block mx-auto"
            >
              Click here if not redirected automatically
            </button>
          </div>
        )}

        <p className="text-[11px] text-gray-400 font-light mt-6 leading-relaxed">
          🔒 Secure Checkout. Your order process is safe with Cherry Side.
        </p>
      </div>
    </div>
  );
}
