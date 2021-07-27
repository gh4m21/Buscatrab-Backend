/*
 * Routes para Interview
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const interviewController = require("../api/controllers/interview");

router.get("/", interviewController.getAll);
router.post("/", interviewController.create);
router.get("/:id", interviewController.getById);
router.put("/:id", interviewController.updateById);
router.delete("/:id", interviewController.deleteById);

module.exports = router;
