var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// list all clubs 

function makeWhereFromFilters(query) {
    let filters = [];

    if (query.name) {
        filters.push(`name LiKE '%${query.name}%'`);
        // %${q.name}% will find any values that have "{q.name}" in any position
    }
    if (query.category) {
        filters.push(`category LIKE '%${query.category}%'`);
    }

    return filters.join(' AND ');
}

router.get("/", async function (req, res) {
    let sql = 'SELECT * FROM clubs';
    let where = makeWhereFromFilters(req.query);

    if (where) {
        sql = `SELECT * FROM clubs WHERE ${where}`;
    }

    try {
        let result = await db(sql)
        res.status(200).send(result.data);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})


module.exports = router;
