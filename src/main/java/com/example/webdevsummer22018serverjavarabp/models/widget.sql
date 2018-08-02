CREATE TABLE `widget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `list_items` varchar(255) DEFAULT NULL,
  `list_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` int(11) NOT NULL,
  `src` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `widget_order` int(11) NOT NULL,
  `widget_type` varchar(255) DEFAULT NULL,
  `width` varchar(255) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk5kh2djrqfks59tt3nh5tu29b` (`topic_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1023 DEFAULT CHARSET=utf8;