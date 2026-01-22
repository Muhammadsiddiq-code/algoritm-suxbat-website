// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import AdminPanel from "./components/AdminPanel";
// import UserPage from "./components/UserPage";
// import QuizPage from "./components/QuizPage";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav className="navbar">
//           <Link to="/admin">Admin Panel</Link>
//           <Link to="/">User Page</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<UserPage />} />
//           <Route path="/admin" element={<AdminPanel />} />
//           <Route path="/quiz/:categoryId" element={<QuizPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;














import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";
import GroupsManagement from "./components/GroupsManagement";
import CategoriesSelect from "./components/CategoriesSelect";
import TeacherQuiz from "./components/TeacherQuiz";
import StudentProfile from "./components/StudentProfile";
import "./App.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";

// Yangi Sidebar komponenti
function Sidebar({ teacher, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!teacher) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-sidebar">
      <div className="sidebar-header">
        <h2>Teacher Panel</h2>
        <p className="teacher-name">{teacher.fullName}</p>
      </div>

      <div className="sidebar-menu">
        <button
          className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <span className="icon">
            <LuLayoutDashboard />
          </span>{" "}
          Dashboard
        </button>
        <button
          className={`menu-item ${isActive("/groups") ? "active" : ""}`}
          onClick={() => navigate("/groups")}
        >
          <span className="icon">
            <MdGroups />
          </span>{" "}
          Guruhlar
        </button>
        {/* Qo'shimcha menyular shu yerga qo'shiladi */}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <span className="icon">
            <GiExitDoor />
          </span>{" "}
          Chiqish
        </button>
      </div>
    </div>
  );
}

function App() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacher");
    if (savedTeacher) {
      setTeacher(JSON.parse(savedTeacher));
    }
  }, []);

  const handleLogin = (teacherData) => {
    setTeacher(teacherData);
    localStorage.setItem("teacher", JSON.stringify(teacherData));
  };

  const handleLogout = () => {
    setTeacher(null);
    localStorage.removeItem("teacher");
  };

  return (
      <div className="app-container">
        {/* Agar teacher tizimga kirgan bo'lsa, Sidebar ko'rinadi */}
        {teacher && <Sidebar teacher={teacher} onLogout={handleLogout} />}

        {/* Asosiy kontent qismi */}
        <div className={teacher ? "main-content" : "full-content"}>
          <Routes>
            <Route
              path="/"
              element={
                teacher ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <TeacherLogin onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                teacher ? (
                  <TeacherDashboard teacher={teacher} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/groups"
              element={
                teacher ? (
                  <GroupsManagement teacher={teacher} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/categories"
              element={teacher ? <CategoriesSelect /> : <Navigate to="/" />}
            />
            <Route
              path="/quiz/:categoryId"
              element={
                teacher ? (
                  <TeacherQuiz teacher={teacher} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/student-profile/:studentId"
              element={teacher ? <StudentProfile /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
  );
}

export default App;