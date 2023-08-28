const connection = require('../services/database');
connection.connect();

var success = true;
var status = 200;
const form_field = {
    id: null,
    id_form: null,
    type: null,
    name: null,
    personal_id: null,
    description: null,
    default_value: null,
    maxlength: null,
    required: null,
    created_at: null,
    created_from: null,
    updated_at: null,
    updated_from: null
};



/**
 * RETORNA A QUANTIDADE DE REGISTROS
 * @param {id_form} req - Nome do formulário
 */
exports.count = async (req) => {
    var messages = [];
    var records = 0;
    
    try {
        sql = `
            SELECT count(*) as records FROM form_field WHERE (
                id_form = ?
            );
        `;
        records = (await connection.query(sql, [req]))[0][0].records;

    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar recuperar os registros.",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    }

    return {
        success: success,
        status: status,
        messages: messages,
        records: records
    };
}



/**
 * BUSCAR REGISTROS
 * Retorna um ou mais registros
 * @param {*} req 
 * @returns 
 */
exports.get = async (req) => {
    var messages = [];
    var retorno = null;
    var records = 0;
    //var search = "id_form = ?";
    var search = "1 = 1";
    var arg = [req.id_form] || [];

    if(req.id_form){
        search = "id_form = ?";
    }
    
    try {
        if(req.search){
            search += " and (name like ? or description like ?)";
            //arg = [req.id_form, req.search, req.search];
            arg.push(req.search);
            arg.push(req.search);
        }
    
        let sql = `
            SELECT * FROM form_field WHERE (
                ${search}
            ) limit ${req.limit} offset ${req.offset};
        `;
        const res = await connection.query(sql, arg);

        if(res[0].length == 0){
            //status = 204;
            messages.push({
                content: `Nenhum registro encontrado.`,
                type: "warning"
            });
        } else {
            retorno = res[0];

            sql = `
                SELECT count(*) as records FROM form_field WHERE (
                    ${search}
                );
            `;
            records = (await connection.query(sql, arg))[0][0].records;
        }

    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar recuperar os registros.",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    }

    return {
        success: success,
        status: status,
        messages: messages,
        form_fields: retorno,
        records: records
    };
}



/**
 * BUSCAR REGISTRO ESPECÍFICO
 * Retorna um registro (a partir do ID)
 * @param {*} id 
 * @returns 
 */
exports.getById = async (id) => {
    var messages = [];
    var retorno = null;

    let sql = `SELECT * FROM form_field WHERE (id = ?);`;

    try {
        const res = await connection.query(sql, [id]);

        if(res[0].length == 0){
            //status = 204;
            messages.push({
                content: `Não existe um registro com o ID ${id}.`,
                type: "warning"
            });
            retorno = null;
        } else {
            retorno = res[0][0];
        }
    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar recuperar os registros.",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    }
    
    return {
        success: success,
        status: status,
        messages: messages,
        form_field: retorno
    };
}



/**
 * SALVAR OU ATUALIZAR
 * Cria um novo registro caso o campo id for nulo
 * Edita um registro, caso seja fornecido um id válido
 * @param {*} req 
 * @returns 
 */
 exports.save = async (req) => {
    var messages = [];
    var retorno = null;
    
    try {
        form_field.id = req.id || null;
        form_field.id_form = req.id_form || null;
        form_field.type = req.type || null;
        form_field.name = req.name || null;
        form_field.personal_id = req.personal_id || null;
        form_field.description = req.description || null;
        form_field.default_value = req.default_value || null;
        form_field.maxlength = req.maxlength || null;
        switch(form_field.type){
            case "text":
                form_field.maxlength = 30;
            break;
            case "big-text":
                form_field.maxlength = 100;
            break;
            default:
                form_field.maxlength = 0;
        }
        form_field.required = req.required || false;
        from = req.from || null;
        
        if(form_field.id){
            var sql = `
                UPDATE form_field SET
                    id_form = ?,
                    type = ?,
                    name = ?,
                    personal_id = ?,
                    description = ?,
                    default_value = ?,
                    maxlength = ?,
                    required = ?,
                    updated_at = NOW(),
                    updated_from = ?
                where (
                    id = ${form_field.id}
                );
            `;
            
        } else {
            var sql = `
                INSERT INTO form_field (
                    id_form,
                    type,
                    name,
                    personal_id,
                    description,
                    default_value,
                    maxlength,
                    required,
                    created_at,
                    created_from
                ) values (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(),
                    ?
                );
            `;
        }
        const res = await connection.query(sql, [
            form_field.id_form,
            form_field.type,
            form_field.name,
            form_field.personal_id,
            form_field.description,
            form_field.default_value,
            form_field.maxlength,
            form_field.required,
            from
        ]).catch(e => {
            throw e;
        });

        if(!form_field.id){
            form_field.id = res[0].insertId
        }

        retorno = res[0];

    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar gravar o registro",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    }

    return {
        success: success,
        status: status,
        messages: messages,
        id: form_field.id,
        res: retorno
    };
}



/**
 * ESCLUIR REGISTRO
 * @param {*} id 
 * @returns 
 */
 exports.delete = async (id) => {
    var messages = [];
    var retorno = null;

    let sql = `DELETE FROM form_field WHERE (id = ?);`;

    try {
        const res = await connection.query(sql, [id]);
        retorno =  res[0];

        if(res[0].affectedRows == 0){
            messages.push({
                content: `Não existe um registro com o ID ${id}.`,
                type: "warning"
            });
        }
    } catch (e) {
        success = false;
        status = 500;
        messages.push({
            content: "Ocorreu um erro ao tentar recuperar os registros.",
            type: "danger"
        });
        messages.push({
            content: e.message,
            type: "error_log"
        });
    }
    
    return {
        success: success,
        status: status,
        messages: messages,
        res: retorno
    };
}