package com.Quiz.entity;



public class QuestionSubmission {
    private Question question;
    private String userAnswer;

    public QuestionSubmission(Question question, String userAnswer) {
        this.question = question;
        this.userAnswer = userAnswer;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }
}
