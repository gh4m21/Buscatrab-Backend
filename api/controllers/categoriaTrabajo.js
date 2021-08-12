/*
 * Controllers para el Categoria Trabajo
 *
 */

//Dependencies
const modeloCategoriaTrabajo = require("../models/categoriaTrabajo");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloCategoriaTrabajo.findById(
      req.params.id,
      function (err, categoriaTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Trabajo encontrado",
            data: {
              categoriaTrabajo: categoriaTrabajoInfo,
            },
          });
        }
      }
    );
  },

  getAll: function (req, res, next) {
    let listaCategoriaTrabajo = [];

    modeloCategoriaTrabajo.find({}, function (err, categoriaTrabajo) {
      if (err) {
        next(err);
      } else {
        for (let categoria of categoriaTrabajo) {
          listaCategoriaTrabajo.push({
            _id: categoria._id,
            descripcion: categoria.descripcion,
            fechaCreacion: categoria.fechaCreacion,
            fechaModificacion: categoria.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de Categoria Trabajo encontrado",
          data: {
            categoriaTrabajo: listaCategoriaTrabajo,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloCategoriaTrabajo.findByIdAndUpdate(
      req.params.id,
      {
        descripcion: req.body.descripcion,
        fechaModificacion: Date.now(),
      },
      function (err, categoriaTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Trabajo actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloCategoriaTrabajo.findByIdAndRemove(
      req.params.id,
      function (err, categoriaTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Categoria Trabajo borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloCategoriaTrabajo.create(
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
            message: "Categoria Trabajo creado con exito",
            data: {
              categoriaTrabajo: result,
            },
          });
        }
      }
    );
  },
};
