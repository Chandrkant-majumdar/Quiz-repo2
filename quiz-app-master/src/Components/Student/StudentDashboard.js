import React, { useState, useEffect } from "react";
import Nav from "../../Scatrch/Navbar";
import UserInfo from "./StudentInfo";
import QuizHistory from "../Quiz/QuizHistory";
import AvailableQuizzes from "./AvailableQuizzes";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Box } from "@mui/material";
import StudentLogo from "./logo.png"; // Import your student logo image file

const StudentDashboard = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize userData as null
  const [displayUserInfo, setDisplayUserInfo] = useState(true);
  const [displayQuizHistory, setDisplayQuizHistory] = useState(false);
  const [displayAvailableQuizzes, setDisplayAvailableQuizzes] = useState(false);
  const { studentId } = useParams();

  useEffect(() => {
    // Fetch available quizzes from the backend
    fetch("http://localhost:8080/api/quizzes")
      .then((response) => response.json())
      .then((data) => {
        setAvailableQuizzes(data);
      })
      .catch((error) =>
        console.error("Error fetching available quizzes:", error)
      );

    // Fetch user data from the backend based on studentId
    fetch(`http://localhost:8080/users/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); // Update userData state with fetched user data
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [studentId]);

  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "User Info":
        setDisplayUserInfo(true);
        setDisplayQuizHistory(false);
        setDisplayAvailableQuizzes(false);
        break;
      case "Quiz History":
        setDisplayUserInfo(false);
        setDisplayQuizHistory(true);
        setDisplayAvailableQuizzes(false);
        break;
      case "Available Quizzes":
        setDisplayUserInfo(false);
        setDisplayQuizHistory(false);
        setDisplayAvailableQuizzes(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav
        brandText="Quiz Management System"
        menuItems={[
          {
            text: "User Info",
            onClick: () => handleMenuClick("User Info"),
            className: displayUserInfo ? "nav-item active" : "nav-item",
          },
          {
            text: "Quiz History",
            onClick: () => handleMenuClick("Quiz History"),
            className: displayQuizHistory ? "nav-item active" : "nav-item",
          },
          {
            text: "Available Quizzes",
            onClick: () => handleMenuClick("Available Quizzes"),
            className: displayAvailableQuizzes ? "nav-item active" : "nav-item",
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
          backgroundImage: "url('/student.jpg')", // Specify the path to your image
          backgroundSize: "cover", // Ensure the image covers the entire box
          backgroundPosition: "center", // Center the image
          minHeight: "100vh", // Set minimum height to cover the entire viewport
          paddingTop: "200px",
        }}
      >
        <Container maxWidth="lg">
          {displayUserInfo && <UserInfo userData={userData} />}
          {displayQuizHistory && <QuizHistory userData={userData} />}
          {displayAvailableQuizzes && (
            <AvailableQuizzes
              availableQuizzes={availableQuizzes}
              studentId={studentId}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default StudentDashboard;
