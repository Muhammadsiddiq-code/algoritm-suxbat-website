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
  Link,
  Navigate,
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";
import TeacherQuiz from "./components/TeacherQuiz";
import "./App.css";

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
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/admin">Admin Panel</Link>
            {teacher ? (
              <>
                <Link to="/teacher">Teacher Panel</Link>
                <span className="teacher-name">👨‍🏫 {teacher.fullName}</span>
              </>
            ) : (
              <Link to="/">Teacher Login</Link>
            )}
          </div>
          {teacher && (
            <button className="logout-btn" onClick={handleLogout}>
              Chiqish
            </button>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              teacher ? (
                <Navigate to="/teacher" />
              ) : (
                <TeacherLogin onLogin={handleLogin} />
              )
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/teacher"
            element={
              teacher ? (
                <TeacherDashboard teacher={teacher} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/teacher/quiz/:categoryId"
            element={
              teacher ? <TeacherQuiz teacher={teacher} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;