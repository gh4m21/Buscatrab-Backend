/*
 * Controllers para categoria empresa
 *
 */

//Dependencies
const modeloCategoriaEmpresa = require("../models/categoriaEmpresas");

module.exports = {
  getById: function (req, res, next) {
    modeloCategoriaEmpresa.findById(
      req.params.id,
      function (err, categoriaEmpresasInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Empresa encontrado",
            data: {
              categoriaEmpresas: categoriaEmpresasInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaCategoriaEmpresa = [];

    modeloCategoriaEmpresa.find({}, function (err, categoriaEmpresas) {
      if (err) {
        next(err);
      } else {
        for (let categoriaEmpresa of categoriaEmpresas) {
          listaCategoriaEmpresa.push({
            id: categoriaEmpresa._id,
            descripcion: categoriaEmpresa.descripcion,
            fechaCreacion: categoriaEmpresa.fechaCreacion,
            fechaModificacion: categoriaEmpresa.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de categoria de Empresas encontrado",
          data: {
            categoriaEmpresa: listaCategoriaEmpresa,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloCategoriaEmpresa.findByIdAndUpdate(
      req.params.id,
      {
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, categoriaEmpresaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Empresa actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloCategoriaEmpresa.findByIdAndRemove(
      req.params.id,
      function (err, categoriaEmpresaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Empresa borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloCategoriaEmpresa.create(
      {
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
            message: "Categoria Empresa creado con exito",
            data: {
              categoriaEmpresas: result,
            },
          });
        }
      }
    );
  },
};
