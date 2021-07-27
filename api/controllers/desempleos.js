/*
 * Controllers para el desempleos
 *
 */

//Dependencies
const modeloDesempleo = require("../models/desempleos");

module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        modeloDesempleo.findById(req.params.id, function (err, desempleoInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Desempleo encontrado",
                    data: {
                        desempleos: desempleoInfo
                    }
                });
            }
        });
    },

    getAll: function (req, res, next) {
        let listaDesempleo = [];

        modeloDesempleo.find({}, function (err, desempleos) {
            if (err) {
                next(err);
            } else {
                for (let desempleo of desempleos) {
                    listaDesempleo.push({
                        id: desempleo._id,
                        _usuario: desempleo._usuario,
                        _nombre: desempleo._nombre,
                        fechaNacimiento: desempleo._fechaNacimiento,
                        lugarDeNacimiento: desempleo.lugarDeNacimiento,
                        estadoMatrimonial: desempleo.estadoMatrimonial,
                        profesion: desempleo.profesion,
                        pais: desempleo.pais,
                        _direccion: desempleo._direccion,
                        _telefono: desempleo._telefono,
                        sitioWeb: desempleo.sitioWeb,
                        redesSociales: desempleo.redesSociales,
                        _experiencia: desempleo._experiencia,
                        _formacion: desempleo._formacion,
                        _lenguaje: desempleo._lenguaje,
                        _solicitudTrabajo: desempleo._solicitudTrabajo,
                        _referencias: desempleo._referencias,
                        notas: desempleo.notas,
                        fechaCreacion: desempleo.fechaCreacion,
                        fechaModificacion: desempleo.fechaModificacion
                    });
                }

                res.json({
                    status: 200,
                    message: "Lista de desempleo encontrado",
                    data: {
                        desempleos: listaDesempleo,
                    }
                });
            }
        });
    },

    updateById: function (req, res, next) {
        modeloDesempleo.findByIdAndUpdate(req.params.id, {
            _nombre: req.body._nombre,
            fechaNacimiento: req.body.fechaNacimiento,
            lugarDeNacimiento: req.body.lugarDeNacimiento,
            estadoMatrimonial: req.body.estadoMatrimonial,
            profesion: req.body.profesion,
            pais: req.body.pais,
            _direccion: req.body._direccion,
            _telefono: req.body._telefono,
            sitioWeb: req.body.sitioWeb,
            redesSociales: req.body.redesSociales,
            _experiencia: req.body._experiencia,
            _formacion: req.body._formacion,
            _lenguaje: req.body._lenguaje,
            _solicitudTrabajo: req.body._solicitudTrabajo,
            _referencias: req.body._referencias,
            notas: req.body.notas,
            fechaModificacion: Date.now(),
        }, function (err, desempleoInfo) {

            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Desempleo actualizado con exito",
                    data: null
                });
            }
        });
    },

    deleteById: function (req, res, next) {
        modeloDesempleo.findByIdAndRemove(req.params.id, function (err, empresaInfo) {

            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Empresa borrado con exito",
                    data: null
                });
            }
        });
    },

    create: function (req, res, next) {
        modeloDesempleo.create({
            _usuario: req.body._usuario,
            _nombre: req.body._nombre,
            fechaNacimiento: req.body.fechaNacimiento,
            lugarDeNacimiento: req.body.lugarDeNacimiento,
            estadoMatrimonial: req.body.estadoMatrimonial,
            profesion: req.body.profesion,
            pais: req.body.pais,
            _direccion: req.body._direccion,
            _telefono: req.body._telefono,
            sitioWeb: req.body.sitioWeb,
            redesSociales: req.body.redesSociales,
            _experiencia: req.body._experiencia,
            _formacion: req.body._formacion,
            _lenguaje: req.body._lenguaje,
            _solicitudTrabajo: req.body._solicitudTrabajo,
            _referencias: req.body._referencias,
            notas: req.body.notas,
            fechaCreacion: Date.now(),
            fechaModificacion: Date.now(),
        }, function (err, result) {

            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Desempleo creado con exito",
                    data: {
                        desempleos: result
                    }
                });
            }
        });
    }

};