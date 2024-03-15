package com.Quiz.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Quiz.entity.Question;
import com.Quiz.repository.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

	public Question createQuestion(Question question) {
		// TODO Auto-generated method stub
		return null;
	}

	public QuestionRepository getQuestionRepository() {
		return questionRepository;
	}

	public void setQuestionRepository(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}

    // Implement methods to fetch, save, update questions
}


