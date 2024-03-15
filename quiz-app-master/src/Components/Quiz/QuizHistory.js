import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function QuizHistory({ userData }) {
  const [quizHistory, setQuizHistory] = useState([]);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/usersubmissions/${userData.userId}`
        );
        setQuizHistory(response.data);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchQuizHistory();
  }, [userData.userId]);

  const handleToggleDetails = (submission) => {
    setExpandedSubmission(submission);
  };

  const handleCloseDetails = () => {
    setExpandedSubmission(null);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {quizHistory.map((submission) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={submission.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                boxShadow: 1,
                bgcolor: "background.paper",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Quiz: {submission.quiz.title}
              </h2>
              <p className="text-gray-600 mb-2">Score: {submission.score}</p>
              <Button
                variant="contained"
                onClick={() => handleToggleDetails(submission)}
                className="bg-blue-500 text-white rounded-md px-4 py-2"
              >
                View Details
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={Boolean(expandedSubmission)}
        onClose={handleCloseDetails}
        maxWidth="lg"
        fullWidth
      >
        {expandedSubmission && (
          <>
            <DialogTitle>{`Details for ${expandedSubmission.quiz.title}`}</DialogTitle>
            <DialogContent>
              {expandedSubmission.questionSubmissions.map(
                (questionSubmission, index) => (
                  <div key={index} className="mt-4">
                    <p className="text-lg font-semibold mb-1">
                      Question: {questionSubmission.question.text}
                    </p>
                    <p className="text-base text-gray-700">
                      User Answer: {questionSubmission.userAnswer}
                    </p>
                    <p className="text-base text-green-400">
                      Correct Answer:{" "}
                      {questionSubmission.question.correctAnswer}
                    </p>
                    <p className="text-base text-gray-700">
                      Explanation: {questionSubmission.question.explanation}
                    </p>
                  </div>
                )
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default QuizHistory;
