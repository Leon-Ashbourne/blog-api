const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.json({
        message: "Hii, it's working perfectly!!"
    });
})

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) console.error(error);
    else console.log(`Successfully listening on ${PORT}`);
})