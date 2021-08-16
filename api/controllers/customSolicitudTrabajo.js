/*
 * Controllers para Referencia
 *
 */

//Dependencies
const modeloUsuario = require("../models/usuarios");
const modeloDesempleo = require("../models/desempleos");
const modeloCv = require("../models/cv");
const modeloNombre = require("../models/nombres");
const modeloSolicitudTrabajo = require("../models/solicitudTrabajo");
const modeloTelefono = require("../models/telefonos");
const modeloPublicacionTrabajo = require("../models/publicacionTrabajo");

module.exports = {
  getCustomSolicitud: function (req, res, next) {
    //Verificar si tiene parametro
    //Si no tiene parametro, buscar el parametro mediante el token
    let solicitudObj = [];

    modeloSolicitudTrabajo.find({}, function (err, solicitudTrabajo) {
      if (err) {
        next(err);
      } else {
        for (let solicitud of solicitudTrabajo) {
          //Get publicacion Trabajo
          modeloPublicacionTrabajo.findById(
            solicitud._publicacionTrabajo,
            function (err, publicacionTrabajoInfo) {
              if (err) {
                next(err);
              } else {
                //Get usuario
                modeloUsuario.findById(
                  solicitud._desempleo,
                  function (err, usuarioInfo) {
                    if (err) {
                      next(err);
                    } else {
                      //Get desempleo
                      modeloDesempleo.findById(
                        usuarioInfo._desempleo,
                        function (err, desempleoInfo) {
                          if (err) {
                            next(err);
                          } else {
                            //get Nombre
                            modeloNombre.findById(
                              usuarioInfo._nombre,
                              function (err, nombreInfo) {
                                if (err) {
                                  next(err);
                                } else {
                                  //get Telefono
                                  modeloTelefono.findById(
                                    usuarioInfo._telefono,
                                    function (err, telefonoInfo) {
                                      if (err) {
                                        next(err);
                                      } else {
                                        //get cv
                                        modeloCv.findById(
                                          solicitud._cv,
                                          function (err, cvInfo) {
                                            if (err) {
                                              next(err);
                                            } else {
                                              //Push data to the array
                                              solicitudObj.push({
                                                _id: solicitud._id,
                                                publicacionTrabajoInfo,
                                                desempleoInfo,
                                                cvInfo,
                                                usuarioInfo,
                                                nombreInfo,
                                                telefonoInfo,
                                                motivacion:
                                                  solicitud.motivacion,
                                                isAceptado:
                                                  solicitud.isAceptado,
                                                isActivo: solicitud.isActivo,
                                                fechaCreacion:
                                                  solicitud.fechaCreacion,
                                                fechaModificacion:
                                                  solicitud.fechaModificacion,
                                              });

                                              res.json({
                                                status: 200,
                                                message:
                                                  "Lista de solicitud encontrado",
                                                data: {
                                                  solicitudTrabajo:
                                                    solicitudObj,
                                                },
                                              });
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    });
  },
};
