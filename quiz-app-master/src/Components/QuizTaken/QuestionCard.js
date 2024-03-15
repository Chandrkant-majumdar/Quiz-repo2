// QuestionCard.jsx
import React from "react";

const QuestionCard = ({ question, selectedOption, handleOptionChange }) => {
  return (
    <div className="question-card">
      <h4>{question.text}</h4>
      <ul className="list-group">
        {question.options.map((option, index) => (
          <li key={index} className="list-group-item">
            <label className="form-check-label">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedOption === index + 1}
                onChange={() => handleOptionChange(index + 1)}
                className="form-check-input"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
