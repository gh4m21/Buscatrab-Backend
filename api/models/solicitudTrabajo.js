/*
 * Modelo de datos para tablas de Solicitud trabajo
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaSolictudTrabajo = new Schema({
  _publicacionTrabajo: {
    type: Schema.Types.ObjectId,
    ref: "PublicacionTrabajo",
    trim: true,
    required: true,
  },
  _desempleo: {
    type: Schema.Types.ObjectId,
    ref: "Desempleos",
    trim: true,
    required: true,
  },
  _cv: {
    type: Schema.Types.ObjectId,
    ref: "CV",
    trim: true,
    required: true,
  },
  _interview: {
    type: Schema.Types.ObjectId,
    ref: "Interview",
    trim: true,
  },
  motivacion: {
    type: String,
    trim: true,
  },
  isAceptado: {
    type: Boolean,
    trim: true,
  },
  isActivo: {
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
module.exports = mongoose.model("solicitudTrabajo", schemaSolictudTrabajo);
