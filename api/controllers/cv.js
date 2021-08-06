/*
 * Controllers para el CV
 *
 */

//Dependencies
const modeloCV = require("../models/cv");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloCV.findById(req.params.id, function (err, cvInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "CV encontrado",
          data: {
            CV: cvInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaCV = [];

    modeloCV.find({}, function (err, CV) {
      if (err) {
        next(err);
      } else {
        for (let cv of CV) {
          listaCV.push({
            _id: cv._id,
            titulo: cv.titulo,
            url: cv.url,
            tipoFichero: cv.tipoFichero,
            fechaCreacion: cv.fechaCreacion,
            fechaModificacion: cv.fechaModificacion,
          });
        }

        res.json({
          status: 200,
          message: "Lista de CV encontrado",
          data: {
            CV: listaCV,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloCV.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        url: req.body.url,
        tipoFichero: req.body.tipoFichero,
        fechaModificacion: Date.now(),
      },
      function (err, cvInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "CV actualizado con exito",
            data: null,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloCV.findByIdAndRemove(req.params.id, function (err, cvInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "CV borrado con exito",
          data: null,
        });
      }
    });
  },

  create: function (req, res, next) {
    modeloCV.create(
      {
        titulo: req.body.titulo,
        url: req.body.url,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "CV creado con exito",
            data: {
              CV: result,
            },
          });
        }
      }
    );
  },
};
