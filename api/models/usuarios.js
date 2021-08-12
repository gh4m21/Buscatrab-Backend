/*
 * Modelo de datos para tablas de usuarios
 *
 */

//dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const schemaUsuario = new Schema({
  foto: {
    type: String,
    trim: true,
  },
  _nombre: {
    type: Schema.Types.ObjectId,
    ref: "Nombres",
    trim: true,
  },
  _identificacion: {
    type: Schema.Types.ObjectId,
    ref: "Identificacion",
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  _telefono: [
    {
      type: Schema.Types.ObjectId,
      ref: "Telefonos",
    },
  ],
  _direccion: {
    type: Schema.Types.ObjectId,
    ref: "Direccion",
    trim: true,
  },
  tipoUsuario: {
    type: String,
    required: true,
  },
  _empresa: {
    type: Schema.Types.ObjectId,
    ref: "Empresas",
    default: null,
  },
  _desempleo: {
    type: Schema.Types.ObjectId,
    ref: "Desempleos",
    default: null,
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
  acercaDe: {
    type: String,
    trim: true,
  },
  isActivado: {
    type: Boolean,
  },
  isNotifSms: {
    type: Boolean,
  },
  isNotifEmail: {
    type: Boolean,
  },
  isBan: {
    type: Boolean,
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  fechaModificacion: {
    type: Date,
  },
});

//Hash the password antes de guardar la en el base de datos
schemaUsuario.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

//export el modelo
module.exports = mongoose.model("Usuarios", schemaUsuario);
