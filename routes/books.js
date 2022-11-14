var express = require("express");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * Get all books
 **/
router.get("/", async function (req, res) {
  let sql = "SELECT * FROM books";

  try {
    let results = await db(sql);
    let books = results.data;
    res.send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Get one book.
 **/

router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  let sql = `SELECT * FROM books WHERE id = ${id}`;

  try {
    let results = await db(sql);
    let book = results.data[0];
    res.send(book);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Add one book to a club's book list.
 **/

router.post("/", async function (req, res, next) {
  console.log("req", req);
  let title = req.body.title.replaceAll(" ", "+");
  let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let results = await response.json(); //converts JSON to JS
      let bookObj = {
        author: results.items[1].volumeInfo.authors[0],
        title: results.items[1].volumeInfo.title,
        image: results.items[1].volumeInfo.imageLinks.thumbnail,
        date: req.body.date,
        club_id: 1, // TODO: change from hard-coded value once connected to club
      };

      let idResult = await db(`INSERT INTO books (title, author, image)
  VALUES ("${bookObj.title}", "${bookObj.author}", "${bookObj.image}"); SELECT LAST_INSERT_ID();`);
      await db(
        `INSERT INTO books_clubs (book_id, club_id, date) VALUES (${idResult.data[0].insertId}, ${bookObj.club_id}, STR_TO_DATE("${req.body.date}", "%Y-%m-%d"));`
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
