const { getComments } = require("../models/script");


async function requestCommentsGet(req, res) {
    const { data, error } = await getComments();

    if(error) {
        return res.status(503).json({
            error,
        })
    };

    return res.json({
        data,
    })
};

module.exports = {
    requestCommentsGet,
}