import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!hideNavbar && <Navbar />}
      <main style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default App;
