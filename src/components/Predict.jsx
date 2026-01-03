import React, { useState } from "react";

export default function Predict() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      
    setTimeout(() => {
      setResult({ age: Math.floor(Math.random() * 60) + 15 });
      setLoading(false);
    }, 1500);
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

          <button className="btn btn-primary w-100 mb-4" onClick={handlePredict} disabled={loading}>
            {loading ? "Memproses..." : "Prediksi Umur"}
          </button>

          {result && (
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <h5 className="card-title mb-3">Hasil Prediksi</h5>
                <div className="display-3 fw-bold">{result.age}</div>
                <p className="mb-0">Tahun</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
