/*
 * Controllers para Nivel Carrera
 *
 */

//Dependencies
const modeloNivelCarrera = require("../models/nivelCarrera");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloNivelCarrera.findById(
      req.params.id,
      function (err, nivelCarreraInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Nivel Carrera encontrado",
            data: {
              nivelCarrera: nivelCarreraInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaNivelCarrera = [];

    modeloNivelCarrera.find({}, function (err, nivelCarreras) {
      if (err) {
        next(err);
      } else {
        for (let nivelCarrera of nivelCarreras) {
          listaNivelCarrera.push({
            _id: nivelCarrera._id,
            descripcion: nivelCarrera.descripcion,
            fechaCreacion: nivelCarrera.fechaCreacion,
            fechaModificacion: nivelCarrera.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Nivel Carrera encontrado",
          data: {
            nivelCarrera: listaNivelCarrera,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloNivelCarrera.findByIdAndUpdate(
      req.params.id,
      {
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, nivelCarreraInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Nivel Carrera actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloNivelCarrera.findByIdAndRemove(
      req.params.id,
      function (err, nivelCarreraInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Nivel Carrera borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloNivelCarrera.create(
      {
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
            message: "Nivel Carrera creado con exito",
            data: {
              nivelCarrera: result,
            },
          });
        }
      }
    );
  },
};
