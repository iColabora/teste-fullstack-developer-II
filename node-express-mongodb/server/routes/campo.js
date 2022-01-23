import express from 'express'
import Campo from '../models/Campo.js'

const router = express.Router()

// Retorna um array com todos os campos do bd
router.get('/', (req, res) => {
  Campo.find()
    .then(campos => {
      res.json(campos);
    })
    .catch(error => res.status(500).json(error));
});

// Cria um novo campo e salva no bd
router.post('/add', (req, res) => {
  const novoCampo = new Campo({
    label: req.body.label,
    id_campo: req.body.id_campo,
    tipo_campo: req.body.tipo_campo,
    dados_campo: req.body.dados_campo,
  });

  novoCampo
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Atualização de um campo já existente
router.put('/editar/:id', (req, res) => {
  const novosDados = {
    label: req.body.label,
    id_campo: req.body.id_campo,
    tipo_campo: req.body.tipo_campo,
    dados_campo: req.body.dados_campo,
  }

  Campo.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(campo => {
      res.json(campo);
    })
    .catch(error => res.status(500).json(error));
});

// Deletando um campo do bd
router.delete('/delete/:id', (req, res) => {
  Campo.findOneAndDelete({ _id: req.params.id })
    .then(campo => {
      res.json(campo);
    })
    .catch(error => res.status(500).json(error));
});

export default router