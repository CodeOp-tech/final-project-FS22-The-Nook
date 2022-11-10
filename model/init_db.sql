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
    `email` INT NOT NULL,
    `password` INT NOT NULL
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
    `rating` INT NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `date_read` DATE NULL,
    `favorite` TINYINT(1) NOT NULL
);

CREATE TABLE `clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL
);

CREATE TABLE `books_clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `club_id` INT UNSIGNED NOT NULL,
    `date` DATE NOT NULL
);

CREATE TABLE `users_clubs`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `clubs_id` INT UNSIGNED NOT NULL,
    `users_id` INT UNSIGNED NOT NULL,
    `admin` TINYINT(1) NOT NULL
);

ALTER TABLE
    `users_clubs` ADD CONSTRAINT `users_clubs_users_id_foreign` FOREIGN KEY(`users_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users_books` ADD CONSTRAINT `users_books_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users_books` ADD CONSTRAINT `users_books_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `books_clubs` ADD CONSTRAINT `books_clubs_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `users_clubs` ADD CONSTRAINT `users_clubs_clubs_id_foreign` FOREIGN KEY(`clubs_id`) REFERENCES `clubs`(`id`);
ALTER TABLE
    `books_clubs` ADD CONSTRAINT `books_clubs_club_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `clubs`(`id`);
