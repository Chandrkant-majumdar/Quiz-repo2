import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse, Typography, Grid } from "@mui/material";
import { FaUser, FaTrophy, FaQuestion, FaTimesCircle } from "react-icons/fa";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function TestStatistics({}) {
  const [quizStats, setQuizStats] = useState({});
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/usersubmissions")
      .then((response) => {
        const submissions = response.data;
        const quizStatistics = {};

        submissions.forEach((submission) => {
          const quizTitle = submission.quiz.title;

          if (!quizStatistics[quizTitle]) {
            quizStatistics[quizTitle] = {
              submissions: [],
              totalSubmissions: 0,
              maxMarks: 0,
              averageMark: 0,
              userWithHighestMark: "",
            };
          }

          quizStatistics[quizTitle].submissions.push(submission);
          quizStatistics[quizTitle].totalSubmissions++;
          quizStatistics[quizTitle].maxMarks = Math.max(
            quizStatistics[quizTitle].maxMarks,
            submission.score
          );
          quizStatistics[quizTitle].averageMark += submission.score;

          if (
            submission.score >
            (quizStatistics[quizTitle].userWithHighestMark?.score || 0)
          ) {
            quizStatistics[quizTitle].userWithHighestMark = {
              user: submission.user.fullName,
              score: submission.score,
            };
          }
        });

        // Calculate average mark for each quiz
        Object.keys(quizStatistics).forEach((quizTitle) => {
          quizStatistics[quizTitle].averageMark =
            quizStatistics[quizTitle].averageMark /
            quizStatistics[quizTitle].totalSubmissions;
        });

        setQuizStats(quizStatistics);

        // Initialize showMore state
        const initialShowMoreState = {};
        Object.keys(quizStatistics).forEach((quizTitle) => {
          initialShowMoreState[quizTitle] = {};
          quizStatistics[quizTitle].submissions.forEach((_, index) => {
            initialShowMoreState[quizTitle][index] = false;
          });
        });
        setShowMore(initialShowMoreState);
      })
      .catch((error) => {
        console.error("Error fetching user submissions:", error);
      });
  }, []);

  const toggleShowMore = (quizTitle, index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [quizTitle]: {
        ...prevShowMore[quizTitle],
        [index]: !prevShowMore[quizTitle][index],
      },
    }));
  };

  return (
    <div className="border-t pt-6 py-6">
      <Typography variant="h2" className="font-bold mb-4">
        Test Statistics
      </Typography>
      {Object.keys(quizStats).map((quizTitle, index) => (
        <div key={index} className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <Typography variant="h3" className="font-bold mb-2 text-black">
            Quiz: {quizTitle}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            Number of Submissions: {quizStats[quizTitle].totalSubmissions}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            Maximum Mark: {quizStats[quizTitle].maxMarks}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            Average Mark: {quizStats[quizTitle].averageMark.toFixed(2)}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2 py-2">
            User with Highest Mark:{" "}
            {quizStats[quizTitle].userWithHighestMark.user || "None"}
          </Typography>
          <h3 className="text-black py-4">User Submission </h3>
          <Grid container spacing={3}>
            {quizStats[quizTitle].submissions.map((submission, subIndex) => (
              <Grid item xs={12} sm={6} key={subIndex}>
                <div className="p-4 bg-white rounded shadow-md">
                  <Typography variant="body1" className="text-gray-800">
                    <FaUser /> User: {submission.user.fullName}
                  </Typography>
                  <Typography variant="body1" className="text-gray-800">
                    <FaTrophy /> Score: {submission.score}
                  </Typography>
                  <Button
                    onClick={() => toggleShowMore(quizTitle, subIndex)}
                    variant="outlined"
                    color="primary"
                    size="small"
                    className="mt-2"
                    endIcon={
                      showMore[quizTitle][subIndex] ? (
                        <RiArrowUpSFill />
                      ) : (
                        <RiArrowDownSFill />
                      )
                    }
                  >
                    {showMore[quizTitle][subIndex] ? "Show Less" : "Show More"}
                  </Button>
                  <Collapse in={showMore[quizTitle][subIndex]}>
                    <div>
                      {/* Display all questions and answers */}
                      {submission.questionSubmissions.map(
                        (question, questionIndex) => (
                          <div key={questionIndex} className="mt-2">
                            <Typography
                              variant="body1"
                              className="text-gray-800 py-2"
                            >
                              Question: {question.question.text}
                            </Typography>
                            <Typography
                              variant="body1"
                              className="text-gray-800 py-2"
                            >
                              User Answer: {question.userAnswer}
                            </Typography>
                            <Typography
                              variant="body1"
                              className="text-green-500"
                            >
                              Correct Answer: {question.question.correctAnswer}
                            </Typography>
                          </div>
                        )
                      )}
                    </div>
                  </Collapse>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default TestStatistics;
