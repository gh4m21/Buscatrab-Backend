/*
 * Controllers para lenguajes
 *
 */

//Dependencies
const modeloLenguaje = require("../models/lenguajes");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloLenguaje.findById(req.params.id, function (err, lenguajeInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Lenguaje encontrado",
          data: {
            lenguaje: lenguajeInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaLenguaje = [];

    modeloLenguaje.find({}, function (err, lenguajes) {
      if (err) {
        next(err);
      } else {
        for (let lenguaje of lenguajes) {
          listaLenguaje.push({
            id: lenguaje._id,
            descripcion: lenguaje.descripcion,
            nivel: lenguaje.nivel,
            fechaCreacion: lenguaje.fechaCreacion,
            fechaModificacion: lenguaje.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Lenguaje encontrado",
          data: {
            lenguaje: listaLenguaje,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloLenguaje.findByIdAndUpdate(
      req.params.id,
      {
        descripcion: req.body.descripcion,
        nivel: req.body.nivel,
        fechaModificacion: Date.now(),
      },
      function (err, lenguajeInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Lenguaje actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloLenguaje.findByIdAndRemove(
      req.params.id,
      function (err, lenguajeInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Lenguaje borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloLenguaje.create(
      {
        descripcion: req.body.descripcion,
        nivel: req.body.nivel,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Lenguaje creado con exito",
            data: {
              lenguaje: result,
            },
          });
        }
      }
    );
  },
};
