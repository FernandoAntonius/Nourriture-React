import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Profile from "./components/Profile";
import Riwayat from "./components/Riwayat";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const { user, loading } = useAuth();

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  const protectedRoutes = ["/profile", "/riwayat"];
  if (!loading && !user && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && user && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="d-flex align-items-center justify-content-center min-vh-100">Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!hideNavbar && <Navbar />}
      <main style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/riwayat" element={user ? <Riwayat /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default App;
