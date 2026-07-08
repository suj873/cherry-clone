import { useEffect, useState } from "react";
// 1. ProductCard component ko import kiya
import ProductCard from "../components/ProductCard";
// React Toastify ko import kiya
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}?sheet=Products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (file) => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setProduct((prev) => ({ ...prev, image: data.secure_url }));
        toast.success("Image Uploaded Successfully");
      } else {
        toast.error("Image Upload Failed");
      }
    } catch (err) {
      console.error("Cloudinary error:", err);
      toast.error("Image Upload Failed");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return toast.warning("Upload product image first");

    // Toast Promise setup kiya loader ke liye
    const submissionPromise = new Promise(async (resolve, reject) => {
      try {
        const payload = {
          type: "product",
          action: editingId ? "update" : "add",
          id: editingId || Date.now(),
          ...product,
        };

        const res = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.success) {
          setProduct({ name: "", category: "", price: "", description: "", stock: "", image: "" });
          setEditingId(null);
          fetchProducts();
          resolve(data);
        } else {
          reject(new Error("API returned success false"));
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(submissionPromise, {
      pending: "Processing, please wait...",
      success: editingId ? "Product Updated Successfully 👌" : "Product Added Successfully 👌",
      error: "Failed to submit data 🤯",
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setProduct({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      stock: item.stock,
      image: item.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toast confirm hone par delete function trigger hoga
  const confirmDeleteAction = async (id, toastId) => {
    toast.dismiss(toastId); // Confirmation toast ko band karo

    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify({ type: "product", action: "delete", id }),
        });
        const data = await res.json();
        if (data.success) {
          fetchProducts();
          resolve(data);
        } else {
          reject(new Error("Delete failed"));
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(deletePromise, {
      pending: "Deleting product...",
      success: "Product Deleted Successfully 🗑️",
      error: "Delete Failed 🤯",
    });
  };

  // Browser confirm alert ko delete karke Custom Toast banaya
  const handleDelete = (id) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontWeight: '600' }}>Want to delete this product?</p>
        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
          <button 
            onClick={() => toast.dismiss(t.id)} 
            style={{ border: '1px solid #7A0016', color: '#7A0016', backgroundColor: 'transparent', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button 
            onClick={() => confirmDeleteAction(id, t.id)} 
            style={{ border: 'none', color: '#ffffff', backgroundColor: '#7A0016', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      autoClose: false, // User jab tak action na le tab tak toast rahega
      closeOnClick: false,
      draggable: false
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProduct({ name: "", category: "", price: "", description: "", stock: "", image: "" });
  };

  return (
    <div style={{ backgroundColor: '#FDFBF7', color: '#2C1810', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'sans-serif' }}>
      
      {/* Dynamic CSS Media Queries Injection - Mobile aur Desktop sync */}
      <style>{`
        .form-layout-container {
          display: flex;
          flex-direction: row;
          gap: 32px;
          padding: 28px;
        }
        .image-section {
          width: 35%;
        }
        .info-section {
          width: 65%;
        }
        .fields-row {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
        }

        @media (max-width: 768px) {
          .form-layout-container {
            flex-direction: column !important;
            gap: 24px !important;
            padding: 16px !important;
          }
          .image-section {
            width: 100% !important;
            order: 1 !important;
          }
          .info-section {
            width: 100% !important;
            order: 2 !important;
          }
          .fields-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
      
      {/* Brand Header */}
      <header style={{ backgroundColor: '#FAF6F0', paddingTop: '24px', paddingBottom: '20px', textAlign: 'center', borderBottom: '1px solid #F0EAE1' }}>
        <p style={{ color: '#800020', fontSize: '11px', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '2.5px' }}>DASHBOARD</p>
        <h1 style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 'bold', color: '#4A1521', margin: '0' }}>Cherry Side Admin</h1>
        <p style={{ color: '#9CA3AF', fontSize: '13px', margin: '6px 0 0 0' }}>Manage your products</p>
      </header>

      {/* Main Structural Wrapper */}
      <main style={{ maxWidth: '1140px', margin: '0 auto', padding: '16px', boxSizing: 'border-box' }}>
        
        {/* Form Container Panel */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #EFEAE2', overflow: 'hidden' }}>
          
          <div style={{ backgroundColor: '#5C061C', color: '#ffffff', padding: '14px 20px', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '600', margin: '0', letterSpacing: '0.5px' }}>
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                &times; Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="form-layout-container">
            
            {/* 1. PRODUCT IMAGE CONTAINER */}
            <div className="image-section" style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, boxSizing: 'border-box' }}>
              <label style={{ color: '#5C061C', fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>Product Image</label>
              <div style={{ border: '2px dashed rgba(128, 0, 32, 0.25)', borderRadius: '6px', backgroundColor: '#FAF7F2', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '260px', position: 'relative', flexGrow: 1, boxSizing: 'border-box' }}>
                
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt="Preview" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', color: '#D1D5DB', marginBottom: '12px', backgroundColor: '#ffffff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F3F4F6' }}>
                      <svg className="w-6 h-6" style={{ opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p style={{ color: '#374151', fontSize: '13px', fontWeight: '600', margin: '0' }}>Upload Product Image</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px', marginBottom: '16px' }}>JPG, PNG, WEBP</p>
                  </div>
                )}
                
                <label style={{ backgroundColor: '#800020', color: '#ffffff', padding: '8px 18px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', zIndex: 10 }}>
                  {loading ? "Uploading..." : "Choose File"}
                  <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files[0])} disabled={loading} style={{ display: 'none' }} />
                </label>

                {/* Async Loading Overlay */}
                {loading && (
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                    <span style={{ color: '#7a0016', fontSize: '13px', fontWeight: '500' }}>Uploading to Cloudinary...</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. GENERAL INFORMATION CONTAINER */}
            <div className="info-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ color: '#5C061C', fontWeight: 'bold', fontSize: '13px', margin: '0 0 16px 0', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px' }}>General Information</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '4px' }}>Product Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter product name"
                      style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FCFBFA' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '4px' }}>Select Category</label>
                    <select 
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      required
                      style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="">Select category</option>
                      <option value="Curated Hampers">Curated Hampers</option>
                      <option value="Handmade Keepsakes">Handmade Keepsakes</option>
                      <option value="Premium Gift Boxes">Premium Gift Boxes</option>
                      <option value="Custom Ribbons">Custom Ribbons</option>
                      <option value="Scrunchies & Clips">Scrunchies & Clips</option>
                    </select>
                  </div>

                  {/* Dual row setup for Price & Stock */}
                  <div className="fields-row">
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '4px' }}>Price (₹)</label>
                      <input 
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                        style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FCFBFA' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '4px' }}>Stock Quantity</label>
                      <input 
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        placeholder="Enter stock quantity"
                        style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FCFBFA' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '4px' }}>Product Description</label>
                    <textarea 
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Enter product description..."
                      style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', backgroundColor: '#FCFBFA', lineHeight: '1.5' }}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Submit Button */}
              <div style={{ marginTop: '12px' }}>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', backgroundColor: '#800020', color: '#ffffff', padding: '12px 0', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Lower Grid Products Gallery Section */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'serif', color: '#4A1521', margin: '0' }}>Products</h2>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 0 0' }}>{products.length} Items</p>
          </div>

          {products.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #EFEAE2', padding: '40px', textCenter: 'center' }}>
              <p style={{ color: '#8c7b7d', margin: 0, textAlign: 'center' }}>No products yet</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((item) => (
                <div 
                  key={item.id} 
                  style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #EFEAE2', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.015)', boxSizing: 'border-box' }}
                >
                  {/* Reuse components layout structure */}
                  <ProductCard product={item} />

                  {/* Actions Utility Layout */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      onClick={() => handleEdit(item)}
                      style={{ flex: 1, border: '1px solid #e5d5d0', color: '#7a0016', backgroundColor: '#f6efe7', padding: '6px 0', borderRadius: '4px', fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(item.id)}
                      style={{ flex: 1, border: '1px solid #fecaca', color: '#dc2626', backgroundColor: '#fef2f2', padding: '6px 0', borderRadius: '4px', fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}