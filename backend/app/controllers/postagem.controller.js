const Post = require('../models/post.model');

const criarPostagem = async (req, res, next) => {
    var status = 0;
    var message = "";
    var corpo = {};
    if(req.body !== null) {
        for(let i=0;i<req.body.length;i++) {
            if(req.body[i].idCampo !== null && req.body[i].resposta !== null) {
                let idCampo = req.body[i].idCampo;
                let resposta = req.body[i].resposta;
                corpo[idCampo] = resposta;
            }
        }
        await Post.create({
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
