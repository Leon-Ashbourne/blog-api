const { validationResult, matchedData, body } = require('express-validator');
const { decode } = require('base64-arraybuffer');
const multer = require('multer');

const { getPublicPosts, getPostById, getPostsByUserId, deletePost, updatePost, createPost } = require('../models/script');
const { handleValidationErrors } = require('./errors/errorControllers');
const { uploadMedia } = require('../models/supabase');

//get posts 
async function publicPostsGet(req, res) {
    const query = req.query;
    const start = parseInt(query.start);
    const end = parseInt(query.end);

    if(isNaN(start) || isNaN(end)) return  res.status(404).end();

    const { data, error } = await getPublicPosts(start, end);

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
        return res.status(401).json({
            error: "Unauthenticated user"
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

    if(!isNaN(postId)) {
        res.locals.postId = postId;
        next();
    }

    else return res.status(404).json({
        message: "Bad url. illegal postid",
    });
}

async function requestPostById(req, res) {
    const postId = parseInt(req.user.id);

    if(!postId) {
        return res.status(401).json({
            error: "Bad url."
        })
    }
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
    // checkPostIdUrl,
    // requestPostById
]

//get particular user's posts
function checkUserIdUrl(req, res, next) {
    const userId = parseInt(req.user.id);

    if(userId) {
        res.locals.userId = userId;
        return next();
    }

    return res.status(401).json({
        message: "Unauthenticated user",
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

const postsGet = [
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

//update post publish
const validatePublish = [
    body('published').trim()
        .notEmpty().withMessage(emptyErr)
        .custom((val) => {
            if(val === "true" || val === "false") return true;
            return false;
        })
]

async function postPublishPut(req, res) {
    const postid = res.locals.postId;

    const bool = matchedData(req).published;
    const published = bool === "false" ? false : true;

    const error = await updatePost(postid, { published });

    if(error) {
        return res.status(500).json({
            error,
        });
    }

    return res.json({
        message: "Successfully processesed."
    })
}

const updatePublishPut = [
    checkPostIdUrl,
    validatePublish,
    handleValidationErrors,
    postPublishPut
]

//update post
const validatePut = [
    body("title").trim()
        .notEmpty().withMessage(emptyErr),
    body("content").trim()
        .notEmpty().withMessage(emptyErr)
]

async function requestPostPut() {
    const { title, content } = matchedData(req);
    const data = { title, content };
    const postid = res.locals.postId;

    const error = await updatePost(post, date);

    if(error) {
        return res.status(500).jsoon({
            error,
        })
    }

    return res.json({
        message: "Successfully processesed."
    });
}

const updatePostPut = [
    validatePut,
    handleValidationErrors,
    checkPostIdUrl,
    requestPostPut
];



module.exports = {
    publicPostsGet,
    postByIdGet,
    postsGet,
    postCreate,
    postDelete,
    postUpdate,
    updatePublishPut,
    updatePostPut
}