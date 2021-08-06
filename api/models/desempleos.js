/*
 * Modelo de datos para tablas desempleos
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaDesempleos = new Schema({
  _usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    trim: true,
  },
  fechaNacimiento: {
    type: String,
    trim: true,
  },
  lugarDeNacimiento: {
    type: String,
    trim: true,
  },
  estadoMatrimonial: {
    type: String,
    trim: true,
  },
  profesion: {
    type: String,
    trim: true,
  },
  _experiencia: [
    {
      type: Schema.Types.ObjectId,
      ref: "Experiencias",
      trim: true,
    },
  ],
  _formacion: [
    {
      type: Schema.Types.ObjectId,
      ref: "Formacion",
      trim: true,
    },
  ],
  _lenguaje: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lenguajes",
      trim: true,
    },
  ],
  _solicitudTrabajo: [
    {
      type: Schema.Types.ObjectId,
      ref: "SolicitudTrabajos",
      trim: true,
    },
  ],
  _referencias: [
    {
      type: Schema.Types.ObjectId,
      ref: "Referencias",
      trim: true,
    },
  ],
  acercaDe: {
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
module.exports = mongoose.model("Desempleos", schemaDesempleos);
