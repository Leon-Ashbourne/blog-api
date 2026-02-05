const { matchedData, body } = require('express-validator');
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../models/script');
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

//create a comment
const commentEmptErr = "is Empty";
const validate = [
    body('comment').trim()
        .notEmpty().withMessage(commentEmptErr)
]

async function requestCreateComment(req, res) {
    const  { comment } = matchedData(req);

    //Todo- think of a way to get these IDs
    const userId = parseInt(req.body.userId) || 1; //mock
    const postId = parseInt(req.body.postId) || 1; //mock

    const error = await createComment(userId, postId, comment);

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
    commentGet,
    commentByUserIdGet,
    createCommentPost,
    updateCommentPut,
    commentDelete
}