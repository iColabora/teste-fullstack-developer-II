const connection = require('../services/database');
connection.connect();

const form = {
    id: null,
    name: null,
    description: null,
    created_at: null,
    created_from: null,
    updated_at: null,
    updated_from: null
};



/**
 * RETORNA A QUANTIDADE DE REGISTROS
 * @param {name} req - Nome do formulário
 */
exports.count = async (req) => {
    var success = true;
    var status = 200;
    var messages = [];
    var records = 0;
    
    try {
        sql = `
            SELECT count(*) as records FROM form WHERE (
                name = ?
            );
        `;
        records = (await connection.query(sql, [req.name]))[0][0].records;

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
    var success = true;
    var status = 200;
    var messages = [];
    var retorno = null;
    var records = 0;
    var search = "1 = 1";
    var arg = null;
    
    try {
        if(req.search){
            search = "name like ? or description like ?";
            arg = [req.search, req.search];
        }
    
        let sql = `
            SELECT * FROM form WHERE (
                ${search}
            ) ORDER BY id desc limit ${req.limit} offset ${req.offset};
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
                SELECT count(*) as records FROM form WHERE (
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
        forms: retorno,
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
    var success = true;
    var status = 200;
    var messages = [];
    var retorno = null;

    let sql = `SELECT * FROM form WHERE (id = ?);`;

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
        form: retorno
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
    var success = true;
    var status = 200;
    var messages = [];
    var retorno = null;
    
    try {
        form.id = req.id || null;
        form.name = req.name || null;
        form.description = req.description || null;
        from = req.from || null;
        
        if(form.id){
            var sql = `
                UPDATE form SET
                    name = ?,
                    description = ?,
                    updated_at = NOW(),
                    updated_from = ?
                where (
                    id = ${form.id}
                );
            `;
        } else {
            var sql = `
                INSERT INTO form (
                    name,
                    description,
                    created_at,
                    created_from
                ) values (
                    ?,
                    ?,
                    NOW(),
                    ?
                );
            `;
        }

        const res = await connection.query(sql, [
            form.name,
            form.description,
            from
        ]).catch(e => {
            throw e;
        });

        if(!form.id){
            form.id = res[0].insertId
        }

        retorno = res[0];
    } catch (e) {
        console.log(e);
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
        id: form.id,
        res: retorno
    };
}



/**
 * ESCLUIR REGISTRO
 * @param {*} id 
 * @returns 
 */
 exports.delete = async (id) => {
    var status = 200;
    var messages = [];
    var retorno = null;

    let sql = `DELETE FROM form WHERE (id = ?);`;

    try {
        const res = await connection.query(sql, [id]);
        retorno =  res[0];

        if(res[0].affectedRows == 0){
            var success = false;
            messages.push({
                content: `Não existe um registro com o ID ${id}.`,
                type: "warning"
            });
        } else {
            var success = true;
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