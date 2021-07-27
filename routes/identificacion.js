/*
 * Routes para identificacion
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const identificacionController = require("../api/controllers/identificacion");

router.get("/", identificacionController.getAll);
router.post("/", identificacionController.create);
router.get("/:id", identificacionController.getById);
router.put("/:id", identificacionController.updateById);
router.delete("/:id", identificacionController.deleteById);

module.exports = router;
