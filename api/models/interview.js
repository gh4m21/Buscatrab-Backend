/*
 * Modelo de datos para tablas de Interview
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaInterview = new Schema({
  fecha: {
    type: Date,
    trim: true,
    required: true,
  },
  hora: {
    type: String,
    trim: true,
    required: true,
  },
  asignacionTo: {
    type: String,
    trim: true,
    required: true,
  },
  isAnulado: {
    type: Boolean,
    trim: true,
  },
  isActivado: {
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
module.exports = mongoose.model("Interview", schemaInterview);
