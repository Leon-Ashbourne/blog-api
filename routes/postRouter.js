const Router = require("express").Router;
const passport = require("../authentication/passport");
const { requestPostsGet, postsGet, postsByUserIdGet, postDelete, postUpdate, postCreate } = require("../controllers/postsController");

const postRouter = Router();

//post routes
// postRouter.get('/', requestPostsGet )
const failureMessage = "authentication failed"

postRouter.post('/', passport.authenticate('jwt', { session: false, failureMessage }) ,postCreate)

postRouter.get('/', passport.authenticate('jwt', { session: false, failureMessage }), postsGet);
postRouter.delete('/:postId', postDelete);
postRouter.put('/:postId', postUpdate);
// postRouter.get('/d4ef65asdf1e88rtt512eo/:userId', postsByUserIdGet);

module.exports = postRouter;