//const URL = require('url');
const Form = require('../models/Form');

var success = true;
var status = 200;
var messages = [];

exports.get = async (req, res) => {
    let params = {
        limit: parseInt(req.query.limit) || 20,
        offset: parseInt(req.query.offset) || 0,
        search: req.query.search || null
    }
    if(params.search){
        params.search = "%" + params.search.replace(" ", "%") + "%";
    }

    const data = await Form.get(params);

    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        forms: data.forms,
        params: params,
        records: data.records
    });
}

exports.getById = async (req, res) => {
    let id = parseInt(req.params.id);
    const data = await Form.getById(id);

    success = data.success;
    status = data.status;
    messages = data.messages;

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*"})
        .json({
        success: success,
        messages: messages,
        form: data.form,
        id: id
    });
}

exports.post = async (req, res) => {
    const form = req.body;
    form.from = req.socket.remoteAddress;

    const data = await Form.save(form);

    res.status(status)
        .set({"Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        })
        .json({
        success: success,
        messages: messages,
        id: data.id,
        res: data.res
    });
}

exports.put = async (req, res) => {
    const form = req.body;
    form.from = req.socket.remoteAddress;

    const data = await Form.save(form);

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
    const data = await Form.delete(id);

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