import React from "react";

function QuizResults({ answers, quizzes, currentQuizIndex, calculateScore }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Results</h3>
      <div>Total Score: {calculateScore()}</div>
      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            Question {index + 1}: Your Answer - {answer}, Correct Answer -{" "}
            {quizzes[currentQuizIndex]?.questions[index]?.correctAnswer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizResults;
