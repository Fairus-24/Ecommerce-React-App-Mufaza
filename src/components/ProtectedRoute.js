import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // Mendapatkan status autentikasi dari Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Jika pengguna tidak login, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika pengguna login, izinkan akses ke halaman anak (children)
  return children;
};

export default ProtectedRoute;
