/*
 * Controllers para el empresas
 *
 */

//Dependencies
const modeloEmpresa = require("../models/empresas");
const modeloUsuario = require("../models/usuarios");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloEmpresa.findById(req.params.id, function (err, empresaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Empresa encontrado",
          data: {
            empresas: empresaInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaEmpresa = [];

    modeloEmpresa.find({}, function (err, empresas) {
      if (err) {
        next(err);
      } else {
        for (let empresa of empresas) {
          listaEmpresa.push({
            _id: empresa._id,
            _usuario: empresa._usuario,
            fechaFundacion: empresa.fechaFundacion,
            _categoriaEmpresa: empresa._categoriaEmpresa,
            publicacionTrabajo: empresa.publicacionTrabajo,
            fechaCreacion: empresa.fechaCreacion,
            fechaModificacion: empresa.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de empresa encontrado",
          data: {
            empresas: listaEmpresa,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloEmpresa.findByIdAndUpdate(
      req.params.id,
      {
        fechaFundacion: req.body.fechaFundacion,
        _categoriaEmpresa: req.body._categoriaEmpresa,
        publicacionTrabajo: req.body.publicacionTrabajo,
        fechaModificacion: Date.now(),
      },
      function (err, empresaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Empresa actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloEmpresa.findByIdAndRemove(req.params.id, function (err, empresaInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Empresa borrado con exito",
          data: null,
        });
      }
    });
  },

  create: function (req, res, next) {
    modeloEmpresa.create(
      {
        _usuario: req.body._usuario,
        fechaFundacion: req.body.fechaFundacion,
        _categoriaEmpresa: req.body._categoriaEmpresa,
        publicacionTrabajo: null,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualizar Usuarios
          modeloUsuario.findByIdAndUpdate(
            req.body.idUsuario,
            {
              _empresa: result._id,
            },
            function (err, usuarioInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Empresa creado con exito",
                  data: {
                    empresas: result,
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
