var express = require("express");
const { UNSAFE_enhanceManualRouteObjects } = require("react-router-dom");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { joinToJson, clubsSql, booksSql } = require("./commonfunctions");
var _ = require("lodash");
const { response } = require("express");

// get books for a particular club

router.get("/", async function (req, res) {
  let sql = `
    SELECT * from books
  `;

  if (req.query.club_id) {
    sql = `SELECT books.*, books_clubs.*
      FROM books
      LEFT JOIN books_clubs ON books.id = books_clubs.book_id
      WHERE books_clubs.club_id=${req.query.club_id}
      ORDER BY date DESC`;
  }

  try {
    let results = await db(sql);

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// get all books and search function

function joinToJsonBooksClubsUsers(
  bookSqlResults,
  clubSqlResults,
  userSqlResults
) {
  const groupedClubs = _.groupBy(
    clubSqlResults.data,
    (groupedClubs) => groupedClubs.book_id
  );

  const groupedUsers = _.groupBy(
    userSqlResults.data,
    (groupedUsers) => groupedUsers.book_id
  );

  let book = bookSqlResults.data.map((b) => ({
    book_id: b.id,
    book_title: b.title,
    book_author: b.author,
    book_img: b.image,
    clubsThatRead: groupedClubs[b.id] ? groupedClubs[b.id] : [],
    usersThatRead: groupedUsers[b.id] ? groupedUsers[b.id] : [],
  }));

  return book;
}

function makeWhereFromFilters(query) {
  let filters = [];

  if (query.title) {
    filters.push(`title LIKE '%${query.title}%'`);
  }
  if (query.author) {
    filters.push(`author LIKE '%${query.author}%'`);
  }
  if (query.book_id) {
    filters.push(`books.id = ${query.book_id}`);
  }
  return filters.join(" AND ");
}

router.get("/topbooks", async function (req, res) {
  let ratingsSql = `
        SELECT
          users_books.book_id,
          books.*,
          AVG(users_books.rating) 'avg_rating'
        FROM users_books
        INNER JOIN books
        ON users_books.book_id = books.id
        GROUP BY book_id
        ORDER BY avg_rating DESC
        LIMIT 4
        `;

  try {
    let results = await db(ratingsSql);
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/all", async function (req, res) {
  let bookSql = `
    SELECT * FROM books
  `;

  let clubSql = `
    SELECT books_clubs.book_id, books_clubs.club_id, books_clubs.date, clubs.name
    FROM books_clubs
    LEFT JOIN clubs ON clubs.id = books_clubs.club_id
  `;

  let userSql = `
      SELECT users.id, users.username, users_books.book_id, users_books.rating, users_books.comment, users_books.date_read, users_books.favorite
      FROM users
      LEFT JOIN users_books ON users_books.user_id = users.id
  `;

  let where = makeWhereFromFilters(req.query);

  if (where) {
    bookSql = `SELECT * FROM books WHERE ${where}`;
  }

  try {
    let bookSqlResults = await db(bookSql);
    let clubSqlResults = await db(clubSql);
    let userSqlResults = await db(userSql);
    res.send(
      joinToJsonBooksClubsUsers(bookSqlResults, clubSqlResults, userSqlResults)
    );
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Add one book to a club's book list.
 **/

router.post("/", async function (req, res, next) {
  let title = req.body.title.replaceAll(" ", "+");
  let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let results = await response.json();

      let book = results.items.filter((e) => e.volumeInfo.language === "en");
      let bookObj = {
        author: book[0].volumeInfo.authors[0],
        title: book[0].volumeInfo.title,
        image: book[0].volumeInfo.imageLinks.thumbnail,
        date: req.body.date,
        club_id: req.body.club_id,
      };

      let idResult = await db(`INSERT INTO books (title, author, image)
  VALUES ("${bookObj.title}", "${bookObj.author}", "${bookObj.image}"); SELECT LAST_INSERT_ID();`);
      await db(
        `INSERT INTO books_clubs (book_id, club_id, date) VALUES (${idResult.data[0].insertId}, ${bookObj.club_id}, STR_TO_DATE('${req.body.date}', '%Y-%m-%d'));`
      );
      let results2 = await db(
        `SELECT * FROM books WHERE id = ${idResult.data[0].insertId}`
      );
      res.send(results2.data[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/:user_id", async function (req, res, next) {
  let { user_id } = req.params;
  let title = req.body.title.replaceAll(" ", "+");
  let { rating, comment, date_read, favorite } = req.body;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let results = await response.json();

      let book = results.items.filter((e) => e.volumeInfo.language === "en");
      let bookObj = {
        author: book[0].volumeInfo.authors[0],
        title: book[0].volumeInfo.title,
        image: book[0].volumeInfo.imageLinks.thumbnail,
      };

      let idResult = await db(`INSERT INTO books (title, author, image)
    VALUES ("${bookObj.title}", "${bookObj.author}", "${bookObj.image}"); SELECT LAST_INSERT_ID();`);

      await db(`INSERT INTO users_books (user_id, book_id, rating, comment, date_read, favorite)
    VALUES (${user_id}, ${idResult.data[0].insertId}, ${rating}, '${comment}', '${date_read}', ${favorite});`); // add book when function called

      //then get one user

      let booksResults = await db(`${booksSql} WHERE users.id = ${user_id}`);
      let clubsResults = await db(`${clubsSql} WHERE users.id = ${user_id}`);

      res.send(joinToJson(booksResults, clubsResults));
    }

    // server error
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/:id", async function (req, res) {
  let bookId = Number(req.params.id);
  let { rating, date_read, favorite, comment, user_id } = req.body;
  let sql = `
  UPDATE users_books
  SET
    rating = ${rating},
    date_read = "${date_read}",
    favorite = ${favorite},
    comment = "${comment}"
    WHERE
    book_id = ${bookId}
  AND
    user_id = ${user_id};
`;
  try {
    let book = await db(`SELECT * FROM users_books  WHERE
book_id = ${bookId} AND user_id = ${user_id};`);
    if (book.data.length === 0) {
      res.status(404).send({ error: "Book does not exist." });
    } else {
      await db(sql);
      let booksResults = await db(booksSql + ` WHERE user_id = '${user_id}'`);
      let clubsResults = await db(clubsSql + ` WHERE user_id = '${user_id}'`);
      res.send(joinToJson(booksResults, clubsResults));
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
