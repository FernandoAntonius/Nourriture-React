import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-copyright">© 2026 Nourriture All rights reserved.</p>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <a href="#tentang">Tentang</a>
            <a href="#kontak">Kontak</a>
          </div>
          
          <div className="footer-social">
            <a href="#facebook" className="social-link" aria-label="Facebook">f</a>
            <a href="#twitter" className="social-link" aria-label="Twitter">𝕏</a>
            <a href="#github" className="social-link" aria-label="GitHub">⚙</a>
          </div>
        </div>
      </div>
    </footer>
  );
}