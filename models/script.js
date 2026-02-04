const prisma = require('./prisma');

//mock data
const users = {
    1: {
        username: "priest",
        password: "123456",
    },
    2: {
        username: "old man",
        password: "baldman",
    },
};

async function createUser(username, password) {
    //mock create user
    console.log(username, password);
    return;
} 

async function getUsers() {
    //mock user data
    const data = users;
    return { data };
}

module.exports = {
    createUser,
    getUsers,
}