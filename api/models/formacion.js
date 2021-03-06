/*
 * Modelo de datos para tablas de formacion
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaFormacion = new Schema({
  nombreInstituto: {
    type: String,
    trim: true,
    required: true,
  },
  carrera: {
    type: String,
    trim: true,
  },
  nivel: {
    type: String,
    trim: true,
    required: true,
  },
  fechaInicial: {
    type: Date,
    trim: true,
    required: true,
  },
  fechaFinal: {
    type: Date,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaModificacion: {
    type: Date,
  },
});

//export el modelo
module.exports = mongoose.model("Formacion", schemaFormacion);
