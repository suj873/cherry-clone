import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/cart";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const isSoldOut = Number(product.stock) === 0 || product.stock === "0";

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    if (isSoldOut) return;

    addToCart(product);

    toast.success(`${product.name} added to cart`, {
      icon: "🛍️",
      style: {
        background: "transparent",
        color: "#1c1c1c",
        border: "1px solid #e8e8e8",
        borderRadius: "4px",
        fontSize: "13px",
      },
      progressStyle: { background: "#1c1c1c" },
    });
  };

  return (
    <div className="w-full flex flex-col justify-between bg-transparent box-border group">
      
      {/* Aspect Ratio 1:1 Block to secure image size */}
      <div 
        className="w-full aspect-square overflow-hidden bg-[#fafafa] relative cursor-pointer border border-[#f5f5f5]"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-102"
        />

        {isSoldOut && (
          <span className="absolute bottom-2 right-2 bg-[#f4a7b9] text-white text-[10px] px-2.5 py-0.5 rounded-full">
            Sold out
          </span>
        )}
      </div>

      {/* Meta Content Details (No gaps, absolute tight sizing) */}
      <div className="pt-2 flex flex-col flex-grow justify-between">
        <div>
          <h3
            className="text-[13px] font-light text-[#1c1c1cb3] m-0 line-clamp-2 h-[34px] leading-tight cursor-pointer hover:text-black hover:underline underline-offset-4"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.name}
          </h3>

          <p className="text-[13px] font-normal text-[#1c1c1c] mt-1 m-0">
            ₹{Number(product.price)}
          </p>
        </div>

        {/* Action Button Container */}
        <div className="mt-2">
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`w-full h-[34px] text-[11px] font-light tracking-wide rounded-full border transition-all duration-200 outline-none ${
              isSoldOut 
                ? "border-[#e8e8e8] text-[#1c1c1c4d] bg-white cursor-not-allowed" 
                : "border-[#1c1c1c] text-[#1c1c1c] bg-white hover:bg-[#1c1c1c] hover:text-white"
            }`}
          >
            {isSoldOut ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>

    </div>
  );
}