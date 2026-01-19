import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./TeacherQuiz.css";

function TeacherQuiz({ teacher }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (started) {
      fetchQuestions();
    }
  }, [started]);

  useEffect(() => {
    if (finished || !started) return;

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
  }, [currentIndex, finished, started]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/quiz/${categoryId}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      alert("O'quvchi ismini kiriting!");
      return;
    }
    setStarted(true);
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
        categoryId: parseInt(categoryId),
        studentFullName: studentName,
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

  if (!started) {
    return (
      <div className="teacher-quiz student-name-page">
        <div className="student-name-card">
          <h1>O'quvchi ma'lumotlari</h1>
          <div className="form-group">
            <label>O'quvchi to'liq ismi</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Masalan: Aliyev Vali Karimovich"
              autoFocus
            />
          </div>
          <div className="button-group">
            <button onClick={() => navigate("/teacher")} className="btn-cancel">
              Bekor qilish
            </button>
            <button onClick={handleStart} className="btn-start">
              Boshlash
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const { foundCount, percentage } = calculateResult();
    const passed = percentage >= 70;

    return (
      <div className="teacher-quiz result-page">
        <h1>Suhbat yakunlandi</h1>
        <div className="result-card">
          <h2 className="student-name-result">{studentName}</h2>
          <p className="score">Topdi: {foundCount} / 10</p>
          <p className="percentage">Foiz: {percentage}%</p>
          <h2 className={passed ? "passed-status" : "failed-status"}>
            {passed ? "O'tdingiz!" : "70% dan o'ta olmadingiz"}
          </h2>
          <button onClick={() => navigate("/teacher")}>
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="teacher-quiz">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="teacher-quiz">
      <div className="quiz-header">
        <div>
          <h3>{studentName}</h3>
          <h2>
            Savol {currentIndex + 1} / {questions.length}
          </h2>
        </div>
        <div className="timer">
          Vaqt: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <div className="question-card">
        <p className="question-text">{currentQuestion.text}</p>
        <div className="buttons">
          <button className="btn-found" onClick={() => handleAnswer(true)}>
            Topdi
          </button>
          <button className="btn-not-found" onClick={() => handleAnswer(false)}>
            Topa olmadi
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherQuiz;
