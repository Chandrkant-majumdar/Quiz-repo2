package com.Quiz.entity;

import java.util.List;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_submissions")
public class UserSubmission {
    @Id
    private String id;
    
    private String teacherId;


    private User user;

    private Quiz quiz;

    private List<QuestionSubmission> questionSubmissions;

    private int score;

    public UserSubmission() {
    }

    public UserSubmission(User user, Quiz quiz, List<QuestionSubmission> questionSubmissions, int score) {
        this.user = user;
        this.quiz = quiz;
        this.questionSubmissions = questionSubmissions;
        this.score = score;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public List<QuestionSubmission> getQuestionSubmissions() {
        return questionSubmissions;
    }

    public void setQuestionSubmissions(List<QuestionSubmission> questionSubmissions) {
        this.questionSubmissions = questionSubmissions;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

	public String getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
}
