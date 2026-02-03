const express = require('express');
const { postRouter, userRouter, commentsRouter } = require('./routes/index');

const app = express();

//routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comments', commentsRouter);

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) console.error(error);
    else console.log(`Successfully listening on ${PORT}`);
})