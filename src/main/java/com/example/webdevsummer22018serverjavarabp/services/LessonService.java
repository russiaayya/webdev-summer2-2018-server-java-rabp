package com.example.webdevsummer22018serverjavarabp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsummer22018serverjavarabp.models.Course;
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
	
	@PostMapping("/api/course/{courseId}/module/{mid}/lesson")
	public Lesson createLesson(
			@PathVariable("mid") int moduleId,
			@RequestBody Lesson newLesson) {
		Optional<Module> data = moduleRepository.findById(moduleId);
		
		if(data.isPresent()) {
			Module module = data.get();
			newLesson.setModule(module);
			return lessonRepository.save(newLesson);
		}
		return null;		
	}
	
	@DeleteMapping("/api/lesson/{lessonId}")
	public void deleteLesson(@PathVariable("lessonId") int lessonId)
	{
		lessonRepository.deleteById(lessonId);
	}
	
	@GetMapping("/api/course/{cid}/module/{mid}/lesson")
	public List<Lesson> findAllLessonsForModule(@PathVariable(name="mid") int moduleId) {
		Optional<Module> optionalModule = moduleRepository.findById(moduleId);
		if(optionalModule.isPresent()) {
			Module module = optionalModule.get();
			return (List<Lesson>) module.getLessons();
		}
		return null;
	}
}
