package com.Quiz.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Quiz.entity.Quiz;
import com.Quiz.service.QuizService;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable("id") String id, @RequestBody Quiz quiz) {
        // Set the ID of the quiz to be updated
        quiz.setId(id);
        Quiz updatedQuiz = quizService.updateQuiz(quiz);
        return new ResponseEntity<>(updatedQuiz, HttpStatus.OK);
    }

    // Delete a quiz by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable("id") String id) {
        quizService.deleteQuiz(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/{quizId}")
    public Quiz getQuizById(@PathVariable String quizId) {
        return quizService.getQuizById(quizId);
    }
}
