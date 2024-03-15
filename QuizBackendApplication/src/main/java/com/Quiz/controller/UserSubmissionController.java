package com.Quiz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Quiz.entity.UserSubmission;
import com.Quiz.service.UserSubmissionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserSubmissionController {

    private final UserSubmissionService userSubmissionService;

    @Autowired
    public UserSubmissionController(UserSubmissionService userSubmissionService) {
        this.userSubmissionService = userSubmissionService;
    }

    @PostMapping("/submit")
    public UserSubmission submitUserSubmission(@RequestBody UserSubmission userSubmission) {
        // Add validation logic if needed
        return userSubmissionService.submitUserSubmission(userSubmission);
    }
    @GetMapping("/usersubmissions/{userId}")
    public List<UserSubmission> getUserSubmissionsByUserId(@PathVariable String userId) {
        return userSubmissionService.getUserSubmissionsByUserId(userId);
    }
    @GetMapping("/usersubmissions")
    public List<UserSubmission> getAllUserSubmissions() {
        return userSubmissionService.getAllUserSubmissions();
    }
}
