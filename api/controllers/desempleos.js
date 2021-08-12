/*
 * Controllers para el desempleos
 *
 */

//Dependencies
const modeloDesempleo = require("../models/desempleos");
const modeloUsuario = require("../models/usuarios");

module.exports = {
  getById: function (req, res, next) {
    modeloDesempleo.findById(req.params.id, function (err, desempleoInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 200,
          message: "Desempleo encontrado",
          data: {
            desempleo: desempleoInfo,
          },
        });
      }
    });
  },

  getAll: function (req, res, next) {
    let listaDesempleo = [];

    modeloDesempleo.find({}, function (err, desempleos) {
      if (err) {
        next(err);
      } else {
        for (let desempleo of desempleos) {
          listaDesempleo.push({
            _id: desempleo._id,
            _usuario: desempleo._usuario,
            fechaNacimiento: desempleo._fechaNacimiento,
            lugarDeNacimiento: desempleo.lugarDeNacimiento,
            estadoMatrimonial: desempleo.estadoMatrimonial,
            profesion: desempleo.profesion,
            _experiencia: desempleo._experiencia,
            _formacion: desempleo._formacion,
            _lenguaje: desempleo._lenguaje,
            _solicitudTrabajo: desempleo._solicitudTrabajo,
            _referencias: desempleo._referencias,
            fechaCreacion: desempleo.fechaCreacion,
            fechaModificacion: desempleo.fechaModificacion,
          });
        }
        res.json({
          status: 200,
          message: "Lista de desempleo encontrado",
          data: {
            desempleos: listaDesempleo,
          },
        });
      }
    });
  },

  updateById: function (req, res, next) {
    modeloDesempleo.findByIdAndUpdate(
      req.params.id,
      {
        fechaNacimiento: req.body.fechaNacimiento,
        lugarDeNacimiento: req.body.lugarDeNacimiento,
        estadoMatrimonial: req.body.estadoMatrimonial,
        profesion: req.body.profesion,
        //_solicitudTrabajo: req.body._solicitudTrabajo,
        fechaModificacion: Date.now(),
      },
      function (err, desempleoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Desempleo actualizado con exito",
            desempleo: desempleoInfo,
          });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    modeloDesempleo.findByIdAndRemove(
      req.params.id,
      function (err, empresaInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Empresa borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) { 
    modeloDesempleo.create(
      {
        _usuario: req.body._usuario,
        fechaNacimiento: req.body.fechaNacimiento,
        lugarDeNacimiento: req.body.lugarDeNacimiento,
        estadoMatrimonial: req.body.estadoMatrimonial,
        profesion: req.body.profesion,
        _experiencia: [],
        _formacion: [],
        _lenguaje: [],
        _solicitudTrabajo: [],
        _referencias: [],
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          //Actualizar usuarios
          modeloUsuario.findByIdAndUpdate(
            req.body._usuario,
            {
              _desempleo: result._id,
            },
            function (err, usuarioInfo) {
              if (err) {
                next(err);
              } else {
                res.json({
                  status: 200,
                  message: "Desempleo creado con exito",
                  data: {
                    desempleo: result,
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
