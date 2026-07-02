import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../services/googleSheets";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data || []);
      setFilteredProducts(data || []);
    };
    load();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    if (categoryParam) {
      tempProducts = tempProducts.filter(
        (p) => p.category?.toLowerCase().replace(/\s+/g, "-") === categoryParam.toLowerCase()
      );
    }

    if (availability) {
      if (availability === "instock") {
        tempProducts = tempProducts.filter((p) => Number(p.stock) > 0);
      } else if (availability === "lowstock") {
        tempProducts = tempProducts.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= 5);
      } else if (availability === "outofstock") {
        tempProducts = tempProducts.filter((p) => Number(p.stock) === 0 || !p.stock);
      }
    }

    if (priceRange) {
      if (priceRange === "5000+") {
        tempProducts = tempProducts.filter((p) => Number(p.price) >= 5000);
      } else {
        const [min, max] = priceRange.split("-").map(Number);
        tempProducts = tempProducts.filter((p) => Number(p.price) >= min && Number(p.price) <= max);
      }
    }

    setFilteredProducts(tempProducts);
  }, [products, categoryParam, availability, priceRange]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent', fontFamily: 'sans-serif', color: '#1c1c1c', paddingBottom: '80px' }}>
      
      {/* 🛠️ Dynamic Global Style Injector (Fixes layout overlapping and forces professional layout grids) */}
      <style>{`
        .cherry-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px 24px;
          width: 100%;
          box-sizing: border-box;
        }
        .cherry-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          padding: 12px 0;
          font-family: sans-serif;
        }
        .cherry-select-filter {
          border: none !important;
          background-color: transparent !important;
          font-size: 13px !important;
          color: #1c1c1c !important;
          cursor: pointer !important;
          outline: none !important;
          padding: 2px 24px 2px 4px !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          font-weight: 300 !important;
        }
        .cherry-filter-dropdown-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .cherry-filter-dropdown-wrapper::after {
          content: '▼';
          font-size: 7px;
          position: absolute;
          right: 6px;
          pointer-events: none;
          opacity: 0.5;
        }
        .cherry-product-count {
          font-size: 13px;
          color: rgba(28, 28, 28, 0.6);
          font-weight: 300;
        }
        
        /* Tablet Breakpoint Rules */
        @media (max-width: 1024px) {
          .cherry-grid-container { 
            grid-template-columns: repeat(3, 1fr); 
            gap: 32px 16px;
          }
        }

        /* Mobile Breakpoint Rules (Perfect 2 Column Alignment) */
        @media (max-width: 768px) {
          .cherry-grid-container { 
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 24px 12px !important;
          }
          .cherry-product-count {
            display: none; /* Mobile screen standard layout protection */
          }
          .cherry-filter-bar {
            padding: 10px 0;
          }
        }
      `}</style>

      {/* 1. Header Title Container */}
      <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '300', letterSpacing: '1px', margin: 0, textTransform: 'capitalize', color: '#1c1c1c' }}>
          {categoryParam ? categoryParam.replace("-", " ") : "Products"}
        </h1>
      </div>

      {/* 2. Premium Filter Bar */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px', marginBottom: '30px', boxSizing: 'border-box' }}>
        <div className="cherry-filter-bar">
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(28,28,28,0.5)', fontWeight: '300' }}>Filter:</span>
             */}
            {/* Availability Option Trigger */}
            {/* <div className="cherry-filter-dropdown-wrapper">
              <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="cherry-select-filter">
                <option value="">Availability</option>
                <option value="instock">In Stock</option>
                <option value="lowstock">Low Stock (≤ 5)</option>
                <option value="outofstock">Out of Stock</option>
              </select>
            </div> */}

            {/* Price Option Trigger */}
            {/* <div className="cherry-filter-dropdown-wrapper">
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="cherry-select-filter">
                <option value="">Price</option>
                <option value="0-499">₹0 - ₹499</option>
                <option value="500-999">₹500 - ₹999</option>
                <option value="1000-1999">₹1000 - ₹1999</option>
                <option value="2000-4999">₹2000 - ₹4999</option>
                <option value="5000+">₹5000+</option>
              </select>
            </div>
          </div> */}

          {/* Dynamic Product Counter display */}
          <div className="cherry-product-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </div>

      {/* 3. Product Display Area */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        {filteredProducts.length > 0 ? (
          <div className="cherry-grid-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(28,28,28,0.5)', fontSize: '14px', fontWeight: '300' }}>
            No products found matching the selected filters.
          </div>
        )}
      </div>

    </div>
  );
}
