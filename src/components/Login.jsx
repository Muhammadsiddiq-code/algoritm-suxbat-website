// import React, { useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../config";
// import "./Login.css";

// function Login({ onLogin }) {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!login.trim() || !password.trim()) {
//       alert("Login va parolni kiriting!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${API_BASE_URL}/admin/login`, {
//         login,
//         password,
//       });

//       // tokenni saqlaymiz
//       localStorage.setItem("adminToken", res.data.token);

//       onLogin(); // admin panelga o'tish
//     } catch (error) {
//       alert(error.response?.data?.error || "Login yoki parol noto‘g‘ri");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <form className="login-box" onSubmit={handleSubmit}>
//         <h2>Admin Login</h2>

//         <input
//           type="text"
//           placeholder="Login"
//           value={login}
//           onChange={(e) => setLogin(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Parol"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Kutilmoqda..." : "Kirish"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


























import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./Login.css";

function Login({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      alert("Please enter both username and password!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/admin/login`, {
        login,
        password,
      });

      // Saving the token to local storage
      localStorage.setItem("adminToken", res.data.token);

      onLogin(); // Redirect to admin panel
    } catch (error) {
      alert(error.response?.data?.error || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <div className="login-header">
            <div className="login-logo">🔒</div>
            <h2>Admin Portal</h2>
            <p>Please sign in to continue</p>
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <span className="btn-content">
                <div className="btn-spinner"></div> Processing...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="login-footer">
            <p>&copy; 2024 Secure Assessment System</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;