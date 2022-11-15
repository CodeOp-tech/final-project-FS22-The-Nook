var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// list all clubs

function makeWhereFromFilters(q) {
  let filters = [];

  if (q.name) {
    filters.push(`name LiKE '%${q.name}%'`);
    // %${q.name}% will find any values that have "{q.name}" in any position
  }
  if (q.category) {
    filters.push(`category LIKE '%${q.category}%'`);
  }

  return filters.join(" AND ");
}

router.get("/", async function (req, res) {
  let sql = "SELECT * FROM clubs";
  let where = makeWhereFromFilters(req.query);
  if (where) {
    sql += `WHERE ${where}`;
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

module.exports = router;
