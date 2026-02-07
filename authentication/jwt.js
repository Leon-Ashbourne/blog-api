const { matchedData, body } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const { getUserLogin } = require("../models/script");
const { handleValidationErrors } = require('../controllers/errors/errorControllers');

//validate and sanitize
const emptyErr = "is Empty."
const validate = [
    body('username').trim()
        .notEmpty().withMessage(emptyErr),
    body('password')
        .notEmpty().withMessage(emptyErr)
]

async function verifyUser(req, res, next) {
    const { username, password } = matchedData(req);
    
    const { data, error }  = await getUserLogin(username, password);

    if(error) {
        return res.status(503).json({
            error,
        });
    };
    res.locals.data = data;
    next();
}

function generateToken(req, res) {
    const payload = res.locals.data;

    jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'RS256' }, (error, token) => {
        return res.json({
            Token: token
        });
    });
}

const login = [
    validate,
    handleValidationErrors,
    verifyUser,
    generateToken
]

module.exports = login