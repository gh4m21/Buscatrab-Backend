/*
 * Dependencias para el servidor
 *
 */
const express = require("express");
const logger = require("morgan");
const categoriaEmpresas = require("./routes/categoriaEmpresas");
const categoriaTrabajo = require("./routes/categoriaTrabajo");
const cv = require("./routes/cv");
const desempleos = require("./routes/desempleos");
const direccion = require("./routes/direccion");
const empresas = require("./routes/empresas");
const experiencias = require("./routes/experiencias");
const formacion = require("./routes/formacion");
const identificacion = require("./routes/identificacion");
const interview = require("./routes/interview");
const lenguajes = require("./routes/lenguajes");
const logs = require("./routes/logs");
const monedas = require("./routes/monedas");
const nivelCarrera = require("./routes/nivelCarrera");
const nombres = require("./routes/nombres");
const notificacion = require("./routes/notificacion");
const publicacionTrabajo = require("./routes/publicacionTrabajo");
const referencias = require("./routes/referencias");
const solicitudTrabajo = require("./routes/solicitudTrabajo");
const telefonos = require("./routes/telefonos");
const usuarios = require("./routes/usuarios");
const bodyparser = require("body-parser");
const mongoose = require("./config/basedatos"); // configuracion de base de datos
let jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

//Activar cors para manejar solicitud de diferentes fuentes
app.use(cors());

// jwt secret token
app.set("secretKey", "Buscatrab");

// connectar mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "error conneccion para MongoDB")
);

//Para guardar los logs y agregar el middleware parala solicitud
app.use(logger("dev"));
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.get("/", function (req, res) {
  res.json({
    "Api:": "Test servidor para el proyecto de Buscatrab",
  });
});

//Para capturar json
app.use(express.json());

//Ruta publico
app.use("/usuarios", usuarios);

//Ruta privada
//validarUsuario agregarla en la mitad
app.use("/categoriaEmpresas", categoriaEmpresas);
app.use("/categoriaTrabajo", categoriaTrabajo);
app.use("/cv", cv);
app.use("/desempleos", desempleos);
app.use("/direccion", direccion);
app.use("/empresas", empresas);
app.use("/experiencias", experiencias);
app.use("/formacion", formacion);
app.use("/identificacion", identificacion);
app.use("/interview", interview);
app.use("/lenguajes", lenguajes);
app.use("/logs", logs);
app.use("/monedas", monedas);
app.use("/nivelCarrera", nivelCarrera);
app.use("/nombres", nombres);
app.use("/notificacion", notificacion);
app.use("/publicaciontrabajo", publicacionTrabajo);
app.use("/referencias", referencias);
app.use("/solicitudTrabajo", solicitudTrabajo);
app.use("/telefonos", telefonos);
app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

//Funccion para validar el usuario
function validarUsuario(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decodedToken) {
      if (err) {
        res.json({
          status: 403,
          message: err.message,
          data: null,
        });
      } else {
        //agregar id usuario en el request
        req.body.idUsuario = decodedToken.id;
        next();
      }
    }
  );
}

//Express no considera el not found 404 como error
//Handle error 404

app.use(function (req, res, next) {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

//Handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status == 404) {
    res.status(404).json({
      message: "No Encontrado",
    });
  } else {
    res.status(500).json({
      messgae: "Hay un error en el request",
    });
  }
});

//Escuchar el servidor via el PORT
app.listen(3000, function () {
  console.log("Servidor escuchando via port: 3000");
});
