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
  posicion: {
    type: String,
    trim: true,
  },
  _categoriaTrabajo: {
    type: Schema.Types.ObjectId,
    ref: "categoriaTrabajo",
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  tipoContrato: {
    type: String,
    trim: true,
  },
  responsabilidad: {
    type: String,
    trim: true,
  },
  requerimientos: {
    type: String,
    trim: true,
  },
  _nivelCarrera: {
    type: Schema.Types.ObjectId,
    ref: "nivelCarrera",
    trim: true,
  },
  experienciaTrabajo: {
    type: String,
    trim: true,
  },
  lenguaje: {
    type: String,
    trim: true,
  },
  salario: {
    type: String,
    trim: true,
  },
  _moneda: {
    type: Schema.Types.ObjectId,
    ref: "Monedas",
    trim: true,
  },
  periodoSalarial: {
    type: String,
    trim: true,
  },
  cantidadPersonas: {
    type: String,
    trim: true,
  },
  isActivado: {
    type: Boolean,
    trim: true,
  },
  fechaInicial: {
    type: Date,
    trim: true,
  },
  fechaFinal: {
    type: Date,
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
module.exports = mongoose.model("PublicacionTrabajo", schemaPublicacionTrabajo);
