/*
 * Controllers para Notificacion
 *
 */

//Dependencies
const modeloNotificacion = require("../models/notificacion");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloNotificacion.findById(
      req.params.id,
      function (err, notificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Notificacion encontrado",
            data: {
              notificacion: notificacionInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaNotificacion = [];

    modeloNotificacion.find({}, function (err, notificaciones) {
      if (err) {
        next(err);
      } else {
        for (let notificacion of notificaciones) {
          listaNotificacion.push({
            id: notificacion._id,
            _solicitudTrabajo: notificacion._solicitudTrabajo,
            _usuario: notificacion._usuario,
            accion: notificacion.accion,
            descripcion: notificacion.descripcion,
            fechaCreacion: notificacion.fechaCreacion,
            fechaModificacion: notificacion.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Notificacion encontrado",
          data: {
            notificacion: listaNotificacion,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloNotificacion.findByIdAndUpdate(
      req.params.id,
      {
        _solicitudTrabajo: req.body._solicitudTrabajo,
        _usuario: req.body._usuario,
        accion: req.body.accion,
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, notificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Notificacion actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloNotificacion.findByIdAndRemove(
      req.params.id,
      function (err, notificacionInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Notificacion borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloNotificacion.create(
      {
        _solicitudTrabajo: req.body._solicitudTrabajo,
        _usuario: req.body._usuario,
        accion: req.body.accion,
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
            message: "Notificacion creado con exito",
            data: {
              notificacion: result,
            },
          });
        }
      }
    );
  },
};
