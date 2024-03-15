import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Scatrch/Navbar";
import QuestionCard from "./QuestionCard"; // Assuming you have a QuestionCard component
import { useParams } from "react-router-dom";
const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  let { studentId } = useParams();
  console.log(studentId);
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/quizzes");
      setQuiz(response.data);
    } catch (error) {
      setError("Failed to fetch quiz");
    }
  };

  const handleOptionChange = (optionNumber) => {
    setSelectedOption(optionNumber);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(null); // Reset selected option for the previous question
    }
  };

  const handleQuizSubmit = () => {
    // Handle quiz submission logic here
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[1];
  console.log(currentQuestion);
  return (
    <div>
      <h1>hi</h1>
      <Nav
        brandText="Quiz Management System"
        menuItems={[
          { text: "Login", link: "/login" },
          { text: "Register", link: "/registration" },
        ]}
      />
      <div className="container">
        <h2 className="mt-3">Quiz</h2>
        <QuestionCard
          question={currentQuestion}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={handleNextQuestion}
            disabled={quizCompleted}
          >
            Next
          </button>
          <button
            className="btn btn-primary"
            onClick={handleQuizSubmit}
            disabled={!quizCompleted}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
