import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/Logo.png"
            alt="Nourriture Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-brand-text">Nourriture</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
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
                🔮 Prediksi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tentang">
                ℹ️ Tentang Kami
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/kontak">
                ☎️ Kontak
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
                  <button
                    className="nav-link nav-logout"
                    onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    🔐 Login
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
