import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "./Footer";
import "./Home.css";
import "./Footer.css";

export default function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Prediksi Umur Wajah</h1>
          <p className="home-subtitle">Upload foto wajah dan kami akan memperkirkakan usia Anda</p>
          
          {!user ? (
            <>
              <div className="home-buttons">
                <button className="home-btn home-btn-primary" onClick={() => navigate("/predict")}>
                  🔮 Mulai Prediksi
                </button>
                <button className="home-btn home-btn-secondary" onClick={() => navigate("/login")}>
                  🔐 Login
                </button>
              </div>
              <p className="home-message">Login untuk menyimpan riwayat prediksi!</p>
            </>
          ) : (
            <>
              <div className="home-buttons">
                <button className="home-btn home-btn-secondary" onClick={() => navigate("/predict")}>
                  🔮 Mulai Prediksi
                </button>
                <button className="home-btn home-btn-secondary" onClick={() => navigate("/riwayat")}>
                  📋 Lihat Riwayat
                </button>
                <button className="home-btn home-btn-secondary" onClick={() => navigate("/profile")}>
                  👤 Profil Saya
                </button>
              </div>
              <p className="home-message">Selamat datang, {user.name || user.email}!</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

