const express = require('express');
const { postRouter, userRouter, commentsRouter, signupRouter } = require('./routes/index');

const app = express();
app.use(express.json());

//routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comments', commentsRouter);
app.use('/Sign-up', signupRouter);

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) console.error(error);
    else console.log(`Successfully listening on ${PORT}`);
})