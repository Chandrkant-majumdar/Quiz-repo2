import React, { useState } from "react";

const QuizInstructions = ({ startQuiz }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleStartQuiz = () => {
    setButtonClicked(true);
    startQuiz(); // Invoke the startQuiz function passed as a prop
  };

  return (
    <div>
      <h2>Quiz Instructions</h2>
      <p>
        Welcome to the quiz! Please read the instructions carefully before
        starting.
      </p>
      <ul>
        <li>This quiz consists of multiple-choice questions.</li>
        <li>You will have a limited time to complete the quiz.</li>
        <li>Ensure you have a stable internet connection.</li>
        <li>Once you start the quiz, the timer will begin.</li>
        <li>Click on the "Start Quiz" button when you're ready.</li>
      </ul>
      {!buttonClicked && <button onClick={handleStartQuiz}>Start Quiz</button>}
    </div>
  );
};

export default QuizInstructions;
