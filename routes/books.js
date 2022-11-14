var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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
  let sql = `INSERT INTO books (title, author, image)
  VALUES ("${req.body.title}", "${req.body.author}", "${req.body.image}"); SELECT LAST_INSERT_ID();`;

  try {
    let idResult = await db(sql);
    await db(
      `INSERT INTO books_clubs (book_id, club_id, date) VALUES (${idResult.data[0].insertId}, ${req.body.club_id}, STR_TO_DATE("${req.body.date}", "%Y-%m-%d"));`
    );
    let results = await db(
      `SELECT * FROM books WHERE id = ${idResult.data[0].insertId}`
    );
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
