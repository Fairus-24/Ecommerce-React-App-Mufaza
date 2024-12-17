import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { decreaseStock } from "../redux/productsSlice"; // Import decreaseStock action

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const stock = useSelector((state) => state.products.stock); // Get stock from product state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0
  );

  const handleIncrement = (id) => {
    if (quantities[id] < stock[id]) {
      setQuantities((prev) => ({
        ...prev,
        [id]: prev[id] + 1,
      }));
    }
  };

  const handleDecrement = (id) => {
    if (quantities[id] > 1) {
      setQuantities((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });
  };

  const handleCheckout = () => {
    let isCheckoutValid = true;
    let errorMessage = "";

    cartItems.forEach((item) => {
      if (quantities[item.id] > stock[item.id]) {
        isCheckoutValid = false;
        errorMessage = `Not enough stock for ${item.title}.`;
      }
    });

    if (isCheckoutValid) {
      cartItems.forEach((item) => {
        dispatch(decreaseStock({ id: item.id, quantity: quantities[item.id] }));
      });
      dispatch(clearCart());
      navigate("/"); 
    } else {
      alert(errorMessage); 
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (cartItems.length === 0) {
    return <p>Keranjang anda Kosong. Pergi ke halaman product dan masukkan product ke keranjang.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>
      <div style={styles.tableContainer}>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <div style={styles.cartItemImage}>
              <img src={item.image} alt={item.title} style={styles.image} />
            </div>
            <div style={styles.cartItemDetails}>
              <div style={styles.productTitle}>
                {item.title}
                {quantities[item.id] > stock[item.id] && (
                  <span style={styles.errorMessage}>Stok tidak cukup!</span>
                )}
              </div>
              <div style={styles.price}>${item.price}</div>
              <div style={styles.quantityControls}>
                <button onClick={() => handleDecrement(item.id)} style={styles.adjustButton}>-</button>
                <span style={styles.quantityDisplay}>{quantities[item.id]}</span>
                <button onClick={() => handleIncrement(item.id)} style={styles.adjustButton}>+</button>
              </div>
              <div style={styles.totalPrice}>${(item.price * quantities[item.id]).toFixed(2)}</div>
              <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <p style={styles.total}>Total Harga: ${totalAmount.toFixed(2)}</p>
        <div>
          <button onClick={handleGoBack} style={styles.backButton}>Kembali</button>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    weight: "full",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  cartItem: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
    alignItems: "flex-start",
  },
  cartItemImage: {
    width: "100%",
    maxWidth: "120px",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  cartItemDetails: {
    width: "100%",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "10px",
  },
  price: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  adjustButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  quantityDisplay: {
    margin: "0 10px",
    fontSize: "18px",
  },
  totalPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  removeBtn: {
    backgroundColor: "#ff4c4c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "15px",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  checkoutBtn: {
    padding: "10px 20px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginLeft: "10px",
  },

  "@media (max-width: 480px)": {
    table: {
      fontSize: "12px", // Even smaller font size
    },
    quantityControls: {
      width: "100%", // Full-width quantity controls
    },
    adjustButton: {
      padding: "5px", // Reduce button size further
    },
    removeBtn: {
      padding: "5px 8px", // Smaller remove button
    },
  },
};
  
export default Cart;
