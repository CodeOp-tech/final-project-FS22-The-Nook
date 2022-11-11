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
 * Add one book.
 **/

router.post("/", async function (req, res, next) {
  let sql = `INSERT INTO books (title, author, image)
  VALUES ('${req.body.title}', '${req.body.author}', '${req.body.image}'); SELECT LAST_INSERT_ID();`;

  try {
    await db(sql);
    let results = await db(`SELECT * FROM books`);
    let book = results.data[results.data.length - 1];
    console.log(results);
    res.send(book);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
