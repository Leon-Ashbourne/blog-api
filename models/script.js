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

//mock comments
const comments = {
    1: {
        text: "wow, you are awesome",
        authorId: 1,
        postId: 1 
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

async function getPostsByUserId(userId) {
    //mock posts
    const data = posts;
    const error = new Error("error");
    
    return { data };
}

async function deleteUserData(userID) {
    //mock
}

async function getComments() {
    //mock
    const data = comments;
    return { data };
}

async function getCommentById(commentId) {
    //mock
    const data = comments[commentId];

    return { data };
}

//get comments of a specific user
async function getCommentsByUserId(userId) {
    //random data
    const data = comments;
    return { data };

}

async function createComment(userId, postId, comment) {
    //code to create a new comment
    console.log(userId, postId, comment);
    const error = new Error("error");
    // return error;
}

async function updateComment(commentId, comment) {
    console.log(commentId, comment);

    // const error = new Error("error");
    // return error;
}

async function deleteComment(commentId) {
    //code
    console.log(commentId);
    // const error = new Error("error");
    // return error;
}

async function deletePost(postId) {
    //code
    console.log(postId);
}

async function updatePost(postId) {
    //code 
    console.log(postId);
    // return new Error("error");
}

async function getUserLogin(credentials) {
    //code
    //mock
    console.log(credentials);
    const data = {
        username: "first person",
        email: "first@gmail.com",
    };

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
    getPostsByUserId,
    deleteUserData,
    getComments,
    getCommentById,
    getCommentsByUserId,
    createComment,
    updateComment,
    deleteComment,
    deletePost,
    updatePost,
    getUserLogin
}