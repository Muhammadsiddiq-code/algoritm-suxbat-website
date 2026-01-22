import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

const API_URL = "http://localhost:5577/api/user";

function QuizPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  alert("QUIZ PAGE ISHLAYAPTI");


  useEffect(() => {
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
      const response = await axios.get(`${API_URL}/quiz/${categoryId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error:", error);
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

  const finishQuiz = (finalResults) => {
    setFinished(true); 4
    console.log(finalResults);
  };

  const calculateResult = () => {
    const foundCount = results.filter((r) => r === true).length;
    const percentage = (foundCount / 10) * 100;
    return { foundCount, percentage };
  };

  if (finished) {
    const { foundCount, percentage } = calculateResult();

const passed = percentage >= 70;


return (
  <div className="quiz-page result-page">
    <h1>Natija</h1>
    <div className="result-card">
      <p className="score">Topdi: {foundCount} / 10</p>
      <p className="percentage">Foiz: {percentage}%</p>
      <h2 className={passed ? "passed-status" : "failed-status"}>
        {passed ? "O'tdingiz!" : "70% dan o'ta olmadingiz"}
      </h2>
      <button onClick={() => navigate("/")}>Bosh sahifaga qaytish</button>
    </div>
  </div>
);
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h2>
          Savol {currentIndex + 1} / {questions.length}
        </h2>
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

export default QuizPage;
