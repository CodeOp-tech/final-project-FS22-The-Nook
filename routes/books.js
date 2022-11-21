var express = require("express");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * Get all books or all books by club
 **/
router.get("/", async function (req, res) {
  let sql = "SELECT * FROM books";

  if (req.query.club_id) {
    sql = `SELECT books.*, books_clubs.* FROM books LEFT JOIN books_clubs ON books.id = books_clubs.book_id WHERE books_clubs.club_id=${req.query.club_id}`;
  }

  try {
    let results = await db(sql);
    let books = results.data;
    res.send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Add one book to a club's book list.
 **/

router.post("/", async function (req, res, next) {
  console.log("req", req.body);
  let title = req.body.title.replaceAll(" ", "+");
  let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let results = await response.json();

      let book = results.items.filter((e) => e.volumeInfo.language === "en");
      console.log("book", book[0].volumeInfo.categories);
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

module.exports = router;
