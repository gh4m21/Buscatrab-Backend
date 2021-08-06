/*
 * Modelo de datos para tablas desempleos
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaNombres = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  apellidoMadre: {
    type: String,
    trim: true,
  },
  apellidoPadre: {
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
module.exports = mongoose.model("Nombres", schemaNombres);
