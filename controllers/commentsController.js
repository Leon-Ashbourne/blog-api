const { getComments, getCommentById } = require("../models/script");

//get comments
async function requestCommentsGet(req, res) {
    const { data, error } = await getComments();

    if(error) {
        return res.status(503).json({
            error,
        })
    };

    return res.json({
        data,
    })
};

//get a specific comment
function checkCommenIdUrl(req, res,  next) {
    const commentId = parseInt(req.params.commentId);

    if(commentId) {
        res.locals.commentId = commentId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. Illegal comment's ID",
    });
}

async function requestComment(req,res) {
    const commentId = res.locals.commentId;

    const { data, error } = await getCommentById(commentId);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        data,
    });
}

const commentGet = [
    checkCommenIdUrl,
    requestComment
]

//get a user's comments
function checkUserIdUrl(req, res, next) {
    const userId = parseInt(req.params.userId);

    if(userId) {
        res.locals.userId = userId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. Illegal user's ID"
    })
}

async function requestCommentByUserId(req, res, next) {
    const userId = res.locals.userId;

    const { data, error } = await getCommentById(userId);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        data,
    });
}

const commentByUserIdGet = [
    checkUserIdUrl,
    requestCommentByUserId
]

module.exports = {
    requestCommentsGet,
    commentGet,
    commentByUserIdGet
}