import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomPackaging.css";

export default function CustomPackaging() {
  const navigate = useNavigate();
  const packagingTrackRef = useRef(null);
  const [trackerStep, setTrackerStep] = useState(1);

  const packagingItems = [
    { id: 101, name: "Luxury Blossom Giftbox (With Fairy Lights)", badge: "Signature", img: "/gift1.jpeg" },
    { id: 102, name: "Premium Rigid Pastel Gift Box", badge: "Trending", img: "/gift2.jpeg" },
    { id: 103, name: "Minimalist Sweetheart Ribbon Box", badge: "New In", img: "/gift3.jpeg" },
    { id: 104, name: "Aesthetic Birthday Garland Shell", badge: "Eco Base", img: "/gift4.jpeg" },
    { id: 105, name: "Handwritten Custom Wax-Seal Note", badge: "Premium", img: "/gift5.jpeg" }
  ];

  const totalSteps = packagingItems.length;

  const handlePackagingScroll = (direction) => {
    if (packagingTrackRef.current) {
      const singleCardWidth = 315; // 285px card + 30px gap spacing rules
      const currentPos = packagingTrackRef.current.scrollLeft;

      let targetPos = direction === "forward" 
        ? currentPos + singleCardWidth 
        : currentPos - singleCardWidth;

      packagingTrackRef.current.scrollTo({
        left: targetPos,
        behavior: "smooth"
      });

      setTrackerStep((prev) => {
        if (direction === "forward") return prev < totalSteps ? prev + 1 : prev;
        return prev > 1 ? prev - 1 : prev;
      });
    }
  };

  return (
    <section className="cherry-packaging-section-lux">
      {/* Upper Unified Title Area */}
      <div className="cherry-lux-section-header">
        <div className="title-left-group">
          <span className="lux-pretitle">ELEVATE YOUR GIFTING EXPERIENCE</span>
          <h2 className="lux-main-title">Custom Packaging Base Options</h2>
        </div>
        
        {/* Luxury Dynamic Navigation Control Dock Assembly */}
        <div className="cherry-lux-control-dock">
          <div className="lux-dock-pagination">
            <span className="current-lux-digit">{trackerStep.toString().padStart(2, '0')}</span>
            <span className="lux-dock-line"></span>
            <span className="total-lux-digit">{totalSteps.toString().padStart(2, '0')}</span>
          </div>
          <div className="lux-dock-arrows-wrap">
            <button 
              className="lux-dock-nav-btn" 
              onClick={() => handlePackagingScroll("backward")}
              disabled={trackerStep === 1}
            >
              &#8592;
            </button>
            <button 
              className="lux-dock-nav-btn" 
              onClick={() => handlePackagingScroll("forward")}
              disabled={trackerStep === totalSteps}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* Main Track Slider Shell Viewport */}
      <div className="cherry-lux-slider-viewport">
        <div className="cherry-lux-track-strip" ref={packagingTrackRef}>
          {packagingItems.map((box) => (
            <div key={box.id} className="cherry-lux-card-unit">
              <div className="cherry-lux-img-frame">
                <img src={box.img} alt={box.name} />
                {box.badge && <span className="cherry-lux-badge">{box.badge}</span>}
                
                {/* Modern Interactive Slide-up Hover Drawer Overlay */}
                <div className="cherry-lux-hover-drawer">
                  <button 
                    className="cherry-lux-action-btn"
                    onClick={() => navigate('/products')}
                  >
                    Select Box Base
                  </button>
                </div>
              </div>
              
              <div className="cherry-lux-info-block">
                <h3 className="cherry-lux-name-label">{box.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Premium Section Link Footer Trigger */}
      {/* <div className="cherry-lux-footer-container">
        <button 
          className="cherry-lux-view-all-btn"
          onClick={() => navigate("/products")}
        >
          View All Packaging Elements
        </button>
      </div> */}
    </section>
  );
}