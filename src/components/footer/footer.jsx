import { useState } from "react";
import "./footer.css";

function Footer() {
  const [openLangBtn, setOpenLangBtn] = useState(false);

  return (
    <footer className="bg-dark text-light pt-5 border-top">
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-12 col-md-3">
            <h5 className="fw-bold">iLoveIMG Clone</h5>
            <p className="text-light">Fast & simple image tools</p>
          </div>

          {/* Tools */}
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold">Tools</h6>
            <ul className="list-unstyled">
              <li><a href="/compress-image" className="footer-link">Compress Images</a></li>
              <li><a href="/resize-image" className="footer-link">Resize Images</a></li>
              <li><a href="/crop-image" className="footer-link">Crop Images</a></li>
              <li><a href="/convert-to-jpg" className="footer-link">Convert to JPG</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">API Docs</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Privacy</a></li>
            </ul>
          </div>

          {/* App Store */}
          <div className="col-12 col-md-3 text-md-end">
            <img
              className="p-2"
              src="https://www.iloveimg.com/img/logos/google_play_w.svg"
              alt="Google Play"
            />
            <img
              className="p-2"
              src="https://www.iloveimg.com/img/logos/app_store_w.svg"
              alt="App Store"
            />
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="footer-bottom mt-4 pt-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-center"
          onMouseLeave={() => setOpenLangBtn(false)}
        >
          {/* Language Dropdown */}
          <div
            className="btn btn-outline-light position-relative"
            onMouseEnter={() => setOpenLangBtn(true)}
          >
            English
            {openLangBtn && (
              <div className="languageContent position-absolute bg-dark  border p-3 mt-2 rounded">
                <ul className="list-unstyled m-0" style={{ columns: 2 }}>
                  <li>English</li>
                  <li>Español</li>
                  <li>Français</li>
                  <li>Deutsch</li>
                  <li>Italiano</li>
                  <li>Português</li>
                  <li>日本語</li>
                  <li>Pусский</li>
                  <li>한국어</li>
                  <li>中文 (简体)</li>
                  <li>中文 (繁體)</li>
                  <li>العربية</li>
                  <li>Български</li>
                  <li>Català</li>
                  <li>Nederlands</li>
                  <li>Ελληνικά</li>
                  <li>हिन्दी</li>
                  <li>Bahasa Indonesia</li>
                  <li>Bahasa Melayu</li>
                  <li>Polski</li>
                  <li>Svenska</li>
                  <li>ภาษาไทย</li>
                  <li>Türkçe</li>
                  <li>Українська</li>
                  <li>Tiếng Việt</li>
                </ul>
              </div>
            )}
          </div>

          {/* Social + Copy */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            <a href="#" className="text-light"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="text-light"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-light"><i className="fab fa-linkedin"></i></a>
            <p className="mb-0 small text-light">
              © iLoveIMG 2025 ® - Your Image Editor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
