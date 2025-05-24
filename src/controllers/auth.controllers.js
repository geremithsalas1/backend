import { pool } from "../db.js";

export const register = async (req, res) => {
  console.log(req.body);
  const { cedula, nombre, apellido, correo, contrasena, id_rol } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO "Usuario" (cedula, nombre, apellido, correo, contrasena, id_rol) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [cedula, nombre, apellido, correo, contrasena, id_rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req, res) => {
  const { cedula, contrasena } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "Usuario" WHERE cedula = $1 AND contrasena = $2',
      [cedula, contrasena]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

