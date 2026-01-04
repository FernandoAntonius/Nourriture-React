import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">
          📷 Prediksi Umur
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                🏠 Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/predict">
                🔮 Predik
              </a>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    👤 Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/riwayat">
                    📋 Riwayat
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    🔑 Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    ✍️ Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
