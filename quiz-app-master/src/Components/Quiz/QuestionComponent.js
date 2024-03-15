// QuestionComponent.js
import React from "react";

function QuestionComponent({ question, selectedOption, handleAnswerSubmit }) {
  const handleOptionSelect = (option) => {
    handleAnswerSubmit(option);
  };

  return (
    <div className="mb-4">
      <p className="font-semibold">{question.text}</p>
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
            selectedOption === option ? "bg-green-500" : "bg-blue-500" // Apply green color to selected option
          }`}
          onClick={() => handleOptionSelect(option)}
          disabled={selectedOption !== null} // Disable selection if an option is already selected
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionComponent;
