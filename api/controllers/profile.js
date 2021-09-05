/*
 * Controllers para Referencia
 *
 */

//Dependencies
const modeloUsuario = require("../models/usuarios");
const jwt = require("jsonwebtoken");

module.exports = {
  getProfile: function (req, res, next) {
    //Verificar si tiene parametro
    //Si no tiene parametro, buscar el parametro mediante el token
    const token = req.headers["token"];
    const tokenDecode = jwt.decode(token);
    const idUsuario = req.params.id != null ? req.params.id : tokenDecode.id;

    modeloUsuario
      .findOne({ _id: idUsuario })
      .populate("_nombre")
      .populate("_identificacion")
      .populate("_telefono")
      .populate("_direccion")
      .populate({
        path: "_empresa",
        populate: [
          {
            path: "_categoriaEmpresa",
          },
          {
            path: "publicacionTrabajo",
          },
        ],
      })
      .populate({
        path: "_desempleo",
        populate: [
          {
            path: "_experiencia",
          },
          {
            path: "_formacion",
          },
          {
            path: "_lenguaje",
          },
          {
            path: "_referencias",
          },
          {
            path: "_solicitudTrabajo",
          },
        ],
      })
      .then((usuarioInfo) => {
        res.json({
          status: 200,
          message: "Profile encontrado",
          data: {
            profile: usuarioInfo,
          },
        });
      });
  },
};
