/*
 * Controllers para Monedas
 *
 */

//Dependencies
const modeloMoneda = require("../models/monedas");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloMoneda.findById(req.params.id, function (err, monedaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Moneda encontrado",
          data: {
            moneda: monedaInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaMonedas = [];

    modeloMoneda.find({}, function (err, monedas) {
      if (err) {
        next(err);
      } else {
        for (let moneda of monedas) {
          listaMonedas.push({
            _id: moneda._id,
            descripcion: moneda.descripcion,
            fechaCreacion: moneda.fechaCreacion,
            fechaModificacion: moneda.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Moneda encontrado",
          data: {
            moneda: listaMonedas,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloMoneda.findByIdAndUpdate(
      req.params.id,
      {
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, monedaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Moneda actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloMoneda.findByIdAndRemove(req.params.id, function (err, monedaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Moneda borrado con exito",
          data: null,
        });
      }
    });
  },

  create: function (req, res, next) {
    modeloMoneda.create(
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
            message: "Moneda creado con exito",
            data: {
              moneda: result,
            },
          });
        }
      }
    );
  },
};
