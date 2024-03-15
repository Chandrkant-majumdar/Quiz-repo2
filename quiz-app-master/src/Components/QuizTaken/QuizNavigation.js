import React from "react";

function QuizNavigation({ currentQuizIndex, quizzes, setCurrentQuizIndex }) {
  return (
    <div className="mt-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        disabled={currentQuizIndex === 0}
        onClick={() => setCurrentQuizIndex((prevIndex) => prevIndex - 1)}
      >
        Previous
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        disabled={currentQuizIndex === quizzes.length - 1}
        onClick={() => setCurrentQuizIndex((prevIndex) => prevIndex + 1)}
      >
        Next
      </button>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
        Mark for Review
      </button>
    </div>
  );
}

export default QuizNavigation;
