const { validationResult, matchedData, body } = require('express-validator');
const { createUser } = require('../models/script');

//create user
// validate and sanitise user details
const passMismatch = "Doesn't match Password."
const validate = [
    body('username').trim()
        .notEmpty().withMessage("Username is required."),
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

function handleUserErrors(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors
        })
    }

    next()
}

async function reqCreateUserDB(req,  res, next) {

    const { password, username } = matchedData(req);
    const error = await createUser(password, username );

    res.locals.createUserError = error;
    next();
}

function handleDBError(req, res) {
    const userError = res.locals.createUserError;
    if(userError) {
        return res.status(500).json({
            error: userError,
        });
    };

    return res.status(201).json({
        message: "The request is successfully processesed",
    });
}

const createUserPost = [
    validate,
    handleUserErrors,
    reqCreateUserDB,
    handleDBError
]

module.exports = {
    createUserPost,
}