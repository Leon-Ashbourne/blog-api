const Router = require("express").Router;
const { requestPostsGet, postByIdGet, postsByUserIdGet, postDelete } = require("../controllers/postsController");

const postRouter = Router();

//post routes
postRouter.get('/', requestPostsGet )
// postRouter.post('/', )

postRouter.get('/:postId', postByIdGet);
postRouter.delete('/:postId', postDelete )
postRouter.get('/d4ef65asdf1e88rtt512eo/:userId', postsByUserIdGet );

postRouter.post('/', (req, res) => {
    res.json({
        message: "posts POST request"
    });
});

module.exports = postRouter;