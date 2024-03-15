package com.Quiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Quiz.entity.UserSubmission;
import com.Quiz.repository.UserSubmissionRepository;

@Service
public class UserSubmissionService {
    private final UserSubmissionRepository userSubmissionRepository;

    @Autowired
    public UserSubmissionService(UserSubmissionRepository userSubmissionRepository) {
        this.userSubmissionRepository = userSubmissionRepository;
    }

    public UserSubmission submitUserSubmission(UserSubmission userSubmission) {
        return userSubmissionRepository.save(userSubmission);
    }

    public UserSubmission getUserSubmissionById(String submissionId) {
        // Retrieve user submission by ID from MongoDB repository
        return userSubmissionRepository.findById(submissionId)
                                       .orElse(null); // Return null if not found
    }

    public List<UserSubmission> getUserSubmissionsByUserId(String userId) {
        return userSubmissionRepository.findByUserUserId(userId);
    }

    public List<UserSubmission> getAllUserSubmissions() {
        return userSubmissionRepository.findAll();
    }

	
}
