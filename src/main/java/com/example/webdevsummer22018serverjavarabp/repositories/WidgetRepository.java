package com.example.webdevsummer22018serverjavarabp.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import com.example.webdevsummer22018serverjavarabp.models.Widget;

public interface WidgetRepository extends CrudRepository<Widget, Integer>{
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Widget widget WHERE widget.topic.id=:topicId")
	public void deleteWidgetsByTopicId(@Param("topicId") int topicId);
}
