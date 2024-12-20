import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { setStock } from "../redux/productsSlice";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null); // Declare setError here

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Get product stock from productsSlice (assuming the stock is stored in a product-specific manner)
  const stock = useSelector((state) => state.products.stock[id] || 0);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        // Update stock in Redux if not already present
        if (!stock) {
          dispatch(setStock({ id, stock: productData.stock || 20 }));
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product data."); // Use setError to set the error message
      });
  }, [id, dispatch, stock]); // Added `stock` to the dependency array

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart({ ...product, quantity }));
      alert("Product added to cart successfully!");
    } else {
      navigate("/login");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rate)) {
        stars.push(<span key={i} style={styles.starFull}>★</span>);
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        const percentage = (rate % 1) * 100;
        stars.push(
          <span
            key={i}
            style={{
              ...styles.starEmpty,
              background: `linear-gradient(90deg, #FFD700 ${percentage}%, #DDD ${percentage}%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ★
          </span>
        );
      } else {
        stars.push(<span key={i} style={styles.starEmpty}>★</span>);
      }
    }
    return stars;
  };

  if (error) return <p style={styles.error}>{error}</p>;
  if (!product) return <p style={styles.loading}>Memproses detail produk...</p>;

  return (
    <div style={styles.container}>
      <button onClick={handleGoBack} style={styles.backButton}>
        ← Kembali
      </button>

      <h2 style={styles.title}>{product.title}</h2>
      <div style={styles.productDetail}>
        <img
          src={product.image}
          alt={product.title}
          style={styles.productImage}
        />
        <div style={styles.productInfo}>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>

          {/* Kategori Barang */}
          <p style={styles.category}>Kategori: {product.category}</p>

          {/* Rating Produk */}
          <p style={styles.rating}>
            {renderStars(product.rating?.rate || 0)}
            <span style={styles.ratingText}>
              ({product.rating?.rate || 0}/5, {product.rating?.count || 0} reviews)
            </span>
          </p>

          {/* Stok Produk */}
          <p style={styles.stock}>Sisa Stok: {stock}</p>

          <div style={styles.quantityContainer}>
            <button
              onClick={() => handleQuantityChange(-1)}
              style={styles.quantityButton}
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min="1"
              style={styles.quantityInput}
            />
            <button
              onClick={() => handleQuantityChange(1)}
              style={styles.quantityButton}
            >
              +
            </button>
          </div>

          <div style={styles.buttons}>
            <button style={styles.addToCartButton} onClick={handleAddToCart}>
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  backButton: {
    padding: "10px 15px",
    marginBottom: "20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: "Roboto, sans-serif",
  },
  productDetail: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },
  productImage: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    objectFit: "contain",
  },
  productInfo: {
    flex: 1,
    minWidth: "300px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2a9d8f",
  },
  description: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
  },
  category: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  rating: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
    display: "flex",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: "10px",
    color: "#888",
  },
  starFull: {
    color: "#FFD700",
    fontSize: "18px",
  },
  starEmpty: {
    color: "#DDD",
    fontSize: "18px",
  },
  stock: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  quantityButton: {
    padding: "5px 10px",
    fontSize: "16px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quantityInput: {
    margin: "0 10px",
    padding: "5px",
    width: "60px",
    fontSize: "16px",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  loading: {
    fontSize: "18px",
    color: "#6c757d",
    textAlign: "center",
    marginTop: "50px",
  },
  buttons: {
    marginTop: "20px",
  },
  addToCartButton: {
    padding: "10px 20px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  // Responsiveness for smaller screens
  "@media (max-width: 768px)": {
    productDetail: {
      flexDirection: "column",
      alignItems: "center",
    },
    productImage: {
      maxWidth: "80%",
    },
  },
};

export default DetailProduct;
