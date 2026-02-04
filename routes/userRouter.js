const Router = require('express').Router;
const { requestUsersGet } = require('../controllers/usersController'); 

const userRouter = Router();

//specific user routes
userRouter.get('/:userId', (req, res) => {
    res.json({
        message: `get user with id ${req.params.userId}`
    });
});

userRouter.put('/:userId', (req, res) => {
    res.json({
        message: `update user with id ${req.params.userId}`
    });
});

userRouter.delete('/:userId', (req, res) => {
    res.json({
        message: `delete user with id ${req.params.userId}`
    })
})

//user routes
userRouter.get('/', requestUsersGet);

//<------ these routes doesn't make sense ------->//

// userRouter.put('/', (req, res) => {
//     res.json({
//         message: "users update request"
//     });
// });

// userRouter.delete('/', (req, res) => {
//     res.json({
//         message: "users delete request"
//     });
// });

module.exports = userRouter;