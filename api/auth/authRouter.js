const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userDb = require("../users/usersModel");
const { validateCredentials } = require("./authMiddleware");

const router = express.Router();


router.post("/register", validateCredentials, (req, res) => {
    userDb.add({
        username: req.body.username,
        password: req.body.password,
        department: req.body.department
    })
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not add a user.",
            description: error
        });
    });
});


router.post("/login", validateCredentials, (req, res) => {
    userDb.getByUsername(req.body.username)
        .then(users => {
            if (
                users.length &&
                bcrypt.compareSync(req.body.password, users[0]["password"])
            ) {
                const token = jwt.sign(
                    { username: users[0]["username"] },
                    process.env.SECRET,
                    { expiresIn: "1d" }
                );

                res.status(200).json({
                    token
                });
            } else {
                res.status(403).json({
                    error: "Wrong username or password.",
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not log in.",
                description: error
            });
        });
});


module.exports = router;