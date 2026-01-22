// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminPanel.css";

// const API_URL = "http://localhost:5577/api/admin";

// function AdminPanel() {
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/categories`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const createCategory = async () => {
//     if (!newCategoryName.trim()) return;
//     try {
//       await axios.post(`${API_URL}/categories`, { name: newCategoryName });
//       setNewCategoryName("");
//       fetchCategories();
//     } catch (error) {
//       alert("Xatolik yuz berdi: " + error.response?.data?.error);
//     }
//   };

//   const deleteCategory = async (id) => {
//     if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return;
//     try {
//       await axios.delete(`${API_URL}/categories/${id}`);
//       fetchCategories();
//       setSelectedCategory(null);
//       setQuestions([]);
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   const selectCategory = async (category) => {
//     setSelectedCategory(category);
//     try {
//       const response = await axios.get(`${API_URL}/questions/${category.id}`);
//       setQuestions(response.data);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const addQuestion = async () => {
//     if (!newQuestion.trim() || !selectedCategory) return;
//     try {
//       await axios.post(`${API_URL}/questions`, {
//         text: newQuestion,
//         categoryId: selectedCategory.id,
//       });
//       setNewQuestion("");
//       selectCategory(selectedCategory);
//     } catch (error) {
//       alert("Xatolik: " + error.response?.data?.error);
//     }
//   };

//   const deleteQuestion = async (id) => {
//     if (!window.confirm("Savolni o'chirmoqchimisiz?")) return;
//     try {
//       await axios.delete(`${API_URL}/questions/${id}`);
//       selectCategory(selectedCategory);
//     } catch (error) {
//       console.error("Error deleting question:", error);
//     }
//   };

//   return (
//     <div className="admin-panel">
//       <h1>Admin Panel</h1>

//       <div className="admin-container">
//         <div className="categories-section">
//           <h2>Bo'limlar</h2>
//           <div className="create-category">
//             <input
//               type="text"
//               value={newCategoryName}
//               onChange={(e) => setNewCategoryName(e.target.value)}
//               placeholder="Yangi bo'lim nomi"
//             />
//             <button onClick={createCategory}>Yaratish</button>
//           </div>

//           <div className="categories-list">
//             {categories.map((cat) => (
//               <div
//                 key={cat.id}
//                 className={`category-item ${
//                   selectedCategory?.id === cat.id ? "active" : ""
//                 }`}
//               >
//                 <span onClick={() => selectCategory(cat)}>
//                   {cat.name} ({cat.Questions?.length || 0} ta savol)
//                 </span>
//                 <button onClick={() => deleteCategory(cat.id)}>
//                   O'chirish
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="questions-section">
//           {selectedCategory ? (
//             <>
//               <h2>{selectedCategory.name} - Savollar</h2>
//               <div className="add-question">
//                 <textarea
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                   placeholder="Savol matni"
//                   rows="3"
//                 />
//                 <button onClick={addQuestion}>Savol qo'shish</button>
//               </div>

//               <div className="questions-list">
//                 {questions.map((q, index) => (
//                   <div key={q.id} className="question-item">
//                     <span>
//                       <strong>{index + 1}.</strong> {q.text}
//                     </span>
//                     <button onClick={() => deleteQuestion(q.id)}>
//                       O'chirish
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="select-prompt">Bo'limni tanlang</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;
























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './AdminPanel.css';

function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  // Teachers
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    login: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("categories"); // 'categories' or 'teachers'

  useEffect(() => {
    fetchCategories();
    fetchTeachers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const createCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/admin/categories`, {
        name: newCategoryName,
      });
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      alert("Xatolik yuz berdi: " + error.response?.data?.error);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/categories/${id}`);
      fetchCategories();
      setSelectedCategory(null);
      setQuestions([]);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const selectCategory = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/questions/${category.id}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const addQuestion = async () => {
    if (!newQuestion.trim() || !selectedCategory) return;
    try {
      await axios.post(`${API_BASE_URL}/admin/questions`, {
        text: newQuestion,
        categoryId: selectedCategory.id,
      });
      setNewQuestion("");
      selectCategory(selectedCategory);
    } catch (error) {
      alert("Xatolik: " + error.response?.data?.error);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Savolni o'chirmoqchimisiz?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/questions/${id}`);
      selectCategory(selectedCategory);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const createTeacher = async () => {
    if (
      !newTeacher.fullName.trim() ||
      !newTeacher.login.trim() ||
      !newTeacher.password.trim()
    ) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/admin/teachers`, newTeacher);
      setNewTeacher({ fullName: "", login: "", password: "" });
      fetchTeachers();
      alert("O'qituvchi muvaffaqiyatli yaratildi!");
    } catch (error) {
      alert("Xatolik: " + (error.response?.data?.error || "Xatolik yuz berdi"));
    }
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("O'qituvchini o'chirmoqchimisiz?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="admin-tabs">
        <button
          className={activeTab === "categories" ? "active" : ""}
          onClick={() => setActiveTab("categories")}
        >
          Bo'limlar va Savollar
        </button>
        <button
          className={activeTab === "teachers" ? "active" : ""}
          onClick={() => setActiveTab("teachers")}
        >
          O'qituvchilar
        </button>
      </div>

      {activeTab === "categories" && (
        <div className="admin-container">
          <div className="categories-section">
            <h2>Bo'limlar</h2>
            <div className="create-category">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Yangi bo'lim nomi"
              />
              <button onClick={createCategory}>Yaratish</button>
            </div>

            <div className="categories-list">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-item ${
                    selectedCategory?.id === cat.id ? "active" : ""
                  }`}
                >
                  <span onClick={() => selectCategory(cat)}>
                    {cat.name} ({cat.Questions?.length || 0} ta savol)
                  </span>
                  <button onClick={() => deleteCategory(cat.id)}>
                    O'chirish
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="questions-section">
            {selectedCategory ? (
              <>
                <h2>{selectedCategory.name} - Savollar</h2>
                <div className="add-question">
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Savol matni"
                    rows="3"
                  />
                  <button onClick={addQuestion}>Savol qo'shish</button>
                </div>

                <div className="questions-list">
                  {questions.map((q, index) => (
                    <div key={q.id} className="question-item">
                      <span>
                        <strong>{index + 1}.</strong> {q.text}
                      </span>
                      <button onClick={() => deleteQuestion(q.id)}>
                        O'chirish
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="select-prompt">Bo'limni tanlang</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "teachers" && (
        <div className="teachers-container">
          <div className="create-teacher-section">
            <h2>Yangi o'qituvchi yaratish</h2>
            <div className="teacher-form">
              <input
                type="text"
                value={newTeacher.fullName}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, fullName: e.target.value })
                }
                placeholder="To'liq ism"
              />
              <input
                type="text"
                value={newTeacher.login}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, login: e.target.value })
                }
                placeholder="Login"
              />
              <input
                type="password"
                value={newTeacher.password}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, password: e.target.value })
                }
                placeholder="Parol"
              />
              <button onClick={createTeacher}>O'qituvchi yaratish</button>
            </div>
          </div>

          <div className="teachers-list-section">
            <h2>Barcha o'qituvchilar ({teachers.length})</h2>
            {teachers.length === 0 ? (
              <p className="no-data">Hozircha o'qituvchilar yo'q</p>
            ) : (
              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>To'liq ism</th>
                    <th>Login</th>
                    <th>Yaratilgan sana</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={teacher.id}>
                      <td>{index + 1}</td>
                      <td>{teacher.fullName}</td>
                      <td>{teacher.login}</td>
                      <td>
                        {new Date(teacher.createdAt).toLocaleDateString(
                          "uz-UZ"
                        )}
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTeacher(teacher.id)}
                        >
                          O'chirish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminPanel;