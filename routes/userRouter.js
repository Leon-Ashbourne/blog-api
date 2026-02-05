const Router = require('express').Router;
const { requestUsersGet, updateUserPost, usersByIdGet, userDelete } = require('../controllers/usersController'); 

const userRouter = Router();

//user routes
userRouter.get('/', requestUsersGet);

userRouter.put('/:userId', updateUserPost);
userRouter.get('/:userId', usersByIdGet);
userRouter.delete('/:userId', userDelete);

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