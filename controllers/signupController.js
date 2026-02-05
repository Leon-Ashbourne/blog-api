const { validationResult, matchedData, body } = require('express-validator');
const { createUser } = require('../models/script');
const { handleValidationErrors, handleDatabaseError } = require('./errors/errorControllers');

//create user
// validate and sanitise username and password
const passMismatch = "Doesn't match Password."
const validate = [
    body('username').trim()
        .notEmpty().withMessage("Username is required.")
        .isLength({ min: 5}),
    body('password')
        .notEmpty().withMessage("Enter a password.")
        .isLength({ min: 6})
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