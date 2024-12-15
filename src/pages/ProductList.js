import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state) => state.products);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Ambil data produk saat pertama kali halaman dimuat
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      // Animasi sukses
      const cartIcon = document.getElementById(`cart-icon-${product.id}`);
      if (cartIcon) {
        cartIcon.classList.add("cart-animation");
        setTimeout(() => {
          cartIcon.classList.remove("cart-animation");
        }, 1000);
      }
    } else {
      navigate("/login");
    }
  };

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-container">
      <h2 className="product-title">Produk</h2>

      {/* Search dan Filter */}
      <div className="product-filters">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />  
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">Semua Kategori</option>
          {[...new Set(products.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-category">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
            <p className="product-description">
              {product.description.substring(0, 50)}...
            </p>
            <p className="product-rating">⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 100})</p>
            <div className="product-buttons">
              <button
                className="detail-button"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                Detail
              </button>
              <FaShoppingCart
                id={`cart-icon-${product.id}`}
                className="cart-icon"
                onClick={() => handleAddToCart(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;