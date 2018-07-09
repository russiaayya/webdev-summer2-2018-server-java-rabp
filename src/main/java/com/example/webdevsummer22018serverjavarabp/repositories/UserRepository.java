package com.example.webdevsummer22018serverjavarabp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.webdevsummer22018serverjavarabp.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {}
