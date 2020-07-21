const inspector = require("schema-inspector");
const usersSchema = require("../users/usersSchema");

module.exports = {
    validateCredentials
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