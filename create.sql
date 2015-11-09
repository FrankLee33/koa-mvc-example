CREATE TABLE `users` (
  `user_id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL
)DEFAULT CHARSET=UTF8;
INSERT INTO `test`.`users` (`user_id`, `name`, `birthday`, `sex`)
VALUES ('1', '测试', '2000-01-01', '男');
