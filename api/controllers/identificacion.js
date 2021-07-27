/*
 * Controllers para el Identificacion
 *
 */

//Dependencies
const modeloIdentificacion = require("../models/identificacion");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloIdentificacion.findById(
      req.params.id,
      function (err, identificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Identificacion encontrado",
            data: {
              identificacion: identificacionInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaIdentificacion = [];

    modeloIdentificacion.find({}, function (err, identificaciones) {
      if (err) {
        next(err);
      } else {
        for (let identificacion of identificaciones) {
          listaIdentificacion.push({
            id: identificacion._id,
            tipoIdentificacion: identificacion.tipoIdentificacion,
            descripcion: identificacion.descripcion,
            fechaCreacion: identificacion.fechaCreacion,
            fechaModificacion: identificacion.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Identificacion encontrado",
          data: {
            identificacion: listaIdentificacion,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloIdentificacion.findByIdAndUpdate(
      req.params.id,
      {
        tipoIdentificacion: req.body.tipoIdentificacion,
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, identificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Identificacion actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloIdentificacion.findByIdAndRemove(
      req.params.id,
      function (err, identificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Identificacion borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloIdentificacion.create(
      {
        tipoIdentificacion: req.body.tipoIdentificacion,
        descripcion: req.body.descripcion,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Identificacion creado con exito",
            data: {
              identificacion: result,
            },
          });
        }
      }
    );
  },
};
