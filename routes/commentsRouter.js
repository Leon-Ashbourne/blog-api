const Router = require('express').Router;

const commentsRouter = Router();

//specific comment routes
commentsRouter.get('/:commentId', (req, res) => {
    res.json({
        message: `get comment with id ${req.params.commentId}`
    });
});

commentsRouter.put('/:commentId', (req, res) => {
    res.json({
        message: `update comment with id ${req.params.commentId}`
    });
});

commentsRouter.delete('/:commentId', (req, res) => {
    res.json({
        message: `delete comment with id ${req.params.commentId}`
    })
})

//comments routes
commentsRouter.get('/', (req, res) => {
    res.json({
        message: "comments get request"
    });
});

commentsRouter.post('/', (req, res) => {
    res.json({
        message: "comments POST request"
    });
});

commentsRouter.put('/', (req, res) => {
    res.json({
        message: "comments update request"
    });
});

commentsRouter.delete('/', (req, res) => {
    res.json({
        message: "comments delete request"
    });
});

module.exports = commentsRouter;