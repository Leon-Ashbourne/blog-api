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
    3:{
        username: "lucky man",
        password: "lucky12",
    }
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

async function updateUserById(userId, data) {
    //mock update
    users[userId] = {
        ...data,
    };
    console.log(users);
}

async function getUserByUsername(username) {
    //mock
    const data = users[1];
    
    return;
}

module.exports = {
    createUser,
    getUsers,
    updateUserById,
    getUserByUsername
}