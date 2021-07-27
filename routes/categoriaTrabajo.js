/*
 * Routes para Categoria Trabajo
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const categoriaTrabajoController = require("../api/controllers/categoriaTrabajo");

router.get("/", categoriaTrabajoController.getAll);
router.post("/", categoriaTrabajoController.create);
router.get("/:id", categoriaTrabajoController.getById);
router.put("/:id", categoriaTrabajoController.updateById);
router.delete("/:id", categoriaTrabajoController.deleteById);

module.exports = router;
