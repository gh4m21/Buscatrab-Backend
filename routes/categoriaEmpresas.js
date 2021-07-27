/*
 * Routes para categoria empresa
 *
 */

//Dependencies
const express = require('express');
const router = express.Router();
const categoriaEmpresaController = require('../api/controllers/categoriaEmpresas');

router.get('/', categoriaEmpresaController.getAll);
router.post('/', categoriaEmpresaController.create);
router.get('/:id', categoriaEmpresaController.getById);
router.put('/:id', categoriaEmpresaController.updateById);
router.delete('/:id', categoriaEmpresaController.deleteById);

module.exports = router;