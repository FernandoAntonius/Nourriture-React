import React, { useState } from "react";
import { useAuth } from "../AuthContext";

export default function Profile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    login(formData);
    setIsEditing(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title mb-4 text-center">👤 Profil Saya</h2>

              {!isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama</label>
                    <p className="form-control-plaintext">{formData.name || "-"}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{formData.email}</p>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => setIsEditing(true)}>
                    ✏️ Edit Profil
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      Nama
                    </label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success flex-grow-1" onClick={handleSave}>
                      💾 Simpan
                    </button>
                    <button className="btn btn-secondary flex-grow-1" onClick={() => setIsEditing(false)}>
                      ❌ Batal
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
