import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const giftCategories = [
    "Curated Hampers",
    "Handmade Keepsakes",
    "Premium Gift Boxes",
    "Custom Ribbons",
    "Scrunchies & Clips"
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    // 🎨 [FIXED BACKGROUND COLOR] Hataaya puraana color aur apply kiya exact soft aesthetic beige `#F9EAD2`
    <header className="w-full bg-[#FDF7EE] border-b border-[#f3e1c7] sticky top-0 z-[9999] font-sans">
      
      {/* 1. Global Store Ribbon Alert */}
      <div className="w-full bg-[#7A0016] text-[#fffaf6] text-[11px] font-medium py-[11px] text-center tracking-[2px] uppercase">
        Where gifting feels personal 🍒 Ships Across India
      </div>

      {/* 2. Main Navigation Shell - Left, Center, Right balanced to extreme corners */}
      <div className="w-full px-6 lg:px-12 h-[90px] flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0" 
          onClick={() => handleNavigation("/")}
        >
          <div className="w-[45px] h-[45px] overflow-hidden flex items-center justify-center">
            <img 
              src="/cherry_logo.png" 
              alt="Cherry Side" 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="font-serif text-[22px] font-bold tracking-[1.5px] text-[#7A0016] m-0 whitespace-nowrap">
            CHERRY SIDE
          </h1>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <button 
            className="bg-none border-none text-[13px] font-semibold uppercase tracking-[1px] text-[#4a4a4a] hover:text-[#7A0016] transition-colors cursor-pointer outline-none"
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>

          {/* Gifts Dropdown */}
          <div className="relative flex items-center h-full group">
            <div className="bg-none border-none text-[13px] font-semibold uppercase tracking-[1px] text-[#4a4a4a] flex items-center cursor-pointer outline-none">
              <span>Gifts & Hampers</span>
              <span className="text-[8px] ml-1.5 transition-transform group-hover:rotate-180">▼</span>
            </div>
            
            {/* Hover Dropdown Menu */}
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 bg-white min-w-[220px] shadow-lg rounded-md py-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-[10000]">
              {giftCategories.map((category, index) => (
                <button
                  key={index}
                  className="block w-full bg-none border-none text-left px-5 py-2.5 text-[13px] text-[#555555] hover:bg-[#F9EAD2] hover:text-[#7A0016] transition-colors cursor-pointer"
                  onClick={() => handleNavigation(`/products?category=${category.toLowerCase().replace(" ", "-")}`)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="bg-none border-none text-[13px] font-semibold uppercase tracking-[1px] text-[#4a4a4a] hover:text-[#7A0016] transition-colors cursor-pointer outline-none"
            onClick={() => handleNavigation("/products")}
          >
            All Products
          </button>
          <button 
            className="bg-none border-none text-[13px] font-semibold uppercase tracking-[1px] text-[#4a4a4a] hover:text-[#7A0016] transition-colors cursor-pointer outline-none"
            onClick={() => handleNavigation("/about")}
          >
            Our Story
          </button>
          <button 
            className="bg-none border-none text-[13px] font-semibold uppercase tracking-[1px] text-[#4a4a4a] hover:text-[#7A0016] transition-colors cursor-pointer outline-none"
            onClick={() => handleNavigation("/policies")}
          >
            Policies
          </button>
        </nav>

        {/* Right Side Options Panel - [FIXED LOCATION] Forced to the right-most corners */}
        <div className="flex items-center gap-5 shrink-0">
          <button 
            className="bg-none border-none cursor-pointer text-[#3b3b3b] hover:text-[#7A0016] flex items-center justify-center outline-none transition-colors"
            onClick={() => handleNavigation("/contact")} 
            aria-label="Admin"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-[24px] h-[24px]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          <button 
            className="bg-none border-none cursor-pointer text-[#3b3b3b] hover:text-[#7A0016] relative flex items-center justify-center outline-none transition-colors"
            onClick={() => handleNavigation("/cart")} 
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-[24px] h-[24px]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>

          {/* Mobile Hamburger Menu Icon */}
          <button 
            className="flex flex-col justify-between w-[22px] h-[16px] bg-transparent border-none cursor-pointer p-0 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`w-full h-[2px] bg-[#3b3b3b] transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`w-full h-[2px] bg-[#3b3b3b] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[2px] bg-[#3b3b3b] transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* 3. Mobile Drawer Overlay */}
      {isOpen && (
        <div className="absolute top-[135px] left-0 w-full bg-[#F9EAD2] border-b-2 border-[#f3e1c7] shadow-lg z-[999] p-5">
          <div className="flex flex-col gap-4">
            <button className="bg-none border-none text-[14px] font-bold uppercase text-[#4a4a4a] text-left w-full outline-none" onClick={() => handleNavigation("/")}>Home</button>
            
            <div className="border-l-2 border-[#f3e1c7] pl-3">
              <span className="block text-[12px] font-bold text-[#7A0016] uppercase mb-2">Gifts & Hampers</span>
              {giftCategories.map((category, index) => (
                <button
                  key={index}
                  className="block w-full py-1.5 text-[13px] text-[#555555] bg-none border-none text-left"
                  onClick={() => handleNavigation(`/products?category=${category.toLowerCase().replace(" ", "-")}`)}
                >
                  {category}
                </button>
              ))}
            </div>

            <button className="bg-none border-none text-[14px] font-bold uppercase text-[#4a4a4a] text-left w-full outline-none" onClick={() => handleNavigation("/products")}>All Products</button>
            <button className="bg-none border-none text-[14px] font-bold uppercase text-[#4a4a4a] text-left w-full outline-none" onClick={() => handleNavigation("/about")}>Our Story</button>
            <button className="bg-none border-none text-[14px] font-bold uppercase text-[#4a4a4a] text-left w-full outline-none" onClick={() => handleNavigation("/policies")}>Policies</button>
          </div>
        </div>
      )}
    </header>
  );
}