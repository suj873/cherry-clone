import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotal, clearCart } from "../../services/cart";
// 1. Toastify Imports
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPI_ID = import.meta.env.VITE_UPI_ID;

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    transactionId: "",
  });

  const [screenshot, setScreenshot] = useState(null);

  // 🔗 ATTACHMENT LOGIC: ProductCard se add kiya hua data yahan connect hota hai
  useEffect(() => {
    const cartItems = getCart();

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    setCart(cartItems);
    setTotal(getCartTotal());
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadScreenshot = async () => {
    const data = new FormData();
    data.append("file", screenshot);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handlePayment = () => {
    const upiLink =
      `upi://pay?pa=${UPI_ID}` +
      `&pn=Gift Store` +
      `&am=${total}` +
      `&cu=INR`;

    window.location.href = upiLink;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.transactionId ||
      !screenshot
    ) {
      // 2. Alert badla warning toast me
      toast.warn("Please fill all fields & upload screenshot");
      return;
    }

    // Process shuru hone par user ko load state batane ke liye loading toast
    const loadingToast = toast.loading("Processing your order... Please wait.");

    try {
      const screenshotUrl = await uploadScreenshot();
      const orderId = `ORD${Date.now()}`;

      const orderData = {
        type: "order",
        orderId,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        products: cart
          .map((item) => `${item.name} x ${item.quantity}`)
          .join(", "),
        total,
        transactionId: formData.transactionId,
        paymentScreenshot: screenshotUrl,
        orderDate: new Date().toLocaleString(),
        status: "Pending",
      };

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(orderData),
      });

      clearCart();
      
      // 3. Loading toast ko success toast me badla aur alert hataya
      toast.update(loadingToast, {
        render: `Order Placed Successfully! ID: ${orderId}`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Thoda sa delay diya taaki user success message dekh sake fir navigate ho
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      // 4. Loading toast ko error toast me badla
      toast.update(loadingToast, {
        render: "Order Failed! Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    // Responsive Wrapper: padding adjusts on mobile vs desktop
    <div className="min-h-screen bg-[#FDF7EE] py-6 sm:py-10 px-4 md:px-8 font-sans transition-all">
      
      {/* 5. ToastContainer Component ko layout me add kiya */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* 📱 Mobile/Tablet: Single Column (Stacked) | 💻 Laptop/Desktop: 2 Columns Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ==================== CARD 1: ORDER SUMMARY (Left Column) ==================== */}
        <div className="lg:col-span-5 bg-[#fffaf6] border border-[#f3e1c7] rounded-3xl shadow-sm p-5 sm:p-8 relative">

          <div className="flex justify-between items-center mb-6 border-b border-[#f6efe7] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍒</span>
              <h2 className="font-serif text-md sm:text-lg tracking-wider font-bold text-[#7A0016] uppercase">
                Order Summary
              </h2>
            </div>
            <div className="text-amber-300 text-lg">✦ ✦</div>
          </div>

          {/* Dynamic Products Loop Grid */}
          <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-[#3b3b3b] font-medium text-sm gap-2">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Item Image Box Container */}
                  <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-[#fdf5eb] border border-[#f3e1c7] rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={item.img || item.image || "/cherry_logo.png"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "/cherry_logo.png" }}
                    />
                  </div>
                  <span className="truncate text-sm sm:text-base">
                    {item.name} <span className="text-gray-400 font-light mx-1 text-xs">x</span> {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-gray-800 shrink-0">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-md font-bold text-[#7A0016] pt-4 border-t border-[#f6efe7] mb-6">
            <span className="font-serif tracking-wide uppercase">Total</span>
            <span className="text-lg sm:text-xl">₹{total}</span>
          </div>

          <div className="w-full flex items-center justify-center gap-3 my-4 opacity-50">
            <span className="h-[1px] w-12 bg-gray-300"></span>
            <span className="text-[10px] tracking-[2px] text-gray-500 font-semibold uppercase whitespace-nowrap">Pay Securely With</span>
            <span className="h-[1px] w-12 bg-gray-300"></span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-[#7A0016] text-white py-3.5 rounded-xl font-semibold hover:bg-[#610112] transition-all flex items-center justify-center shadow-md outline-none cursor-pointer"
          >
            <img
              src="upi_logo.webp" 
              alt="Google Pay"
              className="h-8 w-auto object-contain"
            />
          </button>
        </div>


        {/* ==================== CARD 2: DELIVERY DETAILS (Right Column) ==================== */}
        <div className="lg:col-span-7 bg-[#fffaf6] border border-[#f3e1c7] rounded-3xl shadow-sm p-5 sm:p-8">

          <div className="flex justify-between items-center mb-6 border-b border-[#f6efe7] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍒</span>
              <h2 className="font-serif text-md sm:text-lg tracking-wider font-bold text-[#7A0016] uppercase">
                Delivery Details
              </h2>
            </div>
            <div className="text-amber-300 text-lg">✦ ✦</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="relative flex items-center w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#7A0016] focus-within:border-[#7A0016] transition-all">
              <span className="pl-4 pr-2 text-gray-400">👤</span>
              <input
                type="text"
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full bg-transparent p-3.5 text-sm text-gray-700 outline-none placeholder-gray-400 font-light"
                required
              />
            </div>

            {/* Email */}
            <div className="relative flex items-center w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#7A0016] focus-within:border-[#7A0016] transition-all">
              <span className="pl-4 pr-2 text-gray-400">✉️</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent p-3.5 text-sm text-gray-700 outline-none placeholder-gray-400 font-light"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative flex items-center w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#7A0016] focus-within:border-[#7A0016] transition-all">
              <span className="pl-4 pr-2 text-gray-400">📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent p-3.5 text-sm text-gray-700 outline-none placeholder-gray-400 font-light"
                required
              />
            </div>

            {/* Address */}
            <div className="relative flex items-start w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#7A0016] focus-within:border-[#7A0016] transition-all">
              <span className="pl-4 pt-4 pr-2 text-gray-400">📍</span>
              <textarea
                name="address"
                placeholder="Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-transparent p-3.5 text-sm text-gray-700 outline-none placeholder-gray-400 font-light resize-none"
                required
              />
            </div>

            {/* Transaction ID */}
            <div className="relative flex items-center w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#7A0016] focus-within:border-[#7A0016] transition-all">
              <span className="pl-4 pr-2 text-gray-400">📄</span>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID / UTR Number"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full bg-transparent p-3.5 text-sm text-gray-700 outline-none placeholder-gray-400 font-light"
                required
              />
            </div>

            {/* Image Screenshot Upload Mask Row */}
            <div className="relative flex items-center w-full border border-[#e0d3c1] bg-[#fffbf7] rounded-xl overflow-hidden">
              <span className="pl-4 pr-2 text-gray-400">📎</span>
              <label className="bg-[#7A0016] text-white px-3 sm:px-4 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-lg my-1.5 ml-2 cursor-pointer hover:bg-[#610112] transition-colors whitespace-nowrap">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  className="hidden"
                  required
                />
              </label>
              <span className="text-xs text-gray-400 ml-3 truncate pr-4">
                {screenshot ? screenshot.name : "Add Payment Screenshot (UPI)"}
              </span>
            </div>

            {/* Submission Trigger */}
            <button
              type="submit"
              className="w-full bg-[#7A0016] text-white py-4 mt-4 rounded-xl text-sm font-semibold tracking-[2px] uppercase shadow-md hover:bg-[#610112] transition-all flex items-center justify-center gap-2 cursor-pointer outline-none"
            >
              <span>🛍️</span> PLACE ORDER
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}