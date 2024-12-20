import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { decreaseStock } from "../redux/productsSlice"; 

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const stock = useSelector((state) => state.products.stock); 
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
        errorMessage = `Stock tidak cukup pada produk "${item.title}."`;
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
              <div style={styles.productTitleContainer}>
                <div style={styles.productTitle}>{item.title}</div>
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
      <div style={styles.footer}>
        <p style={styles.total}>Total Harga: ${totalAmount.toFixed(2)}</p>
        <div style={styles.buttonGroup}>
          <button onClick={handleGoBack} style={styles.backButton}>Kembali</button>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Roboto, sans-serif",
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
    marginBottom: "50px",
  },
  cartItem: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px #000",
    position: "relative",
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
  productTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: "18px",
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
  footer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -2px 4px #000",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "red",
    borderRadius: "5px",
    fontSize: "12px",
  },
};

export default Cart;
