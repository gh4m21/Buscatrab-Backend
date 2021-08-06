/*
 * Modelo de datos para tablas de experiencias
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaExperiencia = new Schema({
  fechaInicio: {
    type: Date,
    trim: true,
    required: true,
  },
  fechaFinal: {
    type: Date,
    trim: true,
  },
  empresa: {
    type: String,
    trim: true,
    required: true,
  },
  puesto: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  isTrabajoActivo: {
    type: Boolean,
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
module.exports = mongoose.model("Experiencias", schemaExperiencia);
