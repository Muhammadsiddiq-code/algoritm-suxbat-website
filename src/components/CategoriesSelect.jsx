// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../config";
// import "./CategoriesSelect.css";

// function CategoriesSelect() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const student = location.state?.student;

//   useEffect(() => {
//     if (!student) {
//       navigate("/dashboard");
//       return;
//     }
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/teacher/categories`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const selectCategory = (categoryId) => {
//     navigate(`/quiz/${categoryId}`, { state: { student } });
//   };

//   if (!student) return null;

//   return (
//     <div className="categories-select-page">
//       <div className="page-header">
//         <button className="back-btn" onClick={() => navigate("/dashboard")}>
//           ← Orqaga
//         </button>
//         <div className="student-info-banner">
//           <h2>O'quvchi: {student.fullName}</h2>
//           <p>Suhbat o'tkazish uchun bo'limni tanlang</p>
//         </div>
//       </div>

//       <div className="categories-grid">
//         {categories.map((cat) => (
//           <div
//             key={cat.id}
//             className="category-card"
//             onClick={() => selectCategory(cat.id)}
//           >
//             <div className="card-icon">📚</div>
//             <h3>{cat.name}</h3>
//             <button>Suhbat boshlash</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoriesSelect;













import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./CategoriesSelect.css";
import imgTechnova from "../assets/technova_3.png"

function CategoriesSelect() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  useEffect(() => {
    if (!student) {
      navigate("/dashboard");
      return;
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const selectCategory = (categoryId) => {
    navigate(`/quiz/${categoryId}`, { state: { student } });
  };

  if (!student) return null;

  return (
    <div className="categories-select-page">
      <div className="webapp-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <span className="icon">←</span> Back
        </button>
        <div className="header-content">
          <h1>Select Category</h1>
          <p>
            Student: <strong>{student.fullName}</strong>
          </p>
        </div>
      </div>

      <div className="categories-container">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => selectCategory(cat.id)}
          >
            <div className="card-content">
              <div className="card-icon">
                <img
                  src={imgTechnova}
                  alt=""
                />
              </div>
              <h3>{cat.name}</h3>
              <span className="action-text">Start Interview →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSelect;