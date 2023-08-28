const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:     (process.env.DB_HOST || "localhost"),
    user:     (process.env.DB_USER || "root"),
    password: (process.env.DB_PASSWORD || "senha-teste"),
    database: (process.env.DB_DATABASE || "icolabora_desafio2")
}).promise();

module.exports = connection;