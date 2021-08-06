/*
 * Controllers para direccion
 *
 */

//Dependencies
const modeloDireccion = require("../models/direccion");
const modeloUsuario = require("../models/usuarios");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloDireccion.findById(req.params.id, function (err, direccionInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Direccion encontrado",
          data: {
            direccion: direccionInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaDireccion = [];

    modeloDireccion.find({}, function (err, direcciones) {
      if (err) {
        next(err);
      } else {
        for (let direccion of direcciones) {
          listaDireccion.push({
            id: direccion._id,
            pais: direccion.pais,
            region: direccion.region,
            ciudad: direccion.ciudad,
            sector: direccion.sector,
            calle: direccion.calle,
            referencia: direccion.referencia,
            fechaCreacion: direccion.fechaCreacion,
            fechaModificacion: direccion.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de direccion encontrado",
          data: {
            direccion: listaDireccion,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloDireccion.findByIdAndUpdate(
      req.params.id,
      {
        pais: req.body.pais,
        region: req.body.region,
        ciudad: req.body.ciudad,
        sector: req.body.sector,
        calle: req.body.calle,
        referencia: req.body.referencia,
        fechaModificacion: Date.now(),
      },
      function (err, direccionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Direccion actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloDireccion.findByIdAndRemove(
      req.params.id,
      function (err, direccionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Direccion borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloDireccion.create(
      {
        pais: req.body.pais,
        region: req.body.region,
        ciudad: req.body.ciudad,
        sector: req.body.sector,
        calle: req.body.calle,
        referencia: req.body.referencia,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualizar desempleo
          modeloUsuario.findByIdAndUpdate(
            req.body.idDesempleo,
            {
              _direccion: result._id,
            },
            function (err, desempleoInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Direccion creado con exito",
                  data: {
                    direccion: result,
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
