import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate= useNavigate("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: formData }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful!");
        console.log("SignUp success:", data);
        navigate("/login")
      } else {
        setMessage("❌ " + (data.errors?.body?.join(", ") || "Error"));
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp