/*
 * Routes para profile
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const profileController = require("../api/controllers/profile");

//router.get("/getAll", profileController.Allprofile);
router.get("/getOneById/:id", profileController.getProfile);
router.get("/getOneByToken/", profileController.getProfile);

module.exports = router;
