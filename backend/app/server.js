const express = require('express');
require('dotenv-safe').config();
const app = express();
const port = process.env.port;

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
