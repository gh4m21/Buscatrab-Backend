/*
 * Routes para Publicacion Trabajo
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const publicacionTrabajoController = require("../api/controllers/publicaciontrabajo");

router.get("/", publicacionTrabajoController.getAll);
router.get("/getByUser/:id", publicacionTrabajoController.getAllByUser);
router.post("/", publicacionTrabajoController.create);
router.get("/:id", publicacionTrabajoController.getById);
router.put("/:id", publicacionTrabajoController.updateById);
router.delete("/:id", publicacionTrabajoController.deleteById);

module.exports = router;
