import React, { useState } from "react";
import "./Kontak.css";

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://nourriture-laravel.vercel.app/api/api/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage("Pesan Anda telah berhasil dikirim!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          content: "",
        });
      } else {
        setMessage("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "✉",
      title: "Email",
      details: "support@nourriture.com",
    },
    {
      icon: "☎",
      title: "Telepon",
      details: "+62 812-3456-7890",
    },
    {
      icon: "📍",
      title: "Alamat",
      details: "Jl. Teknologi No. 123, Jakarta, Indonesia",
    },
    {
      icon: "🕐",
      title: "Jam Operasional",
      details: "Senin - Jumat: 09:00 - 17:00 WIB",
    },
  ];

  return (
    <div className="kontak-container">
      <div className="kontak-header">
        <p className="kontak-subtitle">HUBUNGI KAMI</p>
        <h1 className="kontak-title">Kontak & Informasi</h1>
      </div>

      <div className="kontak-content">
        <div className="kontak-info">
          {contactInfo.map((info, index) => (
            <div key={index} className="info-card">
              <div className="info-icon">{info.icon}</div>
              <div className="info-text">
                <h3>{info.title}</h3>
                <p>{info.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="kontak-form-wrapper">
          <div className="form-header">
            <h2>Kirim Pesan</h2>
          </div>

          <form className="kontak-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Pesan</label>
              <textarea
                id="content"
                name="content"
                placeholder="Tulis pesan Anda di sini..."
                rows="6"
                value={formData.content}
                onChange={handleChange}
                required></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              ✈ {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {message && (
              <div
                className={`message ${
                  message.includes("berhasil") ? "success" : "error"
                }`}>
                {message}
              </div>
            )}

            <div className="privacy-notice">
              🔒 Informasi Anda aman bersama kami. Kami menghormati privasi Anda
              dan tidak akan membagikan data Anda kepada pihak ketiga.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
