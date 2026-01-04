import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Predict({ isLoggedIn }) {
  const [image, setImage] = useState(null);
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
    <div className="container py-5">
      <h1 className="text-center mb-2" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#333" }}>
        📷 Prediksi Umur Wajah
      </h1>
      <p className="text-center text-muted mb-5">Upload foto wajah Anda dan kami akan memperkirakan usia Anda</p>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 mb-4" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div className="card-body p-5">
              <div
                className="rounded p-5 text-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                  color: "#333",
                  border: "2px solid #e9ecef",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6c757d";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
                onClick={() => document.querySelector(".file-input").click()}
              >
                {image ? (
                  <img src={image} alt="preview" className="img-fluid rounded" style={{ maxHeight: "350px", objectFit: "cover" }} />
                ) : (
                  <div>
                    <div style={{ fontSize: "3.5rem", marginBottom: "1rem", opacity: 0.8 }}>📷</div>
                    <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333", fontWeight: "500" }}>Klik untuk upload foto</p>
                    <small style={{ color: "#6c757d" }}>atau drag & drop file di sini</small>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input d-none" />
              </div>
            </div>
          </div>

          {isLoggedIn && (
            <div className="mb-4 card border-0" style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div className="card-body p-4">
                <label htmlFor="description" className="form-label fw-bold" style={{ color: "#333", marginBottom: "0.8rem" }}>
                  📝 Deskripsi (Opsional)
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  placeholder="Tambahkan catatan untuk prediksi ini..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ borderRadius: "8px", borderColor: "#e9ecef" }}
                ></textarea>
              </div>
            </div>
          )}

          <button
            className="btn w-100 fw-bold mb-4"
            onClick={handlePredict}
            disabled={loading}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "12px 20px",
              fontSize: "1rem",
              borderRadius: "8px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#5a6268")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#6c757d")}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Memproses...
              </>
            ) : (
              "🔮 Prediksi Umur"
            )}
          </button>

          {error && (
            <div className="mb-4 p-4 rounded" style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef", borderLeft: "4px solid #6c757d" }}>
              <p style={{ marginBottom: 0, color: "#495057", fontSize: "0.95rem" }}>
                <strong>⚠️ Error:</strong> {error}
              </p>
            </div>
          )}

          {result && (
            <div className="card border-0" style={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)", backgroundColor: "#ffffff" }}>
              <div className="card-body text-center p-5" style={{ color: "#333" }}>
                <h5 className="card-title mb-4" style={{ fontSize: "1.3rem", fontWeight: "600", color: "#6c757d" }}>
                  ✨ Hasil Prediksi
                </h5>
                <div style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#333" }}>{result.predicted_age_group}</div>
                <p className="mb-4" style={{ fontSize: "1rem", color: "#6c757d" }}>
                  Tahun
                </p>
                <div style={{ backgroundColor: "#f8f9fa", padding: "12px 24px", borderRadius: "8px", display: "inline-block", border: "1px solid #e9ecef" }}>
                  <small style={{ fontSize: "0.95rem", color: "#495057" }}>
                    Confidence: <strong style={{ color: "#333" }}>{(result.confidence * 100).toFixed(2)}%</strong>
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
