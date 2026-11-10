//Este archivo contiene la lógica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO 1
//const objeto = require('') //TODOS LAS FUNCIONES
//const { otroObjeto } = require('') //SOLO ALGUNAS FUNCIONES

const { pool } = require("../config/database");
const CAMPOS = "id, marca, descripcion, precio, stock"; //Dato común

//Todas las funciones seán ASÍNCRONAS (tardarán un tiempo en ser resueltas...)
//ilisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envían datos (pasarelas)
//req (require - solicitar >>>), res (result - <<< resutado)
const listarProductos = async (req, res) => {
  //Se utiliza try - cath porque existe una probabilidad de error
  try {
    //Deserialización (obtener el primer elemento del arreglo)
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "error interno en el servidor",
    });
  }
};

const obtenerProducto = async (req, res) => {};

const crearProducto = async (req, res) => {};

const actualizarProducto = async (req, res) => {};

const eliminarProducto = async (req, res) => {};

//Todos los métodos deben ser EXPORTADOS
//el que lo utilizará será "routes"
module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
