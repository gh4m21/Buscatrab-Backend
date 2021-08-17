/*
 * Routes para profile
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const solicitudController = require("../api/controllers/customSolicitudTrabajo");

router.get("/:id", solicitudController.getCustomSolicitud);
router.get(
  "/byDesempleo/:id",
  solicitudController.getCustomSolicitudByDesempleo
);

module.exports = router;
