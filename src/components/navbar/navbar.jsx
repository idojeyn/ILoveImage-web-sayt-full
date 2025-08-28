import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const categoryColors = {
  Optimize: "green",
  Create: "feolet",
  Edit: "blue",
  Convert: "yellow",
  Security: "dark",
};

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openHelp, setOpenHelp] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [user, setUser] = useState(null);
  const { tools } = useSelector((state) => state.tools);

  // unique kategoriyalarni olish
  const categories = [...new Set(tools.map((t) => t.category))];

  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const mainTools = tools.filter((t) =>
    ["Compress IMAGE", "Resize IMAGE", "Crop IMAGE", "Convert to JPG", "Photo editor"].includes(t.title)
  );

  useEffect(() => {
    if (isAuth) {
      fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch((err) => console.error(err));
    }
  }, [isAuth]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm px-3">
      <a className="navbar-brand me-5" href="#">
        <img
          src="https://latestlogo.com/wp-content/uploads/2024/01/ilove-img-logo.svg"
          alt="logo"
          width="150"
        />
      </a>

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {mainTools.map((tool) => (
          <li key={tool.id} className="nav-item px-3">
            <Link className="nav-link" to={tool.path}>
              {tool.title.toUpperCase()}
            </Link>
          </li>
        ))}
        {/* More tools dropdown */}
        <li className="nav-item dropdown hover-dropdown">
          <a
            className="nav-link dropdown-toggle fw-semibold"
            role="button"
            data-bs-toggle="dropdown"
          >
            MORE TOOLS
          </a>
          <div
            className="dropdown-menu dropdown-menu-end p-3 shadow-lg"
            style={{ width: 950 }}
          >
            <div className="row">
              {categories.map((category) => (
                <div key={category} className={`col ${categoryColors[category]}`}>
                  <h6 className="dropdown-header">{category.toUpperCase()}</h6>
                  {tools
                    .filter((t) => t.category === category)
                    .map((tool) => (
                      <a
                        key={tool.id}
                        className="dropdown-item"
                        href={tool.path}
                      >
                        <i className={`${tool.icon} me-2`}></i>
                        {tool.title}
                      </a>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </li>
      </ul>

      {/* Right section */}
      <div className="d-flex align-items-center" onMouseLeave={() => setOpen(false)}>
        {!isAuth ? (
          <>
            <Link to="/login" className="btn btn-link text-dark me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary text-light me-3">Sign up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="me-3">
              <img
                src={
                  user?.image
                    ? "http://localhost:3000/" + user.image
                    : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                }
                alt="avatar"
                className="rounded-circle border"
                width="40"
                height="40"
              />
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger me-3">Logout</button>
          </>
        )}
        <div className="position-relative">
          <i className="fas fa-list fa-2x" onMouseEnter={() => setOpen(true)} role="button"></i>
          {open && (
            < div className="position-absolute end-0 mt-1 dropdown p-3 bg-white shadow rounded" style={{ width: "650px" }}>
              {/* Left */}
              <div className="row left">
                <div className={`col-8 ${openHelp || openLang ? "blurred" : ""}`}>
                  <h6 className="text-muted ">OTHER PRODUCTS</h6>
                  <div className="d-flex align-items-center p-2 rounded hover-bg">
                    <img src="https://play-lh.googleusercontent.com/ORe-eRjZn-TA4nWnM8Sb7B-ykQQhDfoNhbpzPSOSNOFnhI2H6i071eBI2myRFJl5AV0" width="32" className="me-2" />
                    <div><strong>iLovePDF</strong><br /><small>Simplify document management</small></div>
                  </div>
                  <div className="d-flex align-items-center p-2 rounded hover-bg">
                    <img src="https://play-lh.googleusercontent.com/ORe-eRjZn-TA4nWnM8Sb7B-ykQQhDfoNhbpzPSOSNOFnhI2H6i071eBI2myRFJl5AV0" width="32" className="me-2" />
                    <div><strong>iLovePDF</strong><br /><small>Simplify document management</small></div>
                  </div>
                  <div className="d-flex align-items-center p-2 rounded hover-bg">
                    <img src="https://play-lh.googleusercontent.com/ORe-eRjZn-TA4nWnM8Sb7B-ykQQhDfoNhbpzPSOSNOFnhI2H6i071eBI2myRFJl5AV0" width="32" className="me-2" />
                    <div><strong>iLovePDF</strong><br /><small>Simplify document management</small></div>
                  </div>
                  <div className="integration">
                    <strong>Integrations</strong><br />
                    Zapier, Make, Wordpress...
                  </div>
                </div>
                {/* Right */}
                <div className="col-4 border-start right" onMouseLeave={() => { setOpenHelp(false); setOpenLang(false) }}>
                  <a href="#" className="d-block py-2"><i className="far fa-credit-card"></i> Pricing</a>
                  <a href="#" className="d-block py-2"><i className="fas fa-user-shield"></i> Security</a>
                  <a href="#" className="d-block py-2"><i className="fas fa-wand-magic-sparkles"></i> Features</a>
                  <a href="#" className="d-block py-2"><i className="fas fa-heart-pulse"></i> About us</a>
                  <div className="border-top my-2"></div>
                  <div className="droop" >
                    <p role="button" className="m-0 py-2" onMouseEnter={() => { setOpenHelp(true); setOpenLang(false) }}><i class="fas fa-angle-left"></i> Help</p>
                    {openHelp && (
                      <div className="help-content">
                        <a href="#"><i className="far fa-circle-question"></i> FAQ</a>
                        <a href="#"><i className="fas fa-book"></i> Tools</a>
                        <a href="#"><i className="fas fa-scale-unbalanced"></i> Legal & Privacy</a>
                        <a href="#"><i className="far fa-envelope"></i> Contact</a>
                      </div>
                    )}
                    <p role="button" className="m-0 py-2" onMouseEnter={() => { setOpenLang(true); setOpenHelp(false) }}><i class="fas fa-angle-left"></i> Language</p>
                    {openLang && (
                      <div className="language-content">
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
