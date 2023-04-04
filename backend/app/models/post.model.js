const Sequelize = require('sequelize');
const database = require('../database');

const Post = database.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeForm: {
        type: Sequelize.STRING
    },
    respostas: {
        type: Sequelize.JSON
    }
});

module.exports = Post;
