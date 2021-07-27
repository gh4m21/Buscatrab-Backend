/*
 * Routes para Logs
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const logController = require("../api/controllers/logs");

router.get("/", logController.getAll);
router.post("/", logController.create);
router.get("/:id", logController.getById);
router.put("/:id", logController.updateById);
router.delete("/:id", logController.deleteById);

module.exports = router;
