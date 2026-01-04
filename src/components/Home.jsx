import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="display-1 mb-4">📷</div>
        <h1 className="display-4 fw-bold mb-3">Prediksi Umur Wajah</h1>
        <p className="lead text-muted mb-4">Upload foto wajah dan AI akan memperkirakan usia Anda</p>

        <div className="d-flex gap-3 justify-content-center mb-4">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/predict")}>
            🎬 Coba Sekarang
          </button>
          {!isLoggedIn && (
            <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>

        {!isLoggedIn && <p className="text-muted">Login untuk menyimpan riwayat prediksi</p>}
        {isLoggedIn && <p className="text-success">Selamat datang! 👋</p>}
      </div>
    </div>
  );
}
