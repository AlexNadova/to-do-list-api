DROP DATABASE to_do_list_db;
CREATE DATABASE to_do_list_db;
USE to_do_list_db;

CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `notes` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(11) NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* passwords are password */
INSERT INTO users 
VALUES 
  (1, "alex@mail.com", "Alex", "$2a$08$Bh5cJDop4me1YPgGmsz0kOE9wYmFqAu48qz2cvOgslMF2Dcchsmlu"),
  (2, "user@mail.com", "user", "$2a$08$Bh5cJDop4me1YPgGmsz0kOE9wYmFqAu48qz2cvOgslMF2Dcchsmlu");

INSERT INTO notes 
VALUES
  (1, 1, "This is Alex's note number 1."),
  (2, 1, "This is Alex's note number 2."),
  (3, 1, "This is Alex's note number 3."),
  (4, 2, "This is user's note number 1."),
  (5, 2, "This is user's note number 2.");