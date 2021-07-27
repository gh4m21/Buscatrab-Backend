/*
 * Routes para Notificacion
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const notificacionController = require("../api/controllers/notificacion");

router.get("/", notificacionController.getAll);
router.post("/", notificacionController.create);
router.get("/:id", notificacionController.getById);
router.put("/:id", notificacionController.updateById);
router.delete("/:id", notificacionController.deleteById);

module.exports = router;
