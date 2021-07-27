/*
 * Modelo de datos para tablas de Categoria trabajo
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaCategoriaTrabajo = new Schema({
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
module.exports = mongoose.model("categoriaTrabajo", schemaCategoriaTrabajo);
