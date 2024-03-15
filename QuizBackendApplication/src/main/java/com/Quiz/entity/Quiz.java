package com.Quiz.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;

    private String title;
    
    private String teacherId;

    private List<Question> questions;

    private int timeLimit; // New field for time limit

    private Date scheduledDate; // New field for scheduled date

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public int getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

	public void setId(String id2) {
		// TODO Auto-generated method stub
		this.id=id2;	}

	public String getId() {
		return id;
	}

	public String getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}

    // Getters and setters
}
