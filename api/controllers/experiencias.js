/*
 * Controllers para el experiencia
 *
 */

//Dependencies
const modeloExperiencia = require("../models/experiencias");
const modeloDesempleo = require("../models/desempleos");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloExperiencia.findById(req.params.id, function (err, experienciaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Experiencia encontrado",
          data: {
            experiencia: experienciaInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaExperiencia = [];

    modeloExperiencia.find({}, function (err, experiencias) {
      if (err) {
        next(err);
      } else {
        for (let experiencia of experiencias) {
          listaExperiencia.push({
            _id: experiencia._id,
            fechaInicial: experiencia.fechaInicial,
            fechaFinal: experiencia.fechaFinal,
            empresa: experiencia.empresa,
            puesto: experiencia.puesto,
            descripcion: experiencia.descripcion,
            isTrabajoActivo: experiencia.isTrabajoActivo,
            fechaCreacion: experiencia.fechaCreacion,
            fechaModificacion: experiencia.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Experiencia encontrado",
          data: {
            experiencia: listaExperiencia,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloExperiencia.findByIdAndUpdate(
      req.params.id,
      {
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        empresa: req.body.empresa,
        puesto: req.body.puesto,
        descripcion: req.body.descripcion,
        isTrabajoActivo: req.body.isTrabajoActivo,
        fechaModificacion: Date.now(),
      },
      function (err, experienciaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Experiencia actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloExperiencia.findByIdAndRemove(
      req.params.id,
      function (err, experienciaInfo) {
        if (err) {
          next(err);
        } else {
          //Actualizar desempleo
          modeloDesempleo.findByIdAndUpdate(
            req.body.idDesempleo,
            {
              $pull: { _experiencia: req.params.id },
            },
            function (err, desempleoInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Experiencia borrado con exito",
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
    modeloExperiencia.create(
      {
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        empresa: req.body.empresa,
        descripcion: req.body.descripcion,
        puesto: req.body.puesto,
        isTrabajoActivo: req.body.isTrabajoActivo,
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
              $push: { _experiencia: result._id },
            },
            function (err, desempleoInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Experiencia creado con exito",
                  data: {
                    experiencia: result,
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
