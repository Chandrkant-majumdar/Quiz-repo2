import React from "react";

function QuizQuestion({ question, selectedOption, handleAnswerSubmit }) {
  return (
    <div className="mb-4">
      <p className="font-semibold">{question.text}</p>
      {question.options.map((option, optionIndex) => (
        <button
          key={optionIndex}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
            selectedOption === option ? "bg-green-500" : ""
          }`}
          onClick={() => handleAnswerSubmit(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuizQuestion;
