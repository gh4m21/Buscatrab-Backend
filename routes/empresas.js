/*
 * Routes para empresas
 *
 */

//Dependencies
const express = require('express');
const router = express.Router();
const empresaController = require('../api/controllers/empresas');

router.get('/', empresaController.getAll);
router.post('/', empresaController.create);
router.get('/:id', empresaController.getById);
router.put('/:id', empresaController.updateById);
router.delete('/:id', empresaController.deleteById);

module.exports = router;