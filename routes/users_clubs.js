var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require('../middleware/guards');
const {  joinToJson, clubsSql, booksSql } = require('./commonfunctions');


/**
 * Delete user from club.
 **/

router.put("/leaveclub/:id", ensureUserLoggedIn, async function(req, res){
let userID = Number(req.params.id);
let {club_id} = req.body;
try {
    await db(`DELETE FROM users_clubs WHERE user_id = ${userID} AND club_id = ${club_id};`);
    let booksResults = await db(booksSql +` WHERE user_id = '${userID}'`) ;
    let clubsResults = await db(clubsSql +` WHERE user_id = '${userID}'`)
    res.send(joinToJson(booksResults, clubsResults));
} catch (err) {
    res.status(500).send({ error: err.message });
}
})

module.exports = router;
