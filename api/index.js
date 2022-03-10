const db = require('./db.js');

var cors = require('cors');
var express = require('express');
var app = express();
var PORT = 4000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Servidor ok'
    })
})

app.get('/campos', async (req, res) => {
    try {
        var campos = await db.getCampos();
        return res.status(200).json({
            campos
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: 'Não possível buscar os campos no banco de dados, consulte o log para mais detalhes'
        })
    }
})

app.post('/campos', (req, res) => {
    var campos = req.body;
    //O usuário deve informar os 5 campos
    if (campos.length != 5) {
        return res.status(400).json({
            status: 'error',
            message: 'Não foram informados os 5 campos, ou estão em um formato incorreto.'
        })
    }
    try {
        for (let index = 0; index < campos.length; index++) {
            const campo = campos[index];
            db.updateCampo(campo, index+1);
        }
        return res.status(200).json({
            status: 'success',
            message: 'Campos atualizados com sucesso.'
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: 'Não foi possível atualizar os valores no banco de dados, consulte o log para mais detalhes.'
        })
    }
});

app.post('/enviar', async (req, res) => {
    try {
        var respostas = req.body;
        var rows = await db.enviarFormulario(respostas);
        if (rows) {
            return res.status(200).json({
                status: 'success'
            });
        }
    } 
    catch (err) {
        console.log(err);
    }
    return res.status(500).json({
        status: 'error'
    });
    
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Servidor rodando na porta: " + PORT);
})