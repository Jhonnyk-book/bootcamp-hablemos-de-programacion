const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");
const path = require("path");
const fs = require("fs");

const handlerArchivos = (data, callback) => {
  const rutaIndexHtml = path.join(__dirname, "publico", data.ruta);
  const existeArchivo = fs.existsSync(rutaIndexHtml);
  if (existeArchivo) {
    const respuesta = fs.createReadStream(rutaIndexHtml);
    return callback(200, respuesta);
  }
  callback(404, { mensaje: "no encontrado" });
};

module.exports = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "esta es /ruta" });
  },
  mascotas: mascotas(recursos.mascotas),
  veterinarias: veterinarias(recursos.veterinarias),
  duenos: duenos(recursos.duenos),
  consultas: consultas(recursos),
  "index.html": {
    get: handlerArchivos,
  },
  "favicon.ico": {
    get: handlerArchivos,
  },
  "manifest.json": {
    get: handlerArchivos,
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
