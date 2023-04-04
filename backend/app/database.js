// Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_pass, {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;