const { matchedData, body, validationResult } = require('express-validator');
const { createUser, getUserByUsername } = require('../models/script');
const { handleDatabaseError, handleValidationErrors } = require('./errors/errorControllers');

//create user
// validate and sanitise username and password
const reqError = "is required";
const passMismatch = "Doesn't match Password.";
const lenUsernameError = "is too short. (Minimum is 5 characters)";
const lenPasswordError = "is too short. (Minimum is 6 characters)";
const existUsernameErr = "already exists. Choose a different name";

const validate = [
    body('username').trim()
        .notEmpty().withMessage(reqError)
        .isLength({ min: 5}).withMessage(lenUsernameError)
        .custom(async val => {
            const data = await getUserByUsername(val); //Todo- handle errors from db
            if(data) throw new Error('username already exists.');

            return true; 

        }).withMessage(existUsernameErr),

    body('password')
        .notEmpty().withMessage(reqError)
        .isLength({ min: 6}).withMessage(lenPasswordError)
        .bail(),

    body('confirm-password')
        .notEmpty().withMessage(passMismatch)
        .custom((val, {req}) => {
            const password = req.body.password;
            if(val === password) return true;
            return false;
        }).withMessage(passMismatch)

]

async function reqCreateUserDB(req,  res, next) {

    const { password, username } = matchedData(req);
    const error = await createUser(password, username );

    res.locals.createUserError = error;
    next();
}

const createUserPost = [
    validate,
    handleValidationErrors,
    reqCreateUserDB,
    handleDatabaseError
]

module.exports = createUserPost