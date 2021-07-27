/*
 * Controllers para el formacion
 *
 */

//Dependencies
const modeloFormacion = require("../models/formacion");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloFormacion.findById(req.params.id, function (err, formacionInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Formacion encontrado",
          data: {
            formacion: formacionInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaFormacion = [];

    modeloFormacion.find({}, function (err, formaciones) {
      if (err) {
        next(err);
      } else {
        for (let formacion of formaciones) {
          listaFormacion.push({
            id: formacion._id,
            nombreInstituto: formacion.nombreInstituto,
            ciudad: formacion.ciudad,
            nivel: formacion.nivel,
            fechaInicial: formacion.fechaInicial,
            fechaFinal: formacion.fechaFinal,
            descripcion: formacion.descripcion,
            fechaCreacion: formacion.fechaCreacion,
            fechaModificacion: formacion.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Formacion encontrado",
          data: {
            formacion: listaFormacion,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloFormacion.findByIdAndUpdate(
      req.params.id,
      {
        nombreInstituto: req.body.nombreInstituto,
        ciudad: req.body.ciudad,
        nivel: req.body.nivel,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        descripcion: req.body.descripcion,
        isTrabajoActivo: req.body.isTrabajoActivo,
        fechaModificacion: Date.now(),
      },
      function (err, formacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Formacion actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloFormacion.findByIdAndRemove(
      req.params.id,
      function (err, formacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Formacion borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloFormacion.create(
      {
        nombreInstituto: req.body.nombreInstituto,
        ciudad: req.body.ciudad,
        nivel: req.body.nivel,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
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
            message: "Formacion creado con exito",
            data: {
              formacion: result,
            },
          });
        }
      }
    );
  },
};
