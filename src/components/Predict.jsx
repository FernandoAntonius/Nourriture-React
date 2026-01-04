import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Predict.css";

export default function Predict({ isLoggedIn }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Foto Belum Diupload",
        text: "Silakan upload foto terlebih dahulu",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    setError(null);

    try {
      const formData = new FormData();
      const blob = await fetch(image).then((res) => res.blob());
      formData.append("file", blob);

      const response = await axios.post("http://127.0.0.1:8000/predict", formData);

      console.log("API Response:", response.data);
      setResult(response.data);

      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem("user"));
        const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");

        history.push({
          id: Date.now(),
          date: new Date().toLocaleString("id-ID"),
          image: image,
          name: name,
          description: description,
          result: response.data,
          user: user.email,
        });

        localStorage.setItem("predictionHistory", JSON.stringify(history));
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(`Gagal melakukan prediksi: ${err.response?.status} ${err.response?.statusText || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-container">
      <div className="predict-wrapper">
        {/* Header */}
        <div className="predict-header">
          <div className="predict-icon">🔮</div>
          <h1 className="predict-title">Prediksi Umur Wajah</h1>
          <p className="predict-subtitle">Upload foto dan biarkan AI memprediksi usia Anda</p>
        </div>

        {/* Main Content Card */}
        <div className="predict-card">
          {/* Upload Section */}
          <div
            className="upload-area"
            onClick={() => document.querySelector(".file-input").click()}
          >
            {image ? (
              <img
                src={image}
                alt="preview"
                className="upload-preview"
              />
            ) : (
              <div className="upload-empty">
                <div className="upload-icon">📷</div>
                <p className="upload-text">Klik atau Drag & Drop Foto</p>
                <small className="upload-format">Format: JPG, PNG (Maks. 10MB)</small>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="file-input" 
            />
          </div>

          {/* Description Section */}
          {isLoggedIn && (
            <div className="description-section">
              <label className="description-label">� Nama</label>
              <input
                type="text"
                className="description-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda..."
              />

              <label className="description-label">📝 Deskripsi (Opsional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tambahkan catatan tentang prediksi ini..."
                className="description-textarea"
              />
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className={`predict-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <span style={{ marginRight: "8px" }}>⏳</span>
                Memproses...
              </>
            ) : (
              "⚡ PREDIKSI UMUR"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="result-section">
              <h3 className="result-title">✨ Hasil Prediksi</h3>
              <div className="result-value">
                {result.predicted_age_group}
              </div>
              <p className="result-label">Tahun</p>
              <div className="result-confidence">
                <small>Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong></small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
