import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
 
function Navbar() {
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>MufazaStore</h1>
      </div>
      {isMobile && (
        <button style={styles.hamburger} onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
      <ul style={{
          ...styles.navLinks,
          ...(isMobile && isMenuOpen ? styles.navLinksOpen : {}),
          ...(isMobile && !isMenuOpen ? styles.navLinksHidden : {}),
        }}
      >
        <li>
          <Link
            to="/Home"
            style={styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            to="/"
            style={styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            Produk
          </Link>
        </li>
        {user ? (
          <>
            <li style={styles.cartWrapper}>
              <Link
                to="/cart"
                style={styles.cartLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Keranjang
                <FaShoppingCart style={styles.cartIcon} />
                {cartItemsCount > 0 && (
                  <span style={styles.cartBadge}>{cartItemsCount}</span>
                )}
              </Link>
            </li>
            {!isMenuOpen && <div style={styles.separator}></div>}
            <li style={styles.userWrapper}>
              <FaUser style={styles.userIcon} />
              <span style={styles.username}>{user.username}</span>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.buttonLogout}>
                Keluar
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              style={styles.buttonLogin}
              onClick={() => setIsMenuOpen(false)}
            >
              Masuk
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    userSelect: "none",
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2a9d8f",
  },
  hamburger: {
    display: "block",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#333",
    zIndex: 10,
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    alignItems: "center",
    transition: "transform 0.3s ease-in-out",
  },
  navLinksOpen: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "60px",
    left: 0,
    right: 0,
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px 0",
    gap: "10px",
    zIndex: 9,
  },
  navLinksHidden: {
    display: "none",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    transition: "color 0.3s, transform 0.3s",
    position: "relative",
  },
  cartWrapper: {
    position: "relative",
  },
  cartLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
  },
  cartIcon: {
    fontSize: "20px",
    marginRight: "5px",
  },
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  userIcon: {
    fontSize: "20px",
    marginRight: "8px",
  },
  username: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  buttonLogin: {
    padding: "8px 16px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonLogout: {
    padding: "8px 16px",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  separator: {
    width: "1px",
    height: "30px",
    backgroundColor: "#333",
    margin: "0 15px",
  },
};

export default Navbar;
