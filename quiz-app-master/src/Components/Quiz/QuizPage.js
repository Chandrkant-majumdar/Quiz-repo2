import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Timer, ArrowBack } from "@mui/icons-material";
import QuestionComponent from "./QuestionComponent";
import QuizNavigationButtons from "./QuizNavigationButtons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import quizImage from "./quiz.jpg";
import { Container, Typography, Grid, Box } from "@mui/material";

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(4); // Initial timer value in seconds
  const { studentId, quizId } = useParams();
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [backgroundLoadingError, setBackgroundLoadingError] = useState(false);
  const navigate = useNavigate();

  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quizzes/${quizId}`
      );
      setQuiz(response.data);
      setTimer(response.data.timeLimit);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${studentId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [studentId]);

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        handleSubmitQuiz();
        setQuizSubmitted(true);
      }
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [timer]);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleSubmitQuiz = async () => {
    try {
      let score = 0;
      answers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          score++;
        }
      });

      const data = {
        user: {
          email: userData.email,
          fullName: userData.fullName,
          userId: userData.userId,
          department: userData.department,
          course: userData.course,
          username: userData.username,
        },
        quiz: {
          Id: quiz.Id,
          title: quiz.title,
        },
        teacherId: quiz.teacherId,
        questionSubmissions: answers.map((answer, index) => ({
          question: quiz.questions[index],
          userAnswer: answer,
        })),
        score: score,
      };

      const response = await axios.post("http://localhost:8080/submit", data);
      alert("Quiz submitted:");
      navigate(`/Student-Dash/${studentId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleAnswerSubmit = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setOpenPopup(false);
    openFullscreen();
  };

  useEffect(() => {
    setOpenPopup(true);
  }, []);

  const handleBackgroundError = () => {
    setBackgroundLoadingError(true);
  };

  return (
    <>
      <Box
        className="relative"
        style={{
          backgroundImage: `url(${quizImage})`,
          backgroundSize: "cover",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          // overflow: "hidden", // Prevent scrolling
        }}
      >
        <Container maxWidth="lg">
          <div className="min-h-screen py-8 flex justify-center items-center">
            <Box
              className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust opacity for a more transparent look
              }}
            >
              <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                <DialogTitle className="text-xl font-bold mb-4">
                  Quiz Instructions
                </DialogTitle>
                <DialogContent className="mb-4">
                  <p className="text-gray-700">
                    Welcome to the quiz! Read the instructions carefully before
                    starting the quiz.
                  </p>
                  <p className="text-gray-700">
                    You will have a limited amount of time to answer the
                    questions. Once you start the quiz, it will go full-screen.
                  </p>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleStartQuiz}
                    variant="contained"
                    color="primary"
                  >
                    Start Quiz
                  </Button>
                </DialogActions>
              </Dialog>
              {!quizSubmitted &&
                quizStarted &&
                timer > 0 &&
                quiz &&
                quiz.questions && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{quiz.title}</h2>
                      <div className="flex items-center space-x-2">
                        <Timer />
                        <span className="text-lg">{timer} seconds</span>
                      </div>
                    </div>
                    <QuestionComponent
                      question={quiz.questions[currentQuestionIndex]}
                      selectedOption={answers[currentQuestionIndex] || null}
                      handleAnswerSubmit={handleAnswerSubmit}
                    />
                    <QuizNavigationButtons
                      currentQuestionIndex={currentQuestionIndex}
                      totalQuestions={quiz.questions.length}
                      setCurrentQuestionIndex={setCurrentQuestionIndex}
                      handleSubmitQuiz={handleSubmitQuiz}
                      handleAnswerSubmit={handleAnswerSubmit}
                    />
                  </>
                )}
              {(quizSubmitted || timer === 0) && (
                <div>
                  <p>
                    {timer === 0 ? "Time's up! " : ""}Quiz submitted due to
                    timer expiration.
                  </p>
                  <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(`/Student-Dash/${studentId}`)}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              )}
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
}

export default QuizPage;
