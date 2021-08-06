/*
 * Modelo de datos para tablas de empresas
 *
 */

//dependencies
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const schemaEmpresas = new Schema({
  _usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    trim: true,
  },
  fechaFundacion: {
    type: Date,
    trim: true,
  },
  _categoriaEmpresa: {
    type: Schema.Types.ObjectId,
    ref: "CategoriaEmpresas",
    trim: true,
  },
  publicacionTrabajo: [
    {
      type: Schema.Types.ObjectId,
      ref: "PublicacionTrabajos",
    },
  ],
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaModificacion: {
    type: Date,
  },
});

//export el modelo
module.exports = mongoose.model("Empresas", schemaEmpresas);
