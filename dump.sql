CREATE DATABASE Chat

CREATE TABLE IF NOT EXISTS `users`
(
 `id`            int NOT NULL AUTO_INCREMENT ,
 `login`         varchar(45) NULL ,
 `password`      varchar(45) NOT NULL ,
 `currentRoomId` int NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `rooms`
(
 `id`      int NOT NULL AUTO_INCREMENT ,
 `name`    varchar(45) NOT NULL ,
 `ownerId` int NOT NULL ,
 PRIMARY KEY (`id`),
 KEY `FK_2` (`ownerId`),
 CONSTRAINT `FK_1` FOREIGN KEY `FK_2` (`ownerId`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `messages`
(
 `localId` int NOT NULL ,
 `roomId`  int NOT NULL ,
 `userId`  int NOT NULL ,
 `message` varchar(200) NOT NULL ,
 `login` varchar(45) NOT NULL 
);

