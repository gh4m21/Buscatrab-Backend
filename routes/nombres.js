/*
 * Routes para Nombres
 *
 */

//Dependencies
const express = require('express');
const router = express.Router();
const nombreController = require('../api/controllers/nombres');

router.get('/', nombreController.getAll);
router.post('/', nombreController.create);
router.get('/:id', nombreController.getById);
router.put('/:id', nombreController.updateById);
router.delete('/:id', nombreController.deleteById);

module.exports = router;