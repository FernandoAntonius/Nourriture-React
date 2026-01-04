import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  if (loading) return <div>Loading...</div>;

  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  const showFooter = !hideNavbar;

  const protectedRoutes = ["/profile", "/riwayat"];
  if (!loading && !user && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && user && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideNavbar && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}
      <main style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/predict"
            element={<Predict isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/riwayat"
            element={isLoggedIn ? <Riwayat /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
