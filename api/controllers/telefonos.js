/*
 * Controllers para el telefonos
 *
 */

//Dependencies
const modeloTelefono = require("../models/telefonos");
const modeloUsuario = require("../models/usuarios");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloTelefono.findById(req.params.id, function (err, telefonoInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Telefono encontrado",
          data: {
            telefono: telefonoInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaTelefono = [];

    modeloTelefono.find({}, function (err, telefonos) {
      if (err) {
        next(err);
      } else {
        for (let telefono of telefonos) {
          listaTelefono.push({
            _id: telefono._id,
            tipoTelefono: telefono.tipoTelefono,
            descripcion: telefono.descripcion,
            fechaCreacion: telefono.fechaCreacion,
            fechaModificacion: telefono.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Telefono encontrado",
          data: {
            telefonos: listaTelefono,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloTelefono.findByIdAndUpdate(
      req.params.id,
      {
        tipoTelefono: req.body.tipoTelefono,
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, telefonoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Telefono actualizado con exito",
            telefono: telefonoInfo,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloTelefono.findByIdAndRemove(
      req.params.id,
      function (err, telefonoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Telefono borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloTelefono.create(
      {
        tipoTelefono: req.body.tipoTelefono,
        descripcion: req.body.descripcion,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualiza el usuario
          if (!err && result) {
            modeloUsuario.findByIdAndUpdate(
              req.body.idUsuario,
              {
                _telefono: [result._id],
              },
              function (err, usuarioInfo) {
                if (!err && usuarioInfo) {
                  res.json({
                    status: 200,
                    message: "Telefono creado con exito",
                    data: {
                      telefono: result,
                    },
                  });
                } else {
                  next(err);
                }
              }
            );
          } else {
            next(err);
          }
        }
      }
    );
  },
};
