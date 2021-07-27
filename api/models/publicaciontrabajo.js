/*
 * Modelo de datos para tablas de Publicacion trabajo
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaPublicacionTrabajo = new Schema({
  titulo: {
    type: String,
    trim: true,
    required: true,
  },
  _empresa: {
    type: Schema.Types.ObjectId,
    ref: "Empresas",
    trim: true,
    required: true,
  },
  _direccion: {
    type: Schema.Types.ObjectId,
    ref: "Direccion",
    trim: true,
    required: true,
  },
  posicion: {
    type: String,
    trim: true,
    required: true,
  },
  _categoriaTrabajo: {
    type: Schema.Types.ObjectId,
    ref: "categoriaTrabajo",
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  tipoContrato: {
    type: String,
    trim: true,
    required: true,
  },
  responsabilidad: {
    type: String,
    trim: true,
    required: true,
  },
  requerimientos: {
    type: String,
    trim: true,
    required: true,
  },
  _nivelCarrera: {
    type: Schema.Types.ObjectId,
    ref: "nivelCarrera",
    trim: true,
    required: true,
  },
  experienciaTrabajo: {
    type: String,
    trim: true,
    required: true,
  },
  lenguaje: {
    type: String,
    trim: true,
    required: true,
  },
  salario: {
    type: String,
    trim: true,
    required: true,
  },
  _moneda: {
    type: Schema.Types.ObjectId,
    ref: "Monedas",
    trim: true,
    required: true,
  },
  periodoSalarial: {
    type: String,
    trim: true,
    required: true,
  },
  cantidadTiempo: {
    type: String,
    trim: true,
    required: true,
  },
  cantidadPersonas: {
    type: String,
    trim: true,
    required: true,
  },
  isActivado: {
    type: Boolean,
    trim: true,
  },
  fechaInicio: {
    type: Date,
    trim: true,
    required: true,
  },
  fechaFinal: {
    type: Date,
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
module.exports = mongoose.model("PublicacionTrabajo", schemaPublicacionTrabajo);
