/*
 * Controllers para el experiencia
 *
 */

//Dependencies
const modeloExperiencia = require("../models/experiencias");

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
            id: experiencia._id,
            titulo: experiencia.titulo,
            fechaInicio: experiencia.fechaInicio,
            fechaFinal: experiencia.fechaFinal,
            empresa: experiencia.empresa,
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
        titulo: req.body.titulo,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal,
        empresa: req.body.empresa,
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
          res.json({
            status: 200,
            message: "Experiencia borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloExperiencia.create(
      {
        titulo: req.body.titulo,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal,
        empresa: req.body.empresa,
        descripcion: req.body.descripcion,
        isTrabajoActivo: req.body.isTrabajoActivo,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
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
  },
};
