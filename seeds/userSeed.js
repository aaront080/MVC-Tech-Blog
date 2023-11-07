const { User } = require('../models');
const userData = [
    {
        username: "Aaron",
        email: "aaront080@gmail.com",
        password: "password1"
    },
    {
        username: "Adam",
        email: "adam@gmail.com",
        password: "password2"
    },
    {
        username: "Henry",
        email: "henry@gmail.com",
        password: "password3"
    },
    {
        username: "Alice",
        email: "alice@gmail.com",
        password: "password4"
    },
    {
        username: "Karissa",
        email: "karissa@gmail.com",
        password: "password5"
    },
]

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;