const { validationResult, matchedData, body } = require('express-validator');
const { getUsers } = require('../models/script');

//get users
async function requestUsersGet(req, res) {
    const { error, data } = await getUsers();
    
    if(error) {
        return res.status(500).json({
            error,
            message: "Database Error: Couldn't get data",
        });
    }

    return res.json({
        data,
    });
}

module.exports = {
    requestUsersGet,
}