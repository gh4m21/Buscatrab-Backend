/*
 * Controllers para Publicacion Trabajo
 *
 */

//Dependencies
const modeloPublicacionTrabajo = require("../models/publicaciontrabajo");

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    modeloPublicacionTrabajo.findById(
      req.params.id,
      function (err, publicacionTrabajoInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Publicacion Trabajo encontrado",
            data: {
              publicacionTrabajo: publicacionTrabajoInfo,
            },
          });
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
            id: publicacion._id,
            titulo: publicacion.titulo,
            _empresa: publicacion._empresa,
            _direccion: publicacion._direccion,
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
            cantidadTiempo: publicacion.cantidadTiempo,
            cantidadPersonas: publicacion.cantidadPersonas,
            isActivado: publicacion.isActivado,
            fechaInicio: publicacion.fechaInicio,
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
        _direccion: req.body._direccion,
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
        cantidadTiempo: req.body.cantidadTiempo,
        cantidadPersonas: req.body.cantidadPersonas,
        isActivado: req.body.isActivado,
        fechaInicio: req.body.fechaInicio,
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
          res.json({
            status: 200,
            message: "Publicacion Trabajo borrado con exito",
            data: null,
          });
        }
      }
    );
  },

  create: function (req, res, next) {
    modeloPublicacionTrabajo.create(
      {
        titulo: req.body.titulo,
        _empresa: req.body._empresa,
        _direccion: req.body._direccion,
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
        cantidadTiempo: req.body.cantidadTiempo,
        cantidadPersonas: req.body.cantidadPersonas,
        isActivado: req.body.isActivado,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal,
        fechaCreacion: Date.now(),
        fechaModificacion: Date.now(),
      },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: 200,
            message: "Publicacion Trabajo creado con exito",
            data: {
              publicacionTrabajo: result,
            },
          });
        }
      }
    );
  },
};