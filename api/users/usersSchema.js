
const usersSchema = {
    type: 'object',
    strict: true,
    properties: {
        username:   { type: 'string', minLength: 3 },
        password:   { type: 'string', minLength: 4 },
        department: { type: 'string', optional: true }
    }
};


module.exports = usersSchema;