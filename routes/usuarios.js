/*
 * Routes para usuarios
 *
 */

//Dependencies
const express = require("express");
const router = express.Router();
const userController = require("../api/controllers/usuarios");

router.post("/registrar", userController.create);
router.post("/authenticate", userController.authenticate);
router.put("/edit/:id", userController.updateById);
router.delete("/delete/:id", userController.deleteById);
router.get("/getOne/:id", userController.getById);
router.get("/getAll", userController.getAll);
router.get("/findUserByToken", userController.findUserByToken);

module.exports = router;
