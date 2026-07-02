import { useEffect, useState } from "react";
// 1. ProductCard component ko import kiya
import ProductCard from "../components/ProductCard";

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
      } else {
        alert("Image Upload Failed");
      }
    } catch (err) {
      console.error("Cloudinary error:", err);
      alert("Image Upload Failed");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return alert("Upload image first");

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
        alert(editingId ? "Product Updated Successfully" : "Product Added Successfully");
        setProduct({ name: "", category: "", price: "", description: "", stock: "", image: "" });
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data");
    }
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ type: "product", action: "delete", id }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Product Deleted Successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete Failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProduct({ name: "", category: "", price: "", description: "", stock: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-[#f6efe7] py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#7a0016]/10 text-[#7a0016] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Dashboard
          </span>
          <h1 className="text-4xl font-serif text-[#3a0a0a]">
            Cherry Side Admin
          </h1>
          <p className="text-[#8c7b7d] mt-2 text-sm">Manage your products</p>
        </div>

        {/* Form Card Layout */}
        <div className="bg-white rounded-3xl border border-[#ebdcd9] shadow-md overflow-hidden max-w-7xl mx-auto mb-12">

          {/* Form Banner Header */}
          <div className="bg-gradient-to-r from-[#7a0016] via-[#650012] to-[#4a000d] px-8 py-5 flex items-center justify-between">
            <h2 className="text-white text-lg font-semibold">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition"
              >
                <span className="text-lg leading-none">&times;</span>
                Cancel
              </button>
            )}
          </div>

          {/* Form Body Wrapper */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 grid-cols-[35%_65%] gap-8">

              {/* LEFT COLUMN - ASYNC FILE UPLOAD ARCHITECTURE */}
              <div className="bg-[#faf8f5] border border-[#ebdcd9] rounded-2xl p-5 lg:sticky lg:top-6 h-fit">
                <h3 className="text-lg font-semibold text-[#5a0010] mb-4">
                  Product Image
                </h3>

                <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
                  <label
                    htmlFor="productImage"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[#d8c7c3] rounded-xl hover:border-[#7a0016] transition-colors cursor-pointer bg-transparent"
                  >
                    <input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImage(e.target.files[0])}
                      className="sr-only"
                    />

                    {product.image ? (
                      <img
                        src={product.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#b8a8aa] px-4 text-center">
                        <svg
                          className="w-16 h-16 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                        <p className="font-semibold text-lg">
                          Upload Product Image
                        </p>

                        <p className="text-sm mt-2">
                          JPG, PNG, WEBP
                        </p>
                      </div>
                    )}
                  </label>

                  {/* Absolute Network Blocking Loading Mesh Overlay */}
                  {loading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-[#7a0016] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-[#7a0016] font-medium">
                          Uploading...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN - CORE PRODUCT STRUCTURAL FORMS */}
              <div className="bg-[#faf8f5] border border-[#ebdcd9] rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-[#5a0010] mb-6">
                  General Information
                </h3>

                <div className="space-y-5">
                  {/* Row 1: Product Name & Category Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={product.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white border border-[#e7d8d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0016] transition-all"
                    />

                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white border border-[#e7d8d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0016] transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Curated Hampers">Curated Hampers</option>
                      <option value="Handmade Keepsakes">Handmade Keepsakes</option>
                      <option value="Premium Gift Boxes">Premium Gift Boxes</option>
                      <option value="Custom Ribbons">Custom Ribbons</option>
                      <option value="Scrunchies & Clips">Scrunchies & Clips</option>
                    </select>
                  </div>

                  {/* Row 2: Price Specifier & Stock Counters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a0016] font-semibold">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-4 py-4 bg-white border border-[#e7d8d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0016] transition-all"
                      />
                    </div>

                    <input
                      type="number"
                      name="stock"
                      placeholder="Stock Quantity"
                      value={product.stock}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white border border-[#e7d8d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0016] transition-all"
                    />
                  </div>

                  {/* Row 3: Product Context Body Area */}
                  <textarea
                    name="description"
                    placeholder="Product Description..."
                    value={product.description}
                    onChange={handleChange}
                    rows={8}
                    required
                    className="w-full px-4 py-4 bg-white border border-[#e7d8d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0016] transition-all resize-none"
                  />

                  {/* Row 4: Transaction Direct Submit Call-To-Action */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5 py-4 bg-gradient-to-r from-[#7a0016] to-[#5a0010] text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-[#7a0016]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Dynamic Products Header Feed */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif text-[#3a0a0a]">Products</h2>
            <p className="text-[#8c7b7d] text-sm mt-1">{products.length} items</p>
          </div>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-[#ebdcd9] to-transparent"></div>
        </div>

        {/* Main Render Pipeline: Grid View vs Empty View */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#ebdcd9] p-16 text-center">
            <div className="w-16 h-16 bg-[#f6efe7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#b8a8aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-[#8c7b7d]">No products yet</p>
          </div>
        ) : (
          /* Yaha Grid Layout wrapper me aapki design apply ho rahi hai */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((item) => (
              <div key={item.id} className="flex flex-col justify-between bg-white p-4 rounded-2xl border border-[#ebdcd9] hover:shadow-lg transition duration-300">

                {/* 2. ProductCard reuse kiya jo exact 'products.jsx' jaisa dikhega */}
                <ProductCard product={item} />

                {/* Edit aur Delete buttons card ke theek niche clean format me */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1.5 text-xs font-medium text-[#7a0016] bg-[#f6efe7] border border-[#e5d5d0] rounded-md hover:bg-[#7a0016] hover:text-white transition flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-600 hover:text-white transition flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}