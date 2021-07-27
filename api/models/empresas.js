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
  _nombre: {
    type: Schema.Types.ObjectId,
    ref: "Nombres",
    trim: true,
    required: true,
  },
  fechaFundacion: {
    type: Date,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  _categoriaEmpresa: {
    type: Schema.Types.ObjectId,
    ref: "CategoriaEmpresas",
    trim: true,
  },
  _direccion: {
    type: Schema.Types.ObjectId,
    ref: "Direccion",
    trim: true,
    required: true,
  },
  sitioWeb: {
    type: String,
    trim: true,
  },
  redesSociales: [
    {
      type: String,
      trim: true,
    },
  ],
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
