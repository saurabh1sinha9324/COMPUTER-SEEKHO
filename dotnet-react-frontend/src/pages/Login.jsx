import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>;

const Login = () => {
  const [staff_username, setUsername] = useState("");
  const [staff_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  // -----------------
  //       sessionStorage.setItem("isLoggedIn", "true");

  const staffData = {
    staffId: 1,
    photoUrl: "/students/dac_March24/ABHISHEK KARMORE_SMVITA.jpg",
    staffEmail: "abhishek.karmore@example.com",
    staffMobile: "9876543210",
    staffName: "Abhishek Karmore",
    staffRole: "Teaching Staff",
    staffUsername: "abhishek.karmore@example.com"
  };

  localStorage.setItem("staffData", JSON.stringify(staffData));

  //       // ---------------------

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7094/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffUsername: staff_username,
          password: staff_password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        // localStorage.setItem(
        //   "staffData",
        //   JSON.stringify({
        //     staffName: data.staffName,
        //     role: data.role,
        //     staffUsername: staff_username,
        //   })
        // );
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/admin");
      } else {
        setError("❌ Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-glass-card fancy">
        <h2 className="login-title">🚀 Staff Login</h2>
        <p className="login-subtitle">
          Welcome back! Enter credentials to proceed
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={staff_username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={staff_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="glow-button">
            ✨ Login
          </button>
        </form>

        <p className="login-footer-text">Need help? Contact admin support.</p>
      </div>
    </div>
  );
};

export default Login;
