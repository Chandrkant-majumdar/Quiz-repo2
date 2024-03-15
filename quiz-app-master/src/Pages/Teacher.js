import React from "react";
import { Link } from "react-router-dom";

export default function Teacher() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-medium text-center mb-8">
          Teacher Dashboard
        </h1>
        <Link to="/teacher/CreateQuiz">
          <button className="w-full block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create Quiz
          </button>
        </Link>
        <Link to="/teacher/ManageQuiz">
          <button className="w-full block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 mt-4">
            Manage Quizzes
          </button>
        </Link>
      </div>
    </div>
  );
}
