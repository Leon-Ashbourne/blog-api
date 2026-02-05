const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors
        })
    }

    next()
};

exports.handleDatabaseError = (req, res) => {
    const userError = res.locals.error;
    if(userError) {
        return res.status(503).json({
            error: userError,
        });
    };

    return res.json({
        message: "The request is successfully processesed",
    });
}