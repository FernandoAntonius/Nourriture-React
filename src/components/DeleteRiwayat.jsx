import React from "react";

export default function DeleteRiwayat({ id, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus riwayat ini?")) {
      onDelete(id);
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      🗑️ Hapus
    </button>
  );
}
