/*
 * Controllers para Referencia
 *
 */

//Dependencies
const modeloSolicitudTrabajo = require("../models/solicitudTrabajo");

module.exports = {
  getCustomSolicitud: function (req, res, next) {
    modeloSolicitudTrabajo
      .findOne({ _publicacionTrabajo: req.params.id }, null, {
        sort: {
          fechaCreacion: -1,
        },
      })
      .populate({
        path: "_desempleo",
        populate: {
          path: "_usuario",
          populate: [
            {
              path: "_nombre",
            },
            {
              path: "_identificacion",
            },
            {
              path: "_telefono",
            },
            {
              path: "_direccion",
            },
          ],
        },
      })
      .populate("_cv")
      .populate("_interview")
      .then((solicitudTrabajoInfo) => {
        res.json({
          status: 200,
          message: "Lista de solicitud encontrado",
          data: {
            solicitudTrabajo: solicitudTrabajoInfo,
          },
        });
      });
  },

  //Get by desempleos
  getCustomSolicitudByDesempleo: function (req, res, next) {
    modeloSolicitudTrabajo
      .findOne({ _desempleo: req.params.id }, null, {
        sort: {
          fechaCreacion: -1,
        },
      })
      .populate({
        path: "_desempleo",
        populate: {
          path: "_usuario",
          populate: [
            {
              path: "_nombre",
            },
            {
              path: "_identificacion",
            },
            {
              path: "_telefono",
            },
            {
              path: "_direccion",
            },
          ],
        },
      })
      .populate("_cv")
      .populate("_interview")
      .then((solicitudTrabajoInfo) => {
        res.json({
          status: 200,
          message: "Lista de solicitud encontrado",
          data: {
            solicitudTrabajo: solicitudTrabajoInfo,
          },
        });
      });
  },
};
