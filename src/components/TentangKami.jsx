import React, { useState, useEffect } from "react";
import "./TentangKami.css";

export default function TentangKami() {
  const [ageStats, setAgeStats] = useState({
    "1-10": 0,
    "11-20": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "60+": 0,
  });

  useEffect(() => {
    // Calculate age group percentages from prediction history
    const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    
    if (history.length === 0) {
      // Default distribution if no data
      setAgeStats({
        "1-10": 15,
        "11-20": 15,
        "21-30": 20,
        "31-40": 20,
        "41-50": 15,
        "51-60": 10,
        "60+": 5,
      });
      return;
    }

    const counts = {
      "1-10": 0,
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "60+": 0,
    };

    history.forEach((item) => {
      const ageGroup = item.result?.predicted_age_group;
      if (ageGroup && counts.hasOwnProperty(ageGroup)) {
        counts[ageGroup]++;
      }
    });

    const total = history.length;
    const percentages = {};
    Object.keys(counts).forEach((key) => {
      percentages[key] = Math.round((counts[key] / total) * 100);
    });

    setAgeStats(percentages);
  }, []);
  return (
    <div className="tentang-container">
      <main className="tentang-main">
        <div className="main-top">
          <img src="/Logo.png" alt="Large Logo" className="main-logo" />
          <h2 className="main-title">Nourriture</h2>

          <div className="main-description">
            Nourriture adalah aplikasi berbasis kecerdasan buatan yang digunakan untuk memprediksi umur seseorang melalui foto wajah. Aplikasi ini adalah penerapan teknologi computer vision dan machine learning yang diintegrasikan ke dalam antarmuka web berbasis React sehingga mudah digunakan dan menampilkan estimasi umur secara real-time. Nourriture adalah solusi yang bermanfaat bagi pengguna awam untuk memperkirakan umur dengan cepat, bagi pemerintah sebagai alat pendukung analisis dan verifikasi usia, serta bagi peneliti sebagai media pengembangan dan pengujian metode computer vision dan machine learning.
          </div>

          <div className="main-contact">
            Email : nourriture@gmail.com
            <br />
            No.Telp : +62 876 5432 1111
          </div>

        </div>

        <div className="separator" />

        <div className="progress-list">
          <div className="progress-row">
            <div className="progress-label">1-10 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["1-10"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["1-10"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">11-20 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["11-20"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["11-20"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">21-30 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["21-30"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["21-30"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">31-40 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["31-40"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["31-40"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">41-50 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["41-50"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["41-50"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">51-60 Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["51-60"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["51-60"]}%</div>
          </div>
          <div className="progress-row">
            <div className="progress-label">60+ Tahun</div>
            <div className="progress-bar"><div style={{width: `${ageStats["60+"]}%`}} className="progress-fill"></div></div>
            <div className="progress-percent">{ageStats["60+"]}%</div>
          </div>
        </div>

        <h3 className="section-title">Tim Kami</h3>
          <div className="team-grid">
            <div className="team-card">
              <img src="/team/justyn.jpg" alt="Justyn Cannavaro" className="team-photo" />
              <div className="team-name">Justyn Cannavaro</div>
              <div className="team-role">Team Member</div>
            </div>
            <div className="team-card">
              <img src="/team/jessly.jpg" alt="Jessly Kimiko" className="team-photo" />
              <div className="team-name">Jessly Kimiko</div>
              <div className="team-role">Team Member</div>
            </div>
            <div className="team-card">
              <img src="/team/fernando.jpg" alt="Fernando Antonius" className="team-photo" />
              <div className="team-name">Fernando Antonius</div>
              <div className="team-role">Team Member</div>
            </div>
            <div className="team-card">
              <img src="/team/variel.jpg" alt="Variel Axcelino White Jemus" className="team-photo" />
              <div className="team-name">Variel Axcelino White Jemus</div>
              <div className="team-role">Team Member</div>
            </div>
            <div className="team-card">
              <img src="/team/finelga.jpg" alt="Finelga Hessigawa" className="team-photo" />
              <div className="team-name">Finelga Hessigawa</div>
              <div className="team-role">Team Member</div>
            </div>
          </div>
      </main>
    </div>
  );
}
