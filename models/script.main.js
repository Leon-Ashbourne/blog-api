const prisma = require('./prisma');

//create user
async function createUser(username,  password) {
    try {
        await prisma.users.create({
            data: {
                username,
                password
            },
        });
    }catch (error) {
        return error;
    }
}

//get users
async function getUsers() {
    try {
        const data = await prisma.users.findMany({
            select: {
                username: true,
                id: true,
            },
        });

        return { data };
    }catch(error) {
        return { error }
    }
}

//get user by username
async function getUserByUsername(username) {
    try {
        const data = await prisma.users.findFirst({
            where: {
                username,
            },
        })

        return { data };
    }catch(error) {
        return { error };
    }
}

//update user by id
async function updateUserById(userId, data) {
    try {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                ...data,
            },
        });
    }catch (error) {
        return error;
    }
}

//get user by ID
async function getUserById(userId) {
    try {
        const data = await prisma.users.findFirst({
            where: {
                id: userId,
            },
            select: {
                username: true,
                include: {
                    posts: true,
                }
            }
        });

        return { data };
    }catch (error) {
        return { error };
    }
}

//get posts 
async function getPosts() {
    try {
        const data = await prisma.posts.findMany();

        return { data };
    }catch (error) {
        return { error };
    }
}

//get posts of a user
//- need improvision on sending actual blog's content
async function getPostsByUserId(userId) {
    try {
        const data = await prisma.posts.findMany({
            where: {
                authorId: userId,
            },
        });

        return { data };
    }catch (error) {
        return { error };
    }
}

//delete a user
const deleteComments = async (userId) => {
    return await prisma.comments.delete({
        where: {
            authorId: userId,
        }
    });
}

const deletePosts = async (userId) => {
    return await prisma.posts.delete({
        where: {
            authorId: userId,
        }
    });
}

const deleteUser = async (userId) => {
    return await prisma.users.delete({
        where: {
            id: userId,
        }
    });
}

const deleteUserData = await prisma.$transaction([ deleteComments, deletePosts, deleteUser ]);

//get comment
async function getCommentById(commentId) {
    try {
        const data = await prisma.comments.findFirst({
            where: {
                id: commentId,
            },
        });

        return { data };
    }catch (error) {
        return { error };
    }
}

//get comments for specific user
async function getCommentsByUserId(userId) {
    try {
        const data = await prisma.comments.findMany({
            where: {
                authorId: userId
            },
        });

        return { data };
    }catch (error) {
        return { error };
    }
}

//create comment
async function createComment(userId, postId, comment) {
    try {
        await prisma.comments.create({
            data: {
                text: comment,
                post: {
                    connect: { id: postId }
                },
                author: {
                    connect: {id: userId}
                }
            }
        })
    }catch(error) {
        error;
    }
}

//update comment
async function updateComment(commentId, comment) {
    try {
        await prisma.comments.update({
            where: {
                id: commentId,
            },
            data: {
                text: comment,
            },
        });
    }catch (error) {
        return error;
    }
}

//delete comment
async function deleteComment(commentId) {
    try {
        await prisma.users.delete({
            where: {
                id: commentId,
            },
        });
    }catch(error) {
        return error;
    }
}

//delete post
const deleteCommentFromPost = async (postId) => {
    await prisma.comments.delete({
        where: {
            postId,
        }
    });
}

const deletePost = async (postId) => {
    await prisma.posts.delete({
        where: {
            id: postId
        },
    });
}

const deletePostData = [
    deleteCommentFromPost,
    deletePost
]

//update post
async function updatePost(postId, data) {
    try {
        await prisma.posts.update({
            where: {
                id: postId
            },
            data: {
                ...data
            }
        })
    }catch (error) {
        return error;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserByUsername,
    updateUserById,
    getUserById,
    getPosts,
    getPostsByUserId,
    deleteUserData,
    getCommentById,
    getCommentsByUserId,
    createComment,
    updateComment,
    deletePostData
}