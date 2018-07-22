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

import com.example.webdevsummer22018serverjavarabp.models.Lesson;
import com.example.webdevsummer22018serverjavarabp.models.Module;
import com.example.webdevsummer22018serverjavarabp.models.Topic;
import com.example.webdevsummer22018serverjavarabp.repositories.LessonRepository;
import com.example.webdevsummer22018serverjavarabp.repositories.ModuleRepository;
import com.example.webdevsummer22018serverjavarabp.repositories.TopicRepository;

@RestController
@CrossOrigin(origins = "*")
public class TopicService {

	@Autowired
	TopicRepository topicRepository;
	@Autowired
	LessonRepository lessonRepository;
	@Autowired
	ModuleRepository moduleRepository;
	
	@GetMapping("/api/lesson")
	public List<Topic> findAllTopics() {
		return (List<Topic>) topicRepository.findAll();
	}

	
	@PostMapping("/api/course/{courseId}/module/{mid}/lesson/{lid}/topic")
	public Topic createTopic(
			@PathVariable("lid") int lessonId,
			@RequestBody Topic newTopic) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		
		if(data.isPresent()) {
			Lesson lesson = data.get();
			newTopic.setLesson(lesson);
			return topicRepository.save(newTopic);
		}
		return null;		
	}
	
	@DeleteMapping("/api/topic/{topicId}")
	public void deleteTopic(@PathVariable("topicId") int topicId)
	{
		topicRepository.deleteById(topicId);
	}
	
	@GetMapping("/api/course/{cid}/module/{mid}/lesson/{lid}/topic")
	public List<Topic> findAllTopicsForLesson(@PathVariable(name="lid") int lessonId) {
		Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
		if(optionalLesson.isPresent()) {
			Lesson lesson = optionalLesson.get();
			return (List<Topic>) lesson.getTopics();
		}
		return null;
	}
}
