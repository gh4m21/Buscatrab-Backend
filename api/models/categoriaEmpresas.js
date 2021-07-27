/*
 * Modelo de datos para tablas de Categoria Empresas
 *
 */

//dependencies
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const schemacategoriaEmpresas = new Schema({
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaModificacion: {
        type: Date
    }
});


//export el modelo
module.exports = mongoose.model('categoriaEmpresas', schemacategoriaEmpresas);