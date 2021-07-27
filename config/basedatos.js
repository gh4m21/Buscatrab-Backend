/*
 * Configurar mongoose conneccion
 *
 */

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/Buscatrab';;
mongoose.connect(mongoDB);
mongoose.promise = global.Promise;

module.exports = mongoose;