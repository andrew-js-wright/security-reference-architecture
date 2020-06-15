# Create user
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'testuser'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS nodelogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE nologin;

# Create Table
CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password varchar(255) DEFAULT NULL,
  email varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#Add testuser
INSERT INTO accounts (1, 'testuser','testuser','testuser@nodelogin.com');