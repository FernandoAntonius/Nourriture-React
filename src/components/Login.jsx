import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/");
      } else {
        setError("Email atau password tidak valid");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="row g-0">
                <div className="col-md-5 bg-primary text-white d-flex align-items-center justify-content-center p-5">
                  <div className="text-center">
                    <div className="display-1 mb-3">📷</div>
                    <h4>Prediksi Umur Wajah</h4>
                    <p className="text-white-50">Masuk untuk menyimpan riwayat prediksi</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body p-5">
                    <h2 className="card-title mb-2">Masuk</h2>
                    <p className="text-muted mb-4">Selamat datang kembali</p>

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

                      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Sedang Masuk..." : "Masuk"}
                      </button>
                    </form>

                    <div className="mt-4 text-center">
                      <p className="text-muted">
                        Belum punya akun?{" "}
                        <a href="/register" className="text-primary text-decoration-none">
                          Daftar di sini
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
