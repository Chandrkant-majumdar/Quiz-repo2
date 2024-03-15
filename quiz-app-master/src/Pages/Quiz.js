import React, { useState } from "react";
import Question from "./Question";
const Quiz = ({ quiz, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      // TODO: Add logic to check if the selected answer is correct
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuizComplete = () => {
    // TODO: Add logic to submit the quiz and show the results
    onQuizComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-medium text-center mb-8">{quiz.title}</h1>
      <p className="text-gray-600 mb-8">{quiz.description}</p>
      {currentQuestion < quiz.questions.length && (
        <Question
          question={quiz.questions[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
      )}
      {currentQuestion === quiz.questions.length && (
        <button
          className="w-full block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          onClick={handleQuizComplete}
        >
          Submit Quiz
        </button>
      )}
      {currentQuestion < quiz.questions.length - 1 && (
        <button
          className="w-full block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 mt-4"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;
