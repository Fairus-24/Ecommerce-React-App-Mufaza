import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Footer from "./components/Footer";  

function App() {
  return (
    <Router>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
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
