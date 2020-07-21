const express = require("express");
const userDb = require("./usersModel");
const { restricted } = require("../auth/authMiddleware");

const router = express.Router();

router.get("/", restricted, (req, res) => {
    userDb.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get all users.",
                description: error
            });
        });
});

module.exports = router;