import React, { useState } from "react";
import axios from "axios";

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
      alert("Silakan upload foto terlebih dahulu");
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
      <h1 className="text-center mb-5">Prediksi Umur Wajah</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4 shadow">
            <div className="card-body p-5">
              <div className="border border-2 border-secondary rounded p-4 text-center bg-light" style={{ cursor: "pointer" }} onClick={() => document.querySelector(".file-input").click()}>
                {image ? (
                  <img src={image} alt="preview" className="img-fluid rounded" style={{ maxHeight: "300px" }} />
                ) : (
                  <div>
                    <div className="display-1 mb-3">📷</div>
                    <p className="text-muted">Klik untuk upload foto</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input d-none" />
              </div>
            </div>
          </div>

          {isLoggedIn && (
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Deskripsi (opsional)
              </label>
              <textarea id="description" className="form-control" rows="3" placeholder="Tambahkan catatan untuk prediksi ini..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          )}

          <button className="btn btn-primary w-100 mb-4" onClick={handlePredict} disabled={loading}>
            {loading ? "Memproses..." : "Prediksi Umur"}
          </button>

          {error && <div className="alert alert-danger mb-4">{error}</div>}

          {result && (
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <h5 className="card-title mb-3">Hasil Prediksi</h5>
                <div className="display-3 fw-bold">{result.predicted_age_group}</div>
                <p className="mb-2">Tahun</p>
                <small>Confidence: {(result.confidence * 100).toFixed(2)}%</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
