const { requestCommentsGet, commentGet, commentByUserIdGet, createCommentPost, updateCommentPut } = require('../controllers/commentsController');

const Router = require('express').Router;

const commentsRouter = Router();

//specific comment routes
commentsRouter.delete('/:commentId', (req, res) => {
    res.json({
        message: `delete comment with id ${req.params.commentId}`
    })
})

//comments routes
commentsRouter.get('/', requestCommentsGet);
commentsRouter.post('/', createCommentPost);

commentsRouter.get('/:commentId', commentGet);
commentsRouter.put('/:commentId', updateCommentPut)
commentsRouter.get('/t8ui0e5fhyro712wq9isdkjn/:userId', commentByUserIdGet);

//-----> These roues don't make sense ----->//
// commentsRouter.post('/', (req, res) => {
//     res.json({
//         message: "comments POST request"
//     });
// });

// commentsRouter.put('/', (req, res) => {
//     res.json({
//         message: "comments update request"
//     });
// });

// commentsRouter.delete('/', (req, res) => {
//     res.json({
//         message: "comments delete request"
//     });
// });

module.exports = commentsRouter;