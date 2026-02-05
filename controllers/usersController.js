const { matchedData, body } = require('express-validator');
const { getUsers, updateUserById, getUserById } = require('../models/script');
const { handleValidationErrors } = require('./errors/errorControllers');

//get users
async function requestUsersGet(req, res) {
    const { error, data } = await getUsers();
    
    if(error) {
        return res.status(503).json({
            error,
            message: "Database Error: Couldn't get data",
        });
    }

    return res.json({
        data,
    });
};

//update user details
const validate = [
    body('username').trim()
        .optional(),
    body('password')
        .isLength({ min: 6}).withMessage("is too short.(Minimum is 6 characters)")
        .optional({ values: 'falsy'}),
];

function checkUserId(req, res, next) {
    const userId = parseInt(req.params.userId);
    if(userId) {
        res.locals.userId = userId;
        return next();
    };

    return res.status(404).json({
        message: "Bad userId parameter",
    });
}

async function requestUpdateUserPost(req, res, next) {
    const userId = res.locals.userId;
    const data = matchedData(req, { includeOptionals: false });

    const error = await updateUserById(userId, data);

    if(error) {
        return res.status(503).json({
            error
        });
    };

    return res.json({
        message: "Successfully processesed."
    });
}

const updateUserPost = [
    checkUserId,
    validate,
    handleValidationErrors,
    requestUpdateUserPost
]

//get user details 
async function requestUserById(req, res) {
    const userId = res.locals.userId;
    const { data, error } = await getUserById(userId);

    if(error) {
        return res.status(503).json({
            error
        });
    };

    return res.json({ data });
}

const usersByIdGet = [
    checkUserId,
    requestUserById
]


module.exports = {
    requestUsersGet,
    updateUserPost,
    usersByIdGet
}