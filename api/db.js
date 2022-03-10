async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root:0147@localhost:3306/icolabora_teste_ii");
    global.connection = connection;
    return connection;
}

async function updateCampo(campo, posicao) {
    try {
        const conn = await connect();
        const sql = "update campos set idHTML=?, label=?, tipoCampo=?, opcao1=?, opcao2=?, opcao3=? where posicao = ?";
        const values = [campo.idCampo, campo.labelCampo, campo.tipoCampo, campo.opcoes.opcao1, campo.opcoes.opcao2, campo.opcoes.opcao3, posicao];
        var row = await conn.query(sql, values);
        return row;
    } 
    catch (err) {
        console.log(err);
    }
}

async function getCampos() {
    try {
        const conn = await connect();
        const sql = "select * from campos";
        var [rows] = await conn.query(sql);
        return rows;
    } 
    catch (err) {
        console.log(err);
    }
}

async function enviarFormulario(campos) {
    try {
        const conn = await connect();
        const sql = `insert into envios (idCampo1, resposta1, idCampo2, resposta2, idCampo3, resposta3, idCampo4, resposta4, idCampo5, resposta5) values (?);`;
        const values = [
            campos[0].idCampo, campos[0].resposta,
            campos[1].idCampo, campos[1].resposta,
            campos[2].idCampo, campos[2].resposta,
            campos[3].idCampo, campos[3].resposta,
            campos[4].idCampo, campos[4].resposta
        ];
        var[rows] = await conn.query(sql, [values]);
        return rows;
    } 
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateCampo,
    getCampos,
    enviarFormulario
}