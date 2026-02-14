const { validationResult, matchedData, body } = require('express-validator');
const { decode } = require('base64-arraybuffer');
const multer = require('multer');

const { getPosts, getPostById, getPostsByUserId, deletePost, updatePost, createPost } = require('../models/script');
const { handleValidationErrors } = require('./errors/errorControllers');
const { uploadMedia } = require('../models/supabase');

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

//create a new post
//configure multer
const options = {
    storage: multer.memoryStorage()
}
const upload = multer(options).array('media', 4);

function handleMedia(req, res, next) {
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError) {
            return res.status(413).json({
                MulterError: err
            })
        }
        else if(err) {
            return res.status(500).json({
                error: err
            })
        }
        
        next();
    })
}

//validation
const emptyErr = "is empty"
const validate = [
    body('title').trim()
        .notEmpty().withMessage(emptyErr),
    
    body('content').trim()
        .notEmpty().withMessage(emptyErr)
]

function fileToBase64(req, res, next) {

    if(!req.files) return next();

    const files = req.files;

    const base64Files = files.map( file => {
        const base64File = decode(file.buffer.toString('base64'));
        const filename = file.originalname + '-' + Math.random()*1e7 + file.fieldname;
        return { base64File, filename };
    });

    res.locals.base64Files = base64Files;
    next();
}

async function uploadMediaToSupabase(req, res, next) {
    if(!req.files)return next();

    const username = req.user.username;
    const promises = res.locals.base64Files.map(file => {
        const path = username + '/' + filename;
        const media = file.base64File;

        return uploadMedia(media, username, path);
    })

    await Promise.all(promises);
    next();
}

async function requestCreatePost(req, res, next) {
    const { content, title } = matchedData(req);

    const authorId = parseInt(req.user.id);
    if(!authorId) {
        return res.status(400).json({
            error: "user can't be identified"
        })
    }

    //post body
    const credentials = {
        content, 
        title,
        authorId
    }

    if(req.files) {
    const media = res.locals.base64Files.map(file => {
        return file.filename;
    });

    credentials.media = media;
    }
    

    const error = await createPost(credentials);

    if(error) {
        return res.status(500).json({
            error
        })
    }

    return res.json({
        message: "Successfully processesed."
    })
}

const postCreate = [
   validate,
   handleValidationErrors,
   handleMedia,
   fileToBase64,
   uploadMediaToSupabase,
   requestCreatePost
]

//get a single post by its id
function checkPostIdUrl(req, res, next) {
    const postId = parseInt(req.params.postId);

    if(postId) {
        res.locals.postId = postId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. illegal postid",
    });
}

async function requestPostById(req, res) {
    const postId = res.locals.postId;

    const { data, error } = await getPostById(postId);

    if(error) {
        return res.status(503).json({ 
            error
         });
    }
    return res.json({
        data
    });
}

const postByIdGet = [ 
    checkPostIdUrl,
    requestPostById
]

//get particular user's posts
function checkUserIdUrl(req, res, next) {
    const userId = parseInt(req.params.userId);

    if(userId) {
        res.locals.userId = userId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. illegal postid",
    });
}

async function requestPostsByUserId(req, res) {
    const userId = res.locals.userId;

    const { data, error } = await getPostsByUserId(userId);

    if(error) {
        return res.status(503).json({
            error,
        });
    };

    return res.json({
        data,
    });
}

const postsByUserIdGet = [
    checkUserIdUrl,
    requestPostsByUserId
]

//delete post
//write a middleware to delete blog content from supabase if you use it to store the content as a file 
async function requestPostDelete(req, res) {
    const postId = res.locals.postId;

    const error = await deletePost(postId);

    if(error) {
        return res.status(503).json({
            error,
        });
    }

    return res.json({
        message: "Successfully processesed.",
    });
}

const postDelete = [
    checkPostIdUrl,
    requestPostDelete
]

//update post
//Todo- validation
async function requestPostUpdate(req, res) {
    const postId = res.locals.postId;
    // const { title, content } = matchedData(req);
    //mock data
    const data = {};
    const error = await updatePost(postId, data);

    if(error) {
        return res.status(503).json({
            error,
        })
    };

    return res.json({
        message: "Successfully processesed.",
    });
}

const postUpdate = [
    checkPostIdUrl,
    requestPostUpdate
]

module.exports = {
    requestPostsGet,
    postByIdGet,
    postsByUserIdGet,
    postCreate,
    postDelete,
    postUpdate
}