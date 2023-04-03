const express = require('express');
const app = express();
const port = 8080;

const server = app.listen(port, (err, callback) => {
    if(err) {
        console.log(err);
        return;
    }
    (async() => {
        const database = require('./database');
        const Post = require('./models/post.model');
    
        try {
            const result = await database.sync();
            console.log(`Running on port ${port}`);
        } catch(error) {
            console.log(error);
        }
    })();
});

module.exports = app;
