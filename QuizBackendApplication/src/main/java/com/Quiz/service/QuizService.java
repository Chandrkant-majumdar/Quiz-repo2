package com.Quiz.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Quiz.entity.Quiz;
import com.Quiz.repository.QuizRepository;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;

    public Quiz createQuiz(Quiz quiz) {
        // Save the quiz object using the quizRepository
        return quizRepository.save(quiz);
    }

    public QuizRepository getQuizRepository() {
        return quizRepository;
    }

    public void setQuizRepository(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> getAllQuizzes() {
        // Retrieve all quizzes from the repository
        return quizRepository.findAll();
    }

    public Quiz updateQuiz(Quiz quiz) {
        // Check if the quiz exists
        Optional<Quiz> existingQuiz = quizRepository.findById(quiz.getId());
        if (existingQuiz.isPresent()) {
            return quizRepository.save(quiz);
        } else {
            throw new RuntimeException("Quiz not found with ID: " + quiz.getId());
        }
    }

    public void deleteQuiz(String id) {
        // Check if the quiz exists
        Optional<Quiz> existingQuiz = quizRepository.findById(id);
        if (existingQuiz.isPresent()) {
            quizRepository.deleteById(id);
        } else {
            throw new RuntimeException("Quiz not found with ID: " + id);
        }
    }


    public Quiz getQuizById(String quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        return quizOptional.orElse(null);
    }

    // Implement methods to fetch, update, delete quizzes
}
