const Router = require("express").Router;
const { requestPostsGet, postByIdGet, postsByUserIdGet } = require("../controllers/postsController");

const postRouter = Router();

//specific post routes
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

postRouter.get('/:postId', postByIdGet);
postRouter.get('/d4ef65asdf1e88rtt512eo/:userId', postsByUserIdGet )

postRouter.post('/', (req, res) => {
    res.json({
        message: "posts POST request"
    });
});

// <----- these routes don't make sense --------> //

// postRouter.put('/', (req, res) => {
//     res.json({
//         message: "posts update request"
//     });
// });

// postRouter.delete('/', (req, res) => {
//     res.json({
//         message: "posts delete request"
//     });
// });

module.exports = postRouter;