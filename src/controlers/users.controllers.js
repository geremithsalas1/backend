
import { pool } from '../db.js';

export const getUsers = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM "Usuario"')
    res.json(rows);
}

export const getUser = async (req, res) => {
    const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM "Usuario" WHERE cedula = $1', [id])
    if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows);
}

export const createUser = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const result = await pool.query('INSERT INTO "Usuario" (cedula, nombre, apellido, correo, contrasena, id_rol) VALUES ($1, $2, $3, $4, $5, $6) returning *',
            [data.cedula, data.nombre, data.apellido, data.correo, data.contrasena, data.id_rol])
        console.log(result);
        return res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        if (error.code === '23505') {
            return res.status(409).json({ message: 'User already exists' });
        }
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    const { rowCount } = await pool.query('DELETE FROM "Usuario" WHERE cedula = $1 returning *', [id])
    if (rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.sendStatus(204);
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const result = await pool.query('UPDATE "Usuario" SET cedula = $1, nombre = $2, apellido = $3, correo = $4, contrasena = $5, id_rol = $6 WHERE cedula = $7 returning *',
        [data.cedula, data.nombre, data.apellido, data.correo, data.contrasena, data.id_rol, id])
    return res.json(result.rows[0])
}
