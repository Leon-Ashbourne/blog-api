const { getPosts, getPostById } = require('../models/script');

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


module.exports = {
    requestPostsGet,
    postByIdGet
}