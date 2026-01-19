import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";

const API_URL = "http://localhost:5577/api/user";

function UserPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startQuiz = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="user-page">
      <h1>Bo'limlarni tanlang</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => startQuiz(cat.id)}
          >
            <h3>{cat.name}</h3>
            <button>Boshlash</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
