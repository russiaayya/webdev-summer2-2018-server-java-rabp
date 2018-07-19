package com.example.webdevsummer22018serverjavarabp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsummer22018serverjavarabp.models.Lesson;
import com.example.webdevsummer22018serverjavarabp.models.Module;
import com.example.webdevsummer22018serverjavarabp.repositories.LessonRepository;
import com.example.webdevsummer22018serverjavarabp.repositories.ModuleRepository;

@RestController
@CrossOrigin(origins = "*")
public class LessonService {
	@Autowired
	LessonRepository lessonRepository;
	@Autowired
	ModuleRepository moduleRepository;
	
	@GetMapping("/api/lesson")
	public List<Lesson> findAllLessons() {
		return (List<Lesson>) lessonRepository.findAll();
	}
	
	@GetMapping("/api/course/{cid}/module/{mid}/lesson")
	public List<Lesson> findForModule(@PathVariable(name="mid") int moduleId) {
		Optional<Module> optionalModule = moduleRepository.findById(moduleId);
		if(optionalModule.isPresent()) {
			Module module = optionalModule.get();
			return (List<Lesson>) module.getLessons();
		}
		return null;
	}
}
