import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Registration() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [role, setRole] = useState("student"); // Default role is student

  const departmentOptions = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
  ];
  const courseOptions = ["B.Tech", "M.Tech", "B.E", "M.E"];

  function handleSubmit(event) {
    event.preventDefault();

    // Validate data
    if (
      !userName ||
      !password ||
      !email ||
      !fullName ||
      !userId ||
      !department ||
      !course
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const user = {
      username: userName,
      password: password,
      email: email,
      fullName: fullName,
      userId: userId,
      department: department,
      course: course,
      role: role, // Include role in the user object
    };

    axios
      .post(`http://localhost:8080/signup`, user)
      .then(() => {
        alert("Registration Successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  function updateUserName(e) {
    setUserName(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  function updateFullName(e) {
    setFullName(e.target.value);
  }

  function updateUserId(e) {
    setUserId(e.target.value);
  }

  function updateDepartment(e) {
    setDepartment(e.target.value);
  }

  function updateCourse(e) {
    setCourse(e.target.value);
  }

  function updateRole(e) {
    setRole(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={updateUserName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={updatePassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={updateEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={updateFullName}
          />
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              value={role}
              onChange={updateRole}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label={role === "student" ? "Student ID" : "Teacher ID"}
            name="userId"
            value={userId}
            onChange={updateUserId}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="department"
            select
            // label="Department"
            name="department"
            value={department}
            onChange={updateDepartment}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled>
              Select Department
            </option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="course"
            select
            // label="Course"
            name="course"
            value={course}
            onChange={updateCourse}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled>
              Select Course
            </option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </TextField>
          <FormControlLabel
            control={<Checkbox value="agree" color="primary" />}
            label="I agree to the terms and conditions."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Registration;
