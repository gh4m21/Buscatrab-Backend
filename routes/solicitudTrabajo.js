/*
 * Routes para solicitud trabajo
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const solicitudTrabajoController = require("../api/controllers/solicitudTrabajo");

router.get("/", solicitudTrabajoController.getAll);
router.post("/", solicitudTrabajoController.create);
router.get("/:id", solicitudTrabajoController.getById);
router.post(
  "/ByUsuarioAndPublicacion/",
  solicitudTrabajoController.getByUsuarioAndPublicacion
);
router.put("/:id", solicitudTrabajoController.updateById);
router.delete("/:id", solicitudTrabajoController.deleteById);

module.exports = router;
