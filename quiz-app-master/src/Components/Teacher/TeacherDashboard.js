import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Grid } from "@mui/material";
import Nav from "../../Scatrch/Navbar";
import QuizList from "./QuizList";
import TestStatistics from "./TestStatistics";
import TeacherInfo from "./TeacherInfo";
import axios from "axios";
import logo from "./logo.png";

function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [userData, setUserData] = useState(null);
  const [displayTeacherInfo, setDisplayTeacherInfo] = useState(true);
  const [displayQuizList, setDisplayQuizList] = useState(false);
  const [displayTestStatistics, setDisplayTestStatistics] = useState(false);
  const { teacherId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${teacherId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [teacherId]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = (quizId) => {
    fetch(`http://localhost:8080/api/quizzes/${quizId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
          console.log("Quiz deleted successfully.");
        } else {
          console.error("Failed to delete quiz.");
        }
      })
      .catch((error) => console.error("Error deleting quiz:", error));
  };

  const handleEditQuiz = (quizId) => {
    console.log(`Editing quiz with ID: ${quizId}`);
  };

  return (
    <>
      <Nav
        brandText="Quiz Management System"
        menuItems={[
          {
            text: "Dashboard",
            onClick: () => {
              setDisplayTeacherInfo(true);
              setDisplayQuizList(false);
              setDisplayTestStatistics(false);
            },
            className: displayTeacherInfo ? "nav-item active" : "nav-item",
          },
          {
            text: "Quiz List",
            onClick: () => {
              setDisplayQuizList(true);
              setDisplayTeacherInfo(false);
              setDisplayTestStatistics(false);
            },
            className: displayQuizList ? "nav-item active" : "nav-item",
          },
          {
            text: "Test Statistics",
            onClick: () => {
              setDisplayTestStatistics(true);
              setDisplayTeacherInfo(false);
              setDisplayQuizList(false);
            },
            className: displayTestStatistics ? "nav-item active" : "nav-item",
          },
          {
            text: `Logout (${userData?.username})`,
            link: "/",
          },
        ]}
      />
      <Box
        className="relative"
        style={{
          backgroundImage: "url('/bg.jpg')", // Specify the path to your image
          backgroundSize: "cover", // Ensure the image covers the entire box
          backgroundPosition: "center", // Center the image
          minHeight: "100vh", // Set minimum height to cover the entire viewport
          paddingTop: "200px",
        }}
      >
        <Container maxWidth="lg">
          {/* <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} sm={4}>
              <img
                src={logo}
                alt="Quiz Management System"
                style={{ maxWidth: "50%" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h3"
                component="h1"
                className="text-sm font-bold mb-4"
              >
                Teacher Dashboard
              </Typography>
            </Grid>
          </Grid> */}
          {displayTeacherInfo && <TeacherInfo userData={userData} />}
          {displayQuizList && (
            <QuizList
              quizzes={quizzes}
              onDeleteQuiz={handleDeleteQuiz}
              onEditQuiz={handleEditQuiz}
            />
          )}
          {displayTestStatistics && <TestStatistics teacherId={teacherId} />}
        </Container>
      </Box>
    </>
  );
}

export default TeacherDashboard;
