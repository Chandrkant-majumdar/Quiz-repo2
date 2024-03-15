import React from "react";
import { Button } from "@mui/material";

const QuizNavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  setCurrentQuestionIndex,
  handleSubmitQuiz,
  handleAnswerSubmit, // Add handleAnswerSubmit prop
}) => {
  return (
    <div className="mt-4 flex space-x-4">
      <Button
        variant="contained"
        onClick={() =>
          setCurrentQuestionIndex((prevIndex) =>
            prevIndex === 0 ? prevIndex : prevIndex - 1
          )
        }
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          setCurrentQuestionIndex((prevIndex) =>
            prevIndex === totalQuestions - 1 ? prevIndex : prevIndex + 1
          )
        }
        disabled={currentQuestionIndex === totalQuestions - 1}
      >
        Next
      </Button>
      {currentQuestionIndex === totalQuestions - 1 && (
        <Button variant="contained" onClick={handleSubmitQuiz}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default QuizNavigationButtons;
