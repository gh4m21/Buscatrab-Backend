/*
 * Routes para experiencias
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const experienciaController = require("../api/controllers/experiencias");

router.get("/", experienciaController.getAll);
router.post("/", experienciaController.create);
router.get("/:id", experienciaController.getById);
router.put("/:id", experienciaController.updateById);
router.delete("/:id", experienciaController.deleteById);

module.exports = router;
