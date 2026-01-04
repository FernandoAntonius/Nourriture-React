import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password harus diisi");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (email && password.length >= 6) {
        const userData = { email, name: email.split("@")[0] };
        onLogin(userData);
        navigate("/");
      } else {
        setError("Email atau password tidak valid");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-4">
          <h2 style={{ color: "#151515ff", marginBottom: "0.5rem", textAlign: "center" }}>Login</h2>
          <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#6c757d" }}>Selamat datang kembali</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required />
            </div>

            <button type="submit" className="btn btn-outline-secondary w-100" disabled={loading}>
              {loading ? "Sedang Masuk..." : "Login"}
            </button>
          </form>

          <div className="mt-3 text-center">
            <p className="text-muted mb-0">
              Belum punya akun?{" "}
              <a href="/register" className="text-decoration-none" style={{ color: "#0d6efd" }}>
                Register di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
