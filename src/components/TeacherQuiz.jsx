import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./TeacherQuiz.css";
// import "./QuizPage.css"
// alert("TEACHER QUIZ ISHLAYAPTI");
import { GoStopwatch } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { SiVexxhost } from "react-icons/si";


function TeacherQuiz({ teacher }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!student) {
      navigate("/dashboard");
      return;
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(false);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, finished]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/quiz/${categoryId}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Savollarni yuklashda xatolik!");
    }
  };

  const handleAnswer = (found) => {
    const newResults = [...results, found];
    setResults(newResults);

    if (currentIndex + 1 >= questions.length) {
      finishQuiz(newResults);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(120);
    }
  };

  const finishQuiz = async (finalResults) => {
    setFinished(true);

    const foundCount = finalResults.filter((r) => r === true).length;
    const percentage = (foundCount / 10) * 100;
    const status = percentage >= 70 ? "O'tdingiz!" : "70% dan o'ta olmadingiz";

    try {
      await axios.post(`${API_BASE_URL}/teacher/interviews`, {
        teacherId: teacher.id,
        studentId: student.id,
        categoryId: parseInt(categoryId),
        foundCount,
        totalQuestions: 10,
        percentage,
        status,
      });
    } catch (error) {
      console.error("Error saving interview:", error);
    }
  };

  const calculateResult = () => {
    const foundCount = results.filter((r) => r === true).length;
    const percentage = (foundCount / 10) * 100;
    return { foundCount, percentage };
  };

  const goToProfile = () => {
    navigate(`/student-profile/${student.id}`);
  };

  if (!student) return null;

  if (finished) {
    const { foundCount, percentage } = calculateResult();
    const passed = percentage >= 70;

    return (
      <div className="teacher-quiz result-page">
        <div className="result-card">
          <div className="result-icon">
            {passed ? (
              <FaArrowTrendUp style={{ fontSize: "100px" }} />
            ) : (
              <FaArrowTrendDown style={{ fontSize: "100px" }} />
            )}
          </div>

          <h1>Suhbat yakunlandi</h1>

          <h2 className="student-name-result">{student.fullName}</h2>

          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-label">Topdi</div>
              <div className="stat-value">{foundCount} / 10</div>
            </div>

            <div className="stat-item">
              <div className="stat-label">Foiz</div>
              <div className="stat-value percentage-value">{percentage}%</div>
            </div>
          </div>

          <h2 className={passed ? "passed-status" : "failed-status"}>
            {passed
              ? [<CiCircleCheck style={{ fontSize: "25px" }} />, "Passed"]
              : [<SiVexxhost style={{ fontSize: "30px" }} />, "Feiled"]}
          </h2>

          <div className="result-actions">
            <button onClick={() => navigate("/dashboard")} className="btn-home">
              Bosh sahifaga
            </button>
            <button onClick={goToProfile} className="btn-profile">
              O'quvchi profili
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="teacher-quiz loading-state">
        <div className="spinner"></div>
        <p>Savollar yuklanmoqda...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="teacher-quiz">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Savol {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="quiz-header">
        <div className="student-info">
          <span className="label">O'quvchi:</span>
          <span className="name">{student.fullName}</span>
        </div>
        <div className={`timer ${timeLeft <= 30 ? "warning" : ""}`}>
          <span className="timer-icon">
            {" "}
            <GoStopwatch />{" "}
          </span>
          <span className="timer-text">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="question-card">
        <div className="question-number">Savol #{currentIndex + 1}</div>
        <p className="question-text">{currentQuestion.text}</p>

        <div className="buttons">
          <button className="btn-found" onClick={() => handleAnswer(true)}>
            <span className="btn-icon">✓</span>
            <span className="btn-text">Topdi</span>
          </button>
          <button className="btn-not-found" onClick={() => handleAnswer(false)}>
            <span className="btn-icon">✗</span>
            <span className="btn-text">Topa olmadi</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherQuiz;
