const Post = require('../models/post.model');

const criarPostagem = async (req, res, next) => {
    var status = 0;
    var message = "";
    var corpo = {};
    if(req.body !== null) {
        var nomeFormulario;
        for(let i=0;i<req.body.length;i++) {
            if(req.body[i].idCampo !== null && req.body[i].resposta !== null && req.body[i].nomeFormulario !== null) {
                let idCampo = req.body[i].idCampo;
                let resposta = req.body[i].resposta;
                nomeFormulario = req.body[i].nomeFormulario;
                corpo[idCampo] = resposta;
            }
        }
        console.log(nomeFormulario);
        console.log(corpo);
        await Post.create({
            nomeForm: nomeFormulario,
            respostas: corpo
        }).then(data => {
            status = 200;
            message = "Sucesso";
        }).catch(err => {
            console.log(err);
            status = 500;
            message = "Erro interno";
        })
        
    } else {
        status = 400;
        message = "Corpo vazio";
    }
    console.log(corpo);
    console.log(`${status}: ${message}`);
    return res.status(status).json({'message': message});
};

module.exports = {criarPostagem};
