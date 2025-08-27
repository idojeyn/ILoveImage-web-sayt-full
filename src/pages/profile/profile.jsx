import { useEffect, useState } from "react";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/user", {
      headers: { Authorization: "Token " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFormData({
          username: data.user.username,
          email: data.user.email,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ user: formData }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setShowProfileModal(false);
        setShowEmailModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      {!user ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="account-page">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <h2>Profile</h2>
            <ul>
              <li className="active">My account</li>
              <li>Security</li>
              <li className="divider">Settings</li>
              <li>Last tasks</li>
              <li className="divider">Billing</li>
              <li>Plans & Packages</li>
              <li>Business details</li>
              <li>Invoices</li>
            </ul>
          </aside>

          <main className="account-content">
            <h2>My account</h2>
            <div className="cards-grid">
              {/* Profile Card */}
              <div className="card">
                <div className="card-header">
                  <h3>Profile</h3>
                  <button className="link-btn" onClick={() => setShowProfileModal(true)}>Change</button>
                </div>
                <p><b>Name:</b> {user.username}</p>
                <a href="#">Business details</a><br />
                <a href="#">Plans & Packages</a>
              </div>

              {/* Social Links */}
              <div className="card">
                <div className="card-header">
                  <h3>Social links</h3>
                </div>
                <p>Connect your social accounts to log in through Facebook or Google.</p>
                <p>{user.email}</p>
                <div className="social-icons">
                  <button>🌐</button>
                </div>
              </div>

              {/* Email */}
              <div className="card full">
                <div className="card-header">
                  <h3>Email</h3>
                  <button className="link-btn" onClick={() => setShowEmailModal(true)}>Change</button>
                </div>
                <p><b>Current email:</b> {user.email}</p>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="modal-actions">
              <button onClick={updateProfile}>Save</button>
              <button className="cancel" onClick={() => setShowProfileModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Email</h3>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="modal-actions">
              <button onClick={updateProfile}>Save</button>
              <button className="cancel" onClick={() => setShowEmailModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile