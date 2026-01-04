import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Semua field harus diisi");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
      };
      onLogin(userData);
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: "#f5576c" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="row g-0">
                <div className="col-md-5 text-white d-flex align-items-center justify-content-center p-5" style={{ backgroundColor: "#f5576c" }}>
                  <div className="text-center">
                    <div className="display-1 mb-3">👤</div>
                    <h4>Bergabunglah</h4>
                    <p className="text-white-50">Daftarkan akun Anda sekarang untuk memulai</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body p-5">
                    <h2 className="card-title mb-2">Daftar</h2>
                    <p className="text-muted mb-4">Buat akun baru Anda</p>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Nama Lengkap
                        </label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nama Anda" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimal 6 karakter" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Konfirmasi Password
                        </label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Ulangi password" required />
                      </div>

                      <button type="submit" className="btn w-100" style={{ backgroundColor: "#f5576c", color: "white" }} disabled={loading}>
                        {loading ? "Sedang Mendaftar..." : "Daftar"}
                      </button>
                    </form>

                    <div className="mt-4 text-center">
                      <p className="text-muted">
                        Sudah punya akun?{" "}
                        <a href="/login" className="text-decoration-none" style={{ color: "#f5576c" }}>
                          Masuk di sini
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
