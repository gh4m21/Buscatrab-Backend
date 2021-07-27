/*
 * Controllers para el empresas
 *
 */

//Dependencies
const modeloEmpresa = require("../models/empresas");

module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        modeloEmpresa.findById(req.params.id, function (err, empresaInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Empresa encontrado",
                    data: {
                        empresas: empresaInfo
                    }
                });
            }
        });
    },

    getAll: function (req, res, next) {
        let listaEmpresa = [];

        modeloEmpresa.find({}, function (err, empresas) {
            if (err) {
                next(err);
            } else {
                for (let empresa of empresas) {
                    listaEmpresa.push({
                        id: empresa._id,
                        _usuario: empresa._usuario,
                        _nombre: empresa._nombre,
                        fechaFundacion: empresa.fechaFundacion,
                        descripcion: empresa.descripcion,
                        _categoriaEmpresa: empresa._categoriaEmpresa,
                        _direccion: empresa._direccion,
                        sitioWeb: empresa.sitioWeb,
                        redesSociales: empresa.redesSociales,
                        publicacionTrabajo: empresa.publicacionTrabajo,
                        fechaCreacion: empresa.fechaCreacion,
                        fechaModificacion: empresa.fechaModificacion
                    });
                }

                res.json({
                    status: 200,
                    message: "Lista de empresa encontrado",
                    data: {
                        empresas: listaEmpresa,
                    }
                });
            }
        });
    },

    updateById: function (req, res, next) {
        modeloEmpresa.findByIdAndUpdate(req.params.id, {
            _nombre: req.body._nombre,
            fechaFundacion: req.body.fechaFundacion,
            descripcion: req.body.descripcion,
            _categoriaEmpresa: req.body._categoriaEmpresa,
            _direccion: req.body._direccion,
            sitioWeb: req.body.sitioWeb,
            redesSociales: req.body.redesSociales,
            publicacionTrabajo: req.body.publicacionTrabajo,
            fechaModificacion: Date.now(),
        }, function (err, empresaInfo) {

            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Empresa actualizado con exito",
                    data: null
                });
            }
        });
    },

    deleteById: function (req, res, next) {
        modeloEmpresa.findByIdAndRemove(req.params.id, function (err, empresaInfo) {

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
        modeloEmpresa.create({
            _nombre: req.body._nombre,
            _usuario: req.body._usuario,
            fechaFundacion: req.body.fechaFundacion,
            descripcion: req.body.descripcion,
            _categoriaEmpresa: req.body._categoriaEmpresa,
            _direccion: req.body._direccion,
            sitioWeb: req.body.sitioWeb,
            redesSociales: req.body.redesSociales,
            publicacionTrabajo: req.body.publicacionTrabajo,
            fechaCreacion: Date.now(),
            fechaModificacion: Date.now(),
        }, function (err, result) {

            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message: "Empresa creado con exito",
                    data: {
                        empresas: result
                    }
                });
            }
        });
    }

};