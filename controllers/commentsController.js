const { matchedData, body } = require('express-validator');
const { getComments, getPostComments, createComment, updateComment, deleteComment } = require('../models/script');
const { handleValidationErrors } = require('./errors/errorControllers');

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
    const postid = parseInt(req.query.postid);

    if(!isNaN(postid)) {
        res.locals.postid = postid;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. Illegal comment's ID",
    });
}

async function requestPostCommentsGet(req, res) {
    const postid = res.locals.postid;

    const { data, error } = await getPostComments(postid);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        data,
    });
}

const commentsGet = [
    checkCommenIdUrl,
    requestPostCommentsGet
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
    // requestCommentByUserId
]

//create a comment
const commentEmptErr = "is Empty";
const validate = [
    body('comment').trim()
        .notEmpty().withMessage(commentEmptErr)
]

function checkPostIdUrl(req, res, next) {
    const postid = parseInt(req.query.postid);
    if(!isNaN(postid)) {
        res.locals.postid = postid;
        next();
        return;
    }

    res.status(404).json({
        message: "Not a valid postid. Bad url"
    })
}
 
async function requestCreateComment(req, res) {
    const  { comment } = matchedData(req);
    const postid = res.locals.postid;
    const userid = req.user.id;

    const error = await createComment(userid, postid, comment);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        message: "Successfully processesed.",
    });
}

const createCommentPost = [
    validate,
    handleValidationErrors,
    checkPostIdUrl,
    requestCreateComment,
]

//update a comment
async function requestUpdateComment(req, res) {
    const commentId = res.locals.commentId;
    const { comment } = matchedData(req);

    const error = await updateComment(commentId, comment);

    if(error) {
        return res.status(503).json({
            error,
        })
    };

    return res.json({
        message: "Successfully processesed.",
    });
}

const updateCommentPut = [
    checkCommenIdUrl,
    validate,
    handleValidationErrors,
    requestUpdateComment,
]

//delete commment
async function requestCommentDelete(req, res) {
    const commentId = res.locals.commentId;

    const error = await deleteComment(commentId);

    if(error) {
        return res.status(503).json({
            error,
        });
    };

    return res.json({
        message: "Successfully processesed.",
    });
}

const commentDelete = [
    checkCommenIdUrl,
    requestCommentDelete
]

module.exports = {
    requestCommentsGet,
    commentsGet,
    commentByUserIdGet,
    createCommentPost,
    updateCommentPut,
    commentDelete
}