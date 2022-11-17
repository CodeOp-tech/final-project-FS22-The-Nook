var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require('../middleware/guards');
const {  joinToJson, clubsSql, booksSql } = require('./commonfunctions');


// list all clubs

function makeWhereFromFilters(query) {
  let filters = [];

  if (query.name) {
    filters.push(`name LiKE '%${query.name}%'`);
  }
  if (query.category) {
    filters.push(`category LIKE '%${query.category}%'`);
  }

  return filters.join(" AND ");
}

router.get("/", async function (req, res) {
  let sql = `
      SELECT clubs.*, COUNT(user_id) AS m 
      FROM clubs
      LEFT JOIN users_clubs ON club_id = clubs.id
      GROUP BY club_id
      `;
  let where = makeWhereFromFilters(req.query);

  if (where) {
    sql = `SELECT clubs.*, COUNT(user_id) AS m 
          FROM clubs
          LEFT JOIN users_clubs ON club_id = clubs.id 
          WHERE ${where}
          GROUP BY club_id
          `;
  }

  try {
    let result = await db(sql);
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get info for a specific club
router.get("/:id", async function (req, res) {
  let sql = `SELECT * FROM clubs WHERE id=${req.params.id}`;

  try {
    let result = await db(sql);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// get all users that joined a club

// router.get("/joined", async function(req, res) {


//   try {

//       let sql = `
//       SELECT COUNT(user_id) AS j
//       FROM users_clubs
//       GROUP BY club_id
//       `;
      
//       let result = await db(sql);
//       // console.log(result)
//       if (result.data.length === 0) {
//         res.status(404).send({ error: "No users have joined yet" });
//       } else {
//         res.send(result.data);
//       }
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });

// add a user to a club (add the user to the user_club junction table when a user wants to join a club)

router.post("/:id", ensureUserLoggedIn, async function(req, res) {

  let clubId = req.params.id 
  

  let sql = `
    INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES
      (${clubId}, ${res.locals.user}, 1)
  `;
    let userId = res.locals.user;

  try {
    await db(sql);
    // console.log(sql)
    let booksResults = await db(booksSql +` WHERE user_id = '${userId}'`) ;
    let clubsResults = await db(clubsSql +` WHERE user_id = '${userId}'`)
    res.send(joinToJson(booksResults, clubsResults));
  } catch (err) {
      res.status(500).send({ error: err.message });
  }

})



module.exports = router;
