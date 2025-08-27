import { useState } from "react";
import './footer.css'
function Footer() {
    const [openLangBtn, setOpenLangBtn] = useState(false);

    return (
        <footer className="bg-dark text-light pt-5 border-top" style={{height:"400px"}}>
            <div className="container">
                <div className="row">

                    {/* Brand */}
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold">iLoveIMG Clone</h5>
                        <p className="text-light">Fast & simple image tools</p>
                    </div>

                    {/* Tools */}
                    <div className="col-6 col-md-2 mb-4">
                        <h6 className="fw-semibold">Tools</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-light">Compress Images</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Resize Images</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Crop Images</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Convert to JPG</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-6 col-md-2 mb-4">
                        <h6 className="fw-semibold">Resources</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-light">Help Center</a></li>
                            <li><a href="#" className="text-decoration-none text-light">API Docs</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Blog</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-6 col-md-2 mb-4">
                        <h6 className="fw-semibold">Company</h6>
                        <ul className="list-unstyled ">
                            <li><a href="#" className="text-decoration-none text-light">About</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Careers</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Privacy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-md-3 mb-4">
                        <img className="p-2" src="https://www.iloveimg.com/img/logos/google_play_w.svg" alt="play" />
                        <img className="p-2"  src="https://www.iloveimg.com/img/logos/app_store_w.svg" alt="app" />
                    </div>
                </div>

                {/* Bottom row */}
                <div className="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-3 mt-3" onMouseLeave={()=>setOpenLangBtn(false)}>
                    <div className="btn btn-outline-light" onMouseEnter={()=>setOpenLangBtn(true)}>English</div>
                    {openLangBtn && (
                      <div className="languageContent">
                        <ul>
                          <li>English</li><li>Español</li><li>Français</li>
                          <li>Deutsch</li><li>Italiano</li><li>Português</li>
                          <li>日本語</li><li>Pусский</li><li>한국어</li>
                          <li>中文 (简体)</li><li>中文 (繁體)</li><li>العربية</li>
                          <li>Български</li><li>Català</li><li>Nederlands</li>
                          <li>Ελληνικά</li><li>हिन्दी</li><li>Bahasa Indonesia</li>
                          <li>Bahasa Melayu</li><li>Polski</li><li>Svenska</li>
                          <li>ภาษาไทย</li><li>Türkçe</li><li>Українська</li>
                          <li>Tiếng Việt</li>
                        </ul>
                      </div>
                    )}
                    <div className="d-flex gap-3">
                        <a href="#" className="text-light"><i className="fab fa-x-twitter"></i></a>
                        <a href="#" className="text-light"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="text-light"><i className="fab fa-linkedin"></i></a>
                        <p className="mb-2 mb-md-0 text-light">© iLoveIMG 2025 ® - Your Image Editor</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer