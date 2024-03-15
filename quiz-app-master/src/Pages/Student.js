import React, { useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "./Quiz";

const quizzes = [
  {
    id: 1,
    title: "Quiz 1",
    description: "This is the first quiz",
  },
  {
    id: 2,
    title: "Quiz 2",
    description: "This is the second quiz",
  },
  {
    id: 3,
    title: "Quiz 3",
    description: "This is the third quiz",
  },
];

export default function Student() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-medium text-center mb-8">
          Student Dashboard
        </h1>
        <ul className="mb-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <button
                className="w-full block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => handleQuizSelect(quiz)}
              >
                {quiz.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedQuiz && (
          <Quiz
            quiz={selectedQuiz}
            onQuizComplete={() => setSelectedQuiz(null)}
          />
        )}
        {!selectedQuiz && (
          <Link to="/student/quiz-list">
            <button className="w-full block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 mt-4">
              Go to Quiz List
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
