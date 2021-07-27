/*
 * Routes para solicitud trabajo
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const solictudTrabajoController = require("../api/controllers/solicitudTrabajo");

router.get("/", solictudTrabajoController.getAll);
router.post("/", solictudTrabajoController.create);
router.get("/:id", solictudTrabajoController.getById);
router.put("/:id", solictudTrabajoController.updateById);
router.delete("/:id", solictudTrabajoController.deleteById);

module.exports = router;
