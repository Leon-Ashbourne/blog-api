const express = require('express');
const { postRouter, userRouter, commentsRouter, signupRouter, signinRouter } = require('./routes/index');
const passport = require('./authentication/passport');

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  
    }
    

    if(req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
})

//routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comments', passport.authenticate('jwt', { session: false }), commentsRouter);
app.use('/Sign-up', signupRouter);
app.use('/Sign-in', signinRouter);

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) console.error(error);
    else console.log(`Successfully listening on ${PORT}`);
})