/*
 * Controllers para el usuario
 *
 */

//Dependencies
const modeloUsuario = require("../models/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res, next) {
    modeloUsuario.create(
      {
        email: req.body.email,
        password: req.body.password,
        _telefono: [],
        tipoUsuario: req.body.tipoUsuario,
        _empresa: null,
        _desempleo: null,
        isActivado: true,
        isNotifSms: false,
        isNotifEmail: false,
        isBan: false,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Usuario agregado con exito.",
            data: {
              usuario: result,
            },
          });
        }
      }
    );
  },

  updateById: function (req, res, next) {
    modeloUsuario.findByIdAndUpdate(
      req.params.id,
      {
        _telefono: req.body._telefono,
        tipoUsuario: req.body.tipoUsuario,
        _empresa: req.body._empresa,
        _desempleo: req.body._desempleo,
        isActivado: req.body.isActivado,
        isNotifSms: req.body.isNotifSms,
        isNotifEmail: req.body.isNotifEmail,
        isBan: req.body.isBan,
        fechaModificacion: Date.now(),
      },
      function (err, usuarioInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Usuario actualizado con exito",
            data: usuarioInfo,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloUsuario.findByIdAndRemove(req.params.id, function (err, usuarioInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Usuario borrado con exito",
          data: null,
        });
      }
    });
  },

  getById: function (req, res, next) {
    console.log(req.body);
    modeloUsuario.findById(req.params.id, function (err, usuarioInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Usuario encontrado",
          data: {
            usuario: usuarioInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaUsuario = [];

    modeloUsuario.find({}, function (err, usuarios) {
      if (err) {
        next(err);
      } else {
        for (let usuario of usuarios) {
          listaUsuario.push({
            id: usuario._id,
            email: usuario.email,
            _telefono: usuario._telefono,
            tipoUsuario: usuario.tipoUsuario,
            _empresa: usuario._empresa,
            _desempleo: usuario._desempleo,
            isActivado: usuario.isActivado,
            isNotiSms: usuario.isNotiSms,
            isNotifEmail: usuario.isNotifEmail,
            isBan: usuario.isBan,
            fechaCreacion: usuario.fechaCreacion,
            fechaModificacion: usuario.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Usuario encontrado",
          data: {
            usuario: listaUsuario,
          },
        });
      }
    });
  },

  authenticate: function (req, res, next) {
    modeloUsuario.findOne(
      {
        email: req.body.email,
      },
      function (err, infoUsuario) {
        if (err) {
          next(err);
        } else {
          if (bcrypt.compareSync(req.body.password, infoUsuario.password)) {
            const token = jwt.sign(
              {
                id: infoUsuario._id,
              },
              req.app.get("secretKey"),
              {
                expiresIn: "1h",
              }
            );

            res.json({
              status: 200,
              message: "Usuario encontrado con exito",
              data: {
                usuario: infoUsuario,
                token: token,
              },
            });
          } else {
            res.json({
              status: 401,
              message: "Email/Password incorrecto.",
              data: null,
            });
          }
        }
      }
    );
  },
};
