// Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste_estagio_ii', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;