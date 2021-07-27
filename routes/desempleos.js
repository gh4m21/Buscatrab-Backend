/*
 * Routes para desempleos
 *
 */

//Dependencies
const express = require('express');
const router = express.Router();
const desempleoController = require('../api/controllers/desempleos');

router.get('/', desempleoController.getAll);
router.post('/', desempleoController.create);
router.get('/:id', desempleoController.getById);
router.put('/:id', desempleoController.updateById);
router.delete('/:id', desempleoController.deleteById);

module.exports = router;