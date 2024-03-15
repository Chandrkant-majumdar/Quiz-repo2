import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Scatrch/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function CreateQuiz() {
  let { teacherId } = useParams();
  console.log(teacherId);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    questions: [
      {
        topic: "",
        questionText: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswer: "",
        explanation: "",
        teacherId: "",
      },

      // teacherId:
    ],
    timeLimit: 0,
    scheduledDate: new Date(),
  });

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[index][field] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        {
          topic: "",
          questionText: "",
          options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
          correctAnswer: "",
          explanation: "",
        },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions.splice(index, 1);
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleQuizSubmit = async () => {
    try {
      const requestBody = {
        title: newQuiz.title,
        questions: newQuiz.questions.map((question) => ({
          text: question.questionText,
          options: question.options.map((option) => option.text),
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        })),
        timeLimit: newQuiz.timeLimit,
        scheduledDate: newQuiz.scheduledDate.toISOString(),
        teacherId: teacherId,
      };

      console.log(requestBody);
      await axios
        .post(`http://localhost:8080/api/quizzes`, requestBody)
        .then((response) => {
          if (response.status === 201) {
            alert("Quiz Created");
            setNewQuiz({
              title: "",
              questions: [
                {
                  topic: "",
                  questionText: "",
                  options: [
                    { text: "" },
                    { text: "" },
                    { text: "" },
                    { text: "" },
                  ],
                  correctAnswer: "",
                  explanation: "",
                },
              ],
              timeLimit: 0,
              scheduledDate: new Date(),
            });
            console.log("Quiz submitted successfully");
          } else {
            console.error("Error submitting quiz");
          }
        });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <>
      {/* <Nav
        brandText="Quiz Management System"
        menuItems={[
          { text: "Login", link: "/login" },
          { text: "Register", link: "/registration" },
        ]}
      /> */}

      <div className="container mx-auto p-4">
        {/* <h1 className="text-3xl font-semibold mb-4">
          Welcome to Teacher Dashboard
        </h1> */}

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter Quiz Title"
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
            className="mb-4"
          />
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label="Enter Time Limit (in minutes)"
            value={newQuiz.timeLimit}
            onChange={(e) =>
              setNewQuiz({ ...newQuiz, timeLimit: e.target.value })
            }
            className="mb-4"
          />
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Select Scheduled Date:
            </label>
            <DatePicker
              selected={newQuiz.scheduledDate}
              onChange={(date) =>
                setNewQuiz({ ...newQuiz, scheduledDate: date })
              }
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
          </div>
          {newQuiz.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <TextField
                fullWidth
                variant="outlined"
                label={`Enter Question ${index + 1}`}
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(index, "questionText", e.target.value)
                }
                className="mb-4"
              />
              {question.options.map((option, optionIndex) => (
                <TextField
                  key={optionIndex}
                  fullWidth
                  variant="outlined"
                  label={`Option ${optionIndex + 1}`}
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                  className="mb-4"
                />
              ))}

              <TextField
                fullWidth
                variant="outlined"
                label="Enter Correct Answer"
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
                className="mb-4"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Enter Explanation for question"
                value={question.explanation}
                onChange={(e) =>
                  handleQuestionChange(index, "explanation", e.target.value)
                }
                className="mb-4"
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteQuestion(index)}
                startIcon={<DeleteIcon />}
              >
                Delete Question
              </Button>
            </div>
          ))}
          <div className="flex space-x-4 mb-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuestion}
              startIcon={<AddIcon />}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Question
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleQuizSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Quiz
            </Button>
          </div>
          <div className="mt-4">
            <Link to="/tracherdashboard">
              <Button variant="contained">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuiz;
