DROP DATABASE to_do_list_db;
CREATE DATABASE to_do_list_db;
USE to_do_list_db;

CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(60) NOT NULL,
  name varchar(30) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT current_timestamp(),
  updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `notes` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(11) NOT NULL,
  title varchar(255),
  content text NOT NULL,
  createdAt timestamp NOT NULL DEFAULT current_timestamp(),
  updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tags` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `notes_n_tags` (
  noteId int(11) NOT NULL,
  tagId int(11) NOT NULL,
  FOREIGN KEY (noteId) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* passwords are password */
INSERT INTO users 
VALUES 
  (1, "alex@mail.com", "Alex", "$2a$08$Bh5cJDop4me1YPgGmsz0kOE9wYmFqAu48qz2cvOgslMF2Dcchsmlu", "2020-11-25 13:36:53", "2020-11-27 17:12:43"),
  (2, "user@mail.com", "user", "$2a$08$Bh5cJDop4me1YPgGmsz0kOE9wYmFqAu48qz2cvOgslMF2Dcchsmlu", "2020-11-29 13:36:53", "2020-11-29 13:36:53");

INSERT INTO notes 
VALUES
  (1, 1, "Title 1.", "This is Alex's note number 1.", "2020-11-29 11:36:53", "2020-11-29 13:36:53"),
  (2, 1, "Title 2.", "This is Alex's note number 2.", "2020-10-29 13:36:53", "2020-11-29 13:36:53"),
  (3, 1, "Title 3.","This is Alex's note number 3.", "2020-11-29 13:30:53", current_timestamp()),
  (4, 2, "Title 4.","This is user's note number 1.", "2020-11-27 13:36:53", "2020-11-29 13:36:53"),
  (5, 2, "Title 5.","This is user's note number 2.", current_timestamp(), current_timestamp());

INSERT INTO tags
VALUES
  (1, "school"),
  (2, "work"),
  (3, "home"),
  (4, "meeting"),
  (5, "important");

INSERT INTO notes_n_tags
VALUES
  (1, 1),
  (1, 2),
  (1, 5),
  (2, 1),
  (2, 4),
  (5, 4),
  (3, 3);