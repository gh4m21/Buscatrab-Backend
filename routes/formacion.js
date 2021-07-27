/*
 * Routes para formacion
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const formacionController = require("../api/controllers/formacion");

router.get("/", formacionController.getAll);
router.post("/", formacionController.create);
router.get("/:id", formacionController.getById);
router.put("/:id", formacionController.updateById);
router.delete("/:id", formacionController.deleteById);

module.exports = router;
