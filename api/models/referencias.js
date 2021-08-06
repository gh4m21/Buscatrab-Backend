/*
 * Modelo de datos para tablas de Referencia
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaReferencias = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  telefono: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  empresa: {
    type: String,
    trim: true,
    required: true,
  },
  notas: {
    type: String,
    trim: true,
    required: true,
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
module.exports = mongoose.model("Referencias", schemaReferencias);
