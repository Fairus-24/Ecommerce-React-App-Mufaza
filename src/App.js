import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Footer from "./components/Footer";

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    const handleCopy = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

const styles = {
  content: {
    paddingBottom: "80px",
    userSelect: "none", 
  },
};

export default App;
