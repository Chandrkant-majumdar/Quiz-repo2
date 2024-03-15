import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import QuizPage from "./Components/Quiz/QuizPage";

import StudentDashboard from "./Components/Student/StudentDashboard";
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import WelcomePage from "./Scatrch/welcome";
import LoginPage from "././Components/Login/login";
import Registration from "./Scatrch/Registration";
import CreateQuiz from "./Components/Quiz/CreateQuiz";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/Student-Dash/:studentId"
            element={<StudentDashboard />}
          />

          <Route
            path="/Teacher-Dash/:teacherId"
            element={<TeacherDashboard />}
          />

          <Route path="/Registration" element={<Registration />} />

          {/* <Route
            path="/TeacherRegistration"
            element={<TeacherRegistration />}
          /> */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-quiz/:teacherId" element={<CreateQuiz />} />
          <Route path="/quiz/:quizId/:studentId" element={<QuizPage />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
