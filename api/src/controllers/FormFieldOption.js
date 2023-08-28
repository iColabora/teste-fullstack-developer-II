//const URL = require('url');
const FormFieldOption = require('../models/FormFieldOption');

var success = true;
var status = 200;
var messages = [];

exports.get = async (req, res) => {
    let params = {
        limit: parseInt(req.query.limit) || 20,
        offset: parseInt(req.query.offset) || 0,
        id_form_field: parseInt(req.query.id_form_field) || null,
        search: req.query.search || null
    }
    if(params.search){
        params.search = "%" + params.search.replace(" ", "%") + "%";
    }

    const data = await FormFieldOption.get(params);

    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        form_field_options: data.form_field_options,
        params: params,
        records: data.records
    });
}

exports.getById = async (req, res) => {
    let id = parseInt(req.params.id);
    const data = await FormFieldOption.getById(id);

    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        form_field_option: data.form_field_option,
        id: id
    });
}

exports.post = async (req, res) => {
    const form_field_option = req.body;
    form_field_option.from = req.socket.remoteAddress;

    const data = await FormFieldOption.save(form_field_option);
    success = data.success;
    status = data.status;
    messages = data.messages;
    
    const quant = await FormFieldOption.count(form_field_option.id_form_field);
    if(quant.records > 3){
        messages.push({
            content: "Já foram adicionados mais de 3 opções.",
            type: "warning"
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
    const form_field_option = req.body;
    form_field_option.from = req.socket.remoteAddress;

    const data = await FormFieldOption.save(form_field_option);
    success = data.success;
    status = data.status;
    messages = data.messages;

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
    const data = await FormFieldOption.delete(id);
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