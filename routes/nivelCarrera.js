/*
 * Routes para Nivel carrera
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const nivelCarreraController = require("../api/controllers/nivelCarrera");

router.get("/", nivelCarreraController.getAll);
router.post("/", nivelCarreraController.create);
router.get("/:id", nivelCarreraController.getById);
router.put("/:id", nivelCarreraController.updateById);
router.delete("/:id", nivelCarreraController.deleteById);

module.exports = router;
