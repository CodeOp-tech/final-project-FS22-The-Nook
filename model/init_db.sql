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
    `next_mtg_time` TIME NOT NULL,
    `next_mtg_location` VARCHAR(255) NOT NULL
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
    VALUES ('johndoe', 'johndoe@example.com', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W'), ('janedoe', 'janedoe@example.com', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6');

INSERT INTO books (title, author, image)
    VALUES ("La Divina Commedia", "Dante Alighieri", "https://m.media-amazon.com/images/I/51v2k7bvlUL.jpg"), ("Don Quijote de la Mancha", "Miguel Cervantes", "https://imagenes.elpais.com/resizer/ny6-0RsNhSHBhQyWmel5nDGK3Wk=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7BN7MROFVTFLCFQ2FXZPUC3Y3E.jpg");

INSERT INTO users_books (user_id, book_id, rating, comment, date_read, favorite)
    VALUES (1, 1, 3, "A bit boring", "2022-10-11", 0), (1, 2, 3, "Aaaa", "2022-10-11", 1), (2, 2, 5, "One of my favorites!", "2022-11-10", 1);

INSERT INTO clubs (name, category, next_mtg_time, next_mtg_location)
    VALUES ("International classics", "classics", "11:00:00", "Martini Bar"), ("Into the future", "sci-fi", "19:00:00", "Hyde Park");

INSERT INTO books_clubs (book_id, club_id, date)
    VALUES (1, 1, "2022-10-01"), (2, 1, "2022-11-01");

INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES (1, 1, 0), (1, 2, 1), (2, 1, 1);
