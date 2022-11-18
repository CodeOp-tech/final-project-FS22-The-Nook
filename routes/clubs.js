var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");
const { joinToJson, clubsSql, booksSql } = require("./commonfunctions");

function joinToJsonCount(result, count) {
  let completeResult = [];
  completeResult = result.data.map((c, ind) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    next_mtg_time: c.next_mtg_time,
    next_mtg_location_name: c.next_mtg_location_name,
    next_mtg_address: c.next_mtg_address,
    next_mtg_city: c.next_mtg_city,
    next_mtg_postal_code: c.next_mtg_postal_code,
    next_mtg_country: c.next_mtg_country,
    image: c.image,
    membersCount: count.data[ind] ? count.data[ind].j : 0,
  }));

  return completeResult;
}

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
      SELECT clubs.*
      FROM clubs
      `;

  let where = makeWhereFromFilters(req.query);

  if (where) {
    sql = `SELECT clubs.*
          FROM clubs
          WHERE ${where}
          `;
  }

  try {
    let result = await db(sql);
    let countSql = `
      SELECT COUNT(user_id) AS j
      FROM users_clubs
      GROUP BY club_id
      `;
    let count = await db(countSql);

    res.status(200).send(joinToJsonCount(result, count));
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

// add a user to a club (add the user to the user_club junction table when a user wants to join a club)

router.post("/:id", ensureUserLoggedIn, async function (req, res) {
  let clubId = req.params.id;

  let sql = `
    INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES
      (${clubId}, ${res.locals.user}, 1)
  `;
  let userId = res.locals.user;

  try {
    await db(sql);
    // console.log(sql)
    let booksResults = await db(booksSql + ` WHERE user_id = '${userId}'`);
    let clubsResults = await db(clubsSql + ` WHERE user_id = '${userId}'`);
    res.send(joinToJson(booksResults, clubsResults));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update the next meeting time and location
router.patch("/:id", async function (req, res) {
  let sql = `
      UPDATE clubs
      SET
        next_mtg_time = "${req.body.time}",
        next_mtg_location_name = "${req.body.locationName}",
        next_mtg_address = "${req.body.address}",
        next_mtg_city = "${req.body.city}",
        next_mtg_postal_code = "${req.body.postalCode}",
        next_mtg_country = "${req.body.country}"
      WHERE
        id = ${req.body.club_id};
    `;
  try {
    let club = await db(`SELECT * FROM clubs WHERE id = ${req.body.club_id}`);
    if (club.data.length === 0) {
      res.status(404).send({ error: "Club does not exist." });
    } else {
      await db(sql);
      let result = await db(
        `SELECT * FROM clubs WHERE id = ${req.body.club_id}`
      );
      res.status(201).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
