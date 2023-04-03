const Sequelize = require('sequelize');
const database = require('../database');

const Post = database.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    respostas: {
        type: Sequelize.JSON
    }
});

module.exports = Post;
