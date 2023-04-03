const router = require('express').Router();
const postagemController = require('../controllers/postagem.controller');

router.post('/postagem', postagemController.criarPostagem);

module.exports = router;