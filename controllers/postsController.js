const { getPosts } = require('../models/script');

//get posts 
async function requestPostsGet(req, res) {
    const { data, error } = await getPosts();

    if(error) {
        return res.status(503).json({ 
            error,
         });
    };

    return res.json({
        data,
    })
};


module.exports = {
    requestPostsGet
}