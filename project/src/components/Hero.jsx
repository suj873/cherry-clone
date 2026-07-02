import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const slideDeck = [
    {
      title: "Curated Gift Hampers",
      subtitle: "Handcrafted selections for your special occasions",
      image: "/gift4.jpeg",
      route: "/products"
    },
    {
      title: "Handmade Keepsakes",
      subtitle: "Beautiful treasures where gifting feels personal",
      image: "/gift2.jpeg",
      route: "/products"
    },
    {
      title: "Premium Luxury Boxes",
      subtitle: "Unwrap joy with customized decorations & premium ribbons",
      image: "/gift3.jpeg",
      route: "/products"
    },
    {
      title: "Custom Ribbons",
      subtitle: "Elegant ribbons designed to elevate every gift wrap",
      image: "Custom ribbon.jpg",
      route: "/products"
    },

    // NEW SLIDE 5
    {
      title: "Scrunchies & Clips",
      subtitle: "Trendy handmade accessories for everyday style",
      image: "Clips.jpg",
      route: "/products"
    }
  ];

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % slideDeck.length);
  }, [slideDeck.length]);

  // Purely automated transition running seamlessly every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [handleNext]);

  return (
    <div className="cherry-hero-stage">
      {slideDeck.map((slide, index) => (
        <div
          key={index}
          className={`cherry-hero-slide ${index === currentIdx ? "slide-active" : ""}`}
        >
          {/* Main Background Image Layer */}
          <img
            src={slide.image}
            alt={slide.title}
            className="cherry-hero-img"
          />

          {/* Text Overlays */}
          <div className="cherry-hero-caption">
            <h2 className="cherry-hero-title">{slide.title}</h2>
            <p className="cherry-hero-subtitle">{slide.subtitle}</p>
            <button
              onClick={() => navigate(slide.route)}
              className="cherry-hero-btn"
            >
              Explore Collection
            </button>
          </div>
        </div>
      ))}

      {/* Modern Luxury Visual Timing Bar Interface Layout */}
      <div className="cherry-luxury-indicators">
        {slideDeck.map((_, index) => (
          <div
            key={index}
            className={`indicator-track-line ${index === currentIdx ? "track-active" : ""}`}
            onClick={() => setCurrentIdx(index)} // Users can click the lines directly to change slides smoothly
          >
            <div className="indicator-progress-fill" />
          </div>
        ))}
      </div>
    </div>
  );
}