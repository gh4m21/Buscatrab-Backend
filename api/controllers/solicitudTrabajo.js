/*
 * Controllers para el solicitud trabajo
 *
 */

//Dependencies
const modeloSolicitudTrabajo = require("../models/solicitudTrabajo");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloSolicitudTrabajo.findById(
      req.params.id,
      function (err, solicitudTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Solicitud Trabajo encontrado",
            data: {
              solicitudTrabajo: solicitudTrabajoInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaSolicitudTrabajo = [];

    modeloSolicitudTrabajo.find({}, function (err, solicitudTrabajo) {
      if (err) {
        next(err);
      } else {
        for (let solicitud of solicitudTrabajo) {
          listaSolicitudTrabajo.push({
            id: solicitud._id,
            _publicacionTrabajo: solicitud._publicacionTrabajo,
            _desempleo: solicitud._desempleo,
            _cv: solicitud._cv,
            _interview: solicitud._interview,
            motivacion: solicitud.motivacion,
            isAceptado: solicitud.isAceptado,
            isActivo: solicitud.isActivo,
            fechaCreacion: solicitud.fechaCreacion,
            fechaModificacion: solicitud.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de solicitud encontrado",
          data: {
            solictudTrabajo: listaSolicitudTrabajo,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloSolicitudTrabajo.findByIdAndUpdate(
      req.params.id,
      {
        _publicacionTrabajo: req.body._publicacionTrabajo,
        _desempleo: req.body._desempleo,
        _cv: req.body._cv,
        _interview: req.body._interview,
        motivacion: req.body.motivacion,
        isAceptado: req.body.isAceptado,
        isActivo: req.body.isActivo,
        fechaModificacion: Date.now(),
      },
      function (err, solicitudTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Solicitud Trabajo actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloSolicitudTrabajo.findByIdAndRemove(
      req.params.id,
      function (err, solicitudTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Solicitud Trabajo borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloSolicitudTrabajo.create(
      {
        _publicacionTrabajo: req.body._publicacionTrabajo,
        _desempleo: req.body._desempleo,
        _cv: req.body._cv,
        _interview: req.body._interview,
        motivacion: req.body.motivacion,
        isAceptado: req.body.isAceptado,
        isActivo: req.body.isActivo,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Solicitud Trabajo creado con exito",
            data: {
              solicitudTrabajo: result,
            },
          });
        }
      }
    );
  },
};
