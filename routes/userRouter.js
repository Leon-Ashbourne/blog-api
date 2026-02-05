const Router = require('express').Router;
const { requestUsersGet, updateUserPost, usersByIdGet } = require('../controllers/usersController'); 

const userRouter = Router();

userRouter.delete('/:userId', (req, res) => {
    res.json({
        message: `delete user with id ${req.params.userId}`
    })
})

//user routes
userRouter.get('/', requestUsersGet);

userRouter.put('/:userId', updateUserPost);
userRouter.get('/:userId', usersByIdGet);


//<------ these routes don't make sense ------->//

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