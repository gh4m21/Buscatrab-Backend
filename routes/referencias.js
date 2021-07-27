/*
 * Routes para Referencias
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const referenciaController = require("../api/controllers/referencias");

router.get("/", referenciaController.getAll);
router.post("/", referenciaController.create);
router.get("/:id", referenciaController.getById);
router.put("/:id", referenciaController.updateById);
router.delete("/:id", referenciaController.deleteById);

module.exports = router;
