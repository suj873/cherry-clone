import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Welcome to the elite circle of Cherry Side Atelier.");
  };

  return (
    <footer className="cherry-editorial-footer">
      <div className="footer-luxury-container">
        
        {/* Main Split Screen Panel */}
        <div className="footer-split-workspace">
          
          {/* Left Column: Bold Asymmetric Branding Statement */}
          <div className="footer-left-editorial-pane">
            <div className="editorial-logo-mark">
              <span className="editorial-super-title">CHERRY SIDE</span>
              <span className="editorial-mini-badge">ATELIER // EST. 2026</span>
            </div>
            <h3 className="editorial-statement-headline">
              Crafting keepsakes that match your exact lifestyle statement & pocket.
            </h3>
            <p className="editorial-narrative-subtext">
              We completely abandoned massive, uninspiring gift production lines. Every single container, ribbon tie, 
              and delicate accessory is carefully cataloged to safely hold your most personal memories.
            </p>
          </div>

          {/* Right Column: Interactive Menu Maps & Premium Newsletter Line */}
          <div className="footer-right-navigation-pane">
            
            <div className="footer-interactive-link-columns-grid">
              <div className="editorial-links-stack">
                <span className="stack-group-label">The Showcase</span>
                <span className="interactive-editorial-link" onClick={() => navigate("/products")}>Gift Collections</span>
                <span className="interactive-editorial-link" onClick={() => navigate("/products")}>Packaging Studio</span>
                <span className="interactive-editorial-link" onClick={() => navigate("/products")}>Curated Hampers</span>
              </div>

              <div className="editorial-links-stack">
                <span className="stack-group-label">Atelier Care</span>
                <span className="interactive-editorial-link" onClick={() => navigate("/contact")}>Contact Desk</span>
                <span className="interactive-editorial-link" onClick={() => navigate("/policies")}>Privacy Policy</span>
                {/* <span className="interactive-editorial-link" onClick={() => navigate("/terms")}>Terms of Service</span> */}
              </div>
            </div>

            {/* Premium Sophisticated Subscription Console */}
            {/* <div className="editorial-newsletter-wrap">
              <h4 className="newsletter-editorial-title">Join the Inner Journal</h4>
              <p className="newsletter-editorial-desc">Unlock seasonal lookbooks, priority box drops, and bespoke gifting aesthetics.</p>
              
              {/* <form onSubmit={handleSubscribe} className="editorial-newsletter-form-line">
                <input 
                  type="email" 
                  placeholder="Enter your email address to subscribe..." 
                  required 
                  className="editorial-form-input-field"
                />
                <button type="submit" className="editorial-form-submit-arrow-btn">
                  Join Atelier &rarr;
                </button>
              </form> */}
            {/* </div> */} 

          </div>

        </div>

        {/* Dynamic Architectural Base Floor */}
        <div className="footer-base-architectural-floor">
          <div className="floor-structural-divider"></div>
          <div className="floor-meta-flex-wrapper">
            <span className="floor-copyright-text">
              &copy; {new Date().getFullYear()} CHERRY SIDE STUDIO. Coded to Absolute Perfection.
            </span>
            <div className="floor-aesthetic-pills-row">
              <span className="aesthetic-bullet-pill">Premium Presentation</span>
              <span className="aesthetic-bullet-pill">Handcrafted Fillers</span>
              <span className="aesthetic-bullet-pill">Secure Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}