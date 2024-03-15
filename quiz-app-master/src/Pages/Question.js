import React from "react";

const Question = ({ question, onAnswerSelect }) => {
  const { question: questionText, options, correctAnswer } = question;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-medium text-center mb-8">{questionText}</h2>
      <ul className="list-none p-0">
        {options.map((option, index) => (
          <li key={index} className="mb-4">
            <button
              className={`w-full block bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-100 ${
                correctAnswer === index ? "font-bold" : ""
              }`}
              onClick={() => onAnswerSelect(index)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
