import React from "react";
import "./Footer.css";

export default function Footer() {
  const resources = [
    {
      name: "GitHub Backend (Flask)",
      href: "https://github.com/FernandoAntonius/Nourriture-Python",
    },
    {
      name: "GitHub Backend (API)",
      href: "https://github.com/FernandoAntonius/Nourriture-Laravel",
    },
    {
      name: "GitHub Frontend (React)",
      href: "https://github.com/FernandoAntonius/Nourriture-React",
    },
    {
      name: "Deployment Backend (API)",
      href: "https://nourriture-laravel.vercel.app/",
    },
    {
      name: "Deployment Frontend (React)",
      href: "https://nourriture-react.vercel.app/",
    },
    { name: "GitBook", href: "https://nourriture.gitbook.io/nourriture" },
    {
      name: "Model Source",
      href: "https://huggingface.co/nateraw/vit-age-classifier",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-header">
          <h3 className="footer-title">Jelajahi Sumber Daya Kami</h3>
          <h2 className="footer-heading">Tautan Cepat & Sumber Daya</h2>
        </div>

        <div className="footer-resources-grid">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.href}
              className="resource-link"
              target="_blank"
              rel="noopener noreferrer">
              <span className="resource-icon">›</span>
              {resource.name}
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Nourriture All rights reserved.
          </p>
          <div className="footer-action-links">
            <a href="#tentang" className="action-link tentang-link">
              Tentang
            </a>
            <a href="#kontak" className="action-link kontak-link">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
