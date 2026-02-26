const Router = require("express").Router;
const passport = require("../authentication/passport");
const { publicPostsGet, postsGet, postsByUserIdGet, postDelete, postUpdate, postCreate, updatePublishPut, updatePostPut } = require("../controllers/postsController");

const commentsRouter = require("./commentsRouter");

const postRouter = Router();

//comments
postRouter.use([ "/:postid/comments", "/comments" ], commentsRouter);

//post routes
const failureMessage = "authentication failed"

postRouter.get('/search', publicPostsGet)
postRouter.post('/', passport.authenticate('jwt', { session: false, failureMessage }) ,postCreate);

postRouter.get('/', passport.authenticate('jwt', { session: false, failureMessage }), postsGet);
postRouter.delete('/:postId',  passport.authenticate('jwt', { session: false, failureMessage }), postDelete);
postRouter.put('/:postid',  passport.authenticate('jwt', { session: false, failureMessage }), updatePostPut)

postRouter.put('/publish/:postId',  passport.authenticate('jwt', { session: false, failureMessage }), updatePublishPut);

module.exports = postRouter;