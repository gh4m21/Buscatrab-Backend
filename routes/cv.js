/*
 * Routes para CV
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const CVController = require("../api/controllers/cv");

router.get("/", CVController.getAll);
router.post("/", CVController.create);
router.get("/:id", CVController.getById);
router.put("/:id", CVController.updateById);
router.delete("/:id", CVController.deleteById);

module.exports = router;
