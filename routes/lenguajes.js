/*
 * Routes para Lenguajes
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const lenguajeController = require("../api/controllers/lenguajes");

router.get("/", lenguajeController.getAll);
router.post("/", lenguajeController.create);
router.get("/:id", lenguajeController.getById);
router.put("/:id", lenguajeController.updateById);
router.delete("/:id", lenguajeController.deleteById);

module.exports = router;
