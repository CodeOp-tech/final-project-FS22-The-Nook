var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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
  let sql = "SELECT * FROM clubs";
  let where = makeWhereFromFilters(req.query);

  if (where) {
    sql = `SELECT * FROM clubs WHERE ${where}`;
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
