import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Mengimpor useSelector untuk memeriksa status login
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Footer from "./components/Footer";

function App() {
  // Fungsi ProtectedRoute untuk membatasi akses ke halaman tertentu
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Status login dari Redux
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          {/* Route Cart dilindungi oleh ProtectedRoute */}
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
  },
};

export default App;
