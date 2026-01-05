import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Riwayat.css";

export default function Riwayat() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    const historyData = JSON.parse(
      localStorage.getItem("predictionHistory") || "[]"
    );

    if (userData?.email) {
      const userHistory = historyData.filter((h) => h.user === userData.email);
      setHistory(userHistory);
    } else {
      setHistory([]);
    }
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Hapus Prediksi?",
      text: "Apakah Anda yakin ingin menghapus prediksi ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const allHistory = JSON.parse(
          localStorage.getItem("predictionHistory") || "[]"
        );
        const updatedHistory = allHistory.filter((h) => h.id !== id);
        localStorage.setItem(
          "predictionHistory",
          JSON.stringify(updatedHistory)
        );

        const userHistory = updatedHistory.filter(
          (h) => h.user === user?.email
        );
        setHistory(userHistory);

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Prediksi berhasil dihapus.",
        });
      }
    });
  };

  const handleDeleteAll = () => {
    Swal.fire({
      icon: "warning",
      title: "Hapus Semua Riwayat?",
      text: "Apakah Anda yakin ingin menghapus SEMUA riwayat prediksi? Tindakan ini tidak dapat dibatalkan!",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Ya, Hapus Semua",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const allHistory = JSON.parse(
          localStorage.getItem("predictionHistory") || "[]"
        );
        const updatedHistory = allHistory.filter((h) => h.user !== user?.email);
        localStorage.setItem(
          "predictionHistory",
          JSON.stringify(updatedHistory)
        );
        setHistory([]);

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Semua riwayat prediksi berhasil dihapus.",
        });
      }
    });
  };

  const calculateStats = () => {
    if (history.length === 0) return null;

    const totalPredictions = history.length;
    const latestDate = history.length > 0 ? history[0].date : "-";

    return {
      total: totalPredictions,
      latestDate: latestDate,
    };
  };

  const stats = calculateStats();

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div className="riwayat-icon">📋</div>
        <h1 className="riwayat-title">Riwayat Prediksi</h1>
        <p className="riwayat-subtitle">
          Kelola dan tinjau semua prediksi Anda
        </p>
      </div>

      {history.length === 0 ? (
        <div className="riwayat-empty">
          <div className="empty-icon">⚠️</div>
          <h3>Belum Ada Riwayat</h3>
          <p>Mulai prediksi sekarang untuk melihat riwayat Anda di sini!</p>
        </div>
      ) : (
        <>
          {/* Summary Card */}
          <div className="riwayat-summary-card">
            <div className="summary-item">
              <div className="summary-value">{stats.total}</div>
              <div className="summary-label">Total Prediksi</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">{stats.latestDate}</div>
              <div className="summary-label">Prediksi Terakhir</div>
            </div>
          </div>

          {/* Prediction Cards */}
          <div className="riwayat-cards-container">
            {history.map((item, index) => (
              <div key={item.id} className="prediction-card">
                <div className="card-index">#{index + 1}</div>

                <div className="card-image-section">
                  <img
                    src={item.image}
                    alt="prediction"
                    className="card-image"
                    onClick={() => {
                      const modal = new window.bootstrap.Modal(
                        document.getElementById("imageModal")
                      );
                      document.getElementById("modalImage").src = item.image;
                      modal.show();
                    }}
                  />
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="card-name">
                      👤 {item.name || "Tanpa Nama"}
                    </span>
                    <span className="card-date">📅 {item.date}</span>
                    {item.description && (
                      <span className="card-category">
                        <strong>Deskripsi:</strong> {item.description}
                      </span>
                    )}
                  </div>

                  <div className="card-result">
                    <div className="result-label">Hasil Prediksi</div>
                    <div className="result-group">
                      <span className="result-text">
                        {item.result.predicted_age_group}
                      </span>
                      <div className="result-progress">
                        <div
                          className="result-bar"
                          style={{
                            width: `${item.result.confidence}%`,
                          }}></div>
                      </div>
                      <span className="result-percentage">
                        {item.result.confidence.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}>
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="riwayat-footer">
            <button className="btn-delete-all" onClick={handleDeleteAll}>
              🗑️ Hapus Semua Riwayat
            </button>
          </div>

          <div
            className="modal fade"
            id="imageModal"
            tabIndex="-1"
            aria-labelledby="imageModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="imageModalLabel">
                    Preview Foto
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    id="modalImage"
                    src=""
                    alt="preview"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
