const inspector = require("schema-inspector");
const jwt = require("jsonwebtoken");
const usersSchema = require("../users/usersSchema");

module.exports = {
    validateCredentials,
    restricted
}

function validateCredentials (req, res, next) {
    if (inspector.validate(usersSchema, req.body).valid) {
        next();
    } else {
        res.status(400).json({
            error: "Bad request",
            description: "Please provide valid username and password"
        });
    }
}

function restricted (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
            if (!error) {
                req.jwt = decodedToken;
                next();
            } else {
                res.status(403).json({
                    error: "Access denied. Please log in."
                });
            }
        });
    } else {
        res.status(403).json({
            error: "Access denied. Please log in."
        });
    }
}