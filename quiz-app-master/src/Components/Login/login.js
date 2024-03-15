import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const handleOpenSignInDialog = () => {
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks for empty fields
    if (!userName.trim() || !password.trim()) {
      alert("Please fill out all fields");
      return;
    }

    const user = {
      username: userName,
      password: password,
    };

    axios
      .post(`http://localhost:8080/login`, user)
      .then((res) => {
        const result = res.data;
        if (result.role === "teacher") {
          navigate(`/Teacher-Dash/${result.id}`);
        } else if (result.role === "student") {
          navigate(`/Student-Dash/${result.id}`, {
            state: { username: userName, data: result },
          });
        } else {
          alert("Not Found");
        }
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  };

  const updateUserName = (e) => {
    setUserName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f0f0f0", // Light gray background color
            padding: "20px",
            borderRadius: "15px", // Rounded corners
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", // Shadow effect
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#1976d2", color: "#fff" }} // Blue background color
            >
              Sign In
            </Button>
          </Box>
          <Link onClick={handleOpenSignInDialog} variant="body2">
            Forgot password?
          </Link>
        </Box>
      </Container>
      <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog}>
        <DialogTitle>
          Forgot your email or password?
          <IconButton
            aria-label="close"
            onClick={handleCloseSignInDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseSignInDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LoginPage;
