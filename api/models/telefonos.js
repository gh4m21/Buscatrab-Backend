/*
 * Modelo de datos para tablas de telefonos
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaTelefonos = new Schema({
  tipoTelefono: {
    type: String,
    enum: ["movil", "casa", "trabajo", "otros"],
    default: "movil",
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
    unique: true,
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
module.exports = mongoose.model("Telefonos", schemaTelefonos);
