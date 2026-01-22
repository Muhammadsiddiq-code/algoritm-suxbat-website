import { ImFilesEmpty } from "react-icons/im"; 
import { BiHistory } from "react-icons/bi"; 
import { AiFillFolderAdd } from "react-icons/ai"; 
import { SiHellofresh } from "react-icons/si"; 
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../config";
// import "./TeacherDashboard.css";

// function TeacherDashboard({ teacher }) {
//   const [categories, setCategories] = useState([]);
//   const [interviews, setInterviews] = useState([]);
//   const [activeTab, setActiveTab] = useState("new");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [categoriesRes, interviewsRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/teacher/categories`),
//         axios.get(`${API_BASE_URL}/teacher/interviews/${teacher.id}`),
//       ]);
//       setCategories(categoriesRes.data);
//       setInterviews(interviewsRes.data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startInterview = (categoryId) => {
//     navigate(`/quiz/${categoryId}`);
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Yuklanmoqda...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="teacher-dashboard">
//       <div className="dashboard-header">
//         <h1>Xush kelibsiz! 👋</h1>
//         <p>Yangi suhbat boshlang yoki o'tkazilgan suhbatlarni ko'ring</p>
//       </div>

//       <div className="tabs">
//         <button
//           className={activeTab === "new" ? "active" : ""}
//           onClick={() => setActiveTab("new")}
//         >
//           <span className="icon">➕</span>
//           Yangi suhbat
//         </button>
//         <button
//           className={activeTab === "students" ? "active" : ""}
//           onClick={() => setActiveTab("students")}
//         >
//           <span className="icon">📋</span>
//           Suhbat qilingan o'quvchilar
//           <span className="badge">{interviews.length}</span>
//         </button>
//       </div>

//       {activeTab === "new" && (
//         <div className="new-interview-section">
//           <h2>Bo'limni tanlang</h2>
//           <div className="categories-grid">
//             {categories.length === 0 ? (
//               <p className="no-data">Hozircha bo'limlar yo'q</p>
//             ) : (
//               categories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="category-card"
//                   onClick={() => startInterview(cat.id)}
//                 >
//                   <div className="card-icon">📚</div>
//                   <h3>{cat.name}</h3>
//                   <button>Suhbat boshlash</button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === "students" && (
//         <div className="students-section">
//           <h2>Suhbat qilingan o'quvchilar</h2>
//           {interviews.length === 0 ? (
//             <div className="no-data-card">
//               <div className="empty-icon">📭</div>
//               <h3>Hali suhbat qilinmagan</h3>
//               <p>Yangi suhbat boshlash uchun "Yangi suhbat" bo'limiga o'ting</p>
//             </div>
//           ) : (
//             <div className="interviews-table-wrapper">
//               <table className="interviews-table">
//                 <thead>
//                   <tr>
//                     <th>№</th>
//                     <th>O'quvchi</th>
//                     <th>Bo'lim</th>
//                     <th>Topdi</th>
//                     <th>Foiz</th>
//                     <th>Holat</th>
//                     <th>Sana</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {interviews.map((interview, index) => (
//                     <tr key={interview.id}>
//                       <td>{index + 1}</td>
//                       <td className="student-name">
//                         {interview.studentFullName}
//                       </td>
//                       <td>{interview.Category.name}</td>
//                       <td>
//                         <span className="score-badge">
//                           {interview.foundCount}/{interview.totalQuestions}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="percentage">
//                           {interview.percentage}%
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`status ${
//                             interview.percentage >= 70 ? "passed" : "failed"
//                           }`}
//                         >
//                           {interview.status}
//                         </span>
//                       </td>
//                       <td className="date">
//                         {new Date(interview.interviewDate).toLocaleDateString(
//                           "uz-UZ",
//                           {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeacherDashboard;



























import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./TeacherDashboard.css";
import technovaImg from "../assets/technova_3.png"

function TeacherDashboard({ teacher }) {
  const [categories, setCategories] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, interviewsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/teacher/categories`),
        axios.get(`${API_BASE_URL}/teacher/interviews/${teacher.id}`),
      ]);

      // Kelayotgan ma'lumotni konsolda tekshirish uchun (Debug)
      console.log("Interviews Data:", interviewsRes.data);

      setCategories(categoriesRes.data);
      setInterviews(interviewsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const startInterview = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Workspace...</p>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {teacher.name || "Teacher"}! </h1>
          <p>Select a category to start or review student performance.</p>
        </div>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            <span className="icon">
              <AiFillFolderAdd style={{ fontSize: "25px" }} />
            </span>{" "}
            New Session
          </button>
          <button
            className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <span className="icon">
              <BiHistory style={{ fontSize: "25px" }} />
            </span>{" "}
            History Log
            <span className="badge">{interviews.length}</span>
          </button>
        </div>
      </div>

      <main className="content-area">
        {activeTab === "new" && (
          <section className="section fadeIn">
            <div className="section-header">
              <h2>Available Categories</h2>
            </div>
            <div className="categories-grid">
              {categories.length === 0 ? (
                <div className="no-data-card">
                  <p>No categories found.</p>
                </div>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="category-card"
                    onClick={() => startInterview(cat.id)}
                  >
                    <div className="card-badge">Module</div>
                    <div className="card-icon">----</div>
                    <h3>{cat.name}</h3>
                    <button className="start-btn">Start Interview</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section className="section fadeIn">
            <div className="section-header">
              <h2>Recent Assessments</h2>
            </div>
            {interviews.length === 0 ? (
              <div className="no-data-card">
                <div className="empty-icon"><ImFilesEmpty /></div>
                <h3>No Interviews Yet</h3>
                <p>Complete your first interview to see the results here.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Category</th>
                      <th>Result</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((interview, index) => (
                      <tr key={interview.id}>
                        <td>{index + 1}</td>
                        <td className="student-name-cell">
                          {interview.studentFullName ||
                            (interview.Student && interview.Student.name) ||
                            (interview.Student && interview.Student.fullName) ||
                            "Unknown Student"}
                        </td>
                        <td>{interview.Category?.name || "N/A"}</td>
                        <td>
                          <span className="score-tag">
                            {interview.foundCount} / {interview.totalQuestions}
                          </span>
                        </td>
                        <td className="font-bold text-orange">
                          {interview.percentage}%
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              interview.percentage >= 70 ? "pass" : "fail"
                            }`}
                          >
                            {interview.percentage >= 70 ? "PASSED" : "FAILED"}
                          </span>
                        </td>
                        <td className="date-col">
                          {new Date(interview.interviewDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default TeacherDashboard;