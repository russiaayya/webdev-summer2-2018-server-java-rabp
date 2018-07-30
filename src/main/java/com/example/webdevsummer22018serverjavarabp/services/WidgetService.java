package com.example.webdevsummer22018serverjavarabp.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsummer22018serverjavarabp.models.Widget;
import com.example.webdevsummer22018serverjavarabp.repositories.WidgetRepository;

@RestController
@CrossOrigin(origins = "*")
public class WidgetService {
	
	@Autowired
	WidgetRepository widgetRepository;
	
	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets(){
		return (List<Widget>) widgetRepository.findAll();
	}
	
	@PostMapping("api/widget")
	public List<Widget> saveWidgets(@RequestBody List<Widget> widgets) {
		List<Widget> savedWidgets = new ArrayList<Widget>();
		widgetRepository.deleteAll();
		for(Widget widget: widgets) {
			savedWidgets.add(widgetRepository.save(widget));
		}
		return savedWidgets;
	}
}
