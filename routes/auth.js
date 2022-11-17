var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");
const {  joinToJson, clubsSql, booksSql } = require('./commonfunctions');



/**
 * Register a user
 **/

 router.post('/register', async (req, res) => {
    let { username, password, email } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        res.send({ message: 'Registration succeeded' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


/**
 * Log in a user
 **/

 router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        let booksResults = await db(booksSql +` WHERE username = '${username}'`);
        if (booksResults.data.length === 0) {
            // Username not found
            res.status(401).send({ error: 'Login failed' });
        } else {
            let user = booksResults.data[0]; 
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                // Passwords match
                let payload = { userId: user.id };
                // Create token containing user ID
                let token = jwt.sign(payload, SECRET_KEY);

                //Also return clubs information
                let clubsResults = await db(clubsSql +` WHERE username = '${username}'`)
                let userjoined = joinToJson(booksResults, clubsResults)
                
                res.send({
                    message: 'Login succeeded',
                    user: userjoined,
                    token: token
                });
            } else {
                // Passwords don't match
                res.status(401).send({ error: 'Login failed' });
            }
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});



module.exports = router;