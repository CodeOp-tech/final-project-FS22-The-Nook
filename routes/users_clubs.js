var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");
const { joinToJson, clubsSql, booksSql } = require("./commonfunctions");

/**
 * Add a user to a club and return updated member list.
 **/

// ensureUserLoggedIn;

router.post("/joinclub/:id", ensureUserLoggedIn, async function (req, res) {
  let userId = Number(req.params.id);
  let { club_id } = req.body;
  let getClubMembersSql = `
        SELECT clubs.id, users.*
        FROM clubs
        INNER JOIN users_clubs on clubs.id = users_clubs.club_id
        INNER JOIN users ON users_clubs.user_id = users.id
        WHERE users_clubs.club_id =${club_id}`;
  try {
    await db(`INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES (${club_id}, ${userId}, 0)`);
    let clubMembers = await db(getClubMembersSql);
    clubMembers.data.map((m) => delete m.password);
    res.send(clubMembers.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Delete user from club.
 **/

router.put("/leaveclub/:id", ensureUserLoggedIn, async function (req, res) {
  let userID = Number(req.params.id);
  let { club_id } = req.body;
  try {
    await db(
      `DELETE FROM users_clubs WHERE user_id = ${userID} AND club_id = ${club_id};`
    );
    let booksResults = await db(booksSql + ` WHERE user_id = '${userID}'`);
    let clubsResults = await db(clubsSql + ` WHERE user_id = '${userID}'`);
    res.send(joinToJson(booksResults, clubsResults));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
