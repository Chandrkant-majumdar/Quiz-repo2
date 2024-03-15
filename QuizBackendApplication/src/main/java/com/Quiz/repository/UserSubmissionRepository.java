package com.Quiz.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Quiz.entity.UserSubmission;

@Repository
public interface UserSubmissionRepository extends MongoRepository<UserSubmission, String> {

	List<UserSubmission> findByUserUserId(String userId);
}
