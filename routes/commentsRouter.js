const { requestCommentsGet, commentGet, commentByUserIdGet } = require('../controllers/commentsController');

const Router = require('express').Router;

const commentsRouter = Router();

//specific comment routes
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
commentsRouter.get('/', requestCommentsGet);

commentsRouter.get('/:commentId', commentGet);
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