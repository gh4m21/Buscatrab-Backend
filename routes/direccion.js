/*
 * Routes para direccion
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const direccionController = require("../api/controllers/direccion");

router.get("/", direccionController.getAll);
router.post("/", direccionController.create);
router.get("/:id", direccionController.getById);
router.put("/:id", direccionController.updateById);
router.delete("/:id", direccionController.deleteById);

module.exports = router;
