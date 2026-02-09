const express = require('express');
const { postRouter, userRouter, commentsRouter, signupRouter, signinRouter } = require('./routes/index');
const passport = require('./authentication/passport');

const app = express();
app.use(express.json());

//routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comments', passport.authenticate('jwt', { session: false }), commentsRouter);
app.use('/Sign-up', (req, res) => {
    res.setHeaders["Access-Control-Allow-Origin"] = "localhost:5173";
},signupRouter);
app.use('/Sign-in', signinRouter);

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) console.error(error);
    else console.log(`Successfully listening on ${PORT}`);
})