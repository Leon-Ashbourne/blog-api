const Router = require('express').Router;
const signupController = require('../controllers/signupController');

const signupRouter = Router();

signupRouter.post('/', signupController)

module.exports = signupRouter;