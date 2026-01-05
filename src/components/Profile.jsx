import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [stats, setStats] = useState({
    predictions: 0,
    accuracy: 0,
    daysActive: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setFormData(userData);

      // Calculate stats from prediction history
      const historyData = JSON.parse(
        localStorage.getItem("predictionHistory") || "[]"
      );
      const userHistory = historyData.filter((h) => h.user === userData.email);

      const predictions = userHistory.length;
      const accuracy =
        predictions > 0
          ? Math.round(
              (userHistory.reduce((sum, h) => sum + h.result.confidence, 0) /
                predictions) *
                100
            )
          : 0;

      const registrationDate = new Date(userData.registeredAt || Date.now());
      const now = new Date();
      const daysActive =
        Math.floor((now - registrationDate) / (1000 * 60 * 60 * 24)) + 1;

      setStats({
        predictions,
        accuracy,
        daysActive,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Profil berhasil diperbarui!",
    });
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin logout?",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        navigate("/");
      }
    });
  };

  if (!user)
    return (
      <div className="profile-container">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header */}
        <div className="profile-header">
          {/* <div className="profile-header-icon"></div> */}
          <h1 className="profile-header-title">Profil Saya</h1>
          <p className="profile-header-subtitle">Kelola informasi akun Anda</p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-circle">👤</div>
            <div className="avatar-status">● Akun Aktif</div>
          </div>

          {!isEditing ? (
            <>
              {/* Display Mode */}
              <div className="profile-info">
                <div className="info-field">
                  <label className="info-label">👤 Nama</label>
                  <div className="info-value">{user.name}</div>
                </div>

                <div className="info-field">
                  <label className="info-label">📧 Email</label>
                  <div className="info-email-wrapper">
                    <div className="info-value">{user.email}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="button-group">
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profil
                </button>
                <button className="btn-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <div className="profile-info">
                <div className="info-field">
                  <label className="info-label" htmlFor="name">
                    👤 Nama
                  </label>
                  <input
                    type="text"
                    className="info-input"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="info-field">
                  <label className="info-label" htmlFor="email">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    className="info-input"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </div>
              </div>

              {/* Edit Action Buttons */}
              <div className="button-group">
                <button className="btn-save" onClick={handleSave}>
                  ✅ Simpan
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}>
                  ❌ Batal
                </button>
              </div>
            </>
          )}

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-value">{stats.predictions}</div>
              <div className="stat-label">Prediksi</div>
            </div>
            <div className="stat-item">
              <img
                src="/Logo.png"
                alt="Nourriture Logo"
                className="stat-logo"
              />
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.daysActive}</div>
              <div className="stat-label">Hari Aktif</div>
            </div>
          </div>

          {/* Footer */}
          <div className="profile-footer">🔒 Data Anda aman di tangan kami</div>
        </div>
      </div>
    </div>
  );
}
