/*
 * Modelo de datos para tablas de Notificacion
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaNotificacion = new Schema({
  idParametra: {
    type: String,
    trim: true,
  },
  _desempleo: {
    type: Schema.Types.ObjectId,
    ref: "Desempleos",
    trim: true,
  },
  _empresa: {
    type: Schema.Types.ObjectId,
    ref: "Empresas",
    trim: true,
  },
  accion: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
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
module.exports = mongoose.model("Notificacion", schemaNotificacion);
