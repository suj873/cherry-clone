import { useNavigate } from "react-router-dom";
import "./CollectionsGrid.css";

export default function CollectionsGrid() {
  const navigate = useNavigate();

  // Cherry Side's exclusive actual item segments 
  const categories = [
    { id: 1, name: "Curated Hampers", count: "12 Items", slug: "curated-hampers", img: "/gift1.jpeg" },
    { id: 2, name: "Handmade Keepsakes", count: "8 Items", slug: "handmade-keepsakes", img: "/gift2.jpeg" },
    { id: 3, name: "Premium Jewelry Boxes", count: "15 Items", slug: "premium-gift-boxes", img: "/gift3.jpeg" },
    { id: 4, name: "Satin Ribbon & Bows", count: "6 Items", slug: "ribbons-bows", img: "/gift4.jpeg" },
    { id: 5, name: "Custom Stationery", count: "9 Items", slug: "stationery", img: "/gift5.jpeg" },
    // { id: 6, name: "Velvet Scrunchies Pack", count: "14 Items", slug: "scrunchies", img: "/gift6.jpeg" },
  ];

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=Products"
  //       );

  //       const data = await res.json();

  //       // FIXED 5 CATEGORIES
  //       const categoryList = [
  //         {
  //           name: "Curated Hampers",
  //           slug: "curated-hampers",
  //           img: "/gift1.jpeg",
  //         },
  //         {
  //           name: "Premium Gift Boxes",
  //           slug: "premium-gift-boxes",
  //           img: "/gift3.jpeg",
  //         },
  //         {
  //           name: "Custom Ribbons",
  //           slug: "custom-ribbons",
  //           img: "/gift4.jpeg",
  //         },
  //         {
  //           name: "Scrunchies & Clips",
  //           slug: "scrunchies-clips",
  //           img: "/gift5.jpeg",
  //         },
  //       ];

  //       // COUNT FROM SHEET CATEGORY COLUMN
  //       const updatedCategories = categoryList.map((cat) => {
  //         const count = data.filter(
  //           (p) =>
  //             p.category?.toLowerCase() === cat.name.toLowerCase()
  //         ).length;

  //         return {
  //           ...cat,
  //           count: `${count} Items`,
  //         };
  //       });

  //       setCategories(updatedCategories);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  return (
    <section className="cherry-collections-section">
      {/* Editorial Header Display */}
      <div className="cherry-grid-header">
        <span className="cherry-pre-title">OUR SECTIONS</span>
        <h2 className="cherry-grid-title">Shop by Curated Categories</h2>
        <div className="cherry-header-line"></div>
      </div>

      {/* Asymmetric Arch Grid Shell */}
      <div className="cherry-arch-grid-container">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className={`cherry-arch-card card-variant-${idx % 3}`}
            onClick={() => navigate('/products')}
          >
            <div className="cherry-arch-image-wrapper">
              <img src={cat.img} alt={cat.name} className="cherry-arch-img" />
              <div className="cherry-arch-overlay">
                <span className="cherry-view-arrow">&rarr;</span>
              </div>
            </div>

            <div className="cherry-arch-details">
              <h3 className="cherry-arch-name">{cat.name}</h3>
              <p className="cherry-arch-count">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Master Button */}
      <div className="cherry-grid-footer">
        <button
          className="cherry-view-all-collections-btn"
          onClick={() => navigate("/products")}
        >
          Explore All Collections
        </button>
      </div>
    </section>
  );
}