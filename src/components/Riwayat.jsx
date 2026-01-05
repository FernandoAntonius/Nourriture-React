import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Riwayat.css";

export default function Riwayat() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        if (userData?.id) {
          const response = await axios.get(
            `https://nourriture-laravel.vercel.app/api/api/histories?user_id=${userData.id}`
          );

          // Transform backend data to match component structure
          const transformedHistory = response.data.map((item) => ({
            id: item.id,
            name: item.name,
            predicted_age_group: item.predicted_age_group,
            confidence: item.confidence,
            description: item.description,
            user_id: item.user_id,
            created_at: item.created_at,
          }));

          setHistory(transformedHistory);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Hapus Prediksi?",
      text: "Apakah Anda yakin ingin menghapus prediksi ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://nourriture-laravel.vercel.app/api/api/histories/${id}`
          );
          setHistory(history.filter((h) => h.id !== id));
          Swal.fire({
            icon: "success",
            title: "Terhapus!",
            text: "Prediksi berhasil dihapus.",
          });
        } catch (error) {
          console.error("Error deleting history:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal menghapus prediksi.",
          });
        }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete all predictions for this user
          await Promise.all(
            history.map((h) =>
              axios.delete(
                `https://nourriture-laravel.vercel.app/api/api/histories/${h.id}`
              )
            )
          );
          setHistory([]);
          Swal.fire({
            icon: "success",
            title: "Terhapus!",
            text: "Semua riwayat prediksi berhasil dihapus.",
          });
        } catch (error) {
          console.error("Error deleting all history:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal menghapus riwayat prediksi.",
          });
        }
      }
    });
  };

  const calculateStats = () => {
    if (history.length === 0) return null;

    const totalPredictions = history.length;
    const averageConfidence = (
      (history.reduce((sum, h) => sum + h.confidence, 0) / history.length) *
      100
    ).toFixed(0);
    const latestDate = history.length > 0 ? history[0].created_at : "-";

    return {
      total: totalPredictions,
      confidence: averageConfidence,
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

      {loading ? (
        <div className="riwayat-empty">
          <div className="empty-icon">⏳</div>
          <h3>Memuat Riwayat...</h3>
          <p>Mohon tunggu sebentar</p>
        </div>
      ) : history.length === 0 ? (
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
              <div className="summary-value">{stats.confidence}%</div>
              <div className="summary-label">Rata-rata Confidence</div>
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
                <div className="card-index">#{history.indexOf(item) + 1}</div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="card-name">
                      👤 {item.name || "Tanpa Nama"}
                    </span>
                    <span className="card-date">📅 {item.created_at}</span>
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
                        {item.predicted_age_group}
                      </span>
                      <div className="result-progress">
                        <div
                          className="result-bar"
                          style={{
                            width: `${item.confidence * 100}%`,
                          }}></div>
                      </div>
                      <span className="result-percentage">
                        {(item.confidence * 100).toFixed(1)}%
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

          {/* Removed Image Modal since images are not stored in backend */}
        </>
      )}
    </div>
  );
}
