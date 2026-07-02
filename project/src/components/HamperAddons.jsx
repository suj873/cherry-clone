import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HamperAddons.css";

export default function HamperAddons() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("occasions"); // State tab name updated

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Pricing hata kar Occasions (Avsar) add kar diye hain
  const occasionHampers = [
    { id: 201, name: "Birthday Celebrations", label: "Premium Selection", subtext: "Make their day unforgettable", img: "/gift1.jpeg" },
    { id: 202, name: "Anniversary Delights", label: "Mid Tier Elegance", subtext: "Celebrate love & togetherness", img: "/gift2.jpeg" },
    { id: 203, name: "Festive Joy", label: "Thoughtful Selection", subtext: "Spreading warmth & happiness", img: "/gift3.jpeg" },
    { id: 204, name: "Corporate Gifting", label: "Sweet & Minimalist", subtext: "Professional & elegant styling", img: "/gift4.jpeg" },
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=Products"
        );

        const data = await res.json();
        setAllProducts(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // FILTER FUNCTION (Ab yeh category ya occasion wise filter kar sakta hai agar zaroorat ho)
  const handleOccasionClick = (occasionName) => {
    const filtered = allProducts.filter(
      (p) => p.category === occasionName // Ya fir jo bhi aapke sheet ka filter structural value ho
    );

    setFilteredProducts(filtered);
    setActiveTab("occasions");
  };

  return (
    <section className="cherry-addons-section">

      {/* HEADER */}
      <div className="cherry-addons-studio-bar">
        <div className="addons-title-stack">
          <span className="addons-super-tag">FINISHING TOUCHES</span>
          <h2 className="addons-studio-title">Tailor To Fit Your Intent</h2>
        </div>

        <div className="cherry-luxury-tab-switch">
          <button
            className={`lux-switch-btn ${activeTab === "occasions" ? "is-active" : ""}`}
            onClick={() => setActiveTab("occasions")}
          >
            Curated Hampers
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="cherry-addons-render-view">

        {activeTab === "occasions" && (
          <>
            <div className="cherry-budget-deck-grid">
              {occasionHampers.map((hamper) => (
                <div
                  key={hamper.id}
                  className="cherry-budget-clean-card"
                  onClick={() =>
                    navigate(
                      '/products'
                    )
                  }
                >
                  <div className="budget-card-visual">
                    <img src={hamper.img} alt={hamper.name} />
                  </div>

                  <div className="budget-card-text-dock">
                    <span className="budget-meta-label">{hamper.label}</span>
                    <h3 className="budget-primary-name">{hamper.name}</h3>
                    <div className="budget-footer-trigger">
                      {/* Pricing text ki jagah custom subtext show ho raha hai */}
                      <span className="budget-value-span">
                        {hamper.subtext}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional results preview */}
            {filteredProducts.length > 0 && (
              <div className="cherry-budget-results">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="result-card">
                    <img src={p.image} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>₹{p.price}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}