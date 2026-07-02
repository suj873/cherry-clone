//productdetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/googleSheets";
import { addToCart } from "../../services/cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      console.log(data);
      console.log(id);
      const found = data.find(
        (p) => String(p.id).trim() === String(id).trim()
      );
      setProduct(found);
      console.log("Found Product:", found);
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>


      <div className="min-h-screen bg-white-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />

          <div className="bg-white rounded-xl border border-[#f3e1c7] shadow-sm p-8 font-sans">
            {/* Product Name - Serif Font like CHERRY SIDE */}
            <h1 className="text-3xl font-serif font-bold text-[#7A0016] tracking-[0.5px]">
              {product.name}
            </h1>

            {/* Product Description - Clean Neutral Text */}
            <p className="text-[#555555] mt-4 leading-relaxed text-[14px]">
              {product.description}
            </p>

            {/* Product Price - Bold Burgundy Accent */}
            <p className="text-3xl font-serif font-bold mt-6 text-[#7A0016]">
              ₹{product.price}
            </p>

            {/* CTA Button - Maroon Background with Cream/Gold Hover Accent */}
            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full md:w-auto bg-[#7A0016] text-[#fffaf6] px-10 py-3.5 rounded-md hover:bg-[#F9EAD2] hover:text-[#7A0016] hover:border-[#7A0016] border border-transparent transition-all duration-200 text-[13px] font-semibold uppercase tracking-[1.5px] outline-none cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>


    </>
  );
}