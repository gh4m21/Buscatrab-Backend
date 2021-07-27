/*
 * Controllers para el nombres
 *
 */

//Dependencies
const modeloNombre = require("../models/nombres");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloNombre.findById(req.params.id, function (err, nombreInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Nombre encontrado",
          data: {
            nombres: nombreInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaNombre = [];

    modeloNombre.find({}, function (err, nombres) {
      if (err) {
        next(err);
      } else {
        for (let nombre of nombres) {
          listaNombre.push({
            id: nombre._id,
            nombre: nombre.nombre,
            apellidoPadre: nombre.apellidoPadre,
            apellidoMadre: nombre.apellidoMadre,
            fechaCreacion: nombre.fechaCreacion,
            fechaModificacion: nombre.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Nombre encontrado",
          data: {
            nombres: listaNombre,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloNombre.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        apellidoMadre: req.body.apellidoMadre,
        apellidoPadre: req.body.apellidoPadre,
        fechaModificacion: Date.now(),
      },
      function (err, nombreInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Nombre actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloTelefono.findByIdAndRemove(req.params.id, function (err, nombreInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Nombre borrado con exito",
          data: null,
        });
      }
    });
  },

  create: function (req, res, next) {
    modeloNombre.create(
      {
        nombre: req.body.nombre,
        apellidoMadre: req.body.apellidoMadre,
        apellidoPadre: req.body.apellidoPadre,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Nombre creado con exito",
            data: {
              nombres: result,
            },
          });
        }
      }
    );
  },
};
