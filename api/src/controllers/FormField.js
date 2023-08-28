//const URL = require('url');
const FormField = require('../models/FormField');
const FormFieldOption = require('../models/FormFieldOption');

var success = true;
var status = 200;
var messages = [];

exports.get = async (req, res) => {
    let params = {
        limit: parseInt(req.query.limit) || 20,
        offset: parseInt(req.query.offset) || 0,
        id_form: parseInt(req.query.id_form) || null,
        search: req.query.search || null
    }
    if(params.search){
        params.search = "%" + params.search.replace(" ", "%") + "%";
    }

    const data = await FormField.get(params);

    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        form_fields: data.form_fields,
        params: params,
        records: data.records
    });
}

exports.getById = async (req, res) => {
    let id = parseInt(req.params.id);
    const data = await FormField.getById(id);

    success = data.success;
    status = data.status;
    messages = data.messages;

    // Buscar options, caso exista
    if(data.form_field){
        const data2 = await FormFieldOption.get({id_form_field: id});
        data.form_field.options = data2.form_field_options;
        data2.messages.map(message => {
            messages.push(message);
        });
    }

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        form_field: data.form_field,
        id: id
    });
}

exports.post = async (req, res) => {
    const form_field = req.body;
    form_field.from = req.socket.remoteAddress;

    const data = await FormField.save(form_field);
    success = data.success;
    status = data.status;
    messages = data.messages;

    const quant = await FormField.count(form_field.id_form);
    if(quant.records > 5){
        messages.push({
            content: "Já foram adicionados mais de 5 campos ao formulário.",
            type: "warning"
        });
    }

    // Salvar opções, caso haja (campo tipo select)
    if(req.body.options.length > 0){
        req.body.options.map(async option=>{
            option.id_form_field = data.id;
            let data2 = await FormFieldOption.save(option);
            data2.messages.map(message => {
                messages.push(message);
            });
        });
    }

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        id: data.id,
        res: data.res
    });
}

exports.put = async (req, res) => {
    const form_field = req.body;
    form_field.from = req.socket.remoteAddress;

    const data = await FormField.save(form_field);
    success = data.success;
    status = data.status;
    messages = data.messages;

    // Salvar opções, caso haja (campo tipo select)
    if(req.body.options.length > 0){
        req.body.options.map(async option=>{
            option.id_form_field = data.id;
            let data2 = await FormFieldOption.save(option);
            data2.messages.map(message => {
                messages.push(message);
            });
        });
    }

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        res: data.res
    });
}

exports.delete = async (req, res) => {
    let id = parseInt(req.params.id);
    const data = await FormField.delete(id);
    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        id: id,
        res: data.res,
    });
}