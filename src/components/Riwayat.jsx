import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Riwayat() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    const historyData = JSON.parse(localStorage.getItem("predictionHistory") || "[]");

    const userHistory = historyData.filter((h) => h.user === userData?.email);
    setHistory(userHistory);
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
        const allHistory = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
        const updatedHistory = allHistory.filter((h) => h.id !== id);
        localStorage.setItem("predictionHistory", JSON.stringify(updatedHistory));

        const userHistory = updatedHistory.filter((h) => h.user === user?.email);
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
        const allHistory = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
        const updatedHistory = allHistory.filter((h) => h.user !== user?.email);
        localStorage.setItem("predictionHistory", JSON.stringify(updatedHistory));
        setHistory([]);

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Semua riwayat prediksi berhasil dihapus.",
        });
      }
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">📋 Riwayat Prediksi</h1>

      {history.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>Belum ada riwayat prediksi. Mulai prediksi sekarang!</p>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Foto</th>
                  <th>Deskripsi</th>
                  <th>Hasil Prediksi</th>
                  <th>Confidence</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const modal = new window.bootstrap.Modal(document.getElementById("imageModal"));
                          document.getElementById("modalImage").src = item.image;
                          modal.show();
                        }}
                      />
                    </td>
                    <td>{item.description || "-"}</td>
                    <td className="fw-bold text-success">{item.result.predicted_age_group}</td>
                    <td>{(item.result.confidence * 100).toFixed(2)}%</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button className="btn btn-danger" onClick={handleDeleteAll}>
              🗑️ Hapus Semua Riwayat
            </button>
          </div>

          <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="imageModalLabel">
                    Preview Foto
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <img id="modalImage" src="" alt="preview" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
