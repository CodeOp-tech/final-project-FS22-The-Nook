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

//Create a new club
router.post("/", async function (req, res) {
  let {
    name,
    genre,
    location,
    image,
  } = req.body;
  // sql command line for inserting clubs (as completed in initial set up)
  let sql = `INSERT INTO clubs (name, genre, location, image)
    VALUES ('${name}', '${genre}', '${location}', '${image}')`;
  // adding new club
  try {
    await db(sql); // add club when function called
    let list = await db(`SELECT * FROM clubs`); // return whole club list
    let clubs = list.data; // add managable & comprehensive variable
    res.status(201).send(clubs); // send updated array
    // server error
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
