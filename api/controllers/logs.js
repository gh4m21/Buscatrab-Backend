/*
 * Controllers para Logs
 *
 */

//Dependencies
const modeloLog = require("../models/logs");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloLog.findById(req.params.id, function (err, logInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Log encontrado",
          data: {
            log: logInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaLogs = [];

    modeloLog.find({}, function (err, logs) {
      if (err) {
        next(err);
      } else {
        for (let log of logs) {
          listaLogs.push({
            _id: log._id,
            _usuario: log._usuario,
            accion: log.accion,
            descripcion: log.descripcion,
            fechaCreacion: log.fechaCreacion,
            fechaModificacion: log.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Logs encontrado",
          data: {
            log: listaLogs,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloLog.findByIdAndUpdate(
      req.params.id,
      {
        _usuario: req.body._usuario,
        accion: req.body.accion,
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, logInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Logs actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloLog.findByIdAndRemove(req.params.id, function (err, logInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Log borrado con exito",
          data: null,
        });
      }
    });
  },

  create: function (req, res, next) {
    modeloLog.create(
      {
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
            message: "Logs creado con exito",
            data: {
              log: result,
            },
          });
        }
      }
    );
  },
};
