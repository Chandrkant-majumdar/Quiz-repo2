// QuizForm.jsx

import React, { useState } from "react";

const QuizForm = ({ quizData, onQuizSubmit }) => {
  // State to store user answers
  const [userAnswers, setUserAnswers] = useState({});

  // Handle user answer changes
  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Handle quiz submission
  const handleSubmit = () => {
    // Perform any necessary validation or processing before submitting
    onQuizSubmit(userAnswers);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
      {/* Render quiz questions and options */}
      <form>
        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{question.text}</p>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block">
                <input
                  type="radio"
                  name={question.text}
                  value={option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        ))}
        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
