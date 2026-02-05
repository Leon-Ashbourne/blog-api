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

//mock posts
const posts = {
    1: {
        title: "First post",
        authorId: 1,
    },
    2: {
        title: "Second post",
        authorId: 1,
    }
}

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
    const oldValues = users[userId];
    users[userId] = {
        ...oldValues,
        ...data

    }
    console.log(data);
    console.log(users);
}

async function getUserByUsername(username) {
    //mock
    const data = users[1];
    return;
}

async function getUserById(userId) {
    //mock
    const data = users[userId];
    //const error = new Error("error");
    return { data };
}

async function getPosts() {
    //mock
    //const error = new Error("error");
    //return { error };
    const data = posts;
    return { data };
}

async function getPostById(postId) {
    const data = posts[postId];

    const error = new Error("error");
    // return { error };
    return { data };
}

module.exports = {
    createUser,
    getUsers,
    updateUserById,
    getUserByUsername,
    getUserById,
    getPosts,
    getPostById,
}