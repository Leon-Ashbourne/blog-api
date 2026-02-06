const Router = require("express").Router;
const { requestPostsGet, postByIdGet, postsByUserIdGet, postDelete, postUpdate } = require("../controllers/postsController");

const postRouter = Router();

//post routes
postRouter.get('/', requestPostsGet )
// postRouter.post('/', )

postRouter.get('/:postId', postByIdGet);
postRouter.delete('/:postId', postDelete);
postRouter.put('/:postId', postUpdate);
postRouter.get('/d4ef65asdf1e88rtt512eo/:userId', postsByUserIdGet);

module.exports = postRouter;