import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./navbar.css"; // CSS fayl kerak — pastda berilgan
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Kategoriyalar ranglari
const categoryColors = {
  Optimize: "green",
  Create: "feolet",
  Edit: "blue",
  Convert: "yellow",
  Security: "dark",
};

const Navbar = () => {
  const [openTools, setOpenTools] = useState(false); // chap menyu
  const [openUser, setOpenUser] = useState(false);   // o‘ng menyu
  const [openHelp, setOpenHelp] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [user, setUser] = useState(null);
  const { tools } = useSelector((state) => state.tools);

  // Unique kategoriyalar
  const categories = [...new Set(tools.map((t) => t.category))];

  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Asosiy 5 ta asbob
  const mainTools = tools.filter((t) =>
    ["Compress IMAGE", "Resize IMAGE", "Crop IMAGE", "Convert to JPG", "Photo editor"].includes(t.title)
  );

  // Foydalanuvchi ma'lumotlarini olish
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

  useEffect(() => {
    if (openTools || openUser) {
      // Sidebar ochilganda — scrollni bloklash
      document.body.style.overflow = "hidden";
    } else {
      // Sidebar yopilganda — scrollni qaytarish
      document.body.style.overflow = "auto";
    }
  
    // Tozalash — komponent o‘chirilganda
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openTools, openUser]); 

  // Tashqaridan bosilganda menyuni yopish
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".tools-menu") && !e.target.closest(".tools-trigger")) {
        setOpenTools(false);
      }
      if (!e.target.closest(".user-menu") && !e.target.closest(".user-trigger")) {
        setOpenUser(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top shadow-sm px-3">
      {/* 🔹 Chapdagi "More Tools" tugmasi (faqat mobil) */}
      <div className="me-auto tools-trigger">
        <button
          className="btn btn-link text-dark d-md-none"
          onClick={(e) => {
            e.stopPropagation();
            setOpenTools(!openTools);
            setOpenUser(false);
          }}
          aria-label="More Tools"
        >
          <i className="fas fa-toolbox fa-lg"></i>
        </button>
      </div>

      {/* 🔹 Markazda — Logo */}
      <Link className="navbar-brand mx-auto mx-md-0" to="/">
        <img
          src="https://latestlogo.com/wp-content/uploads/2024/01/ilove-img-logo.svg"
          alt="logo"
          width="150"
        />
      </Link>

      {/* 🔹 O‘ngdagi "User Menu" tugmasi (faqat mobil) */}
      <div className="ms-auto user-trigger">
        <button
          className="btn btn-link text-dark d-md-none"
          onClick={(e) => {
            e.stopPropagation();
            setOpenUser(!openUser);
            setOpenTools(false);
          }}
          aria-label="Menu"
        >
          <i className="fas fa-ellipsis-v fa-lg"></i>
        </button>
      </div>

      {/* 💻 Desktop menyu — faqat katta ekranda ko‘rinadi */}
      <div className="collapse navbar-collapse d-none d-md-flex" id="navbarDesktop">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {mainTools.map((tool) => (
            <li key={tool.id} className="nav-item px-3">
              <Link className="nav-link" to={tool.path}>
                {tool.title.toUpperCase()}
              </Link>
            </li>
          ))}
          {/* More Tools dropdown — faqat desktopda */}
          <li className="nav-item dropdown hover-dropdown">
            <a
              className="nav-link dropdown-toggle fw-semibold"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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

        {/* Desktop o‘ng tomon — Login / Profil / Logout */}
        <div className="d-flex align-items-center">
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
          {/* Desktopda "More" tugmasi */}
          <div className="position-relative">
            <i
              className="fas fa-list fa-2x"
              onMouseEnter={() => setOpenTools(true)}
              onMouseLeave={() => setOpenTools(false)}
              role="button"
            ></i>
            {openTools && (
              <div className="position-absolute end-0 mt-1 dropdown p-3 bg-white shadow rounded" style={{ width: "650px" }}>
                <div className="row left">
                  <div className={`col-8 ${openHelp || openLang ? "blurred" : ""}`}>
                    <h6 className="text-muted">OTHER PRODUCTS</h6>
                    <div className="d-flex align-items-center p-2 rounded hover-bg">
                      <img src="https://play-lh.googleusercontent.com/ORe-eRjZn-TA4nWnM8Sb7B-ykQQhDfoNhbpzPSOSNOFnhI2H6i071eBI2myRFJl5AV0" width="32" className="me-2" />
                      <div><strong>iLovePDF</strong><br /><small>Simplify document management</small></div>
                    </div>
                    <div className="d-flex align-items-center p-2 rounded hover-bg">
                      <img src="https://play-lh.googleusercontent.com/ORe-eRjZn-TA4nWnM8Sb7B-ykQQhDfoNhbpzPSOSNOFnhI2H6i071eBI2myRFJl5AV0" width="32" className="me-2" />
                      <div><strong>iLovePDF</strong><br /><small>Simplify document management</small></div>
                    </div>
                  </div>
                  <div className="col-4 border-start right">
                    <a href="#" className="d-block py-2"><i className="far fa-credit-card"></i> Pricing</a>
                    <a href="#" className="d-block py-2"><i className="fas fa-user-shield"></i> Security</a>
                    <a href="#" className="d-block py-2"><i className="fas fa-wand-magic-sparkles"></i> Features</a>
                    <a href="#" className="d-block py-2"><i className="fas fa-heart-pulse"></i> About us</a>
                    <div className="border-top my-2"></div>
                    <div className="droop">
                      <p
                        role="button"
                        className="m-0 py-2"
                        onClick={() => {
                          setOpenHelp(!openHelp);
                          setOpenLang(false);
                        }}
                      >
                        <i className={`fas fa-angle-${openHelp ? "down" : "right"} me-2`}></i> Help
                      </p>
                      {openHelp && (
                        <div className="help-content ps-3">
                          <a href="#" className="d-block py-1"><i className="far fa-circle-question"></i> FAQ</a>
                          <a href="#" className="d-block py-1"><i className="fas fa-book"></i> Tools</a>
                          <a href="#" className="d-block py-1"><i className="fas fa-scale-unbalanced"></i> Legal & Privacy</a>
                          <a href="#" className="d-block py-1"><i className="far fa-envelope"></i> Contact</a>
                        </div>
                      )}
                      <p
                        role="button"
                        className="m-0 py-2"
                        onClick={() => {
                          setOpenLang(!openLang);
                          setOpenHelp(false);
                        }}
                      >
                        <i className={`fas fa-angle-${openLang ? "down" : "right"} me-2`}></i> Language
                      </p>
                      {openLang && (
                        <div className="language-content ps-3">
                          <ul className="list-unstyled">
                            {[
                              "English", "Español", "Français", "Deutsch", "Italiano",
                              "Português", "日本語", "Pусский", "한국어", "中文 (简体)",
                              "中文 (繁體)", "العربية", "Български", "Català", "Nederlands",
                              "Ελληνικά", "हिन्दी", "Bahasa Indonesia", "Bahasa Melayu", "Polski",
                              "Svenska", "ภาษาไทย", "Türkçe", "Українська", "Tiếng Việt"
                            ].map((lang) => (
                              <li key={lang}>
                                <a href="#" className="d-block py-1">{lang}</a>
                              </li>
                            ))}
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
      </div>

      {/* 📱 MOBIL — CHAPDAN OCHILUVCHI MENYU */}
      <div
        className={`tools-menu position-fixed top-0 start-0 h-100 bg-white shadow-lg transition-transform ${
          openTools ? "translateX-0" : "-translateX-full"
        }`}
        style={{ zIndex: 1050, width: "85%", maxWidth: "320px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-bottom d-flex align-items-center">
          <button
            className="btn btn-link text-dark me-auto"
            onClick={() => setOpenTools(false)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h6 className="m-0">MORE TOOLS</h6>
        </div>
        <div className="p-3">
          {categories.map((category) => (
            <div key={category} className="mb-3">
              <h6 className="text-primary">{category.toUpperCase()}</h6>
              {tools
                .filter((t) => t.category === category)
                .map((tool) => (
                  <div key={tool.id} className="py-1">
                    <Link
                      to={tool.path}
                      className="text-dark d-block"
                      onClick={() => setOpenTools(false)}
                    >
                      <i className={`${tool.icon} me-2`}></i>
                      {tool.title}
                    </Link>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* 📱 MOBIL — O‘NGDAN OCHILUVCHI MENYU */}
      <div
        className={`user-menu position-fixed top-0 end-0 h-100 bg-white shadow-lg transition-transform ${
          openUser ? "translateX-0" : "translateX-full"
        }`}
        style={{ zIndex: 1050, width: "85%", maxWidth: "320px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-bottom d-flex align-items-center">
          <h6 className="m-0 me-auto">MENU</h6>
          <button
            className="btn btn-link text-dark"
            onClick={() => setOpenUser(false)}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="p-3">
          {!isAuth ? (
            <>
              <Link to="/login" className="d-block py-2" onClick={() => setOpenUser(false)}>Login</Link>
              <Link to="/signup" className="d-block py-2 btn btn-primary text-light" onClick={() => setOpenUser(false)}>Sign up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="d-flex align-items-center py-2" onClick={() => setOpenUser(false)}>
                <img
                  src={
                    user?.image
                      ? "http://localhost:3000/" + user.image
                      : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                  }
                  alt="avatar"
                  className="rounded-circle border me-2"
                  width="40"
                  height="40"
                />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpenUser(false);
                }}
                className="btn btn-outline-danger w-100 mt-2"
              >
                Logout
              </button>
            </>
          )}
          <div className="border-top my-3"></div>
          <a href="#" className="d-block py-2"><i className="far fa-credit-card"></i> Pricing</a>
          <a href="#" className="d-block py-2"><i className="fas fa-user-shield"></i> Security</a>
          <a href="#" className="d-block py-2"><i className="fas fa-wand-magic-sparkles"></i> Features</a>
          <a href="#" className="d-block py-2"><i className="fas fa-heart-pulse"></i> About us</a>
          <div className="border-top my-3"></div>
          <button
            className="btn btn-link text-start w-100"
            onClick={() => setOpenHelp(!openHelp)}
          >
            <i className={`fas fa-angle-${openHelp ? "down" : "right"} me-2`}></i> Help
          </button>
          {openHelp && (
            <div className="ps-3">
              <a href="#" className="d-block py-1"><i className="far fa-circle-question"></i> FAQ</a>
              <a href="#" className="d-block py-1"><i className="fas fa-book"></i> Tools</a>
              <a href="#" className="d-block py-1"><i className="fas fa-scale-unbalanced"></i> Legal & Privacy</a>
              <a href="#" className="d-block py-1"><i className="far fa-envelope"></i> Contact</a>
            </div>
          )}
          <button
            className="btn btn-link text-start w-100"
            onClick={() => setOpenLang(!openLang)}
          >
            <i className={`fas fa-angle-${openLang ? "down" : "right"} me-2`}></i> Language
          </button>
          {openLang && (
            <div className="ps-3"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              paddingRight: "8px",
            }}>
              <ul className="list-unstyled">
                {[
                  "English", "Español", "Français", "Deutsch", "Italiano",
                  "Português", "日本語", "Pусский", "한국어", "中文 (简体)",
                  "中文 (繁體)", "العربية", "Български", "Català", "Nederlands",
                  "Ελληνικά", "हिन्दी", "Bahasa Indonesia", "Bahasa Melayu", "Polski",
                  "Svenska", "ภาษาไทย", "Türkçe", "Українська", "Tiếng Việt"
                ].map((lang) => (
                  <li key={lang}>
                    <a href="#" className="d-block py-1">{lang}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Overlay — menyu ochiq bo‘lsa, orqa fon qorayadi */}
      {(openTools || openUser) && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => {
            setOpenTools(false);
            setOpenUser(false);
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;