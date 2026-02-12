const { matchedData, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv/config');

const { getPasswordByUsername } = require("../models/script");
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

    const { data, error } = await getPasswordByUsername(username);

    if(error) {
        return res.status(503).json({
            error,
        });
    };

    const foundUser = await bcrypt.compare(password, data.password);
    if(!foundUser) {
        return res.status(406).json({
            message: "username or password is incorrect."
        })
    }
    const { id } = data;

    res.locals.data = {
        id,
        username
    };
    next();
}

function generateToken(req, res) {
    const payload = res.locals.data;
    const username = payload.username;

    jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 7*24*60*60*1000 }, (error, token) => {
        if(error) {
            return res.json({
                error,
            });
        }
        return res.json({
            Token: token,
            username
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