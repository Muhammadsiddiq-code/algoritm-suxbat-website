import { CgCloseR } from "react-icons/cg"; 
import { BiCheckShield } from "react-icons/bi"; 
import { BiBadgeCheck } from "react-icons/bi"; 
import { BiConversation } from "react-icons/bi"; 
import { GiConversation } from "react-icons/gi"; 
import { GiNotebook } from "react-icons/gi";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineWechat } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./StudentProfile.css";
import { IoStatsChart } from "react-icons/io5";
import { VscHistory } from "react-icons/vsc";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";

function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, [studentId]);

  const fetchStudentProfile = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/student-profile/${studentId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("O'quvchi ma'lumotlarini yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  const startNewInterview = () => {
    navigate("/categories", { state: { student: data.student } });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-screen">
        <h2>O'quvchi topilmadi</h2>
        <button onClick={() => navigate("/dashboard")}>Orqaga</button>
      </div>
    );
  }

  const { student, statistics } = data;

  return (
    <div className="student-profile">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <IoArrowBackCircleOutline />
        </button>

        <div className="profile-banner">
          <div className="profile-avatar">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{student.fullName}</h1>
            <p className="group-name">
              <MdLibraryBooks /> {student.Group?.name}
            </p>
          </div>
          <button className="new-interview-btn" onClick={startNewInterview}>
            <AiOutlineWechat style={{ fontSize: "30px" }} /> New interview
          </button>
        </div>
      </div>

      <div className="statistics-section">
        <h2>
          <ImStatsBars /> Statistics
        </h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              {" "}
              <BiConversation style={{ color: "black" }} />{" "}
            </div>
            <div className="stat-content">
              <div className="stat-label"> All interviews</div>
              <div className="stat-value">{statistics.totalInterviews}</div>
            </div>
          </div>

          <div className="stat-card passed">
            <div className="stat-icon">
              {" "}
              <BiCheckShield style={{ color: "black" }} />{" "}
            </div>
            <div className="stat-content">
              <div className="stat-label">Attended interviews</div>
              <div className="stat-value">{statistics.passedInterviews}</div>
            </div>
          </div>

          <div className="stat-card failed">
            <div className="stat-icon">
              {" "}
              <CgCloseR style={{ color: "black" }} />{" "}
            </div>
            <div className="stat-content">
              <div className="stat-label"> Fell interviews</div>
              <div className="stat-value">{statistics.failedInterviews}</div>
            </div>
          </div>

          <div className="stat-card average">
            <div className="stat-icon">
              <IoStatsChart style={{ color: "black" }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Average stats</div>
              <div className="stat-value">{statistics.averagePercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="interviews-history">
        <h2>
          {" "}
          <VscHistory /> History interviews
        </h2>

        {student.Interviews.length === 0 ? (
          <div className="no-interviews">
            <div className="empty-icon">
              <ImFilesEmpty />
            </div>
            <h3>No interview yet</h3>
            <p>This student has not been interviewed yet.</p>
            <button className="start-btn" onClick={startNewInterview}>
              Start the first conversation
            </button>
          </div>
        ) : (
          <div className="interviews-table-wrapper">
            <table className="interviews-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Stage</th>
                  <th>Teacher</th>
                  <th>Found</th>
                  <th>Percentage</th>
                  <th>Condition</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {student.Interviews.map((interview, index) => (
                  <tr key={interview.id}>
                    <td>{index + 1}</td>
                    <td className="category-name">{interview.Category.name}</td>
                    <td>{interview.Teacher.fullName}</td>
                    <td>
                      <span className="score-badge">
                        {interview.foundCount}/{interview.totalQuestions}
                      </span>
                    </td>
                    <td>
                      <span className="percentage">
                        {interview.percentage}%
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status ${
                          interview.percentage >= 70 ? "passed" : "failed"
                        }`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="date">
                      {new Date(interview.interviewDate).toLocaleString(
                        "uz-UZ",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
