import React from "react";
import { Button, Box, Grid } from "@mui/material";

const AvailableQuizzes = ({ availableQuizzes, studentId }) => {
  // Function to handle starting the actual test
  const handleStartTest = (quizId) => {
    // Navigate to the quiz page with the quizId and studentId
    window.location.href = `/quiz/${quizId}/${studentId}`;
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {availableQuizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={quiz.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                boxShadow: 1,
                bgcolor: "background.paper",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleStartTest(quiz.id)}
              >
                Take Quiz
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvailableQuizzes;
