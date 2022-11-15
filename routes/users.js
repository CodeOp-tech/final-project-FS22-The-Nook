var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

function joinToJson(result){
    let row0 = result.data[0];
    console.log(result.data)

    let books=[];
    books = result.data.map(b => ({
      title: b.title,
      author: b.author,
      rating: b.rating,
      date_read: b.date_read,
      favorite: b.favorite
    }))
    books= [...new Set(books.map((item) => JSON.stringify(item)))]
    books= books.map(i=> JSON.parse(i))

    let clubs=[];
    clubs = result.data.map(c => ({
        name:  c.name,
        category: c.category
    }))
    clubs= [...new Set(clubs.map((item) => JSON.stringify(item)))]
    clubs= clubs.map(i=> JSON.parse(i))
    
    let user = {
        id: row0.user_id,
        username: row0.username,
        email: row0.email,
        books,
        clubs
    }

    return user
}


/**
 * Get all users
 **/
 router.get('/', async function(req, res, next) {
  let sql = 'SELECT * FROM users ORDER BY username';

  try {
      let results = await db(sql);
      let users = results.data;
      users.forEach(u => delete u.password); 
      res.send(users);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


/**
 * Get one user.
 **/

 router.get('/:userId', ensureSameUser, async function(req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT users.*, users.id AS user_id, ub.rating, ub.date_read, ub.favorite, books.*, clubs.*
            FROM users 
            LEFT JOIN users_books AS ub ON users.id = ub.user_id
            LEFT JOIN books ON ub.book_id = books.id
            LEFT JOIN users_clubs AS uc ON users.id = uc.user_id
            LEFT JOIN clubs ON uc.club_id = clubs.id
            WHERE users.id = ` + userId;
  
  try {
      let results = await db(sql);
    //   let user = results.data[0];
    //   delete user.password;  
      res.send(joinToJson(results));
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


module.exports = router;
