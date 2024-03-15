package com.Quiz.repository;

import com.Quiz.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findByUsername(String username);

    boolean existsByUsername(String username);

	User findByUsernameAndPassword(String username, String password);

	List<User> findAll();
}
