import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="display-1 mb-4">📷</div>
        <h1 className="display-4 fw-bold mb-3">Prediksi Umur Wajah</h1>
        <p className="lead text-muted mb-4">Upload foto wajah dan AI akan memperkirakan usia Anda</p>

        {!user ? (
          <>
            <div className="d-flex gap-3 justify-content-center mb-4">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/predict")}>
                🎬 Coba Sekarang
              </button>
              <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
            <p className="text-muted">Login untuk menyimpan riwayat prediksi</p>
          </>
        ) : (
          <>
            <div className="d-flex gap-3 justify-content-center mb-4">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/predict")}>
                🎬 Mulai Prediksi
              </button>
              <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate("/riwayat")}>
                📋 Lihat Riwayat
              </button>
              <button className="btn btn-outline-info btn-lg" onClick={() => navigate("/profile")}>
                👤 Profil Saya
              </button>
            </div>
            <p className="text-muted">Selamat datang, {user.name || user.email}!</p>
          </>
        )}
      </div>
    </div>
  );
}
