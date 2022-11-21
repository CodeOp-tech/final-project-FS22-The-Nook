var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");
const {  joinToJson, clubsSql, booksSql } = require('./commonfunctions');


function makeWhereFromFilters(query) {
    let filters = [];
  
    if (query.name) {
      filters.push(`clubs.name LIKE '%${query.name}%'`);
    }
    if (query.category) {
      filters.push(`clubs.category LIKE '%${query.category}%'`);
    }
    if (query.next_mtg_city) {
      filters.push(`clubs.next_mtg_city LIKE '%${query.next_mtg_city}%'`);
    }
  
    return filters.join(" AND ");
  }

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
  let where = makeWhereFromFilters(req.query);
  let cSql = ";"
  try {
    
    if(where) {
        cSql = `${clubsSql} WHERE ${where} AND user_id = '${userId}'` 
    } else {
        cSql = `${clubsSql} WHERE user_id = '${userId}'`;
    }

    let bSql = `${booksSql} WHERE user_id = '${userId}'`;

      let booksResults = await db(bSql);
      let clubsResults = await db(cSql);
      res.send(joinToJson(booksResults, clubsResults));
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});




module.exports = router;
