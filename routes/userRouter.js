const Router = require('express').Router;
const { requestUsersGet, updateUserPost, usersByIdGet, userDelete } = require('../controllers/usersController'); 

const userRouter = Router();

//user routes
userRouter.get('/', requestUsersGet);

userRouter.put('/:userId', updateUserPost);
userRouter.get('/:userId', usersByIdGet);
userRouter.delete('/:userId', userDelete);

userRouter.put('/:userId', updateUserPost);
userRouter.get('/:userId', usersByIdGet);
userRouter.delete('/:userId', userDelete);

module.exports = userRouter;