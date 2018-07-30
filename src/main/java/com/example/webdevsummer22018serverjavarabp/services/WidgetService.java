package com.example.webdevsummer22018serverjavarabp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsummer22018serverjavarabp.models.Topic;
import com.example.webdevsummer22018serverjavarabp.models.Widget;
import com.example.webdevsummer22018serverjavarabp.repositories.TopicRepository;
import com.example.webdevsummer22018serverjavarabp.repositories.WidgetRepository;

@RestController
@CrossOrigin(origins = "*")
public class WidgetService {
	
	@Autowired
	WidgetRepository widgetRepository;
	
	@Autowired
	TopicRepository topicRepository;
	
	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets(){
		return (List<Widget>) widgetRepository.findAll();
	}
	
	@GetMapping("/api/widget/{widgetId}")
	public Widget findWidgetById(@PathVariable("widgetId") int widgetId) {
		Optional<Widget> data = widgetRepository.findById(widgetId);
		if(data.isPresent()) {
			return data.get();
		}
		return null;
	}
	
	@GetMapping("/api/topic/{topicId}/widget")
	public List<Widget> findAllWidgetsForTopic(@PathVariable("topicId") int topicId) {
		Optional<Topic>data = topicRepository.findById(topicId);
		if(data.isPresent()) {
			Topic topic = data.get();
			return topic.getWidgets();
		}
		return null;
	}
	
	@PostMapping("/api/topic/{topicId}/widget")
	public Widget createWidget(@PathVariable("topicId") int topicId, @RequestBody Widget widget) {
		Optional<Topic> data = topicRepository.findById(topicId);
		if(data.isPresent()) {
			Topic topic = data.get();
			widget.setTopic(topic);
			return widgetRepository.save(widget);
		}
		return null;
	}
	
	@PostMapping("/api/topic/{topicId}/widgets")
	public List<Widget> saveWidgets(@PathVariable("topicId") int topicId, @RequestBody List<Widget> widgets) {
		widgetRepository.deleteWidgetsByTopicId(topicId);
		List<Widget> savedWidgets = new ArrayList<Widget>();
		for(Widget widget: widgets) {
			savedWidgets.add(createWidget(topicId,widget));
		}
		return savedWidgets;
	}
	
	@PutMapping("/api/widget/{widgetId}")
	public Widget updateWidget(@PathVariable("widgetId") int widgetId, @RequestBody Widget updatedWidget) {
		Optional<Widget> data = widgetRepository.findById(widgetId);
		if(data.isPresent()) {
			Widget widget = data.get();
			widget.setName(updatedWidget.getName());
			widget.setWidgetOrder(updatedWidget.getWidgetOrder());
			widget.setText(updatedWidget.getText());
			widget.setClassName(updatedWidget.getClassName());
			widget.setStyle(updatedWidget.getStyle());
			widget.setWidth(updatedWidget.getWidth());
			widget.setHeight(updatedWidget.getHeight());
			widget.setSize(updatedWidget.getSize());
			widget.setHref(updatedWidget.getHref());
			widget.setSrc(updatedWidget.getSrc());
			widget.setListType(updatedWidget.getListType());
			widgetRepository.save(widget);
			return widget;
		}
		return null;
	}
	
	@DeleteMapping("/api/widget/{widgetId}")
	public void deleteWidget(@PathVariable("widgetId") int widgetId) {
		widgetRepository.deleteById(widgetId);
	}
	
//	@PostMapping("api/widget")
//	public List<Widget> saveWidgets(@RequestBody List<Widget> widgets) {
//		List<Widget> savedWidgets = new ArrayList<Widget>();
//		widgetRepository.deleteAll();
//		for(Widget widget: widgets) {
//			savedWidgets.add(widgetRepository.save(widget));
//		}
//		return savedWidgets;
//	}
	
}
