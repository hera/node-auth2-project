const express = require("express");
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


router.post("/login", (req, res) => {
    res.status(501).send("Not implemented");
});


module.exports = router;