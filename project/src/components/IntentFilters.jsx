import { useNavigate } from "react-router-dom";
import "./IntentFilters.css";

export default function IntentFilters() {
  const navigate = useNavigate();

  const giftForWho = [
    { id: "f1", name: "For Her", context: "Curated roses, cosmetics, satin ribbons", slug: "for-her", img: "/gift1.jpeg" },
    { id: "f2", name: "For Him", context: "Minimalist leather cuffs, premium dark bars", slug: "for-him", img: "/gift2.jpeg" },
    { id: "f3", name: "For Couples", context: "Twin keepsake journals, custom hampers", slug: "couples", img: "/gift3.jpeg" }
  ];

  const giftVibes = [
    { id: "v1", name: "Aesthetic Retro", style: "Vintage cards, wax seals", tag: "Warm Amber" },
    { id: "v2", name: "Midnight Luxury", style: "Velvet bases, gold leaf flakes", tag: "Deep Crimson" },
    { id: "v3", name: "Blossom Pastel", style: "Fresh floristry, fairy tubes", tag: "Soft Blush" },
    { id: "v4", name: "Eco Minimalist", style: "Handmade sheets, jute twines", tag: "Earthy Sage" }
  ];

  return (
    <section className="cherry-intent-lounge-bg">
      <div className="cherry-intent-container">
        
        {/* Row 1: Target Audience Blocks */}
        <div className="intent-lounge-header">
          <span className="lounge-accent-label">// EXCLUSIVE FILTERS</span>
          <h2 className="lounge-main-heading">Who are you crafting this for?</h2>
        </div>

        <div className="intent-audience-panel-row">
          {giftForWho.map((person) => (
            <div 
              key={person.id} 
              className="intent-audience-glass-card"
              onClick={() => navigate('/products')}
            >
              <div className="glass-card-img-frame">
                <img src={person.img} alt={person.name} />
                <div className="glass-card-vignette"></div>
              </div>
              <div className="glass-card-text-dock">
                <h3>{person.name}</h3>
                <p>{person.context}</p>
                <span className="glass-card-cta-line">Explore segment &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        <div className="intent-divider-line"></div>

        {/* Row 2: Vibe & Mood Selection Deck */}
        <div className="intent-lounge-header padding-top-sm">
          <h2 className="lounge-main-heading">Select by Aesthetic Vibe</h2>
          <p className="lounge-subheading-dim">Match the design scheme to your recipient's personal lifestyle palette.</p>
        </div>

        <div className="intent-vibes-mosaic-deck">
          {giftVibes.map((vibe) => (
            <div 
              key={vibe.id} 
              className="intent-vibe-luxury-box"
              onClick={() => navigate('/products')}
            >
              <div className="vibe-box-inner-content">
                <span className="vibe-tag-indicator">{vibe.tag}</span>
                <h4 className="vibe-title-label">{vibe.name}</h4>
                <p className="vibe-desc-style">{vibe.style}</p>
              </div>
              <div className="vibe-box-hover-backdrop"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}