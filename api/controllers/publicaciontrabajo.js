/*
 * Controllers para Publicacion Trabajo
 *
 */

//Dependencies
const modeloPublicacionTrabajo = require("../models/publicacionTrabajo");
const modeloEmpresa = require("../models/empresas");
const modeloCategoriaTrabajo = require("../models/categoriaTrabajo");
const modeloNivelCarrera = require("../models/nivelCarrera");
const modeloMoneda = require("../models/monedas");
const modeloUsuario = require("../models/usuarios");
const modeloNombre = require("../models/nombres");
const modeloTelefono = require("../models/telefonos");

module.exports = {
  getById: function (req, res, next) {
    modeloPublicacionTrabajo.findById(
      req.params.id,
      function (err, publicacionTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          modeloEmpresa.findById(
            publicacionTrabajoInfo._empresa,
            function (err, empresaInfo) {
              if (err) {
                next(err);
              } else {
                modeloCategoriaTrabajo.findById(
                  publicacionTrabajoInfo._categoriaTrabajo,
                  function (err, categoriaTrabajoInfo) {
                    if (err) {
                      next(err);
                    } else {
                      modeloNivelCarrera.findById(
                        publicacionTrabajoInfo._nivelCarrera,
                        function (err, nivelCarreraInfo) {
                          if (err) {
                            next(err);
                          } else {
                            modeloMoneda.findById(
                              publicacionTrabajoInfo._moneda,
                              function (err, monedaInfo) {
                                if (err) {
                                  next(err);
                                } else {
                                  modeloUsuario.findById(
                                    empresaInfo._usuario,
                                    function (err, usuarioInfo) {
                                      if (err) {
                                        next(err);
                                      } else {
                                        modeloNombre.findById(
                                          usuarioInfo._nombre,
                                          function (err, nombreInfo) {
                                            if (err) {
                                              next(err);
                                            } else {
                                              modeloTelefono.findById(
                                                usuarioInfo._telefono,
                                                function (err, telefonoInfo) {
                                                  if (err) {
                                                    next(err);
                                                  } else {
                                                    let publicacionTrabajoObj;
                                                    publicacionTrabajoObj = {
                                                      _id: publicacionTrabajoInfo._id,
                                                      titulo:
                                                        publicacionTrabajoInfo.titulo,
                                                      _empresa: {
                                                        _id: empresaInfo._id,
                                                        usuarioInfo,
                                                        fechaFundacion:
                                                          empresaInfo.fechaFundacion,
                                                        _categoriaEmpresa:
                                                          empresaInfo._categoriaEmpresa,
                                                        telefonoInfo,
                                                        nombreInfo,
                                                      },
                                                      posicion:
                                                        publicacionTrabajoInfo.posicion,
                                                      _categoriaTrabajo: {
                                                        _id: categoriaTrabajoInfo._id,
                                                        descripcion:
                                                          categoriaTrabajoInfo.descripcion,
                                                      },
                                                      descripcion:
                                                        publicacionTrabajoInfo.descripcion,
                                                      tipoContrato:
                                                        publicacionTrabajoInfo.tipoContrato,
                                                      responsabilidad:
                                                        publicacionTrabajoInfo.responsabilidad,
                                                      requerimientos:
                                                        publicacionTrabajoInfo.requerimientos,
                                                      _nivelCarrera: {
                                                        _id: nivelCarreraInfo._id,
                                                        descripcion:
                                                          nivelCarreraInfo.descripcion,
                                                      },
                                                      experienciaTrabajo:
                                                        publicacionTrabajoInfo.experienciaTrabajo,
                                                      lenguaje:
                                                        publicacionTrabajoInfo.lenguaje,
                                                      salario:
                                                        publicacionTrabajoInfo.salario,
                                                      _moneda: {
                                                        _id: monedaInfo._id,
                                                        descripcion:
                                                          monedaInfo.descripcion,
                                                      },
                                                      periodoSalarial:
                                                        publicacionTrabajoInfo.periodoSalarial,
                                                      cantidadPersonas:
                                                        publicacionTrabajoInfo.cantidadPersonas,
                                                      isActivado:
                                                        publicacionTrabajoInfo.isActivado,
                                                      fechaInicial:
                                                        publicacionTrabajoInfo.fechaInicial,
                                                      fechaFinal:
                                                        publicacionTrabajoInfo.fechaFinal,
                                                      fechaCreacion:
                                                        publicacionTrabajoInfo.fechaCreacion,
                                                    };
                                                    res.json({
                                                      status: 200,
                                                      message:
                                                        "Publicacion Trabajo encontrado",
                                                      data: {
                                                        publicacionTrabajo:
                                                          publicacionTrabajoObj,
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
  },

  getAll: function (req, res, next) {
    let listaPublicacionTrabajo = [];

    modeloPublicacionTrabajo.find({}, function (err, publicacionTrabajo) {
      if (err) {
        next(err);
      } else {
        for (let publicacion of publicacionTrabajo) {
          listaPublicacionTrabajo.push({
            _id: publicacion._id,
            titulo: publicacion.titulo,
            _empresa: publicacion._empresa,
            posicion: publicacion.posicion,
            _categoriaTrabajo: publicacion._categoriaTrabajo,
            descripcion: publicacion.descripcion,
            tipoContrato: publicacion.tipoContrato,
            responsabilidad: publicacion.responsabilidad,
            requerimientos: publicacion.requerimientos,
            _nivelCarrera: publicacion._nivelCarrera,
            experienciaTrabajo: publicacion.experienciaTrabajo,
            lenguaje: publicacion.lenguaje,
            salario: publicacion.salario,
            _moneda: publicacion._moneda,
            periodoSalarial: publicacion.periodoSalarial,
            cantidadPersonas: publicacion.cantidadPersonas,
            isActivado: publicacion.isActivado,
            fechaInicial: publicacion.fechaInicial,
            fechaFinal: publicacion.fechaFinal,
            fechaCreacion: publicacion.fechaCreacion,
            fechaModificacion: publicacion.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Publicacion Trabajo encontrado",
          data: {
            publicacionTrabajo: listaPublicacionTrabajo,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloPublicacionTrabajo.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        _empresa: req.body._empresa,
        posicion: req.body.posicion,
        _categoriaTrabajo: req.body._categoriaTrabajo,
        descripcion: req.body.descripcion,
        tipoContrato: req.body.tipoContrato,
        responsabilidad: req.body.responsabilidad,
        requerimientos: req.body.requerimientos,
        _nivelCarrera: req.body._nivelCarrera,
        experienciaTrabajo: req.body.experienciaTrabajo,
        lenguaje: req.body.lenguaje,
        salario: req.body.salario,
        _moneda: req.body._moneda,
        periodoSalarial: req.body.periodoSalarial,
        cantidadPersonas: req.body.cantidadPersonas,
        isActivado: req.body.isActivado,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        fechaModificacion: Date.now(),
      },
      function (err, publicacionTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "publicacionTrabajo actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloPublicacionTrabajo.findByIdAndRemove(
      req.params.id,
      function (err, publicacionTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          modeloEmpresa.findByIdAndUpdate(
            req.body.idEmpresa,
            {
              $pull: { _empresa: req.params.id },
            },
            function (err, empresaInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "PublicacionTrabajo borrado con exito",
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
    modeloPublicacionTrabajo.create(
      {
        titulo: req.body.titulo,
        _empresa: req.body._empresa,
        posicion: req.body.posicion,
        _categoriaTrabajo: req.body._categoriaTrabajo,
        descripcion: req.body.descripcion,
        tipoContrato: req.body.tipoContrato,
        responsabilidad: req.body.responsabilidad,
        requerimientos: req.body.requerimientos,
        _nivelCarrera: req.body._nivelCarrera,
        experienciaTrabajo: req.body.experienciaTrabajo,
        lenguaje: req.body.lenguaje,
        salario: req.body.salario,
        _moneda: req.body._moneda,
        periodoSalarial: req.body.periodoSalarial,
        cantidadPersonas: req.body.cantidadPersonas,
        isActivado: true,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualizar desempleo
          modeloEmpresa.findByIdAndUpdate(
            req.body._empresa,
            {
              $push: { _publicacionTrabajo: result._id },
            },
            function (err, empresaInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Publicacion creado con exito",
                  data: {
                    publicacionTrabajo: result,
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
