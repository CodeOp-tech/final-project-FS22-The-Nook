var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");
const {
  joinToJson,
  clubsSql,
  booksSql,
  clubMembersListSql,
} = require("./commonfunctions");
var _ = require("lodash");

function joinToJsonCountAndMembers(result, count, clubMembersResults) {
  let completeResult = [];

  const grouped = _.groupBy(
    clubMembersResults.data,
    (userInfo) => userInfo.club_id
  );

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
    book_poll_info: c.book_poll_info,
    membersCount: count.data[ind] ? count.data[ind].j : 0,
    membersList: grouped[+c.id],
  }));

  return completeResult;
}

function clubInfoWithMembersJoinToJson(clubInfoResults, clubMembersResults) {
  let clubInfoWithMembers = clubInfoResults.data[0];
  let membersList = [];
  membersList = clubMembersResults.data.map((m) => ({
    username: m.username,
    id: m.id,
  }));

  clubInfoWithMembers.membersList = membersList;

  return clubInfoWithMembers;
}

// list all clubs

function makeWhereFromFilters(query) {
  let filters = [];

  if (query.name) {
    filters.push(`name LIKE '%${query.name}%'`);
  }
  if (query.category) {
    filters.push(`category LIKE '%${query.category}%'`);
  }
  if (query.next_mtg_city) {
    filters.push(`next_mtg_city LIKE '%${query.next_mtg_city}%'`);
  }
  if (query.user) {
    filters.push(`user_id = '${query.user}'`);
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

    let clubMembersResults = await db(clubMembersListSql);

    res
      .status(200)
      .send(joinToJsonCountAndMembers(result, count, clubMembersResults));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/*Create a new club  */
router.post("/", async function (req, res) {
  let { name, category, city, country, image } = req.body;
  // sql command line for inserting club (as completed in initial set up)
  let sql = `INSERT INTO clubs (name, category, next_mtg_city, next_mtg_country, image)
    VALUES ('${name}', '${category}', '${city}', '${country}', '${image}'); SELECT LAST_INSERT_ID();`;
  // adding new club
  try {
    let results = await db(sql); // add club when function called
    res.status(201).send({ club_id: results.data[0].insertId }); // send club id
    // server error
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get info for a specific club including members list
router.get("/:id", async function (req, res) {
  let sql = `SELECT * FROM clubs WHERE id=${req.params.id}`;

  try {
    let clubInfoResults = await db(sql);
    let clubMembersResults = await db(
      clubMembersListSql + ` WHERE users_clubs.club_id =${req.params.id}`
    );
    res.send(
      clubInfoWithMembersJoinToJson(clubInfoResults, clubMembersResults)
    );
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// add a user to a club

router.post("/:id", ensureUserLoggedIn, async function (req, res) {
  let userId = res.locals.user;
  let clubId = req.params.id;
  let checkUserSql = `
      SELECT *
      FROM users_clubs
      WHERE user_id = ${userId} AND club_id = ${clubId}
  `;

  let postSql = `
    INSERT INTO users_clubs (club_id, user_id, admin)
    VALUES
      (${clubId}, ${res.locals.user}, 0)
  `;

  try {
    let check = await db(checkUserSql);
    if (check.data.length === 0) {
      await db(postSql);
      let booksResults = await db(booksSql + ` WHERE user_id = '${userId}'`);
      let clubsResults = await db(clubsSql + ` WHERE user_id = '${userId}'`);
      res.send(joinToJson(booksResults, clubsResults));
    } else {
      res.status(403).send("User already joined");
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update the next meeting time and location OR the book poll options
router.patch("/:id", async function (req, res) {
  let sql;
  if (req.body.book1) {
    sql = `
      UPDATE clubs
      SET
        book_poll_info =
          '[
            {"id": 0, "text": "${req.body.book1}", "votes": ${req.body.votes1}, "percentage": 0},
            {"id": 1, "text": "${req.body.book2}", "votes": ${req.body.votes2}, "percentage": 0},
            {"id": 2, "text": "${req.body.book3}", "votes": ${req.body.votes3}, "percentage": 0}
          ]'
      WHERE
        id = ${req.params.id};
    `;
  } else if (req.body[0].percentage) {
    sql = `
      UPDATE clubs
      SET
        book_poll_info =
          '[
            {"id": 0, "text": "${req.body[0].text}", "votes": ${req.body[0].votes}, "percentage": ${req.body[0].percentage}},
            {"id": 1, "text": "${req.body[1].text}", "votes": ${req.body[1].votes}, "percentage": ${req.body[1].percentage}},
            {"id": 2, "text": "${req.body[2].text}", "votes": ${req.body[2].votes}, "percentage": ${req.body[2].percentage}}
          ]'
      WHERE
        id = ${req.params.id};
    `;
  } else {
    sql = `
      UPDATE clubs
      SET
        next_mtg_time = "${req.body.time}",
        next_mtg_location_name = "${req.body.locationName}",
        next_mtg_address = "${req.body.address}",
        next_mtg_city = "${req.body.city}",
        next_mtg_postal_code = "${req.body.postalCode}",
        next_mtg_country = "${req.body.country}"
      WHERE
        id = ${req.params.id};
    `;
  }

  try {
    let club = await db(`SELECT * FROM clubs WHERE id = ${req.params.id}`);
    if (club.data.length === 0) {
      res.status(404).send({ error: "Club does not exist." });
    } else {
      await db(sql);
      let result = await db(`SELECT * FROM clubs`);
      let countSql = `
      SELECT COUNT(user_id) AS j
      FROM users_clubs
      GROUP BY club_id
      `;
      let count = await db(countSql);

      let clubMembersResults = await db(clubMembersListSql);

      res
        .status(201)
        .send(joinToJsonCountAndMembers(result, count, clubMembersResults));
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
