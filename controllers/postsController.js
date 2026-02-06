const { getPosts, getPostById, getPostsByUserId, deletePost, updatePost } = require('../models/script');

//get posts 
async function requestPostsGet(req, res) {
    const { data, error } = await getPosts();

    if(error) {
        return res.status(503).json({ 
            error,
         });
    };

    return res.json({
        data,
    })
};

//create a new post
//Try- use supabase to store blog contents as a file
//Todo- validation
async function requestCreatePost(req, res, next) {
    // Todo- how to secure and store blog content
}

const postCreate = [
    //middlewares
]

//get a single post by its id
function checkPostIdUrl(req, res, next) {
    const postId = parseInt(req.params.postId);

    if(postId) {
        res.locals.postId = postId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. illegal postid",
    });
}

async function requestPostById(req, res) {
    const postId = res.locals.postId;

    const { data, error } = await getPostById(postId);

    if(error) {
        return res.status(503).json({ 
            error
         });
    }
    return res.json({
        data
    });
}

const postByIdGet = [ 
    checkPostIdUrl,
    requestPostById
]

//get particular user's posts
function checkUserIdUrl(req, res, next) {
    const userId = parseInt(req.params.userId);

    if(userId) {
        res.locals.userId = userId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. illegal postid",
    });
}

async function requestPostsByUserId(req, res) {
    const userId = res.locals.userId;

    const { data, error } = await getPostsByUserId(userId);

    if(error) {
        return res.status(503).json({
            error,
        });
    };

    return res.json({
        data,
    });
}

const postsByUserIdGet = [
    checkUserIdUrl,
    requestPostsByUserId
]

//delete post
//write a middleware to delete blog content from supabase if you use it to store the content as a file 
async function requestPostDelete(req, res) {
    const postId = res.locals.postId;

    const error = await deletePost(postId);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        message: "Successfully processesed.",
    });
}

const postDelete = [
    checkPostIdUrl,
    requestPostDelete
]

//update post
//Todo- validation
async function requestPostUpdate(req, res) {
    const postId = res.locals.postId;
    // const { title, content } = matchedData(req);
    //mock data
    const data = {};
    const error = await updatePost(postId, data);

    if(error) {
        return res.status(503).json({
            error,
        })
    };

    return res.json({
        message: "Successfully processesed.",
    });
}

const postUpdate = [
    checkPostIdUrl,
    requestPostUpdate
]

module.exports = {
    requestPostsGet,
    postByIdGet,
    postsByUserIdGet,
    postCreate,
    postDelete,
    postUpdate
}