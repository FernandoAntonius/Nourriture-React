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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
        backgroundImage: `linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)`,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "10px" }}>
            🔮 Age Prediction
          </h1>
          <p style={{ fontSize: "16px", color: "#b0b0b0", marginBottom: 0 }}>
            Upload your photo and let AI predict your age
          </p>
        </div>

        {/* Main Content Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            border: "1px solid #e9ecef",
          }}
        >
          {/* Upload Section */}
          <div
            style={{
              marginBottom: "40px",
              padding: "40px",
              borderRadius: "16px",
              backgroundColor: "#f8f9fa",
              border: "2px dashed #0f3460",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#16213e";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#0f3460";
              e.currentTarget.style.backgroundColor = "#f8f9fa";
            }}
            onClick={() => document.querySelector(".file-input").click()}
          >
            {image ? (
              <img
                src={image}
                alt="preview"
                style={{
                  maxHeight: "350px",
                  maxWidth: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem", opacity: 0.8 }}>📷</div>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333", fontWeight: "600" }}>
                  Click to Upload or Drag & Drop
                </p>
                <small style={{ color: "#666", fontSize: "14px" }}>JPG, PNG up to 10MB</small>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" style={{ display: "none" }} />
          </div>

          {/* Description Section */}
          {isLoggedIn && (
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#333" }}>
                📝 Notes (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any notes about this prediction..."
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e9ecef",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  resize: "vertical",
                  minHeight: "100px",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0f3460")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={handlePredict}
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
              marginBottom: "20px",
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: "8px" }}>⏳</span>
                Processing...
              </>
            ) : (
              "PREDICT AGE"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#fee2e2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div
              style={{
                padding: "40px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #f0f9ff 0%, #f3e8ff 100%)",
                border: "2px solid #0f3460",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#0f3460",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                ✨ Prediction Result
              </h3>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                {result.predicted_age_group}
              </div>
              <p style={{ fontSize: "18px", color: "#333", marginBottom: "20px", fontWeight: "500" }}>
                Years Old
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #0f3460",
                }}
              >
                <small style={{ fontSize: "14px", color: "#333" }}>
                  Confidence: <strong style={{ color: "#0f3460" }}>{(result.confidence * 100).toFixed(2)}%</strong>
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
