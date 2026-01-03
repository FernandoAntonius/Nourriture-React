import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

export default function Riwayat() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("predictions");
    if (saved) {
      setPredictions(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Riwayat?",
      text: "Apakah Anda yakin ingin menghapus riwayat ini? Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = predictions.filter((p) => p.id !== id);
        setPredictions(updated);
        localStorage.setItem("predictions", JSON.stringify(updated));
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Riwayat prediksi telah dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">📋 Riwayat Prediksi</h1>

      {predictions.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Belum ada riwayat prediksi. <a href="/predict">Mulai prediksi sekarang!</a>
        </div>
      ) : (
        <div className="row">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow">
                <div style={{ width: "100%", height: "250px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
                  <img
                    src={prediction.image}
                    alt="Prediction"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Usia: <span className="badge bg-success">{prediction.age} Tahun</span>
                  </h5>
                  {prediction.description && (
                    <p className="card-text" style={{ fontSize: "14px", color: "#555", minHeight: "40px" }}>
                      {prediction.description}
                    </p>
                  )}
                  <small className="text-muted">Tanggal: {prediction.timestamp}</small>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(prediction.id)}>
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
