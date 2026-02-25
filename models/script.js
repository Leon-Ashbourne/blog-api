const prisma = require('./prisma');

//create user
async function createUser(user) {
    try {
        await prisma.users.create({
            data: {
                ...user
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
async function getPublicPosts(start, end) {
    const total = end-start;
    try {
        const data = await prisma.posts.findMany({
            take: total,
            skip: start,
            where: {
                AND: [
                    {
                        published: true,
                    }
                ]
            },
            include: {
                author: {
                    select: {
                        username: true,
                    }
                }
            }
        });

        return { data };
    }catch (error) {
        return { error };
    }
}

//get posts of a user
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

const deleteUserData = async () => { 
    try {
        await prisma.$transaction([ deleteComments, deletePosts, deleteUser ]);
    }catch (error) {
        return { error };
    }
 }

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

//get user for login
async function getUserLogin(credentials) {
    try {
        const data = await prisma.users.findFirst({
            where: {
                ...credentials,
            },
            select: {
                username: true,
                id: true,
            },
        });

        return { data };
    }catch ( error ) {
        return { error };
    }
}

//get password by username
async function getPasswordByUsername(username) {
    try {
        const data = await prisma.users.findFirst({
            where: {
                username,
            },
            select: {
                password: true,
                id: true
            },
        });

        return { data };
    }catch( error) {
        return { error };
    }
}

//create post
async function createPost(post) {
    try{
        await prisma.posts.create({
            data: {
                ...post,
            },
        });
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
    getPublicPosts,
    getPostsByUserId,
    deleteUserData,
    getCommentById,
    getCommentsByUserId,
    createComment,
    updateComment,
    deletePostData,
    updatePost,
    getUserLogin,
    getPasswordByUsername,
    deleteComment,
    createPost
}