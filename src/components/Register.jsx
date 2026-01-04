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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
        padding: "20px",
        backgroundImage: `linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)`,
      }}
    >
      {/* Main Card Container */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          border: "8px solid",
          borderImage: "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%) 1",
        }}
      >
        {/* Left Side - Gradient Background */}
        <div
          style={{
            width: "50%",
            background: "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #0f0f1e 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            padding: "60px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative shapes */}
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.05)",
              top: "-100px",
              right: "-100px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.08)",
              bottom: "-50px",
              left: "-50px",
            }}
          />

          <div style={{ textAlign: "center", zIndex: 2, position: "relative" }}>
            <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px", letterSpacing: "1px", color: "#ffffff" }}>
              Nourriture
            </h1>
            <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", opacity: "0.9", color: "#e0e0e0" }}>
              Age Prediction Platform
            </p>
            <p style={{ fontSize: "12px", opacity: "0.85", lineHeight: "1.6", maxWidth: "250px", color: "#b0b0b0" }}>
              Bergabunglah dengan ribuan pengguna yang telah merasakan teknologi AI kami
            </p>
            <p style={{ fontSize: "11px", marginTop: "30px", opacity: "0.7", letterSpacing: "1px", color: "#808080" }}>
              www.nourriture.com
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div
          style={{
            width: "50%",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 40px",
          }}
        >
          <div style={{ width: "100%" }}>
            {/* Logo Icon */}
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
                fontSize: "28px",
              }}
            >
              👑
            </div>

            {/* Greeting */}
            <h3 style={{ fontSize: "18px", color: "#333", margin: "0 0 5px 0", fontWeight: "400" }}>
              Join Us !
            </h3>
            <h2 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 30px 0", background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Create Account
            </h2>

            {error && (
              <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "13px" }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div style={{ marginBottom: "30px" }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "none",
                    borderBottom: "2px solid #16213e",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#333",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#0f3460")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#16213e")}
                  required
                />
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: "30px" }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "none",
                    borderBottom: "2px solid #16213e",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#333",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#0f3460")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#16213e")}
                  required
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: "30px" }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (Min 6 chars)"
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "none",
                    borderBottom: "2px solid #16213e",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#333",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#0f3460")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#16213e")}
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div style={{ marginBottom: "30px" }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "none",
                    borderBottom: "2px solid #16213e",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#333",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#0f3460")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#16213e")}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: loading ? "linear-gradient(135deg, #16213e 0%, #16213e 100%)" : "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  transition: "opacity 0.3s",
                  marginBottom: "15px",
                }}
              >
                {loading ? "Sedang Mendaftar..." : "REGISTER"}
              </button>
            </form>

            {/* Login Link */}
            <div style={{ textAlign: "center", fontSize: "13px", color: "#666" }}>
              Already have an account ?{" "}
              <a
                href="/login"
                style={{
                  color: "#0f3460",
                  textDecoration: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Login Here
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="width: 50%"] {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
