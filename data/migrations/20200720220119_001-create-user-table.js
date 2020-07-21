
exports.up = function(knex) {
    return knex.schema
        .createTable("user", table => {
            table.increments("id");
            table.string('username', 50)
                .notNullable()
                .unique();
            table.string('password', 128)
                .notNullable();
            table.string('department', 50);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user');
};
