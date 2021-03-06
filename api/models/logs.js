/*
 * Modelo de datos para tablas de Logs
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaLogs = new Schema({
  _usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    trim: true,
    required: true,
  },
  accion: {
    type: String,
    trim: true,
    required: true,
  },
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
module.exports = mongoose.model("Logs", schemaLogs);
