const bcrypt = require('bcrypt');

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
            const { data, error } = await getUserByUsername(val); //Todo- handle errors from db
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

async function hashPassword(req, res, next) {
    const { password } = matchedData(req);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    res.locals.hashedPassword = hashedPassword;
    next();
}

async function reqCreateUserDB(req,  res, next) {

    const { username } = matchedData(req);
    const password = res.locals.hashedPassword;

    const error = await createUser({ password, username });

    if(error) res.locals.createUserError = error;
    next();
}

const createUserPost = [
    validate,
    handleValidationErrors,
    hashPassword,
    reqCreateUserDB,
    handleDatabaseError
]

module.exports = createUserPost