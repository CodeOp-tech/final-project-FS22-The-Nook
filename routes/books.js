var express = require("express");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { joinToJson, clubsSql, booksSql } = require("./commonfunctions");


/**
 * Get all books or all books by club or do search 
 **/
router.get("/", async function (req, res) {
  let sql = `
        SELECT books.*, books.id AS book_id, books_clubs.club_id AS bc_cid, clubs.id AS c_id, clubs.name, books_clubs.book_id AS bc_bid 
        FROM books
        LEFT JOIN books_clubs ON books.id = books_clubs.book_id 
        LEFT JOIN clubs ON clubs.id = books_clubs.club_id

        `;

  // let sql = `
  //     SELECT books.*, books.id AS book_id, books_clubs.club_id AS bc_cid, clubs.id AS c_id, clubs.name, books_clubs.book_id AS bc_bid, users.id, users_books.user_id 
  //     FROM books, users
  //     LEFT JOIN books_clubs ON books.id = books_clubs.book_id 
  //     LEFT JOIN clubs ON clubs.id = books_clubs.club_id
  //     LEFT JOIN users ON users.id = users_books.user_id
  // `;




  let where = makeWhereFromFilters(req.query);
  
  if (where) {
    sql += `WHERE ${where}`;
  }

  if (req.query.club_id) {
    sql = `SELECT books.*, books_clubs.*
    FROM books
    LEFT JOIN books_clubs ON books.id = books_clubs.book_id
    WHERE books_clubs.club_id=${req.query.club_id}
    ORDER BY date DESC`;
  }

  try {
    let results = await db(sql);
    // console.log(results)
    res.send(joinToJsonBooksClubsUsers(results));
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

router.patch("/:id", async function (req, res) {
  let bookId = Number(req.params.id);
  let {rating, date_read, favorite, comment, user_id} = req.body;
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
