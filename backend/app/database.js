// Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste_estagio_ii', process.env.db_user, process.env.db_pass, {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;