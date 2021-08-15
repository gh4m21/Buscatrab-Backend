/*
 * Modelo de datos para tablas de CV
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaCV = new Schema({
  titulo: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
  tipoFichero: {
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
module.exports = mongoose.model("CV", schemaCV);
