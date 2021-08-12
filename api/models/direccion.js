/*
 * Modelo de datos para tablas de Direccion
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaDireccion = new Schema({
  pais: {
    type: String,
    trim: true,
    required: true,
  },
  region: {
    type: String,
    trim: true,
    required: true,
  },
  ciudad: {
    type: String,
    trim: true,
    required: true,
  },
  calle: {
    type: String,
    trim: true,
    required: true,
  },
  codigoPostal: {
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
module.exports = mongoose.model("direccion", schemaDireccion);
