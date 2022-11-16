var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");
const {  joinToJson, clubsSql, booksSql } = require('./commonfunctions');


/**
 * Get all users
 **/
 router.get('/', async function(req, res) {
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

 router.get('/:userId', ensureSameUser, async function(req, res) {

  let { userId } = req.params;
  
  try {
      let booksResults = await db(booksSql +` WHERE user_id = '${userId}'`) ;
      let clubsResults = await db(clubsSql +` WHERE user_id = '${userId}'`)
      res.send(joinToJson(booksResults, clubsResults));
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});




module.exports = router;
