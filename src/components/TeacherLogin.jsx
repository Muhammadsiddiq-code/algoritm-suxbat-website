import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./TeacherLogin.css";

function TeacherLogin({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/teacher/login`, {
        login,
        password,
      });
      onLogin(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="teacher-login">
      <div className="login-card">
        <h1>O'qituvchi paneli</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Loginni kiriting"
              required
            />
          </div>
          <div className="form-group">
            <label>Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolni kiriting"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
