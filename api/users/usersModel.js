const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");


module.exports = {
    getAll,
    getById,
    add,
    getByUsername
};


function getAll () {
    return db("user").select("id", "username", "department");
}


function getById (id) {
    return db("user").select("id", "username", "department").where({id});
}

function getByUsername (username) {
    return db("user").where({username});
}


function add (userCreds) {
    const hashedPassword = bcrypt.hashSync(userCreds.password, 8);

    return db("user").insert(
        {
            username: userCreds.username,
            password: hashedPassword,
            department: userCreds.department || null
        },
        "id"
    )
    .then(ids => {
        return getById(ids[0]);
    });
}