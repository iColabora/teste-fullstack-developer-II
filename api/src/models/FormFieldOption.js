const connection = require('../services/database');
connection.connect();

var success = true;
var status = 200;
const form_field_option = {
    id: null,
    id_form_field: null,
    label: null,
    value: null,
};



/**
 * RETORNA A QUANTIDADE DE REGISTROS
 * @param {id_form_field} req - Nome do formulário
 */
exports.count = async (req) => {
    var messages = [];
    var records = 0;
    
    try {
        sql = `
            SELECT count(*) as records FROM form_field_option WHERE (
                id_form_field = ?
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
    var search = "1 = 1";
    var arg = [req.id_form_field] || [];

    if(req.id_form_field){
        search = "id_form_field = ?";
    } else {
        search = "1=1";
    }
    
    try {
        if(req.search){
            search += " and (name like ? or default_value like ?)";
            //arg = [req.id_form, req.search, req.search];
            arg.push(req.search);
            arg.push(req.search);
        }
    
        let sql = `
            SELECT * FROM form_field_option WHERE (
                ${search}
            );
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
                SELECT count(*) as records FROM form_field_option WHERE (
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
        form_field_options: retorno,
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

    let sql = `SELECT * FROM form_field_option WHERE (id = ?);`;

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
        form_field_option: retorno
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
        form_field_option.id = req.id || null;
        form_field_option.id_form_field = req.id_form_field || null;
        form_field_option.label = req.label || null;
        form_field_option.value = req.value || null;
        
        if(form_field_option.id){
            var sql = `
                UPDATE form_field_option SET
                    id_form_field = ?,
                    label = ?,
                    value = ?
                where (
                    id = ${form_field_option.id}
                );
            `;
            
        } else {
            var sql = `
                INSERT INTO form_field_option (
                    id_form_field,
                    label,
                    value
                ) values (
                    ?,
                    ?,
                    ?
                );
            `;
        }
        const res = await connection.query(sql, [
            form_field_option.id_form_field,
            form_field_option.label,
            form_field_option.value,
        ]).catch(e => {
            throw e;
        });

        if(!form_field_option.id){
            form_field_option.id = res[0].insertId
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
        id: form_field_option.id,
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

    let sql = `DELETE FROM form_field_option WHERE (id = ?);`;

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