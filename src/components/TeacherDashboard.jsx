import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./TeacherDashboard.css";

function TeacherDashboard({ teacher }) {
  const [categories, setCategories] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'students'
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchInterviews();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/interviews/${teacher.id}`
      );
      setInterviews(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startInterview = (categoryId) => {
    navigate(`/teacher/quiz/${categoryId}`);
  };

  return (
    <div className="teacher-dashboard">
      <h1>Xush kelibsiz, {teacher.fullName}!</h1>

      <div className="tabs">
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          Yangi suhbat
        </button>
        <button
          className={activeTab === "students" ? "active" : ""}
          onClick={() => setActiveTab("students")}
        >
          Suhbat qilingan o'quvchilar ({interviews.length})
        </button>
      </div>

      {activeTab === "new" && (
        <div className="new-interview-section">
          <h2>Bo'limni tanlang</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => startInterview(cat.id)}
              >
                <h3>{cat.name}</h3>
                <button>Suhbat boshlash</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "students" && (
        <div className="students-section">
          <h2>Suhbat qilingan o'quvchilar</h2>
          {interviews.length === 0 ? (
            <p className="no-data">Hali suhbat qilinmagan</p>
          ) : (
            <div className="interviews-table">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>O'quvchi</th>
                    <th>Bo'lim</th>
                    <th>Topdi</th>
                    <th>Foiz</th>
                    <th>Holat</th>
                    <th>Sana</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview, index) => (
                    <tr key={interview.id}>
                      <td>{index + 1}</td>
                      <td>{interview.studentFullName}</td>
                      <td>{interview.Category.name}</td>
                      <td>
                        {interview.foundCount}/{interview.totalQuestions}
                      </td>
                      <td>{interview.percentage}%</td>
                      <td>
                        <span
                          className={`status ${
                            interview.status === "O'tdingiz!"
                              ? "passed"
                              : "failed"
                          }`}
                        >
                          {interview.status}
                        </span>
                      </td>
                      <td>
                        {new Date(interview.interviewDate).toLocaleDateString(
                          "uz-UZ"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
