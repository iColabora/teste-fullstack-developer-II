const fs = require('fs');
const Form = require('../models/Form');
const FormField = require('../models/FormField');
const FormFieldOption = require('../models/FormFieldOption');
const connection = require('../services/database');

/**
 * Carrega o arquivo que contém o script de criação das tebelas da base de dados.
 * @param {*} req 
 * @param {*} res 
 */
exports.dbTables = async (req, res) => {
    var status = 200;
    var success = true;
    var messages = [];

    try {
        const path = './src/install';
        const file = 'newDatabase.sql';
        fs.readFile(path + '/' + file, 'utf8', (err, data) => {
            
            connection.connect();

            const commands = data.split(";");
            commands.splice(-1);
            
            commands.map(async sql => {
                let consulta = await connection.query(sql)
                .catch(e => {
                    throw e;
                });
            });
        });

    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar criar uma ou mais tabelas no banco de dados.",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    };

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
            success: success,
            messages: messages,
    });
}

/**
 * Insere os dados de exemplo para o desafio
 * @param {*} req 
 * @param {*} res 
 */
exports.dbPopulate = async (req, res) => {
    var status = 200;
    var success = true;
    var messages = [];
    const from = req.socket.remoteAddress;

    let form = {
        name: "Pessoas",
        description: "Exemplo: Cadastro de pessoas",
        from: from
    };

    var response = await Form.save(form);
    form.id = response.res.insertId;
    if(!response.success){
        success = false;
    }
    response.messages.map(msg => {
        messages.push(msg);
    });

    let formFields = [
        {
            id_form: form.id,
            type: "text",
            name: "Nome",
            personal_id: "nome",
            description: "Informe o nome completo",
            required: false,
            from: from,
        },
        {
            id_form: form.id,
            type: "big-text",
            name: "Endereço",
            personal_id: "endereco",
            required: false,
            from: from,
        },
        {
            id_form: form.id,
            type: "select",
            name: "Sexo",
            personal_id: "sexo",
            required: false,
            from: from,
            options: [
                {
                    id: "",
                    value: "N",
                    label: "Não informado"
                },
                {
                    id: "",
                    value: "M",
                    label: "Masculino"
                },
                {
                    id: "",
                    value: "F",
                    label: "Feminino"
                }
            ]
        }
    ];

    formFields.map(async field =>{
        let response2 = await FormField.save(field);
        
        if(field.options){
            field.options.map(async option => {
                option.id_form_field = response2.res.insertId;
                let response3 = await FormFieldOption.save(option);
                
                response3.messages.map(msg => {
                    messages.push(msg);
                });
            });
        }

        if(!response2.success){
            success = false;
        }

        response2.messages.map(msg => {
            messages.push(msg);
        });
    });

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
            success: success,
            messages: messages,
    });
}