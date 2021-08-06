/*
 * Controllers para Referencia
 *
 */

//Dependencies
const modeloReferencia = require("../models/referencias");
const modeloDesempleo = require("../models/desempleos");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloReferencia.findById(req.params.id, function (err, referenciaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Referencia encontrado",
          data: {
            referencia: referenciaInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaReferencia = [];

    modeloReferencia.find({}, function (err, referencias) {
      if (err) {
        next(err);
      } else {
        for (let referencia of referencias) {
          listaReferencia.push({
            _id: referencia._id,
            nombre: referencia.nombre,
            telefono: referencia.telefono,
            email: referencia.email,
            empresa: referencia.empresa,
            notas: referencia.notas,
            fechaCreacion: referencia.fechaCreacion,
            fechaModificacion: referencia.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de referencia encontrado",
          data: {
            referencia: listaReferencia,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloReferencia.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        empresa: req.body.empresa,
        notas: req.body.notas,
        fechaModificacion: Date.now(),
      },
      function (err, referenciaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Referencia actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloReferencia.findByIdAndRemove(
      req.params.id,
      function (err, referenciaInfo) {
        if (err) {
          next(err);
        } else {
          //Actualizar desempleo
          modeloDesempleo.findByIdAndUpdate(
            req.body.idDesempleo,
            {
              $pull: { _referencia: req.params.id },
            },
            function (err, desempleoInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Referencia borrado con exito",
                  data: null,
                });
              }
            }
          );
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloReferencia.create(
      {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        empresa: req.body.empresa,
        notas: req.body.notas,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualizar desempleo
          modeloDesempleo.findByIdAndUpdate(
            req.body.idDesempleo,
            {
              $push: { _referencia: result._id },
            },
            function (err, desempleoInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Referencia creado con exito",
                  data: {
                    referencia: result,
                  },
                });
              }
            }
          );
        }
      }
    );
  },
};
