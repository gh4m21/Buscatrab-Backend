/*
 * Routes para telefonos
 *
 */

//Dependencies
const express = require('express');
const router = express.Router();
const telephoneController = require('../api/controllers/telefonos');

router.get('/', telephoneController.getAll);
router.post('/', telephoneController.create);
router.get('/:id', telephoneController.getById);
router.put('/:id', telephoneController.updateById);
router.delete('/:id', telephoneController.deleteById);

module.exports = router;