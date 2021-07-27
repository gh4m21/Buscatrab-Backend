/*
 * Routes para Monedas
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const monedaController = require("../api/controllers/monedas");

router.get("/", monedaController.getAll);
router.post("/", monedaController.create);
router.get("/:id", monedaController.getById);
router.put("/:id", monedaController.updateById);
router.delete("/:id", monedaController.deleteById);

module.exports = router;
