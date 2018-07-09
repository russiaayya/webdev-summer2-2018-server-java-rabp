package com.example.webdevsummer22018serverjavarabp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.webdevsummer22018serverjavarabp.models.User;
import com.example.webdevsummer22018serverjavarabp.repositories.UserRepository;

@RestController
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		userRepository.save(user);
		return user;
	}
	
}
