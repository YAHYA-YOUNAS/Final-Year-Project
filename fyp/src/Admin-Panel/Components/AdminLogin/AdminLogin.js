import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "font-awesome/css/font-awesome.min.css";
import { loginAdmin } from "../../Services/adminLoginService";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState(() => {
    const saved = localStorage.getItem("AdminID");
    return saved || false;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form Handling
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };

    // API handling
    const adminData = async (data) => {
      const result = await loginAdmin(data);
      if (result) {
        setAdminId(true);
      }
    };

    adminData(data);
  };

  return (
    <>
      {adminId === false ? (
        <div className="admin-login-page">
          <div className="login-key">
            <i className="fa fa-key" />
          </div>
          <div className="login-title">ADMIN PANEL</div>
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <button type="submit" className="admin-login-button">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
