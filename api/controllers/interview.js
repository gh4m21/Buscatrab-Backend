/*
 * Controllers para interview
 *
 */

//Dependencies
const modeloInterview = require("../models/interview");
const modeloSolicitud = require("../models/solicitudTrabajo");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloInterview.findById(req.params.id, function (err, interviewInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Interview encontrado",
          data: {
            interview: interviewInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaInterview = [];

    modeloInterview.find({}, function (err, interviews) {
      if (err) {
        next(err);
      } else {
        for (let interview of interviews) {
          listaInterview.push({
            _id: interview._id,
            fecha: interview.fecha,
            hora: interview.hora,
            asignacionTo: interview.asignacionTo,
            isAnulado: interview.isAnulado,
            isActivado: interview.isActivado,
            isAceptado: interview.isAceptado,
            fechaCreacion: interview.fechaCreacion,
            fechaModificacion: interview.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de interview encontrado",
          data: {
            interview: listaInterview,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloInterview.findByIdAndUpdate(
      req.params.id,
      {
        fecha: req.body.fecha,
        hora: req.body.hora,
        asignacionTo: req.body.asignacionTo,
        isAnulado: req.body.isAnulado,
        isActivado: req.body.isActivado,
        isAceptado: req.body.isActivado,
        fechaModificacion: Date.now(),
      },
      function (err, interviewInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Interview actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloInterview.findByIdAndRemove(
      req.params.id,
      function (err, interviewInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Interview borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloInterview.create(
      {
        fecha: req.body.fecha,
        hora: req.body.hora,
        asignacionTo: req.body.asignacionTo,
        isAnulado: false,
        isActivado: true,
        isAceptado: false,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualiza solicitud de Trabajo
          if (!err && result) {
            modeloSolicitud.findByIdAndUpdate(
              req.body.idSolicitudTrabajo,
              {
                _interview: result._id,
                isAceptado: true,
              },
              function (err, solicitudTrabajoInfo) {
                if (!err && solicitudTrabajoInfo) {
                  res.json({
                    status: 200,
                    message: "Interview creado con exito",
                    data: {
                      interview: result,
                    },
                  });
                } else {
                  next(err);
                }
              }
            );
          } else {
            next(err);
          }
        }
      }
    );
  },
};
