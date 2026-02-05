const Router = require("express").Router;
const { requestPostsGet } = require("../controllers/postsController");

const postRouter = Router();

//specific post routes
postRouter.get('/:postId', (req, res) => {
    res.json({
        message: `get post with id ${req.params.postId}`
    });
});

postRouter.put('/:postId', (req, res) => {
    res.json({
        message: `update post with id ${req.params.postId}`
    });
});

postRouter.delete('/:postId', (req, res) => {
    res.json({
        message: `delete post with id ${req.params.postId}`
    })
});

//post routes
postRouter.get('/', requestPostsGet )

postRouter.post('/', (req, res) => {
    res.json({
        message: "posts POST request"
    });
});

postRouter.put('/', (req, res) => {
    res.json({
        message: "posts update request"
    });
});

postRouter.delete('/', (req, res) => {
    res.json({
        message: "posts delete request"
    });
});

module.exports = postRouter;