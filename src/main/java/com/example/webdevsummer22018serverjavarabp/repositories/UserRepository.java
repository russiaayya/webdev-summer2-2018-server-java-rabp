package com.example.webdevsummer22018serverjavarabp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.webdevsummer22018serverjavarabp.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	@Query("SELECT user FROM User user WHERE user.username=:username AND user.password=:password")
	public User findUserByCredentials(@Param("username") String u, @Param("password") String p);

	@Query("SELECT user FROM User user WHERE user.username=:username")
	public List<User> findUserByUsername(@Param("username") String u);
	
	@Query("SELECT COUNT(user) FROM User user WHERE user.username=:username")
	public int findUsernameCount(@Param("username") String u);
}
