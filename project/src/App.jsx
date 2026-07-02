//App.jsx
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Policy from "./pages/Policies";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    // 🎨 [FIXED BACKGROUND] bg-gray-50 ko hata kar perfect light beige custom hex match kiya hai
    <div className="flex flex-col min-h-screen bg-[#FDF7EE]">

      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/policies" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
        toastClassName={() =>
          "bg-[#f6efe7] border border-[#7A0016] text-[#7A0016] rounded-xl shadow-lg"
        }
        bodyClassName={() => "text-sm font-medium"}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}