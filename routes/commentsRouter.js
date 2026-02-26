const passport = require("../authentication/passport");

const { requestCommentsGet, commentsGet, commentByUserIdGet, createCommentPost, updateCommentPut, commentDelete } = require('../controllers/commentsController');

const Router = require('express').Router;
const commentsRouter = Router();

//comments routes
commentsRouter.get('/:userid', passport.authenticate('jwt', { session: false }), requestCommentsGet);
commentsRouter.post('/', passport.authenticate('jwt', { session: false }), createCommentPost);

commentsRouter.get('/', commentsGet);
commentsRouter.put('/:commentId', updateCommentPut);
commentsRouter.delete('/:commentId', commentDelete);
commentsRouter.get('/t8ui0e5fhyro712wq9isdkjn/:userId', commentByUserIdGet);

module.exports = commentsRouter;