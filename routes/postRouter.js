const Router = require("express").Router;
const passport = require("../authentication/passport");
const { publicPostsGet, postsGet, postsByUserIdGet, postDelete, postUpdate, postCreate, updatePublishPut, updatePostPut } = require("../controllers/postsController");

const postRouter = Router();

//post routes
const failureMessage = "authentication failed"

postRouter.get('/search', publicPostsGet)
postRouter.post('/', passport.authenticate('jwt', { session: false, failureMessage }) ,postCreate);

postRouter.get('/', passport.authenticate('jwt', { session: false, failureMessage }), postsGet);
postRouter.delete('/:postId',  passport.authenticate('jwt', { session: false, failureMessage }), postDelete);
postRouter.put('/:postid',  passport.authenticate('jwt', { session: false, failureMessage }), updatePostPut)

postRouter.put('/publish/:postId',  passport.authenticate('jwt', { session: false, failureMessage }), updatePublishPut);

module.exports = postRouter;