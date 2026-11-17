const { pool } = require("../config/database");

const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
  const errores = [];
  if (!razonsocial || razonsocial.trim() === '') errores.push('La razon social es obligatoria');
  if (!ruc || ruc.trim() === '') errores.push('El RUC es obligatorio');
  return errores;
};

const listarProveedores = async (req, res) => {
  try {
    const [proveedores] = await pool.query("SELECT * FROM proveedores ORDER BY id");
    res.status(200).json({ ok: true, total: proveedores.length, data: proveedores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

const obtenerProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id <= 0) return res.status(400).json({ ok: false, message: "ID inválido" });

    const [registro] = await pool.execute(`SELECT * FROM proveedores WHERE id = ?`, [id]);
    if (registro.length === 0) return res.status(404).json({ ok: false, message: "No existe" });

    res.status(200).json({ ok: true, data: registro[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

const crearProveedor = async (req, res) => {
  try {
    const errores = validarCampos(req.body);
    if (errores.length > 0) return res.status(400).json({ ok: false, message: 'Verifique datos', errores });

    const { razonsocial, contacto, ruc, direccion } = req.body;
    const consulta = 'INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?,?,?,?)';
    const [registro] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion]);

    res.status(201).json({ ok: true, id: registro.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id <= 0) return res.status(400).json({ ok: false, message: 'ID inválido' });

    const errores = validarCampos(req.body);
    if (errores.length > 0) return res.status(400).json({ ok: false, message: 'Verifique datos', errores });

    const [existe] = await pool.execute('SELECT id FROM proveedores WHERE id = ?', [id]);
    if (existe.length === 0) return res.status(404).json({ ok: false, message: 'No existe' });

    const consulta = 'UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, direccion=?, updated_at=NOW() WHERE id=?';
    const { razonsocial, contacto, ruc, direccion } = req.body;
    const [resultado] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion, id]);

    res.status(200).json({ ok: true, filasAfectadas: resultado.affectedRows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id <= 0) return res.status(400).json({ ok: false, message: 'ID inválido' });

    const [resultado] = await pool.execute('DELETE FROM proveedores WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) return res.status(404).json({ ok: false, message: 'No existe' });

    res.status(200).json({ ok: true, message: 'Eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

module.exports = { listarProveedores, obtenerProveedor, crearProveedor, actualizarProveedor, eliminarProveedor };