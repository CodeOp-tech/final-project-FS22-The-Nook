SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_books;
DROP TABLE IF EXISTS clubs;
DROP TABLE IF EXISTS books_clubs;
DROP TABLE IF EXISTS users_clubs;
SET foreign_key_checks = 1;


CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `books`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE `users_books`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `book_id` INT UNSIGNED NOT NULL,
    `rating` INT NULL,
    `comment` VARCHAR(255) NULL,
    `date_read` DATE NULL,
    `favorite` TINYINT(1) NOT NULL
);

CREATE TABLE `clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `next_mtg_time` TIME,
    `next_mtg_location_name` VARCHAR(255),
    `next_mtg_address` VARCHAR(255),
    `next_mtg_city` VARCHAR(255) NOT NULL,
    `next_mtg_postal_code` VARCHAR(255),
    `next_mtg_country` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE `books_clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `club_id` INT UNSIGNED NOT NULL,
    `date` DATE NOT NULL
);

CREATE TABLE `users_clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `club_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `admin` TINYINT(1) NOT NULL
);

ALTER TABLE
    `users_clubs` ADD CONSTRAINT `users_clubs_users_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users_books` ADD CONSTRAINT `users_books_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users_books` ADD CONSTRAINT `users_books_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `books_clubs` ADD CONSTRAINT `books_clubs_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `users_clubs` ADD CONSTRAINT `users_clubs_clubs_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `clubs`(`id`);
ALTER TABLE
    `books_clubs` ADD CONSTRAINT `books_clubs_club_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `clubs`(`id`);


INSERT INTO users (username, email, password)
    VALUES ('johndoe', 'johndoe@example.com', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W'), ('janedoe', 'janedoe@example.com', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6'), ('jackiejoe', 'jackiejoe@example.com', '$2b$12$usDo.9.Z99Uo2JqtFewLie63m3iGQ8H7VOuqeZW8XSOSSysoiCKP6'), ('juandoe', 'juandoe@example.com', '$2b$12$QcZ51hN02wzDO1IyB/7lDOQehjCG0S1hn7IUhL62F8qKZ9b46e54i'), ('normanoe', 'normanoe@example.com', '$2b$12$whP9PNN.MwXJv84GlsGO9Ob7leE4LMKA07OP/Pqm7HzhLDhu3jZLm'), ('paulapoe', 'paulapoe@example.com', '$2b$12$A649mxNpFM978EkPBCErUOtBtvJu.7pSsVU3GJaFCL5XqSui20m2e');

INSERT INTO books (title, author, image)
    VALUES ("La Divina Commedia", "Dante Alighieri", "https://m.media-amazon.com/images/I/51v2k7bvlUL.jpg"), ("Don Quijote de la Mancha", "Miguel Cervantes", "https://imagenes.elpais.com/resizer/ny6-0RsNhSHBhQyWmel5nDGK3Wk=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7BN7MROFVTFLCFQ2FXZPUC3Y3E.jpg");

INSERT INTO users_books (user_id, book_id, rating, comment, date_read, favorite)
    VALUES (1, 1, 3, "A bit boring", "2022-10-11", 0), (1, 2, 3, "Aaaa", "2022-10-11", 1), (2, 2, 5, "One of my favorites!", "2022-11-10", 1);

INSERT INTO clubs (name, category, next_mtg_time, next_mtg_location_name, next_mtg_address, next_mtg_city, next_mtg_country, next_mtg_postal_code, image)
    VALUES ("International classics", "classics", "19:00:00", "Olive or Twist", "925 NW 11th Ave", "Portland", "United States", "97209", "https://static01.nyt.com/images/2022/01/16/fashion/VIRAL-LIBRARY/VIRAL-LIBRARY-articleLarge.jpg?quality=75&auto=webp&disable=upscale"),
    ("Into the future", "sci-fi", "21:00:00", "High Park", "1873 Bloor St W", "Toronto", "Canada", "M6R 2Z3", "https://media.istockphoto.com/id/1277822133/photo/futuristic-scifi-battle-ships-hover-over-an-alien-planet.jpg?s=612x612&w=0&k=20&c=JSZtYp2TtvE19LWxOV1mhgfpvZX6Y-jxlC-KRwYi6cs="),
     ("Reimagined History", "historical fiction", "20:00:00", "Barça Cafe", "C. d'Aristedes Maillol, 12", "Barcelona", "Spain", "08028", "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yeXxlbnwwfHwwfHw%3D&w=1000&q=80"),("Child's Play", "childrens literature", "12:00:00", "Ciutadella Parc", "C. d'Aristedes Maillol, 12", "Barcelona", "Spain", "08028", "https://i.pinimg.com/736x/54/45/0f/54450f404a3362d89e15d66d72c9c7f0.jpg"), ("Travel the world one book at a time", "travel", "14:00:00", "Cafe Melbourne", "4615 St Laurent Blvd", "Montreal", "Canada", "H2T 1R2", "https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbCUyMGFuZCUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"), ("Discover world cuisine", "travel", "17:00:00", "Cafefin", "nám. J. z Poděbrad 1407/4", "Prague", "Czech Republic", "120 00", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUZAYaPH7xW02PNnaXFJQNeYyhngsyVtvlQ&usqp=CAU"), ("The lives they lived", "biography", "17:00:00", "Petitbo", "Pg. de Sant Joan, 82", "Barcelona", "Spain", "08009", "https://www.rd.com/wp-content/uploads/2018/09/autobiographies.jpg"), ("In the mind of Roald Dahl", "childrens literature", "10:00:00", "La Fontaine park", "La Fontaine", "Montreal", "Canada", "H2L 3A7", "https://www.myfamilyourneeds.co.uk/wp-content/uploads/2020/02/36064-scaled.jpg"), ("The greats", "classics", "17:00:00", "Cafe Cosmo", "C/ d'Enric Granados, 3", "Barcelona", "Spain", "08007", "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"), ("Time to unwind", "casual", "20:00:00", "Pub Le Sainte-Élisabeth", "1412 Rue Sainte-Elisabeth", "Montreal", "Canada", "H2X 1L4", "https://hips.hearstapps.com/cos.h-cdn.co/assets/16/23/1465225018-reading-1.jpg");




INSERT INTO books_clubs (book_id, club_id, date)
    VALUES (1, 1, "2022-10-01"), (2, 1, "2022-11-01");

INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES (1, 1, 0), (1, 3, 0), (2, 1, 0), (2, 5, 0), (3, 4, 0), (3, 5, 0), (3, 6, 0), (4, 6, 0), (4, 5, 0), (5, 1, 0), (5, 6, 0), (5, 3, 0), (5, 4, 0), (5, 5, 0), (6, 3, 0), (7, 6, 0), (7, 5, 0), (8, 1, 0), (9, 1, 0), (9, 4, 0), (9, 5, 0), (9, 6, 0), (10, 3, 0), (10, 4, 0), (10, 5, 0), (10, 6, 0);
