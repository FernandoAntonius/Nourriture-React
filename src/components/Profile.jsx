import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setFormData(userData);
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
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="card-title mb-4 text-center">👤 Profil Saya</h1>

              {!isEditing ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama</label>
                    <p className="form-control-plaintext">{user.name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{user.email}</p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}>
                      ✏️ Edit Profil
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={handleSave}>
                      ✅ Simpan
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}>
                      ❌ Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
