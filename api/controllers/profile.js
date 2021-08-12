/*
 * Controllers para Referencia
 *
 */

//Dependencies
const modeloUsuario = require("../models/usuarios");
const modeloDesempleo = require("../models/desempleos");
const modeloEmpresa = require("../models/empresas");
const modeloNombre = require("../models/nombres");
const modeloIdentificacion = require("../models/identificacion");
const modeloTelefono = require("../models/telefonos");
const modeloDireccion = require("../models/direccion");
const modeloReferencia = require("../models/referencias");
const modeloFormacion = require("../models/formacion");
const modeloExperiencia = require("../models/experiencias");
const modeloLenguaje = require("../models/lenguajes");
const modeloCategoriaEmpresa = require("../models/categoriaEmpresas");
const modeloPublicacionTrabajo = require("../models/publicacionTrabajo");
const jwt = require("jsonwebtoken");

module.exports = {
  getProfile: function (req, res, next) {
    //Verificar si tiene parametro
    //Si no tiene parametro, buscar el parametro mediante el token
    const token = req.headers["token"];
    const tokenDecode = jwt.decode(token);
    const idUsuario = req.params.id != null ? req.params.id : tokenDecode.id;
    let usuarioObj = {};

    console.log(req.params.id);

    modeloUsuario.findById(idUsuario, function (err, usuarioInfo) {
      if (err) {
        next(err);
      } else {
        if (usuarioInfo.tipoUsuario === "desempleo" && usuarioInfo._desempleo) {
          //Get desempleo if exist
          if (usuarioInfo._desempleo) {
            modeloDesempleo.findById(
              usuarioInfo._desempleo,
              function (err, desempleoInfo) {
                if (err) {
                  next(err);
                } else {
                  //get identificacion
                  modeloIdentificacion.findById(
                    usuarioInfo._identificacion,
                    function (err, identificacionInfo) {
                      if (err) {
                        next(err);
                      } else {
                        //get telefono
                        modeloTelefono.findById(
                          usuarioInfo._telefono,
                          function (err, telefonoInfo) {
                            if (err) {
                              next(err);
                            } else {
                              //get direccion
                              modeloDireccion.findById(
                                usuarioInfo._direccion,
                                function (err, direccionInfo) {
                                  if (err) {
                                    next(err);
                                  } else {
                                    //Get nombre
                                    modeloNombre.findById(
                                      usuarioInfo._nombre,
                                      function (err, nombreInfo) {
                                        if (err) {
                                          next(err);
                                        } else {
                                          //Get Formacion if any
                                          modeloFormacion.find(
                                            {
                                              _id: {
                                                $in: desempleoInfo._formacion,
                                              },
                                            },
                                            function (err, formacionInfo) {
                                              if (err) {
                                                next(err);
                                              } else {
                                                //Get Experiencia if any
                                                modeloExperiencia.find(
                                                  {
                                                    _id: {
                                                      $in: desempleoInfo._experiencia,
                                                    },
                                                  },
                                                  function (
                                                    err,
                                                    experienciaInfo
                                                  ) {
                                                    if (err) {
                                                      next(err);
                                                    } else {
                                                      //Get Lenguaje if any
                                                      modeloLenguaje.find(
                                                        {
                                                          _id: {
                                                            $in: desempleoInfo._lenguaje,
                                                          },
                                                        },
                                                        function (
                                                          err,
                                                          lenguajeInfo
                                                        ) {
                                                          if (err) {
                                                            next(err);
                                                          } else {
                                                            //Get Referencia if any
                                                            modeloReferencia.find(
                                                              {
                                                                _id: {
                                                                  $in: desempleoInfo._referencias,
                                                                },
                                                              },
                                                              function (
                                                                err,
                                                                referenciaInfo
                                                              ) {
                                                                if (err) {
                                                                  next(err);
                                                                } else {
                                                                  usuarioObj = {
                                                                    _id: usuarioInfo._id,
                                                                    _nombre: {
                                                                      _id: nombreInfo._id,
                                                                      nombre:
                                                                        nombreInfo.nombre,
                                                                      apellidoMadre:
                                                                        nombreInfo.apellidoMadre,
                                                                      apellidoPadre:
                                                                        nombreInfo.apellidoPadre,
                                                                    },
                                                                    _identificacion:
                                                                      {
                                                                        _id: identificacionInfo._id,
                                                                        tipoIdentificacion:
                                                                          identificacionInfo.tipoIdentificacion,
                                                                        descripcion:
                                                                          identificacionInfo.descripcion,
                                                                      },
                                                                    email:
                                                                      usuarioInfo.email,
                                                                    _telefono: {
                                                                      _id: telefonoInfo._id,
                                                                      tipoTelefono:
                                                                        telefonoInfo.tipoTelefono,
                                                                      descripcion:
                                                                        telefonoInfo.descripcion,
                                                                    },
                                                                    tipoUsuario:
                                                                      usuarioInfo.tipoUsuario,
                                                                    _empresa:
                                                                      usuarioInfo._empresa,
                                                                    _desempleo:
                                                                      {
                                                                        _id: desempleoInfo._id,
                                                                        fechaNacimiento:
                                                                          desempleoInfo.fechaNacimiento,
                                                                        lugarDeNacimiento:
                                                                          desempleoInfo.lugarDeNacimiento,
                                                                        estadoMatrimonial:
                                                                          desempleoInfo.estadoMatrimonial,
                                                                        profesion:
                                                                          desempleoInfo.profesion,
                                                                        _experiencia:
                                                                          experienciaInfo,
                                                                        _formacion:
                                                                          formacionInfo,
                                                                        _lenguaje:
                                                                          lenguajeInfo,
                                                                        _solicitudTrabajo:
                                                                          desempleoInfo._solicitudTrabajo,
                                                                        _referencias:
                                                                          referenciaInfo,
                                                                      },
                                                                    _direccion:
                                                                      {
                                                                        _id: direccionInfo._id,
                                                                        pais: direccionInfo.pais,
                                                                        region:
                                                                          direccionInfo.region,
                                                                        ciudad:
                                                                          direccionInfo.ciudad,
                                                                        calle:
                                                                          direccionInfo.calle,
                                                                        codigoPostal:
                                                                          direccionInfo.codigoPostal,
                                                                      },
                                                                    sitioWeb:
                                                                      usuarioInfo.sitioWeb,
                                                                    redesSociales:
                                                                      usuarioInfo.redesSociales,
                                                                    acercaDe:
                                                                      usuarioInfo.acercaDe,
                                                                    isActivado:
                                                                      usuarioInfo.isActivado,
                                                                    isNotiSms:
                                                                      usuarioInfo.isNotiSms,
                                                                    isNotifEmail:
                                                                      usuarioInfo.isNotifEmail,
                                                                    isBan:
                                                                      usuarioInfo.isBan,
                                                                    fechaCreacion:
                                                                      usuarioInfo.fechaCreacion,
                                                                    fechaModificacion:
                                                                      usuarioInfo.fechaModificacion,
                                                                  };

                                                                  res.json({
                                                                    status: 200,
                                                                    message:
                                                                      "Profile encontrado",
                                                                    data: {
                                                                      profile:
                                                                        usuarioObj,
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
                        );
                      }
                    }
                  );
                }
              }
            );
          } else {
            //terminar el request
            let usuarioObj = usuarioInfo.toObject();
            delete usuarioObj.password;
            res.json({
              status: 200,
              message: "Profile encontrado",
              data: {
                profile: usuarioObj,
              },
            });
          }
        } else if (
          usuarioInfo.tipoUsuario === "empresa" &&
          usuarioInfo._empresa
        ) {
          //Get Empresa if exist
          modeloEmpresa.findById(
            usuarioInfo._empresa,
            function (err, empresaInfo) {
              if (err) {
                next(err);
              } else {
                //Get Identificacion
                modeloIdentificacion.findById(
                  usuarioInfo._identificacion,
                  function (err, identificacionInfo) {
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
                            //Get Direccion
                            modeloDireccion.findById(
                              usuarioInfo._direccion,
                              function (err, direccionInfo) {
                                if (err) {
                                  next(err);
                                } else {
                                  //Get Nombre
                                  modeloNombre.findById(
                                    usuarioInfo._nombre,
                                    function (err, nombreInfo) {
                                      if (err) {
                                        next(err);
                                      } else {
                                        //get categoria Empresa
                                        modeloCategoriaEmpresa.findById(
                                          empresaInfo._categoriaEmpresa,
                                          function (err, categoriaEmpresaInfo) {
                                            if (err) {
                                              next(err);
                                            } else {
                                              //Get publicaciontrabajo
                                              modeloPublicacionTrabajo.find(
                                                {
                                                  _id: {
                                                    $in: empresaInfo._publicacionTrabajo,
                                                  },
                                                },
                                                function (
                                                  err,
                                                  publicacionTrabajoInfo
                                                ) {
                                                  if (err) {
                                                    next(err);
                                                  } else {
                                                    //Crear el objeto y el response
                                                    usuarioObj = {
                                                      _id: usuarioInfo._id,
                                                      _nombre: {
                                                        _id: nombreInfo._id,
                                                        nombre:
                                                          nombreInfo.nombre,
                                                        apellidoMadre:
                                                          nombreInfo.apellidoMadre,
                                                        apellidoPadre:
                                                          nombreInfo.apellidoPadre,
                                                      },
                                                      _identificacion: {
                                                        _id: identificacionInfo._id,
                                                        tipoIdentificacion:
                                                          identificacionInfo.tipoIdentificacion,
                                                        descripcion:
                                                          identificacionInfo.descripcion,
                                                      },
                                                      email: usuarioInfo.email,
                                                      _telefono: {
                                                        _id: telefonoInfo._id,
                                                        tipoTelefono:
                                                          telefonoInfo.tipoTelefono,
                                                        descripcion:
                                                          telefonoInfo.descripcion,
                                                      },
                                                      tipoUsuario:
                                                        usuarioInfo.tipoUsuario,
                                                      _empresa: {
                                                        _id: empresaInfo._id,
                                                        fechaFundacion:
                                                          empresaInfo.fechaFundacion,
                                                        _categoriaEmpresa: {
                                                          _id: categoriaEmpresaInfo._id,
                                                          descripcion:
                                                            categoriaEmpresaInfo.descripcion,
                                                        },
                                                        _publicacionTrabajo: {
                                                          publicacionTrabajoInfo,
                                                        },
                                                      },
                                                      _direccion: {
                                                        _id: direccionInfo._id,
                                                        pais: direccionInfo.pais,
                                                        region:
                                                          direccionInfo.region,
                                                        ciudad:
                                                          direccionInfo.ciudad,
                                                        calle:
                                                          direccionInfo.calle,
                                                        codigoPostal:
                                                          direccionInfo.codigoPostal,
                                                      },
                                                      sitioWeb:
                                                        usuarioInfo.sitioWeb,
                                                      redesSociales:
                                                        usuarioInfo.redesSociales,
                                                      acercaDe:
                                                        usuarioInfo.acercaDe,
                                                      isActivado:
                                                        usuarioInfo.isActivado,
                                                      isNotiSms:
                                                        usuarioInfo.isNotiSms,
                                                      isNotifEmail:
                                                        usuarioInfo.isNotifEmail,
                                                      isBan: usuarioInfo.isBan,
                                                      fechaCreacion:
                                                        usuarioInfo.fechaCreacion,
                                                      fechaModificacion:
                                                        usuarioInfo.fechaModificacion,
                                                    };

                                                    res.json({
                                                      status: 200,
                                                      message:
                                                        "Profile encontrado",
                                                      data: {
                                                        profile: usuarioObj,
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
          );
        } else {
          let usuarioObj = usuarioInfo.toObject();
          delete usuarioObj.password;
          res.json({
            status: 200,
            message: "Profile encontrado",
            data: {
              profile: usuarioInfo,
            },
          });
        }
      }
    });
  },
};
