/*
 * Modelo de datos para tablas de Nivel carrera
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaNivelCarrera = new Schema({
  descripcion: {
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
module.exports = mongoose.model("nivelCarrera", schemaNivelCarrera);
