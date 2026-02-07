const Router = require('express').Router;
const login = require('../authentication/jwt');

const signRouter = Router();

signRouter.post('/', login);

module.exports = signRouter;